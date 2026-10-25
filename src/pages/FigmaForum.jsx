import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FigmaBackdrop from '../components/FigmaBackdrop'
import FigmaBackButton from '../components/FigmaBackButton'
import ClassPicker from '../components/ClassPicker'
import { useAuth } from '../context/AuthContext'
import { classesForCollege, findClass, classLabel } from '../data/colleges'
import { getAllThreads, addThread, searchThreads } from '../data/figmaData'
import { timeAgo } from '../utils/time'
import { classTone } from '../utils/classColor'
import { inputBase, chipBase, btnPrimary } from '../components/styles'

function seedAge(id) {
  let h = 11
  for (let i = 0; i < (id || '').length; i++) h = (h * 131 + id.charCodeAt(i)) % 7919
  const minutes = 20 + (h % 1400)
  return timeAgo(Date.now() - minutes * 60000)
}

export default function FigmaForum() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const collegeId = user ? user.collegeId : 'osu'
  const classes = classesForCollege(collegeId)

  const [query, setQuery] = useState(location.state && location.state.search ? location.state.search : '')
  const [classCode, setClassCode] = useState(location.state && location.state.classCode ? location.state.classCode : '')
  const [threads, setThreads] = useState(getAllThreads())
  const [draft, setDraft] = useState('')
  const [draftClass, setDraftClass] = useState(
    location.state && location.state.classCode ? location.state.classCode : '',
  )
  const [postError, setPostError] = useState('')

  const filtered = useMemo(
    function () {
      let list = threads
      if (classCode) {
        list = list.filter(function (t) {
          return t.classCode === classCode
        })
      }
      return searchThreads(list, query)
    },
    [threads, classCode, query],
  )

  function handlePost(e) {
    e.preventDefault()
    if (!draft.trim()) {
      setPostError('Write your question first.')
      return
    }
    if (!draftClass) {
      setPostError('Pick the class this question belongs to.')
      return
    }
    const cls = findClass(collegeId, draftClass)
    const thread = {
      id: 't-' + Date.now(),
      classCode: draftClass,
      classTitle: cls ? cls.title : draftClass,
      author: user ? user.name : 'Scholar',
      authorId: user ? user.id : null,
      question: draft.trim(),
      createdAt: Date.now(),
      posts: [],
    }
    addThread(thread)
    setThreads([thread].concat(threads))
    setDraft('')
    setPostError('')
    setClassCode(draftClass)
    setQuery('')
  }

  const activeLabel = classCode ? classLabel(findClass(collegeId, classCode)) : 'All classes'

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <FigmaBackdrop showStars />
      <FigmaBackButton to="/home" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1100px] flex-col px-6 pb-24 pt-[60px]">
        <div className="mb-[30px] text-center">
          <h1 className="text-[38px] tracking-[4px] text-white">FORUMS</h1>
          <p className="mt-2 text-[14px] tracking-[1px] text-white/40">
            Ask by class, answer anonymously, and cite the people who helped.
          </p>
        </div>

        <form
          onSubmit={handlePost}
          className="mb-[18px] rounded-[16px] border border-white/12 bg-white/[0.045] p-4"
        >
          <p className="mb-2 text-[12px] font-semibold tracking-[3px] text-[#f2cd6b]">
            POST A QUESTION
          </p>
          <textarea
            value={draft}
            onChange={function (e) {
              setDraft(e.target.value)
            }}
            placeholder="What do you need help with?"
            className="h-[76px] w-full resize-none bg-transparent text-[17px] text-white placeholder:text-white/30 focus:outline-none"
          />
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="w-full sm:w-[320px]">
              <ClassPicker
                classes={classes}
                value={draftClass}
                onChange={function (code) {
                  setDraftClass(code)
                  setPostError('')
                }}
                placeholder="Pick the class..."
                className={inputBase}
              />
            </div>
            <button type="submit" className={btnPrimary}>
              POST
            </button>
          </div>
          {postError && <p className="mt-2 text-[13px] text-rose-300">{postError}</p>}
        </form>

        <div className="mb-[26px] rounded-[16px] border border-white/10 bg-white/[0.03] p-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={query}
              onChange={function (e) {
                setQuery(e.target.value)
              }}
              placeholder="Search questions, answers, classes..."
              className={inputBase}
            />
            <div className="sm:w-[320px] sm:shrink-0">
              <ClassPicker
                classes={classes}
                value={classCode}
                onChange={setClassCode}
                placeholder="Filter by class..."
                className={inputBase}
              />
            </div>
          </div>
        </div>

        <div className="mb-[22px] flex flex-wrap items-center justify-between gap-2 text-[12px] tracking-[2px] text-white/40">
          <span>
            {filtered.length} question{filtered.length === 1 ? '' : 's'} - {activeLabel}
          </span>
          {(query || classCode) && (
            <button
              type="button"
              onClick={function () {
                setQuery('')
                setClassCode('')
              }}
              className="text-[#f2cd6b]/80 underline-offset-4 hover:underline"
            >
              CLEAR FILTERS
            </button>
          )}
        </div>

        <div className="flex flex-col gap-[18px]">
          {filtered.length === 0 && (
            <div className="rounded-[16px] border border-white/12 bg-white/[0.045] px-6 py-8 text-center">
              <p className="text-[20px] tracking-[1px] text-white/80">
                {query ? 'No questions match "' + query + '".' : 'No questions here yet.'}
              </p>
              <p className="mt-2 text-[14px] tracking-[1px] text-white/40">
                Post it below so classmates and professors can answer.
              </p>
            </div>
          )}

          {filtered.map(function (t) {
            return (
              <button
                key={t.id}
                type="button"
                onClick={function () {
                  navigate('/thread/' + t.id)
                }}
                className="w-full rounded-[16px] border border-white/12 bg-white/[0.045] px-8 py-4 text-left transition hover:border-[#f2cd6b]/35 hover:bg-[#f2cd6b]/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2cd6b]/40"
              >
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className={chipBase + ' ' + classTone(t.classCode)}>{t.classCode}</span>
                </div>

                <p className="mt-2 text-center text-[20px] leading-relaxed tracking-[1px] text-white">
                  {t.question}
                </p>

                <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12px] tracking-[1px] text-white/40">
                  <span className="text-white/60">{t.classTitle}</span>
                  <span className="text-white/15">/</span>
                  <span>{t.createdAt ? timeAgo(t.createdAt) : seedAge(t.id)}</span>
                  <span className="text-white/15">/</span>
                  <span>{t.posts.length} replies</span>
                  <span className="text-white/15">/</span>
                  <span className="text-[#f2cd6b]/70">
                    {t.posts.reduce(function (sum, p) {
                      return sum + (p.hearts || 0)
                    }, 0)}{' '}
                    hearts
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
