import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import FigmaBackdrop from '../components/FigmaBackdrop'
import FigmaBackButton from '../components/FigmaBackButton'
import { useAuth } from '../context/AuthContext'
import { findThread } from '../data/figmaData'
import { timeAgo } from '../utils/time'
import { classTone } from '../utils/classColor'
import { chipBase } from '../components/styles'

const ROLE_PRIORITY = { professor: 3, grad: 2, student: 1 }
const SEED_STEP_MS = 37 * 60000

function roleLabel(role) {
  if (role === 'professor') return 'PROFESSOR'
  if (role === 'grad') return 'GRAD STUDENT'
  return ''
}

function initials(name) {
  const parts = (name || '?').split(' ').filter(Boolean)
  let out = ''
  for (let i = 0; i < parts.length; i++) out += parts[i].charAt(0)
  return out.slice(0, 2).toUpperCase()
}

function avatarTone(name) {
  const tones = [
    'border-[#f2cd6b]/50 bg-[#f2cd6b]/[0.14] text-[#f2cd6b]',
    'border-[#ab8dff]/50 bg-[#ab8dff]/[0.14] text-[#cbb4ff]',
    'border-[#5ee6b0]/40 bg-[#5ee6b0]/[0.12] text-[#a4f7d5]',
    'border-[#ff7eb3]/40 bg-[#ff7eb3]/[0.12] text-[#ffb6d2]',
  ]
  let sum = 0
  for (let i = 0; i < (name || '').length; i++) sum += name.charCodeAt(i)
  return tones[sum % tones.length]
}

function seedHearts(id) {
  let h = 7
  for (let i = 0; i < (id || '').length; i++) h = (h * 31 + id.charCodeAt(i)) % 9973
  return 12 + (h % 30)
}

function VoteRail({ count, voted, onVote }) {
  return (
    <div className="flex w-[46px] shrink-0 flex-col items-center gap-[2px] pt-2">
      <button
        type="button"
        onClick={onVote}
        aria-label={voted ? 'Remove your heart' : 'Heart this'}
        aria-pressed={voted}
        className={
          'flex h-[34px] w-[34px] items-center justify-center rounded-full text-[17px] transition ' +
          (voted
            ? 'bg-[#f2cd6b]/[0.22] ring-2 ring-[#f2cd6b]/60'
            : 'ring-1 ring-transparent hover:bg-white/[0.10]')
        }
      >
        <span aria-hidden="true">{voted ? '\u{1F49C}' : '\u{1F90D}'}</span>
      </button>
      <span
        className={
          'text-[14px] font-semibold tabular-nums ' + (voted ? 'text-[#f2cd6b]' : 'text-white/55')
        }
      >
        {count}
      </span>
    </div>
  )
}

