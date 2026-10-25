import { useNavigate } from 'react-router-dom'
import FigmaBackdrop from '../components/FigmaBackdrop'
import { useAuth } from '../context/AuthContext'
import crest from '../assets/figma-crest.png'

const primary =
  'flex items-center justify-center rounded-[16px] border-2 border-[#f2cd6b]/50 bg-[#f2cd6b]/[0.12] px-8 py-[10px] text-[22px] tracking-[3px] text-[#f2cd6b] transition hover:bg-[#f2cd6b]/[0.22] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2cd6b]/60'

const ghost =
  'flex items-center justify-center rounded-[16px] border-2 border-white/20 bg-white/[0.04] px-8 py-[10px] text-[22px] tracking-[3px] text-white/65 transition hover:bg-white/[0.10] hover:text-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30'

export default function FigmaIntro() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  function handleSignOut() {
    signOut()
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <FigmaBackdrop showStars />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16">
        <img
          src={crest}
          alt="Arcana University"
          className="h-[340px] w-[340px] object-contain sm:h-[440px] sm:w-[440px] lg:h-[520px] lg:w-[520px]"
        />

        <p className="mt-2 text-center text-[28px] tracking-[1px] text-white sm:text-[36px] lg:text-[40px]">
          Experience the magic.
        </p>

        <p className="mt-3 max-w-[460px] text-center text-[13px] leading-relaxed tracking-[2px] text-white/35">
          {user
            ? 'Signed in as ' + user.name
            : 'Ask a question, get a cited answer, and reach the professor who can help.'}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {user ? (
            <>
              <button
                type="button"
                onClick={function () {
                  navigate('/home')
                }}
                className={primary}
              >
                ENTER
              </button>
              <button type="button" onClick={handleSignOut} className={ghost}>
                LOG OUT
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={function () {
                  navigate('/auth', { state: { tab: 'signup' } })
                }}
                className={primary}
              >
                CREATE ACCOUNT
              </button>
              <button
                type="button"
                onClick={function () {
                  navigate('/auth', { state: { tab: 'signin' } })
                }}
                className={ghost}
              >
                SIGN IN
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
