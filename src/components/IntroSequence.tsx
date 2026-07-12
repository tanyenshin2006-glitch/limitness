"use client"
import { useEffect, useState } from "react"

export default function IntroSequence({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const handleUnload = () => sessionStorage.removeItem("introSeen")
    window.addEventListener("beforeunload", handleUnload)
    return () => window.removeEventListener("beforeunload", handleUnload)
  }, [])

  useEffect(() => {
    if (sessionStorage.getItem("introSeen")) {
      setDone(true)
      return
    }
    const t = setTimeout(() => {
      setDone(true)
      sessionStorage.setItem("introSeen", "true")
    }, 3100)
    return () => clearTimeout(t)
  }, [])

  if (done) return <>{children}</>

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div
        className="absolute font-heading text-brand text-3xl sm:text-5xl tracking-widest font-semibold flex items-center opacity-0"
        style={{ animation: "intro-title 1.6s ease-in-out 0.3s forwards" }}
      >
        LIMITNESS
      </div>
      <div
        className="absolute font-body text-foreground text-lg sm:text-2xl tracking-[0.2rem] opacity-0"
        style={{ animation: "intro-sub 1.2s ease-in-out 1.9s forwards" }}
      >
        See yourself.
      </div>
    </div>
  )
}