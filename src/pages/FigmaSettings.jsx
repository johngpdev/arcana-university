import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import FigmaBackdrop from '../components/FigmaBackdrop'
import FigmaBackButton from '../components/FigmaBackButton'
import { useAuth } from '../context/AuthContext'
import { COLLEGES } from '../data/colleges'

const inputClass =
  'h-[52px] w-full rounded-[16px] border-2 border-[#f2cd6b]/35 bg-[#f2cd6b]/[0.04] px-4 text-[18px] text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[#f2cd6b]/50'

const selectClass =
  'h-[52px] w-full rounded-[16px] border-2 border-[#f2cd6b]/35 bg-[#120e26] px-4 text-[18px] text-white focus:outline-none focus:ring-2 focus:ring-[#f2cd6b]/50'

const cardClass = 'w-full rounded-[16px] border-2 border-[#f2cd6b]/35 bg-[#f2cd6b]/[0.04] px-6 py-5'

const btnClass =
  'rounded-[12px] border-2 border-[#f2cd6b]/50 bg-[#f2cd6b]/[0.10] px-5 py-[8px] text-[15px] tracking-[3px] text-[#f2cd6b] transition hover:bg-[#f2cd6b]/[0.20]'

export default function FigmaSettings() {
  const navigate = useNavigate()
  const { user, setName, shuffleName, updateAccount, changePassword, signOut } = useAuth()

  const [nameDraft, setNameDraft] = useState(user ? user.name : '')
  const [collegeId, setCollegeId] = useState(user ? user.collegeId : 'osu')
  const [currentPw, setCurrentPw] = useState('')
  const [nextPw, setNextPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')

  const [nameMsg, setNameMsg] = useState(null)
  const [collegeMsg, setCollegeMsg] = useState(null)
  const [pwMsg, setPwMsg] = useState(null)

  if (!user) return <Navigate to="/auth" replace />

  function handleSaveName(e) {
    e.preventDefault()
    const res = setName(nameDraft)
    if (res.ok) {
      setNameDraft(res.name)
      setNameMsg({ ok: true, text: 'Saved. Your name is now ' + res.name + '.' })
    } else {
      setNameMsg({ ok: false, text: res.error })
    }
  }

  function handleShuffle() {
    const res = shuffleName()
    if (res.ok) {
      setNameDraft(res.name)
      setNameMsg({ ok: true, text: 'New pseudonym generated: ' + res.name })
    } else {
      setNameMsg({ ok: false, text: res.error })
    }
  }

  function handleSaveCollege(e) {
    e.preventDefault()
    const res = updateAccount({ collegeId: collegeId })
    setCollegeMsg(res.ok ? { ok: true, text: 'Institution updated.' } : { ok: false, text: res.error })
  }

  function handleChangePassword(e) {
    e.preventDefault()
    if (nextPw !== confirmPw) {
      setPwMsg({ ok: false, text: 'New passwords do not match.' })
      return
    }
    const res = changePassword(currentPw, nextPw)
    if (!res.ok) {
      setPwMsg({ ok: false, text: res.error })
      return
    }
    setCurrentPw('')
    setNextPw('')
    setConfirmPw('')
    setPwMsg({ ok: true, text: 'Password updated.' })
  }

  function handleSignOut() {
    signOut()
    navigate('/')
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <FigmaBackdrop showStars />
      <FigmaBackButton to="/home" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[760px] flex-col gap-[26px] px-6 pb-24 pt-[60px]">
        <div className="text-center">
          <h1 className="text-[38px] tracking-[4px] text-white">SETTINGS</h1>
          <p className="mt-2 text-[14px] tracking-[1px] text-white/40">
            Pseudonymous by design. Your real identity is never shown to other students.
          </p>
        </div>

        <form onSubmit={handleSaveName} className={cardClass}>
          <p className="mb-3 text-[18px] tracking-[3px] text-[#f2cd6b]">PSEUDONYM</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={nameDraft}
              onChange={function (e) {
                setNameDraft(e.target.value)
              }}
              className={inputClass}
            />
            <button type="button" onClick={handleShuffle} className={btnClass + ' whitespace-nowrap'}>
              SHUFFLE
            </button>
            <button type="submit" className={btnClass + ' whitespace-nowrap'}>
              SAVE
            </button>
          </div>
          <p className="mt-2 text-[13px] tracking-[1px] text-white/40">
            Two words, like Strong Octopus. Change it as often as you like.
          </p>
          <p className="mt-1 text-[13px] tracking-[1px] text-white/30">
            Currently saved: <span className="text-white/70">{user.name}</span>
          </p>
          {nameMsg && (
            <p className={'mt-2 text-[14px] ' + (nameMsg.ok ? 'text-mint-300' : 'text-rose-300')}>
              {nameMsg.text}
            </p>
          )}
        </form>

        <div className={cardClass}>
          <p className="mb-3 text-[18px] tracking-[3px] text-[#f2cd6b]">ACCOUNT</p>
          <dl className="flex flex-col gap-3 text-[16px] tracking-[1px]">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-white/45">Email</dt>
              <dd className="truncate text-white">{user.email}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-white/45">Access level</dt>
              <dd className="rounded-[10px] border-2 border-[#f2cd6b]/50 bg-[#f2cd6b]/[0.12] px-3 py-[2px] text-[#f2cd6b]">
                {user.accessLevel.toUpperCase()}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-white/45">Account type</dt>
              <dd className="text-white">{user.role === 'professor' ? 'Faculty' : 'Student'}</dd>
            </div>
            {user.role === 'professor' && (
              <div className="flex items-center justify-between gap-4">
                <dt className="text-white/45">Students helped</dt>
                <dd className="text-white">{user.helped}</dd>
              </div>
            )}
          </dl>
        </div>

        <form onSubmit={handleSaveCollege} className={cardClass}>
          <p className="mb-3 text-[18px] tracking-[3px] text-[#f2cd6b]">INSTITUTION</p>
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
          <p className="mt-2 text-[13px] tracking-[1px] text-white/40">
            This controls which class catalog you search.
          </p>
          {collegeMsg && (
            <p className={'mt-2 text-[14px] ' + (collegeMsg.ok ? 'text-mint-300' : 'text-rose-300')}>
              {collegeMsg.text}
            </p>
          )}
          <button type="submit" className={btnClass + ' mt-3'}>
            SAVE INSTITUTION
          </button>
        </form>

        <form onSubmit={handleChangePassword} className={cardClass}>
          <p className="mb-3 text-[18px] tracking-[3px] text-[#f2cd6b]">PASSWORD</p>
          <div className="flex flex-col gap-3">
            <input
              type="password"
              value={currentPw}
              onChange={function (e) {
                setCurrentPw(e.target.value)
              }}
              placeholder="Current password"
              autoComplete="current-password"
              className={inputClass}
            />
            <input
              type="password"
              value={nextPw}
              onChange={function (e) {
                setNextPw(e.target.value)
              }}
              placeholder="New password"
              autoComplete="new-password"
              className={inputClass}
            />
            <input
              type="password"
              value={confirmPw}
              onChange={function (e) {
                setConfirmPw(e.target.value)
              }}
              placeholder="Confirm new password"
              autoComplete="new-password"
              className={inputClass}
            />
          </div>
          {pwMsg && (
            <p className={'mt-2 text-[14px] ' + (pwMsg.ok ? 'text-mint-300' : 'text-rose-300')}>
              {pwMsg.text}
            </p>
          )}
          <button type="submit" className={btnClass + ' mt-3'}>
            UPDATE PASSWORD
          </button>
        </form>

        <button
          type="button"
          onClick={handleSignOut}
          className="self-center rounded-[16px] border-2 border-white/25 bg-white/[0.03] px-8 py-[10px] text-[18px] tracking-[4px] text-white/70 transition hover:bg-white/[0.08]"
        >
          SIGN OUT
        </button>
      </div>
    </div>
  )
}
