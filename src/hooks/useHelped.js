import { useEffect, useState } from 'react'
import { helpedFor, subscribeHelped } from '../data/reputation'

export default function useHelped() {
  const [, setTick] = useState(0)

  useEffect(function () {
    return subscribeHelped(function () {
      setTick(function (t) {
        return t + 1
      })
    })
  }, [])

  return helpedFor
}
