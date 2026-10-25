const KEY = 'arcana.conversations.v1'
const SEED_PREFIX = 'arcana.seeded.v1:'

let cache = null
const listeners = new Set()

function readAll() {
  if (cache) return cache
  try {
    const raw = localStorage.getItem(KEY)
    const parsed = raw ? JSON.parse(raw) : []
    cache = Array.isArray(parsed) ? parsed : []
  } catch (err) {
    cache = []
  }
  return cache
}

function writeAll(next) {
  cache = next
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch (err) {
    return
  }
  listeners.forEach(function (fn) {
    fn()
  })
}

export function subscribeConversations(fn) {
  listeners.add(fn)
  return function () {
    listeners.delete(fn)
  }
}

function sameConv(c, userId, kind, counterpartId) {
  return c.userId === userId && c.kind === kind && c.counterpartId === counterpartId
}

export function listConversations(userId, kind) {
  return readAll()
    .filter(function (c) {
      return c.userId === userId && c.kind === kind
    })
    .sort(function (a, b) {
      return (b.lastAt || 0) - (a.lastAt || 0)
    })
}

export function getConversation(userId, kind, counterpartId) {
  return (
    readAll().find(function (c) {
      return sameConv(c, userId, kind, counterpartId)
    }) || null
  )
}

export function ensureConversation(userId, kind, counterpartId) {
  const existing = getConversation(userId, kind, counterpartId)
  if (existing) return existing
  const now = Date.now()
  const conv = {
    id: 'c_' + now.toString(36) + '_' + Math.floor(Math.random() * 999),
    userId: userId,
    kind: kind,
    counterpartId: counterpartId,
    createdAt: now,
    lastAt: now,
    messages: [],
  }
  writeAll(readAll().concat([conv]))
  return conv
}

export function appendMessage(userId, kind, counterpartId, message) {
  const next = readAll().map(function (c) {
    if (!sameConv(c, userId, kind, counterpartId)) return c
    return Object.assign({}, c, {
      lastAt: message.createdAt,
      messages: c.messages.concat([message]),
    })
  })
  writeAll(next)
}

export function closeConversation(userId, kind, counterpartId) {
  writeAll(
    readAll().filter(function (c) {
      return !sameConv(c, userId, kind, counterpartId)
    }),
  )
}

export function seedDemoInbox(userId, kind) {
  try {
    const flag = SEED_PREFIX + kind + ':' + userId
    if (localStorage.getItem(flag)) return
    localStorage.setItem(flag, '1')

    const existing = readAll().filter(function (c) {
      return c.userId === userId && c.kind === kind
    })
    if (existing.length > 0) return

    const now = Date.now()
    const seeds = []

    if (kind === 'professor') {
      seeds.push({
        counterpartId: 'p1',
        minutes: 48,
        body: 'Welcome to office hours. Ask me anything about Calculus I.',
      })
    } else {
      seeds.push({
        counterpartId: 's1',
        minutes: 26,
        body: 'Hello Professor, I am stuck on the related rates problem from the forum.',
      })
      seeds.push({
        counterpartId: 's2',
        minutes: 92,
        body: 'Do you have time to look at my series convergence work?',
      })
    }

    const next = readAll().slice()
    seeds.forEach(function (s, i) {
      const at = now - s.minutes * 60000
      next.push({
        id: 'c_seed_' + kind + '_' + i,
        userId: userId,
        kind: kind,
        counterpartId: s.counterpartId,
        createdAt: at,
        lastAt: at,
        messages: [
          {
            id: 'm_seed_' + kind + '_' + i,
            from: 'them',
            body: s.body,
            createdAt: at,
          },
        ],
      })
    })
    writeAll(next)
  } catch (err) {
    return
  }
}
