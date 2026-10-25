import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FigmaBackdrop from '../components/FigmaBackdrop'
import FigmaBackButton from '../components/FigmaBackButton'
import ClassPicker from '../components/ClassPicker'
import { useAuth } from '../context/AuthContext'
import useHelped from '../hooks/useHelped'
import { classesForCollege, findClass } from '../data/colleges'
import { PROFESSORS } from '../data/figmaData'
import { classTone } from '../utils/classColor'
import { inputBase, chipBase, btnPrimary } from '../components/styles'

export default function FigmaProfessors() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const helpedFor = useHelped()
  const classes = classesForCollege(user ? user.collegeId : 'osu')

  const [query, setQuery] = useState('')
  const [classCode, setClassCode] = useState(
    location.state && location.state.classCode ? location.state.classCode : '',
  )

  const selectedClass = classCode ? findClass(user ? user.collegeId : 'osu', classCode) : null

  const results = useMemo(
    function () {
      const q = query.trim().toLowerCase()
      let list = PROFESSORS.slice()

      if (selectedClass) {
        list = list.filter(function (p) {
          return p.classes.indexOf(selectedClass.code) !== -1 || p.dept === selectedClass.dept
        })
      }

      if (q) {
        list = list.filter(function (p) {
          const haystack = (p.name + ' ' + p.dept + ' ' + p.classes.join(' ')).toLowerCase()
          return haystack.indexOf(q) !== -1
        })
      }

      list.sort(function (a, b) {
        return b.helped + helpedFor(b.id) - (a.helped + helpedFor(a.id))
      })
      return list
    },
    [query, classCode, selectedClass, helpedFor],
  )

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <FigmaBackdrop showStars />
      <FigmaBackButton to="/home" />

      <div className="relative z-10 mx-auto w-full max-w-[900px] px-6 pb-24 pt-[60px]">
        <div className="text-center">
          <h1 className="text-[38px] tracking-[4px] text-white">FIND A PROFESSOR</h1>
          <p className="mt-2 text-[14px] tracking-[1px] text-white/40">
            Filter the faculty directory by class or department.
          </p>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <input
            value={query}
            onChange={function (e) {
              setQuery(e.target.value)
            }}
            placeholder="Search name or department..."
            className={inputBase}
          />
          <div className="sm:w-[330px] sm:shrink-0">
            <ClassPicker
              classes={classes}
              value={classCode}
              onChange={setClassCode}
              placeholder="Filter by class..."
              className={inputBase}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[12px] tracking-[2px] text-white/35">
          <span>
            {results.length} professor{results.length === 1 ? '' : 's'}
            {selectedClass ? ' for ' + selectedClass.code : ''}
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

        <div className="mt-4 flex flex-col gap-[12px]">
          {results.length === 0 && (
            <div className="rounded-[16px] border border-white/12 bg-white/[0.04] px-6 py-10 text-center">
              <p className="text-[17px] text-white/70">No professors match that filter.</p>
              <p className="mt-1 text-[13px] text-white/35">Try a different class or department.</p>
            </div>
          )}

          {results.map(function (p) {
            const total = p.helped + helpedFor(p.id)
            return (
              <div
                key={p.id}
                className="flex flex-col gap-3 rounded-[16px] border border-white/12 bg-white/[0.045] px-5 py-4 transition hover:border-[#f2cd6b]/35 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[18px] font-semibold text-white">
                      Professor {p.name}
                    </span>
                    <span
                      className={
                        chipBase +
                        ' ' +
                        (p.online
                          ? 'border-mint-400/40 bg-mint-400/[0.10] text-mint-300'
                          : 'border-white/15 bg-white/[0.04] text-white/40')
                      }
                    >
                      {p.online ? 'ONLINE' : 'OFFLINE'}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] text-white/45">{p.dept}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {p.classes.map(function (code) {
                      return (
                        <span key={code} className={chipBase + ' ' + classTone(code)}>
                          {code}
                        </span>
                      )
                    })}
                  </div>
                  <p className="mt-1 text-[12px] tracking-[1px] text-[#f2cd6b]/70">
                    Helped {total} students
                  </p>
                </div>

                <button
                  type="button"
                  onClick={function () {
                    navigate('/messages/professor/' + p.id)
                  }}
                  className={btnPrimary + ' shrink-0 self-start sm:self-center'}
                >
                  MESSAGE
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
