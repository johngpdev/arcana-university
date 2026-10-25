import { Link } from 'react-router-dom'
import gear from '../assets/figma-gear.svg'

export default function FigmaSettingsButton() {
  return (
    <Link
      to="/settings"
      aria-label="Settings"
      className="fixed right-[92px] top-[24px] z-30 h-[42px] w-[42px] transition hover:opacity-75"
    >
      <img src={gear} alt="" className="h-full w-full brightness-0 invert opacity-85" />
    </Link>
  )
}
