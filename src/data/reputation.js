const HELPED_KEY = 'arcana.helped.v1'
const VOTES_KEY = 'arcana.helpful.v1'

let cache = null
const listeners = new Set()

function readAll() {
  if (cache) return cache
  try {
    const raw = localStorage.getItem(HELPED_KEY)
    cache = raw ? JSON.parse(raw) : {}
  } catch (err) {
    cache = {}
  }
  if (!cache || typeof cache !== 'object') cache = {}
  return cache
}

function writeAll(next) {
  cache = next
  try {
    localStorage.setItem(HELPED_KEY, JSON.stringify(next))
  } catch (err) {
    return
  }
}

function emit() {
  listeners.forEach(function (fn) {
    fn()
  })
}

export function helpedFor(professorId) {
  const all = readAll()
  return all[professorId] || 0
}

export function addHelpful(professorId) {
  const all = Object.assign({}, readAll())
  all[professorId] = (all[professorId] || 0) + 1
  writeAll(all)
  emit()
  return all[professorId]
}

export function subscribeHelped(fn) {
  listeners.add(fn)
  return function () {
    listeners.delete(fn)
  }
}

function readVotes() {
  try {
    const raw = localStorage.getItem(VOTES_KEY)
    const parsed = raw ? JSON.parse(raw) : {}
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch (err) {
    return {}
  }
}

function voteKey(userId, professorId) {
  return (userId || 'guest') + ':' + professorId
}

export function hasMarkedHelpful(userId, professorId) {
  return Boolean(readVotes()[voteKey(userId, professorId)])
}

export function markHelpful(userId, professorId) {
  const votes = readVotes()
  const key = voteKey(userId, professorId)
  if (votes[key]) {
    return { ok: false, already: true, total: helpedFor(professorId) }
  }
  votes[key] = Date.now()
  try {
    localStorage.setItem(VOTES_KEY, JSON.stringify(votes))
  } catch (err) {
    return { ok: false, already: false, total: helpedFor(professorId) }
  }
  const total = addHelpful(professorId)
  return { ok: true, already: false, total: total }
}
