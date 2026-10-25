import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_COLLEGE_ID } from '../data/colleges'

const AuthContext = createContext(null)

const ACCOUNTS_KEY = 'arcana.accounts.v2'
const SESSION_KEY = 'arcana.session.v2'

const ADJECTIVES = [
  'Strong', 'Witty', 'Brave', 'Calm', 'Clever', 'Gentle', 'Bold', 'Quiet',
  'Swift', 'Merry', 'Noble', 'Sunny', 'Curious', 'Steady', 'Vivid', 'Kind',
  'Silent', 'Radiant', 'Crafty', 'Amber', 'Cosmic', 'Lucky', 'Sharp', 'Wandering',
]

const NOUNS = [
  'Octopus', 'Otter', 'Falcon', 'Badger', 'Fox', 'Raven', 'Tiger', 'Heron',
  'Lynx', 'Panda', 'Stag', 'Wombat', 'Osprey', 'Bison', 'Koala', 'Wolf',
  'Sparrow', 'Beetle', 'Comet', 'Lantern', 'Cipher', 'Quill', 'Ember', 'Turtle',
]

export function makePseudonym() {
  const a = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]
  const n = NOUNS[Math.floor(Math.random() * NOUNS.length)]
  return a + ' ' + n
}

function randomSalt() {
  return Math.random().toString(36).slice(2, 10)
}

function hashPassword(password, salt) {
  const input = salt + ':' + password
  let h = 5381
  for (let i = 0; i < input.length; i++) {
    h = ((h << 5) + h + input.charCodeAt(i)) | 0
  }
  let h2 = 52711
  for (let i = input.length - 1; i >= 0; i--) {
    h2 = ((h2 << 5) + h2 + input.charCodeAt(i)) | 0
  }
  return 'v1$' + (h >>> 0).toString(36) + '$' + (h2 >>> 0).toString(36)
}

function loadAccounts() {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (err) {
    return []
  }
}

function loadSession() {
  try {
    return localStorage.getItem(SESSION_KEY) || ''
  } catch (err) {
    return ''
  }
}

export function AuthProvider({ children }) {
  const [accounts, setAccounts] = useState(loadAccounts)
  const [sessionId, setSessionId] = useState(loadSession)

  useEffect(function () {
    try {
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
    } catch (err) {
      return
    }
  }, [accounts])

  useEffect(function () {
    try {
      if (sessionId) localStorage.setItem(SESSION_KEY, sessionId)
      else localStorage.removeItem(SESSION_KEY)
    } catch (err) {
      return
    }
  }, [sessionId])

  const user = useMemo(
    function () {
      return accounts.find(function (a) {
        return a.id === sessionId
      }) || null
    },
    [accounts, sessionId],
  )

  function signUp(input) {
    const email = (input.email || '').trim().toLowerCase()
    const password = input.password || ''

    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
      return { ok: false, error: 'Enter a valid school email address.' }
    }
    if (password.length < 6) {
      return { ok: false, error: 'Password must be at least 6 characters.' }
    }
    const exists = accounts.some(function (a) {
      return a.email === email
    })
    if (exists) {
      return { ok: false, error: 'An account with that email already exists. Sign in instead.' }
    }

    const salt = randomSalt()
    const role = input.role === 'professor' ? 'professor' : 'student'
    const account = {
      id: 'u_' + Date.now().toString(36) + '_' + Math.floor(Math.random() * 9999),
      email: email,
      salt: salt,
      passwordHash: hashPassword(password, salt),
      name: makePseudonym(),
      role: role,
      accessLevel: role === 'professor' ? 'Faculty' : 'Student',
      collegeId: input.collegeId || DEFAULT_COLLEGE_ID,
      helped: role === 'professor' ? 47 : 0,
      createdAt: Date.now(),
    }

    setAccounts(accounts.concat([account]))
    setSessionId(account.id)
    return { ok: true, account: account }
  }

  function signIn(input) {
    const email = (input.email || '').trim().toLowerCase()
    const password = input.password || ''
    const account = accounts.find(function (a) {
      return a.email === email
    })
    if (!account) {
      return { ok: false, error: 'No account found for that email. Create one first.' }
    }
    if (account.passwordHash !== hashPassword(password, account.salt)) {
      return { ok: false, error: 'Incorrect password. Try again.' }
    }
    setSessionId(account.id)
    return { ok: true, account: account }
  }

  function signOut() {
    try {
      if (user) localStorage.removeItem('arcana.chat.' + user.id)
    } catch (err) {
      // ignore storage failures
    }
    setSessionId('')
  }

  function updateAccount(patch) {
    if (!user) return { ok: false, error: 'You are not signed in.' }
    const targetId = user.id
    setAccounts(function (prev) {
      return prev.map(function (a) {
        return a.id === targetId ? Object.assign({}, a, patch) : a
      })
    })
    return { ok: true }
  }

  function setName(name) {
    const trimmed = (name || '').trim()
    if (trimmed.length < 2) return { ok: false, error: 'Name must be at least 2 characters.' }
    if (trimmed.length > 32) return { ok: false, error: 'Name must be 32 characters or fewer.' }
    const res = updateAccount({ name: trimmed })
    if (!res.ok) return res
    return { ok: true, name: trimmed }
  }

  function shuffleName() {
    const next = makePseudonym()
    const res = updateAccount({ name: next })
    if (!res.ok) return res
    return { ok: true, name: next }
  }

  function changePassword(currentPassword, nextPassword) {
    if (!user) return { ok: false, error: 'You are not signed in.' }
    if (user.passwordHash !== hashPassword(currentPassword || '', user.salt)) {
      return { ok: false, error: 'Current password is incorrect.' }
    }
    if ((nextPassword || '').length < 6) {
      return { ok: false, error: 'New password must be at least 6 characters.' }
    }
    const salt = randomSalt()
    return updateAccount({ salt: salt, passwordHash: hashPassword(nextPassword, salt) })
  }

  const value = {
    user: user,
    isSignedIn: Boolean(user),
    signUp: signUp,
    signIn: signIn,
    signOut: signOut,
    updateAccount: updateAccount,
    setName: setName,
    shuffleName: shuffleName,
    changePassword: changePassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside an AuthProvider')
  return ctx
}
