import { Link, useLocation } from 'react-router-dom'
import FigmaBackdrop from '../components/FigmaBackdrop'
import FigmaBackButton from '../components/FigmaBackButton'
import { useAuth } from '../context/AuthContext'
import useHelped from '../hooks/useHelped'
import {
  THREADS,
  detectClass,
  professorsForClass,
  threadsForClass,
} from '../data/figmaData'

export default function FigmaResults() {
  const location = useLocation()
  const { user } = useAuth()
  const helpedFor = useHelped()
  const prompt = location.state && location.state.prompt ? location.state.prompt : ''
  const classCode = location.state && location.state.classCode ? location.state.classCode : ''

  const cls = detectClass(prompt, classCode, user.collegeId)
  const professors = professorsForClass(cls, user.collegeId).slice(0, 3)
  const threads = threadsForClass(cls)
  const feature = threads.length > 0 ? threads[0] : THREADS[0]

  const sortedPosts = feature.posts.slice().sort(function (a, b) {
    return b.hearts - a.hearts
  })
  const topReply = sortedPosts[0] || {
    author: 'Anonymous',
    body: 'No replies yet. Be the first to help.',
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <FigmaBackdrop showStars />
      <FigmaBackButton to="/student" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1180px] flex-col gap-16 px-6 pb-32 pt-[110px] lg:flex-row lg:justify-center lg:gap-[24px]">
        <section className="flex w-full flex-col items-center gap-[36px] lg:w-[438px]">
          <div className="flex w-full items-center justify-center rounded-[16px] border-2 border-white/35 bg-white/[0.04] px-2 py-[10px]">
            <span className="text-center text-[24px] tracking-[3px] text-white">AVAILABLE PROFESSORS</span>
          </div>

          <div className="text-center">
            <p className="text-[22px] tracking-[3px] text-[#f2cd6b]">{cls.code}</p>
            <p className="text-[16px] tracking-[2px] text-white/60">{cls.title}</p>
          </div>

          <div className="flex w-full flex-col items-center gap-[22px]">
            {professors.length === 0 && (
              <p className="text-center text-[18px] tracking-[2px] text-white/60">
                No professors listed for {cls.code} yet.
              </p>
            )}
            {professors.map(function (p) {
              return (
                <Link
                  key={p.id}
                  to={'/messages/professor/' + p.id}
                  className="w-full rounded-[16px] border-2 border-[#f2cd6b]/35 bg-[#f2cd6b]/[0.04] px-4 py-[10px] text-center transition hover:bg-[#f2cd6b]/[0.12]"
                >
                  <p className="text-[24px] tracking-[4px] text-[#f2cd6b]">
                    PROFESSOR <span className="text-white">{p.name.toUpperCase()}</span>
                  </p>
                  <p className="text-[16px] tracking-[2px] text-white/80">
                    Helped {p.helped + helpedFor(p.id)} students
                  </p>
                </Link>
              )
            })}
          </div>

          <Link
            to="/forum"
            state={{ classCode: cls.code }}
            className="rounded-[16px] border-2 border-white/35 bg-white/[0.04] px-6 py-[8px] text-[18px] tracking-[3px] text-white/80 transition hover:bg-white/10"
          >
            BROWSE ALL FORUMS
          </Link>
        </section>

        <section className="flex w-full flex-col items-center gap-[26px] lg:w-[528px]">
          <div className="flex items-center justify-center rounded-[16px] border-2 border-white/35 bg-white/[0.04] px-6 py-[10px]">
            <span className="text-[24px] tracking-[3px] text-white">FORUMS</span>
          </div>

          <Link
            to={'/thread/' + feature.id}
            className="w-full rounded-[16px] border-2 border-[#f2cd6b]/35 bg-[#f2cd6b]/[0.04] px-6 py-[10px] transition hover:bg-[#f2cd6b]/[0.10]"
          >
            <p className="text-center text-[22px] leading-relaxed tracking-[2px] text-white">
              <span className="text-[#f2cd6b]">{feature.classCode}: </span>
              {feature.question}
            </p>
          </Link>

          <Link
            to={'/thread/' + feature.id}
            className="w-full rounded-[16px] border-2 border-[#f2cd6b]/35 bg-[#f2cd6b]/[0.04] px-6 py-[14px] transition hover:bg-[#f2cd6b]/[0.10]"
          >
            <p className="text-center text-[20px] leading-relaxed tracking-[2px] text-white">
              <span className="text-[#f2cd6b]">{topReply.author}: </span>
              {topReply.body.length > 140 ? topReply.body.slice(0, 140) + '...' : topReply.body}
            </p>
          </Link>

          <div className="flex w-full flex-wrap justify-center gap-3">
            {threads.slice(1, 5).map(function (t) {
              return (
                <Link
                  key={t.id}
                  to={'/thread/' + t.id}
                  className="max-w-full rounded-[16px] border-2 border-[#f2cd6b]/35 bg-[#f2cd6b]/[0.04] px-5 py-[8px] text-[15px] tracking-[2px] text-white/80 transition hover:bg-[#f2cd6b]/[0.10]"
                >
                  <span className="text-[#f2cd6b]">{t.classCode}: </span>
                  {t.question.length > 60 ? t.question.slice(0, 60) + '...' : t.question}
                </Link>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
