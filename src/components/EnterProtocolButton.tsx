"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button as UIButton } from "@/components/ui/button"

// Optional: wrap shadcn Button with framer
const MotionButton = motion.create(UIButton as any)

type Props = {
  href?: string
  fadeDelay?: number   // when to reveal the button (s)
  fadeDuration?: number
  breatheDuration?: number
  breatheScale?: number
  label?: string
}

export function EnterProtocolButton({
  href = "/protocol",
  fadeDelay = 1.9,       // starts right after slash completes
  fadeDuration = 0.4,
  breatheDuration = 7,
  breatheScale = 1.05,   // 5% pulse
  label = "ENTER PROTOCOL",
}: Props) {
  const router = useRouter()
  const [active, setActive] = useState(true)
  const [mounted, setMounted] = useState(false)
  const clickedRef = useRef(false)

  useEffect(() => setMounted(true), [])

  // Prefetch target route for snappier nav
  useEffect(() => {
    // @ts-ignore: next/navigation supports prefetch via link normally; safe to noop if unsupported
    router.prefetch?.(href)
  }, [router, href])

  // Respect reduced-motion
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches

  // Breathing scale MV
  const scale = useMotionValue(1)
  // Keep text size visually stable while the container scales
  const inverse = useTransform(scale, (v) => 1 / v)

  // Box shadow glow mapped to scale progress
  const boxShadow = useTransform(scale, (v) => {
    const progress = Math.max(0, Math.min(1, (v - 1) / (breatheScale - 1 || 0.0001)))
    const glow = 12 + 22 * progress   // 12→34px
    const alpha = 0.22 + 0.22 * progress
    return `0 0 ${glow}px rgba(255,233,0,${alpha})`
  })

  // Fade-in once at the specified delay
  useEffect(() => {
    if (!mounted) return
    if (prefersReduced) return
    const controls = animate(
      0, 1,
      {
        duration: fadeDuration,
        delay: fadeDelay,
        ease: "easeOut",
        onUpdate: (v) => {
          // animate opacity via WAAPI on wrapper for cheap fade
          const el = document.getElementById("enter-protocol-wrap")
          if (el) el.style.opacity = String(v)
        },
        onComplete: () => setActive(true),
      }
    )
    return () => controls.stop()
  }, [mounted, fadeDelay, fadeDuration, prefersReduced])

  // Start breathing loop AFTER fade-in completes
  useEffect(() => {
    if (!active || prefersReduced) return
    const controls = animate(scale, [1, breatheScale, 1], {
      duration: breatheDuration,
      repeat: Infinity,
      ease: [0.45, 0.05, 0.55, 0.95],
    })
    return () => controls.stop()
  }, [active, prefersReduced, scale, breatheDuration, breatheScale])

  const handleClick = (e: React.MouseEvent) => {
    if (clickedRef.current) return
    clickedRef.current = true

    // Stop breathing and give a subtle press feedback
    setActive(false)
    animate(scale, 0.96, { duration: 0.18, ease: "easeOut" })

    // Fade out quickly, then navigate
    const wrap = document.getElementById("enter-protocol-wrap")
    if (wrap) wrap.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 280, easing: "ease-in-out", fill: "forwards"
    })

    // Small delay to let the fade play
    setTimeout(() => router.push(href), 300)
  }

  return (
    <motion.div
      id="enter-protocol-wrap"
      style={{ scale, boxShadow, transformOrigin: "center", opacity: 0 }} // start hidden; fade-in effect handles reveal
      className="inline-block rounded-md will-change-transform will-change-opacity"
    >
      <MotionButton
        type="button"
        onClick={handleClick}
        disabled={!mounted} // prevents SSR jank click
        aria-label={label}
        className="cursor-pointer bg-brand text-black font-semibold rounded-md px-6 py-2 hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand active:scale-[0.99]"
      >
        {/* Keep text stable against container scale */}
        <motion.span style={{ scale: inverse, display: "inline-block" }}>
          {label}
        </motion.span>
      </MotionButton>
    </motion.div>
  )
}
