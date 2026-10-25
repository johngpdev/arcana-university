const PALETTE = [
  'border-[#f2cd6b]/45 bg-[#f2cd6b]/[0.12] text-[#f2cd6b]',
  'border-[#ab8dff]/45 bg-[#ab8dff]/[0.12] text-[#cbb4ff]',
  'border-[#5ee6b0]/40 bg-[#5ee6b0]/[0.10] text-[#a4f7d5]',
  'border-[#ff7eb3]/40 bg-[#ff7eb3]/[0.10] text-[#ffb6d2]',
  'border-[#7dd3fc]/40 bg-[#7dd3fc]/[0.10] text-[#bae6fd]',
  'border-[#fdba74]/40 bg-[#fdba74]/[0.10] text-[#fed7aa]',
]

export function classTone(code) {
  const text = code || ''
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) % 100000
  }
  return PALETTE[hash % PALETTE.length]
}

export default classTone
