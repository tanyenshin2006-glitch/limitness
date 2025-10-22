"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect, useRef, useState } from "react"

type GlitchProps = {
  children: React.ReactNode
  className?: string
  rgbOpacity?: number
  burstMs?: number
  idleMin?: number
  idleMax?: number
  majorChance?: number
  bootDelayMs?: number
}

export function GlitchTextHardIdle({
  children,
  className = "text-7xl md:text-8xl font-extrabold tracking-tight font-heading text-brand",
  rgbOpacity = 0.5,
  burstMs = 220,
  idleMin = 5000,
  idleMax = 12000,
  majorChance = 0.1,
  bootDelayMs = 700,
}: GlitchProps) {
  const base = useAnimation()
  const red = useAnimation()
  const cyan = useAnimation()

  const timer = useRef<number | null>(null)
  const bootTimer = useRef<number | null>(null)

  // optional: if you still want a “mounted” flag, keep it but DO NOT early-return with it
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // main animation effect (always called)
  useEffect(() => {
    // respect reduced motion
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches

    if (prefersReduced) return

    // you can also wait until mounted, but do not early-return the component
    if (!mounted) return

    const d = burstMs / 1000

    const startIdle = () => {
      const burst = async () => {
        const isMajor = Math.random() < majorChance
        const dur = isMajor ? d * 1.5 : d

        await Promise.all([
          base.start({
            opacity: isMajor ? [1, 0.4, 1] : [1, 0.85, 1],
            skewX: isMajor ? [0, 10, -10, 0] : [0, 4, -3, 0],
            transition: { duration: dur, ease: isMajor ? "easeInOut" : "linear" },
          }),
          red.start({
            x: isMajor ? [0, -8, 8, -8, 0] : [0, -3, 3, 0],
            opacity: [0, isMajor ? 0.8 : rgbOpacity, 0],
            transition: { duration: dur, ease: "linear" },
          }),
          cyan.start({
            x: isMajor ? [0, 8, -8, 8, 0] : [0, 3, -3, 0],
            opacity: [0, isMajor ? 0.8 : rgbOpacity, 0],
            transition: { duration: dur, ease: "linear" },
          }),
        ])

        const next = idleMin + Math.random() * (idleMax - idleMin)
        timer.current = window.setTimeout(burst, next)
      }

      // first idle burst after a breath
      timer.current = window.setTimeout(burst, 2500)
    }

    const boot = async () => {
      await Promise.all([
        base.start({
          opacity: [0, 1],
          skewX: [0, 14, -10, 0],
          y: [0, -0.6, 0.4, 0],
          scale: [1, 1.03, 1],
          transition: { duration: 0.45, ease: "easeOut" },
        }),
        red.start({
          x: [0, -12, 12, 0],
          opacity: [0, 0.9, 0],
          scale: [1, 1.03, 1],
          y: [0, -0.6, 0.4, 0],
          transition: { duration: d * 1.6, ease: "linear" },
        }),
        cyan.start({
          x: [0, 12, -12, 0],
          opacity: [0, 0.9, 0],
          scale: [1, 1.03, 1],
          y: [0, -0.6, 0.4, 0],
          transition: { duration: d * 1.6, ease: "linear" },
        }),
      ])
      startIdle()
    }

    bootTimer.current = window.setTimeout(boot, bootDelayMs)

  const onVis = () => {
    if (document.hidden) {
      base.stop(); red.stop(); cyan.stop()
      if (timer.current) window.clearTimeout(timer.current)
    } else {
      // Restart the boot and idle glitch when page becomes visible again
      bootTimer.current = window.setTimeout(boot, 0)
    }
  }
  document.addEventListener("visibilitychange", onVis)

    return () => {
      if (timer.current) window.clearTimeout(timer.current)
      if (bootTimer.current) window.clearTimeout(bootTimer.current)
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [
    mounted,
    base, red, cyan,
    burstMs, idleMin, idleMax, rgbOpacity, majorChance, bootDelayMs,
  ])

  // Always render (no conditional return); start state is invisible via Framer `initial`
  return (
    <span className="relative inline-block select-none">
      <motion.span
        initial={{ opacity: 0, scale: 1 }}
        animate={base}
        className={className + " will-change-transform will-change-opacity"}
        style={{ color: "var(--color-brand)" }}
      >
        {children}
      </motion.span>

      <motion.span
        initial={{ opacity: 0, scale: 1 }}
        animate={red}
        className={className +" absolute inset-0 pointer-events-none mix-blend-screen will-change-transform will-change-opacity"}
        style={{ color: "rgb(239,68,68)" }}
        aria-hidden
      >
        {children}
      </motion.span>

      <motion.span
        initial={{ opacity: 0, scale: 1  }}
        animate={cyan}
        className={className + " absolute inset-0 pointer-events-none mix-blend-screen will-change-transform will-change-opacity"}
        style={{ color: "rgb(34,211,238)" }}
        aria-hidden
      >
        {children}
      </motion.span>
    </span>
  )
}
