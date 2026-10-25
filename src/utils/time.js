export function timeAgo(timestamp) {
  if (!timestamp) return 'just now'
  const diff = Date.now() - timestamp
  if (diff < 45000) return 'just now'
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return mins + 'm ago'
  const hours = Math.floor(mins / 60)
  if (hours < 24) return hours + 'h ago'
  const days = Math.floor(hours / 24)
  if (days < 30) return days + 'd ago'
  return new Date(timestamp).toLocaleDateString()
}

export function minutesAgo(minutes) {
  return Date.now() - minutes * 60000
}

export function fakeTimestamp(index, stepMinutes) {
  const step = stepMinutes || 37
  return Date.now() - (index + 1) * step * 60000
}
