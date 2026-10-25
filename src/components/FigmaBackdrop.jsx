import swirl from '../assets/figma-swirl.png'
import stars from '../assets/figma-stars.svg'

export default function FigmaBackdrop({ showStars = false, dim = false }) {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-20 bg-gradient-to-b from-[#120e26] to-[#20184b]" />
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        style={{ opacity: dim ? 0.1 : 0.3 }}
      >
        <img
          src={swirl}
          alt=""
          className="absolute left-1/2 top-1/2 h-full w-full max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
        />
      </div>
      {showStars && (
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <img
            src={stars}
            alt=""
            className="absolute left-[51px] top-[38px] h-[546px] w-[1337px] max-w-none"
          />
        </div>
      )}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 -z-10 h-[458px] bg-gradient-to-b from-transparent to-black/85" />
    </>
  )
}