export default function FigmaThread() {
  const { threadId } = useParams()
  const { user } = useAuth()
  const thread = findThread(threadId)

  const initialFlat = useMemo(
    function () {
      if (!thread) return []
      let lastRoot = null
      return thread.posts.map(function (p, i) {
        const parentId = p.depth > 0 && lastRoot ? lastRoot : null
        if (p.depth === 0) lastRoot = p.id
        return Object.assign({}, p, {
          parentId: parentId,
          createdAt: p.createdAt ? p.createdAt : Date.now() - (i + 1) * SEED_STEP_MS,
        })
      })
    },
    [thread],
  )

  const postBaseHearts = useMemo(
    function () {
      if (!thread) return 0
      return thread.createdAt ? 0 : seedHearts(thread.id)
    },
    [thread],
  )

  const [flat, setFlat] = useState(initialFlat)
  const [voted, setVoted] = useState({})
  const [collapsed, setCollapsed] = useState({})
  const [replyTo, setReplyTo] = useState(null)
  const [replyDraft, setReplyDraft] = useState('')
  const [topDraft, setTopDraft] = useState('')

  useEffect(
    function () {
      setFlat(initialFlat)
      setVoted({})
      setCollapsed({})
      setReplyTo(null)
      setReplyDraft('')
      setTopDraft('')
    },
    [threadId, initialFlat],
  )

  if (!thread) {
    return (
      <div className="relative min-h-screen w-full overflow-x-hidden">
        <FigmaBackdrop showStars />
        <FigmaBackButton to="/forum" />
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
          <p className="text-[32px] tracking-[4px] text-white">THREAD NOT FOUND</p>
          <Link
            to="/forum"
            className="rounded-[16px] border-2 border-[#f2cd6b]/35 bg-[#f2cd6b]/[0.04] px-8 py-[8px] text-[20px] tracking-[4px] text-[#f2cd6b]"
          >
            BACK TO FORUM
          </Link>
        </div>
      </div>
    )
  }

  function toggleVote(id) {
    setVoted(function (prev) {
      const next = Object.assign({}, prev)
      if (next[id]) delete next[id]
      else next[id] = true
      return next
    })
  }

  function countFor(c) {
    return (c.hearts || 0) + (voted[c.id] ? 1 : 0)
  }

  function addReply(parentId, body) {
    const text = (body || '').trim()
    if (!text) return
    const item = {
      id: 'c-' + Date.now().toString(36) + '-' + Math.floor(Math.random() * 999),
      author: user ? user.name : 'Scholar',
      authorId: user ? user.id : null,
      body: text,
      hearts: 0,
      role: 'student',
      parentId: parentId,
      createdAt: Date.now(),
    }
    setFlat(flat.concat([item]))
    setVoted(function (prev) {
      const next = Object.assign({}, prev)
      next[item.id] = true
      return next
    })
  }

  function handleTopSubmit(e) {
    e.preventDefault()
    addReply(null, topDraft)
    setTopDraft('')
  }

  function handleReplySubmit(e, parentId) {
    e.preventDefault()
    addReply(parentId, replyDraft)
    setReplyDraft('')
    setReplyTo(null)
  }

  const tree = useMemo(
    function () {
      const map = {}
      const nodes = flat.map(function (c, i) {
        return Object.assign({}, c, { children: [], sortIndex: i })
      })
      nodes.forEach(function (n) {
        map[n.id] = n
      })
      const roots = []
      nodes.forEach(function (n) {
        if (n.parentId && map[n.parentId]) map[n.parentId].children.push(n)
        else roots.push(n)
      })

      function score(n) {
        const p = ROLE_PRIORITY[n.role] || 1
        return p * 100000 + (n.hearts || 0) * 10 + (voted[n.id] ? 1 : 0)
      }

      function sortList(list) {
        list.sort(function (a, b) {
          return score(b) - score(a)
        })
        list.forEach(function (n) {
          sortList(n.children)
        })
      }

      sortList(roots)
      return roots
    },
    [flat, voted],
  )

  const totalComments = flat.length
  const totalHearts = flat.reduce(function (sum, c) {
    return sum + (c.hearts || 0) + (voted[c.id] ? 1 : 0)
  }, 0)

  function renderComment(node) {
    const isCollapsed = Boolean(collapsed[node.id])
    const kids = node.children
    const authorName = node.authorId && user && node.authorId === user.id ? user.name : node.author
    const isOp = node.authorId
      ? node.authorId === thread.authorId
      : node.author === thread.author
    return (
      <div key={node.id} className="flex gap-1">
        <VoteRail
          count={countFor(node)}
          voted={Boolean(voted[node.id])}
          onVote={function () {
            toggleVote(node.id)
          }}
        />

        <div className="min-w-0 flex-1 pb-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span
              className={
                'flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold ' +
                avatarTone(authorName)
              }
            >
              {initials(authorName)}
            </span>
            <span className="text-[15px] font-semibold text-white/90">{authorName}</span>
            {roleLabel(node.role) && (
              <span className="rounded-full border border-[#f2cd6b]/40 bg-[#f2cd6b]/[0.10] px-2 py-[1px] text-[10px] tracking-[2px] text-[#f2cd6b]">
                {roleLabel(node.role)}
              </span>
            )}
            {isOp && (
              <span className="rounded-full border border-[#ab8dff]/40 bg-[#ab8dff]/[0.12] px-2 py-[1px] text-[10px] tracking-[2px] text-[#cbb4ff]">
                OP
              </span>
            )}
            <span className="text-[13px] text-white/30">{timeAgo(node.createdAt)}</span>
          </div>

          <p className="mt-1 text-[16px] leading-relaxed text-white/85">{node.body}</p>

          <div className="mt-1 flex items-center gap-1 text-[13px] text-white/45">
            <button
              type="button"
              onClick={function () {
                setReplyTo(replyTo === node.id ? null : node.id)
                setReplyDraft('')
              }}
              className="rounded px-2 py-[3px] font-semibold tracking-[1px] transition hover:bg-white/[0.08] hover:text-white/80"
            >
              REPLY
            </button>
            {kids.length > 0 && (
              <button
                type="button"
                onClick={function () {
                  setCollapsed(function (prev) {
                    const next = Object.assign({}, prev)
                    next[node.id] = !next[node.id]
                    return next
                  })
                }}
                className="rounded px-2 py-[3px] font-semibold tracking-[1px] transition hover:bg-white/[0.08] hover:text-white/80"
              >
                {isCollapsed ? '+ ' + kids.length + ' REPLIES' : 'COLLAPSE'}
              </button>
            )}
          </div>

          {replyTo === node.id && (
            <form
              onSubmit={function (e) {
                handleReplySubmit(e, node.id)
              }}
              className="mt-2 rounded-[12px] border border-[#f2cd6b]/30 bg-[#120e26]/60 p-2"
            >
              <textarea
                value={replyDraft}
                onChange={function (e) {
                  setReplyDraft(e.target.value)
                }}
                placeholder={'Reply to ' + node.author + '...'}
                autoFocus
                className="h-[62px] w-full resize-none bg-transparent px-1 text-[15px] text-white placeholder:text-white/30 focus:outline-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={function () {
                    setReplyTo(null)
                    setReplyDraft('')
                  }}
                  className="rounded-full px-4 py-[5px] text-[13px] font-semibold tracking-[1px] text-white/50 transition hover:bg-white/[0.08]"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[#f2cd6b] px-4 py-[5px] text-[13px] font-bold tracking-[1px] text-[#120e26] transition hover:bg-[#f9e49f]"
                >
                  REPLY
                </button>
              </div>
            </form>
          )}

          {!isCollapsed && kids.length > 0 && (
            <div className="mt-2 border-l border-white/[0.12] pl-2 sm:pl-3">{kids.map(renderComment)}</div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <FigmaBackdrop showStars />
      <FigmaBackButton to="/forum" />

      <div className="relative z-10 mx-auto w-full max-w-[860px] px-4 pb-32 pt-[46px] sm:px-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className={chipBase + ' font-semibold ' + classTone(thread.classCode)}>
            {thread.classCode}
          </span>
          <span className="text-[12px] tracking-[1px] text-white/40">{thread.classTitle}</span>
        </div>

        <article className="flex gap-1 rounded-[14px] border border-white/[0.12] bg-white/[0.045] py-1">
          <VoteRail
            count={postBaseHearts + (voted.post ? 1 : 0)}
            voted={Boolean(voted.post)}
            onVote={function () {
              toggleVote('post')
            }}
          />
          <div className="min-w-0 flex-1 py-2 pr-4">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-white/40">
              <span className="font-semibold text-[#f2cd6b]">
                Posted by u/
                {thread.authorId && user && thread.authorId === user.id ? user.name : thread.author}
              </span>
              <span>ÃÂÃÂÃÂÃÂ·</span>
              <span>{timeAgo(thread.createdAt ? thread.createdAt : Date.now() - 2 * SEED_STEP_MS)}</span>
            </div>
            <h1 className="mt-2 text-[22px] font-semibold leading-snug text-white">{thread.question}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-[13px] text-white/45">
              <span>{totalComments} comments</span>
              <span className="text-white/15">/</span>
              <span>{totalHearts} hearts</span>
            </div>
          </div>
        </article>

        <form
          onSubmit={handleTopSubmit}
          className="mt-4 rounded-[14px] border border-white/[0.12] bg-white/[0.045] p-3"
        >
          <p className="mb-2 text-[12px] tracking-[2px] text-white/35">
            COMMENT AS {user ? user.name.toUpperCase() : 'SCHOLAR'}
          </p>
          <textarea
            value={topDraft}
            onChange={function (e) {
              setTopDraft(e.target.value)
            }}
            placeholder="What are your thoughts?"
            className="h-[74px] w-full resize-none bg-transparent px-1 text-[15px] text-white placeholder:text-white/30 focus:outline-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-[#f2cd6b] px-5 py-[6px] text-[13px] font-bold tracking-[1px] text-[#120e26] transition hover:bg-[#f9e49f]"
            >
              COMMENT
            </button>
          </div>
        </form>

        <div className="mt-4 border-t border-white/[0.10] pt-2">
          {tree.length === 0 && (
            <p className="py-10 text-center text-[15px] text-white/40">
              No comments yet. Be the first to help.
            </p>
          )}
          {tree.map(renderComment)}
        </div>
      </div>
    </div>
  )
}
