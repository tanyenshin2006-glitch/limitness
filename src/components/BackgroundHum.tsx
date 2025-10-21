"use client"

import useSound from "use-sound"
import { useEffect } from "react"

type BackgroundHumProps = {
  volume?: number
}

export default function BackgroundHum({ volume = 0.2 }: BackgroundHumProps) {
  const [play, { stop }] = useSound("/audio/limitness_hum.wav", {
    volume,
    loop: true,
  })

  useEffect(() => {
    const t = setTimeout(play, 800) // start after 0.8s
    return () => {
      clearTimeout(t)
      stop()
    }
  }, [play, stop])

  return null
}