import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FigmaBackdrop from '../components/FigmaBackdrop'
import FigmaBackButton from '../components/FigmaBackButton'
import { useAuth } from '../context/AuthContext'
import { COLLEGES, DEFAULT_COLLEGE_ID, findCollege, classesForCollege } from '../data/colleges'

const inputClass =
  'h-[54px] w-full rounded-[16px] border-2 border-[#f2cd6b]/35 bg-[#f2cd6b]/[0.04] px-4 text-[19px] text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[#f2cd6b]/50'

const selectClass =
  'h-[54px] w-full rounded-[16px] border-2 border-[#f2cd6b]/35 bg-[#120e26] px-4 text-[19px] text-white focus:outline-none focus:ring-2 focus:ring-[#f2cd6b]/50'

const tabBase = 'flex-1 rounded-[14px] border-2 px-4 py-3 text-[18px] tracking-[3px] transition'

export default function FigmaAuth() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, signIn, signUp } = useAuth()
  const initialTab = location.state && location.state.tab === 'signup' ? 'signup' : 'signin'
  const [tab, setTab] = useState(initialTab)
  const [collegeId, setCollegeId] = useState(DEFAULT_COLLEGE_ID)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [role, setRole] = useState('student')
  const [error, setError] = useState('')

  const college = findCollege(collegeId)

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (tab === 'signup') {
      if (password !== confirm) {
        setError('Passwords do not match.')
        return
      }
      const res = signUp({
        email: email,
        password: password,
        role: role,
        collegeId: collegeId,
      })
      if (!res.ok) {
        setError(res.error)
        return
      }
      navigate('/home')
      return
    }

    const res = signIn({ email: email, password: password })
    if (!res.ok) {
      setError(res.error)
      return
    }
    navigate('/home')
  }

  function switchTab(next) {
    setTab(next)
    setError('')
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <FigmaBackdrop showStars />
      <FigmaBackButton to="/" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24">
        {user && (
          <div className="mb-8 w-[520px] max-w-full rounded-[16px] border-2 border-[#f2cd6b]/50 bg-[#f2cd6b]/[0.08] px-5 py-4 text-center">
            <p className="text-[16px] tracking-[2px] text-white/70">Already signed in</p>
            <p className="mt-1 text-[22px] tracking-[3px] text-[#f2cd6b]">{user.name}</p>
            <button
              type="button"
              onClick={function () {
                navigate('/home')
              }}
              className="mt-3 rounded-[12px] border-2 border-[#f2cd6b]/50 px-5 py-2 text-[16px] tracking-[3px] text-[#f2cd6b] transition hover:bg-[#f2cd6b]/[0.12]"
            >
              CONTINUE
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex w-[520px] max-w-full flex-col gap-[20px]">
          <div className="flex flex-col items-center gap-2">
            <p className="text-[32px] tracking-[4px] text-[#f2cd6b]">ARCANA ACCOUNT</p>
            <p className="text-center text-[15px] tracking-[1px] text-white/55">
              Your account stores a pseudonym, never your real identity.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={function () {
                switchTab('signin')
              }}
              className={
                tabBase +
                ' ' +
                (tab === 'signin'
                  ? 'border-[#f2cd6b]/70 bg-[#f2cd6b]/[0.14] text-[#f2cd6b]'
                  : 'border-white/20 bg-white/[0.03] text-white/60 hover:bg-white/[0.08]')
              }
            >
              SIGN IN
            </button>
            <button
              type="button"
              onClick={function () {
                switchTab('signup')
              }}
              className={
                tabBase +
                ' ' +
                (tab === 'signup'
                  ? 'border-[#f2cd6b]/70 bg-[#f2cd6b]/[0.14] text-[#f2cd6b]'
                  : 'border-white/20 bg-white/[0.03] text-white/60 hover:bg-white/[0.08]')
              }
            >
              CREATE ACCOUNT
            </button>
          </div>

          {tab === 'signup' && (
            <div className="flex flex-col gap-[6px]">
              <label className="text-[18px] tracking-[3px] text-[#f2cd6b]">INSTITUTION</label>
              <select
                value={collegeId}
                onChange={function (e) {
                  setCollegeId(e.target.value)
                }}
                className={selectClass}
              >
                {COLLEGES.map(function (c) {
                  return (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  )
                })}
              </select>
              <p className="text-[13px] tracking-[1px] text-white/40">
                {classesForCollege(collegeId).length} classes indexed for {college.short}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-[6px]">
            <label className="text-[18px] tracking-[3px] text-[#f2cd6b]">SCHOOL EMAIL</label>
            <input
              value={email}
              onChange={function (e) {
                setEmail(e.target.value)
              }}
              placeholder={'you@' + college.domain}
              autoComplete="username"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-[18px] tracking-[3px] text-[#f2cd6b]">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={function (e) {
                setPassword(e.target.value)
              }}
              placeholder="At least 6 characters"
              autoComplete={tab === 'signup' ? 'new-password' : 'current-password'}
              className={inputClass}
            />
          </div>

          {tab === 'signup' && (
            <div className="flex flex-col gap-[6px]">
              <label className="text-[18px] tracking-[3px] text-[#f2cd6b]">CONFIRM PASSWORD</label>
              <input
                type="password"
                value={confirm}
                onChange={function (e) {
                  setConfirm(e.target.value)
                }}
                autoComplete="new-password"
                className={inputClass}
              />
            </div>
          )}

          {tab === 'signup' && (
            <div className="flex flex-col gap-[6px]">
              <label className="text-[18px] tracking-[3px] text-[#f2cd6b]">ACCOUNT TYPE</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={function () {
                    setRole('student')
                  }}
                  className={
                    tabBase +
                    ' ' +
                    (role === 'student'
                      ? 'border-[#f2cd6b]/70 bg-[#f2cd6b]/[0.14] text-[#f2cd6b]'
                      : 'border-white/20 bg-white/[0.03] text-white/60 hover:bg-white/[0.08]')
                  }
                >
                  STUDENT
                </button>
                <button
                  type="button"
                  onClick={function () {
                    setRole('professor')
                  }}
                  className={
                    tabBase +
                    ' ' +
                    (role === 'professor'
                      ? 'border-[#f2cd6b]/70 bg-[#f2cd6b]/[0.14] text-[#f2cd6b]'
                      : 'border-white/20 bg-white/[0.03] text-white/60 hover:bg-white/[0.08]')
                  }
                >
                  FACULTY
                </button>
              </div>
              <p className="text-[13px] tracking-[1px] text-white/40">
                Access level granted: {role === 'professor' ? 'Faculty' : 'Student'}
              </p>
            </div>
          )}

          {error && <p className="text-[15px] text-rose-300">{error}</p>}

          <button
            type="submit"
            className="mt-1 self-center rounded-[16px] border-2 border-[#f2cd6b]/50 bg-[#f2cd6b]/[0.10] px-10 py-[10px] text-[22px] tracking-[4px] text-[#f2cd6b] transition hover:bg-[#f2cd6b]/[0.20]"
          >
            {tab === 'signup' ? 'CREATE ACCOUNT' : 'SIGN IN'}
          </button>
        </form>
      </div>
    </div>
  )
}
