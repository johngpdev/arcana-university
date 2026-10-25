import { useEffect, useRef, useState } from 'react'

export function useTypewriter(text, { speed = 16, startDelay = 350 } = {}) {
  const [output, setOutput] = useState('')

  useEffect(() => {
    if (!text) {
      setOutput('')
      return
    }

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      setOutput(text)
      return
    }

    setOutput('')
    let index = 0
    let interval
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        index += 1
        setOutput(text.slice(0, index))
        if (index >= text.length) clearInterval(interval)
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [text, speed, startDelay])

  return output
}

export function useAutoScroll(dependency) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    node.scrollTo({ top: node.scrollHeight, behavior: 'smooth' })
  }, [dependency])

  return ref
}

export function useNow(intervalMs = 30000) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return now
}
