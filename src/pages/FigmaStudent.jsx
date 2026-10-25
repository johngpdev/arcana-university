import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FigmaBackdrop from '../components/FigmaBackdrop'
import FigmaBackButton from '../components/FigmaBackButton'
import ClassPicker from '../components/ClassPicker'
import { useAuth } from '../context/AuthContext'
import { classesForCollege } from '../data/colleges'
import { analyze } from '../data/arcanaEngine'
import { classTone } from '../utils/classColor'
import { chipBase } from '../components/styles'
import { useAutoScroll, useTypewriter } from '../hooks/useTypewriter'

const SUGGESTIONS = [
  'integral of 1/x',
  'related rates ladder problem',
  'photosynthesis light reactions',
  'recursion stack overflow',
]

const GREETING = {
  id: 'greeting',
  from: 'ai',
  kind: 'text',
  text:
    'I am Arcana AI. Ask me about a class and I will answer from real student and professor replies, then point you to the people who can help.',
}

function loadChat(key) {
  try {
    const raw = localStorage.getItem(key)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed && Array.isArray(parsed.messages) && parsed.messages.length > 0) {
        return {
          messages: parsed.messages,
          classCode: parsed.classCode || '',
        }
      }
    }
  } catch (err) {
    return { messages: [GREETING], classCode: '' }
  }
  return { messages: [GREETING], classCode: '' }
}

function TypedText({ text, speed }) {
  const shown = useTypewriter(text, { speed: speed || 12, startDelay: 120 })
  return <>{shown}</>
}

function confidenceLabel(value) {
  if (value >= 0.85) return 'high confidence'
  if (value >= 0.6) return 'good match'
  if (value >= 0.45) return 'likely match'
  return 'low confidence'
}

