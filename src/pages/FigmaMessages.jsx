import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import FigmaBackdrop from '../components/FigmaBackdrop'
import FigmaBackButton from '../components/FigmaBackButton'
import { useAuth } from '../context/AuthContext'
import useHelped from '../hooks/useHelped'
import useConversations from '../hooks/useConversations'
import { appendMessage, closeConversation, ensureConversation } from '../data/conversations'
import { hasMarkedHelpful, markHelpful } from '../data/reputation'
import { PROFESSORS } from '../data/figmaData'
import { findStudent } from '../data/students'
import { timeAgo } from '../utils/time'
import { classTone } from '../utils/classColor'
import { chipBase } from '../components/styles'

function initials(name) {
  const parts = (name || '?').split(' ').filter(Boolean)
  let out = ''
  for (let i = 0; i < parts.length; i++) out += parts[i].charAt(0)
  return out.slice(0, 2).toUpperCase()
}

export default function FigmaMessages() {
  const { kind, counterpartId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const helpedFor = useHelped()

  const isProfessorChat = kind === 'professor'
  const professor = isProfessorChat
    ? PROFESSORS.find(function (p) {
        return p.id === counterpartId
      })
    : null
  const student = isProfessorChat ? null : findStudent(counterpartId)

  const counterpartName = professor ? 'Professor ' + professor.name : student ? student.name : ''
  const classCode = professor ? professor.classes[0] : student ? student.classCode : ''
  const baseHelped = professor ? professor.helped : 0

  const conversations = useConversations(user ? user.id : 'guest', kind)
  const conversation =
    conversations.find(function (c) {
      return c.counterpartId === counterpartId
    }) || null
  const messages = conversation ? conversation.messages : []

  const [draft, setDraft] = useState('')
  const [marked, setMarked] = useState(false)
  const [notice, setNotice] = useState('')

  useEffect(
    function () {
      if (!user || !counterpartName) return
      ensureConversation(user.id, kind, counterpartId)
    },
    [user, kind, counterpartId, counterpartName],
  )

  useEffect(
    function () {
      if (!professor) return
      setMarked(hasMarkedHelpful(user ? user.id : 'guest', professor.id))
    },
    [professor, user],
  )

  if (!user) return <Navigate to="/auth" replace />

  if (!professor && !student) {
    return (
      <div className="relative min-h-screen w-full overflow-x-hidden">
        <FigmaBackdrop showStars />
        <FigmaBackButton to="/home" />
        <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center">
          <p className="text-[24px] tracking-[3px] text-white/70">Conversation not found.</p>
        </div>
      </div>
    )
  }

  function handleSend(e) {
    e.preventDefault()
    if (!draft.trim()) return
    appendMessage(user.id, kind, counterpartId, {
      id: 'm-' + Date.now(),
      from: 'me',
      body: draft.trim(),
      createdAt: Date.now(),
    })
    setDraft('')
  }

  function handleHelpful() {
    if (marked || !professor) return
    const res = markHelpful(user.id, professor.id)
    setMarked(true)
    if (res.ok) {
      setNotice('Professor ' + professor.name + ' now has ' + (baseHelped + res.total) + ' students helped.')
    }
  }

  function handleComplete() {
    closeConversation(user.id, kind, counterpartId)
    navigate('/home')
  }

  const totalHelped = baseHelped + helpedFor(professor ? professor.id : 'p1')
  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <FigmaBackdrop showStars dim />
      <FigmaBackButton to="/home" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[980px] flex-col px-4 pb-20 pt-[44px] sm:px-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-[14px] border border-white/12 bg-white/[0.045] px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border border-[#f2cd6b]/50 bg-[#f2cd6b]/[0.14] text-[12px] font-semibold text-[#f2cd6b]">
              {initials(counterpartName)}
            </span>
            <span className="truncate text-[18px] font-semibold text-white">{counterpartName}</span>
            <span className="text-white/25">/</span>
            <span className={chipBase + ' whitespace-nowrap ' + classTone(classCode)}>{classCode}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {professor && (
              <>
                <span className="text-[12px] tracking-[1px] text-white/45">
                  Helped {totalHelped} students
                </span>
                <button
                  type="button"
                  onClick={handleHelpful}
                  disabled={marked}
                  className={
                    'rounded-full border px-3 py-[5px] text-[11px] font-bold tracking-[2px] transition ' +
                    (marked
                      ? 'border-mint-400/50 bg-mint-400/[0.12] text-mint-300'
                      : 'border-[#f2cd6b]/40 bg-[#f2cd6b]/[0.08] text-[#f2cd6b] hover:bg-[#f2cd6b]/[0.18]')
                  }
                >
                  {marked ? 'MARKED HELPFUL' : 'WAS HELPFUL'}
                </button>
              </>
            )}
            <button
              type="button"
              onClick={handleComplete}
              className="rounded-full border border-rose-300/45 bg-rose-400/[0.10] px-3 py-[5px] text-[11px] font-bold tracking-[2px] text-rose-300 transition hover:bg-rose-400/[0.20]"
            >
              CLOSE
            </button>
          </div>
        </div>

        {notice && <p className="mb-4 text-[13px] tracking-[1px] text-mint-300">{notice}</p>}

        {messages.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 py-16 text-center">
            <p className="text-[18px] text-white/60">No messages yet.</p>
            <p className="text-[13px] text-white/30">
              Say hello to {counterpartName}. Only you can see this thread.
            </p>
          </div>
        )}

        <div className="flex flex-1 flex-col gap-[18px]">
          {messages.map(function (m) {
            const mine = m.from === 'me'
            return (
              <div key={m.id} className={'flex flex-col gap-[4px] ' + (mine ? 'items-end' : 'items-start')}>
                <div className="flex items-center gap-2 px-1 text-[12px]">
                  <span className="font-semibold text-[#f2cd6b]">{mine ? user.name : counterpartName}</span>
                  <span className="text-white/25">/</span>
                  <span className="text-white/35">{timeAgo(m.createdAt)}</span>
                </div>
                <div
                  className={
                    'max-w-[620px] rounded-[14px] border px-4 py-[10px] text-[16px] leading-relaxed ' +
                    (mine
                      ? 'border-[#f2cd6b]/30 bg-[#f2cd6b]/[0.12] text-white'
                      : 'border-white/12 bg-white/[0.05] text-white/90')
                  }
                >
                  {m.body}
                </div>
              </div>
            )
          })}
        </div>

        <form onSubmit={handleSend} className="mt-6 flex items-center gap-2">
          <input
            value={draft}
            onChange={function (e) {
              setDraft(e.target.value)
            }}
            placeholder={'Message ' + counterpartName + '...'}
            className="h-[50px] flex-1 rounded-full border border-white/15 bg-white/[0.06] px-5 text-[16px] text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#f2cd6b]/50"
          />
          <button
            type="submit"
            className="h-[50px] rounded-full bg-[#f2cd6b] px-6 text-[14px] font-bold tracking-[2px] text-[#120e26] transition hover:bg-[#f9e49f]"
          >
            SEND
          </button>
        </form>

        {lastMessage && (
          <p className="mt-3 text-center text-[11px] tracking-[1px] text-white/20">
            Last activity {timeAgo(lastMessage.createdAt)}
          </p>
        )}
      </div>
    </div>
  )
}
