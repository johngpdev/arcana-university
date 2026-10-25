import { useEffect, useState } from 'react'
import { listConversations, subscribeConversations } from '../data/conversations'

export default function useConversations(userId, kind) {
  const [, setTick] = useState(0)

  useEffect(
    function () {
      return subscribeConversations(function () {
        setTick(function (t) {
          return t + 1
        })
      })
    },
    [],
  )

  return listConversations(userId, kind)
}
