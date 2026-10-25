import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import FigmaBackdrop from '../components/FigmaBackdrop'
import FigmaBackButton from '../components/FigmaBackButton'
import FigmaSettingsButton from '../components/FigmaSettingsButton'
import { useAuth } from '../context/AuthContext'
import useConversations from '../hooks/useConversations'
import { closeConversation, seedDemoInbox } from '../data/conversations'
import { findCollege } from '../data/colleges'
import { PROFESSORS } from '../data/figmaData'
import { findStudent } from '../data/students'
import { timeAgo } from '../utils/time'
import { classTone } from '../utils/classColor'
import { chipBase } from '../components/styles'

function preview(body) {
  if (!body) return 'No messages yet'
  return body.length > 54 ? body.slice(0, 54) + '...' : body
}

export default function FigmaHome() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const isProfessor = user ? user.role === 'professor' : false
  const kind = isProfessor ? 'student' : 'professor'
  const conversations = useConversations(user ? user.id : 'guest', kind)
  const [toast, setToast] = useState('')

  useEffect(
    function () {
      if (user) seedDemoInbox(user.id, kind)
    },
    [user, kind],
  )

  useEffect(
    function () {
      if (!toast) return undefined
      const id = setTimeout(function () {
        setToast('')
      }, 3200)
      return function () {
        clearTimeout(id)
      }
    },
    [toast],
  )

  if (!user) return <Navigate to="/auth" replace />

  const college = findCollege(user.collegeId)
  const greeting = isProfessor ? 'Hello, Professor.' : 'Hello, Scholar.'

  function counterpartFor(conv) {
    if (conv.kind === 'professor') {
      const prof = PROFESSORS.find(function (p) {
        return p.id === conv.counterpartId
      })
      return prof ? { name: 'Professor ' + prof.name, code: prof.classes[0], id: prof.id } : null
    }
    const student = findStudent(conv.counterpartId)
    return student ? { name: student.name, code: student.classCode, id: student.id } : null
  }

  function openConv(conv) {
    if (conv.kind === 'professor') navigate('/messages/professor/' + conv.counterpartId)
    else navigate('/messages/student/' + conv.counterpartId)
  }

  function completeConv(conv) {
    const info = counterpartFor(conv)
    closeConversation(user.id, conv.kind, conv.counterpartId)
    setToast((info ? info.name : 'Conversation') + ' closed and messages cleared.')
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <FigmaBackdrop showStars />
      <FigmaSettingsButton />
      <FigmaBackButton to="/" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1180px] flex-col px-6 pb-24 pt-[140px]">
        <h1 className="text-center text-[52px] leading-tight tracking-[2px] text-white lg:text-[68px]">
          {greeting}
        </h1>
        <p className="mt-3 text-center text-[20px] tracking-[3px] text-[#f2cd6b]">{user.name}</p>
        <p className="mt-2 text-center text-[13px] tracking-[2px] text-white/40">
          {college.short} <span className="text-white/20">/</span> {user.accessLevel}
        </p>

        <div className="mt-[48px] flex flex-col gap-12 lg:flex-row lg:justify-center lg:gap-[72px]">
          <section className="flex w-full flex-col items-center gap-[12px] lg:w-[520px]">
            <div className="mb-1 flex w-full items-center justify-between border-b border-white/[0.08] pb-2">
              <span className="text-[12px] font-semibold tracking-[3px] text-white/45">
                {isProfessor ? 'STUDENT MESSAGES' : 'PROFESSOR MESSAGES'}
              </span>
              <span className="text-[11px] tracking-[2px] text-white/25">
                {conversations.length} OPEN
              </span>
            </div>

            {conversations.length === 0 && (
              <div className="w-full rounded-[16px] border border-white/12 bg-white/[0.04] px-6 py-8 text-center">
                <p className="text-[18px] tracking-[1px] text-white/70">No open conversations.</p>
                <p className="mt-1 text-[14px] tracking-[1px] text-white/35">
                  {isProfessor
                    ? 'Students will appear here when they message you.'
                    : 'Find a professor to start one.'}
                </p>
                {!isProfessor && (
                  <button
                    type="button"
                    onClick={function () {
                      navigate('/professors')
                    }}
                    className="mt-4 rounded-full border border-[#f2cd6b]/50 bg-[#f2cd6b]/[0.10] px-5 py-[6px] text-[13px] font-bold tracking-[2px] text-[#f2cd6b] transition hover:bg-[#f2cd6b]/[0.20]"
                  >
                    FIND A PROFESSOR
                  </button>
                )}
              </div>
            )}

            {conversations.map(function (conv) {
              const info = counterpartFor(conv)
              if (!info) return null
              const last = conv.messages.length > 0 ? conv.messages[conv.messages.length - 1] : null
              return (
                <div
                  key={conv.id}
                  role="button"
                  tabIndex={0}
                  onClick={function () {
                    openConv(conv)
                  }}
                  onKeyDown={function (e) {
                    if (e.key === 'Enter' || e.key === ' ') openConv(conv)
                  }}
                  className="group relative w-full cursor-pointer rounded-[16px] border border-white/12 bg-white/[0.045] py-3 pl-4 pr-[96px] text-left transition hover:border-[#f2cd6b]/40 hover:bg-[#f2cd6b]/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2cd6b]/40"
                >
                  <div className="flex items-center gap-2 pr-2">
                    <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full border border-[#f2cd6b]/40 bg-[#f2cd6b]/[0.12] text-[11px] font-bold text-[#f2cd6b]">
                      {info.name.replace('Professor ', '').slice(0, 2).toUpperCase()}
                    </span>
                    <span className="truncate text-[17px] font-semibold text-white">{info.name}</span>
                    <span className="text-white/20">/</span>
                    <span className={chipBase + ' whitespace-nowrap ' + classTone(info.code)}>
                      {info.code}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-[13px] text-white/40">{preview(last ? last.body : '')}</p>
                  <p className="mt-1 text-[11px] tracking-[1px] text-white/25">
                    {last ? timeAgo(last.createdAt) : 'just now'}
                  </p>

                  <button
                    type="button"
                    onClick={function (e) {
                      e.stopPropagation()
                      completeConv(conv)
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-rose-300/45 bg-[#120e26]/90 px-3 py-[5px] text-[11px] font-bold tracking-[2px] text-rose-300 transition hover:bg-rose-400/[0.16] sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
                  >
                    CLOSE
                  </button>
                </div>
              )
            })}
          </section>

          <section className="flex w-full flex-col gap-[14px] lg:w-[360px]">
            {isProfessor && (
              <div className="rounded-[16px] border border-white/12 bg-white/[0.045] px-6 py-4 text-center">
                <p className="text-[12px] tracking-[3px] text-white/40">STUDENTS HELPED</p>
                <p className="mt-1 text-[30px] font-semibold text-[#f2cd6b]">{user.helped}</p>
              </div>
            )}

            <button
              type="button"
              onClick={function () {
                navigate('/forum')
              }}
              className="w-full rounded-[16px] border border-white/12 bg-white/[0.045] px-5 py-4 text-left transition hover:border-[#f2cd6b]/40 hover:bg-[#f2cd6b]/[0.07]"
            >
              <p className="text-[17px] font-semibold text-white">Browse Discussions</p>
              <p className="mt-1 text-[13px] text-white/40">
                Read questions and answers by class.
              </p>
            </button>

            {!isProfessor && (
              <button
                type="button"
                onClick={function () {
                  navigate('/professors')
                }}
                className="w-full rounded-[16px] border border-white/12 bg-white/[0.045] px-5 py-4 text-left transition hover:border-[#f2cd6b]/40 hover:bg-[#f2cd6b]/[0.07]"
              >
                <p className="text-[17px] font-semibold text-white">Find a Professor</p>
                <p className="mt-1 text-[13px] text-white/40">
                  Search the faculty directory by class.
                </p>
              </button>
            )}

            {!isProfessor && (
              <button
                type="button"
                onClick={function () {
                  navigate('/student')
                }}
                className="w-full rounded-[16px] border border-white/12 bg-white/[0.045] px-5 py-4 text-left transition hover:border-[#f2cd6b]/40 hover:bg-[#f2cd6b]/[0.07]"
              >
                <p className="text-[17px] font-semibold text-white">Ask Arcana AI</p>
                <p className="mt-1 text-[13px] text-white/40">
                  Get a cited answer from real forum replies.
                </p>
              </button>
            )}
          </section>
        </div>

        {toast && (
          <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full border border-white/15 bg-[#120e26]/95 px-5 py-2 text-[13px] tracking-[1px] text-white/75">
            {toast}
          </div>
        )}
      </div>
    </div>
  )
}