export default function FigmaStudent() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const collegeId = user ? user.collegeId : 'osu'
  const classes = classesForCollege(collegeId)
  const chatKey = user ? 'arcana.chat.' + user.id : 'arcana.chat.guest'

  const [messages, setMessages] = useState(function () {
    return loadChat(chatKey).messages
  })
  const [input, setInput] = useState(location.state && location.state.question ? location.state.question : '')
  const [classCode, setClassCode] = useState(function () {
    return loadChat(chatKey).classCode
  })
  const [thinking, setThinking] = useState(false)
  const lastPrompt = useRef('')
  const scrollRef = useAutoScroll(messages.length + (thinking ? 1 : 0))

  useEffect(
    function () {
      try {
        localStorage.setItem(chatKey, JSON.stringify({ messages: messages, classCode: classCode }))
      } catch (err) {
        return
      }
    },
    [chatKey, messages, classCode],
  )

  function resetChat() {
    setMessages([GREETING])
    setClassCode('')
    setInput('')
    try {
      localStorage.removeItem(chatKey)
    } catch (err) {
      return
    }
  }

  function ask(text, codeOverride) {
    const prompt = (text || '').trim()
    if (!prompt || thinking) return
    const code = codeOverride !== undefined ? codeOverride : classCode
    lastPrompt.current = prompt

    setMessages(function (prev) {
      return prev.concat([{ id: 'u-' + Date.now(), from: 'me', kind: 'text', text: prompt }])
    })
    setInput('')
    setThinking(true)

    setTimeout(function () {
      const result = analyze({ prompt: prompt, classCode: code, collegeId: collegeId })
      setMessages(function (prev) {
        return prev.concat([
          { id: 'a-' + Date.now(), from: 'ai', kind: 'result', result: result },
        ])
      })
      setThinking(false)
    }, 380)
  }

  function handleSubmit(e) {
    e.preventDefault()
    ask(input)
  }

  function pickOption(option) {
    setClassCode(option.code)
    ask(lastPrompt.current, option.code)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <FigmaBackdrop showStars />
      <FigmaBackButton to="/home" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[880px] flex-col px-4 pt-[38px] sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-[#f2cd6b]/50 bg-[#f2cd6b]/[0.12] text-[14px] text-[#f2cd6b]">
              A
            </span>
            <span className="text-[19px] font-semibold tracking-[1px] text-white">Arcana AI</span>
          </div>
          <div className="flex items-center gap-3">
            <p className="hidden text-[12px] tracking-[1px] text-white/30 md:block">
              answers cite real people
            </p>
            <button
              type="button"
              onClick={resetChat}
              className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-[5px] text-[11px] tracking-[2px] text-white/50 transition hover:bg-white/[0.10] hover:text-white/80"
            >
              NEW CHAT
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="mt-4 flex-1 space-y-4 overflow-y-auto pb-4 pr-1 scrollbar-thin">
          {messages.map(function (m) {
            if (m.from === 'me') {
              return (
                <div key={m.id} className="flex justify-end">
                  <div className="max-w-[520px] rounded-[16px] border border-[#f2cd6b]/30 bg-[#f2cd6b]/[0.12] px-4 py-[10px] text-[15px] leading-relaxed text-white">
                    {m.text}
                  </div>
                </div>
              )
            }

            if (m.kind === 'text') {
              return (
                <div key={m.id} className="flex justify-start">
                  <div className="max-w-[600px] rounded-[16px] border border-white/12 bg-white/[0.05] px-4 py-[10px] text-[15px] leading-relaxed text-white/85">
                    <TypedText text={m.text} speed={10} />
                  </div>
                </div>
              )
            }

            const r = m.result
            const pct = Math.round(r.confidence * 100)

            return (
              <div key={m.id} className="flex justify-start">
                <div className="w-full max-w-[700px] rounded-[16px] border border-white/12 bg-white/[0.05] p-4">
                  <div className="flex flex-wrap items-center gap-[6px]">
                    {!r.noSignal && (
                      <>
                        <span className={chipBase + ' font-semibold ' + classTone(r.cls.code)}>
                          {r.cls.code}
                        </span>
                        <span className="text-[11px] tracking-[1px] text-white/40">
                          {r.cls.title} - {pct}% {confidenceLabel(r.confidence)}
                        </span>
                      </>
                    )}
                  </div>

                  <p className="mt-2 text-[15px] leading-relaxed text-white/85">
                    <TypedText
                      text={
                        r.noSignal
                          ? 'I could not match that to a class or topic yet. Name the class or the concept and I will try again.'
                          : r.needsClarification
                            ? 'I am not sure which class this is for. Pick the closest match and I will narrow it down.'
                            : r.answer
                              ? 'Here is what I found in the ' + r.cls.code + ' threads.'
                              : 'No one has answered this yet for ' + r.cls.code + '. These people and threads are the closest match.'
                      }
                      speed={8}
                    />
                  </p>

                  {r.noSignal && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {SUGGESTIONS.map(function (s) {
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={function () {
                              ask(s)
                            }}
                            className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-[5px] text-[12px] text-white/50 transition hover:border-[#f2cd6b]/30 hover:text-white/80"
                          >
                            {s}
                          </button>
                        )
                      })}
                    </div>
                  )}

                  {r.needsClarification && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {r.options.map(function (o) {
                        return (
                          <button
                            key={o.code}
                            type="button"
                            onClick={function () {
                              pickOption(o)
                            }}
                            className="rounded-full border border-[#f2cd6b]/40 bg-[#f2cd6b]/[0.08] px-3 py-[5px] text-[12px] tracking-[1px] text-[#f2cd6b] transition hover:bg-[#f2cd6b]/[0.18]"
                          >
                            {o.code} - {o.title}
                          </button>
                        )
                      })}
                    </div>
                  )}

                  {!r.needsClarification && r.answer && !r.noSignal && (
                    <div className="mt-3 rounded-[12px] border-l-2 border-[#f2cd6b]/60 bg-[#f2cd6b]/[0.06] px-4 py-3">
                      <p className="text-[15px] leading-relaxed text-white/90">
                        <TypedText text={r.answer.text} speed={6} />
                      </p>
                      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                        {r.answer.citations.map(function (c, i) {
                          return (
                            <Link
                              key={i}
                              to={'/thread/' + c.threadId}
                              className="text-[11px] tracking-[1px] text-[#f2cd6b]/75 underline-offset-2 hover:underline"
                            >
                              {c.author}
                              {c.role === 'professor' ? ' (professor)' : ''} - {c.hearts} hearts
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {r.professors.length > 0 && !r.needsClarification && !r.noSignal && (
                    <div className="mt-3">
                      <p className="text-[11px] tracking-[2px] text-white/35">WHO CAN HELP</p>
                      <div className="mt-2 flex flex-col gap-2">
                        {r.professors.slice(0, 2).map(function (p) {
                          return (
                            <div
                              key={p.id}
                              className="flex flex-wrap items-center justify-between gap-2 rounded-[12px] border border-white/10 bg-white/[0.03] px-3 py-2"
                            >
                              <div className="min-w-0">
                                <p className="text-[14px] font-semibold text-white">Professor {p.name}</p>
                                <p className="text-[11px] text-white/40">{p.reasons.join(' - ')}</p>
                              </div>
                              <Link
                                to={'/messages/professor/' + p.id}
                                className="shrink-0 rounded-full border border-[#f2cd6b]/40 bg-[#f2cd6b]/[0.08] px-3 py-[4px] text-[11px] font-bold tracking-[1px] text-[#f2cd6b] transition hover:bg-[#f2cd6b]/[0.18]"
                              >
                                MESSAGE
                              </Link>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {r.threads.length > 0 && !r.needsClarification && !r.noSignal && (
                    <div className="mt-3">
                      <p className="text-[11px] tracking-[2px] text-white/35">RELATED THREADS</p>
                      <div className="mt-2 flex flex-col gap-2">
                        {r.threads.slice(0, 3).map(function (t) {
                          return (
                            <Link
                              key={t.id}
                              to={'/thread/' + t.id}
                              className="rounded-[12px] border border-white/10 bg-white/[0.03] px-3 py-2 transition hover:border-[#f2cd6b]/30 hover:bg-[#f2cd6b]/[0.06]"
                            >
                              <p className="text-[13px] leading-snug text-white/85">{t.question}</p>
                              <p className="mt-1 text-[11px] tracking-[1px] text-white/35">
                                {t.classCode} - {t.posts.length} replies -{' '}
                                {Math.round(t.relevance * 100)}% relevant
                              </p>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {!r.needsClarification && !r.noSignal && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={function () {
                          navigate('/professors', { state: { classCode: r.cls.code } })
                        }}
                        className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-[5px] text-[11px] tracking-[1px] text-white/60 transition hover:bg-white/[0.10]"
                      >
                        Find a {r.cls.code} tutor
                      </button>
                      <button
                        type="button"
                        onClick={function () {
                          navigate('/forum', { state: { classCode: r.cls.code } })
                        }}
                        className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-[5px] text-[11px] tracking-[1px] text-white/60 transition hover:bg-white/[0.10]"
                      >
                        Browse {r.cls.code} threads
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}

          {thinking && (
            <div className="flex justify-start">
              <div className="rounded-[16px] border border-white/12 bg-white/[0.05] px-4 py-[10px]">
                <span className="text-[13px] tracking-[2px] text-white/40">Arcana is thinking</span>
              </div>
            </div>
          )}
        </div>

        {messages.length === 1 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {SUGGESTIONS.map(function (s) {
              return (
                <button
                  key={s}
                  type="button"
                  onClick={function () {
                    ask(s)
                  }}
                  className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-[5px] text-[12px] text-white/50 transition hover:border-[#f2cd6b]/30 hover:text-white/80"
                >
                  {s}
                </button>
              )
            })}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="hidden w-[210px] shrink-0 sm:block">
              <ClassPicker
                classes={classes}
                value={classCode}
                onChange={setClassCode}
                placeholder="Class (optional)"
                className="h-[46px] w-full rounded-[14px] border border-white/12 bg-white/[0.05] px-3 text-[13px] text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#f2cd6b]/40"
              />
            </div>
            <input
              value={input}
              onChange={function (e) {
                setInput(e.target.value)
              }}
              placeholder="Ask about a concept, a class, or who to talk to..."
              className="h-[46px] flex-1 rounded-full border border-white/15 bg-white/[0.06] px-4 text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#f2cd6b]/50"
            />
            <button
              type="submit"
              disabled={thinking}
              className="h-[46px] rounded-full bg-[#f2cd6b] px-5 text-[13px] font-bold tracking-[2px] text-[#120e26] transition hover:bg-[#f9e49f] disabled:opacity-50"
            >
              ASK
            </button>
          </div>
          <p className="text-center text-[11px] tracking-[1px] text-white/25">
            Arcana quotes real forum replies and names its sources. It never invents an answer.
          </p>
        </form>
      </div>
    </div>
  )
}
