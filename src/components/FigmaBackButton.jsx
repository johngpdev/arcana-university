import { useNavigate } from 'react-router-dom'
import backIcon from '../assets/figma-back.svg'

function hasInAppHistory() {
  if (typeof window === 'undefined') return false
  const state = window.history.state
  return Boolean(state && typeof state.idx === 'number' && state.idx > 0)
}

export default function FigmaBackButton({ to, onClick }) {
  const navigate = useNavigate()

  function handleClick() {
    if (onClick) {
      onClick()
      return
    }
    if (hasInAppHistory()) {
      navigate(-1)
      return
    }
    navigate(to || '/')
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Go back"
      className="fixed right-[19px] top-[20px] z-30 h-[56px] w-[56px] rounded-full transition hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2cd6b]/50 sm:h-[60px] sm:w-[60px]"
    >
      <img src={backIcon} alt="" className="h-full w-full" />
    </button>
  )
}
