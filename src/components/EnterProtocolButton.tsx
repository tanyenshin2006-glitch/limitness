"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button as UIButton } from "@/components/ui/button"

// Wrap shadcn Button with framer
const MotionButton = motion(UIButton)

type Props = {
  href?: string
  fadeDelay?: number
  fadeDuration?: number
  breatheDuration?: number
  breatheScale?: number
  label?: string
}

export function EnterProtocolButton({
  href = "/protocol",
  fadeDelay = 1.9,
  fadeDuration = 0.4,
  breatheDuration = 7,
  breatheScale = 1.05,
  label = "ENTER PROTOCOL",
}: Props) {
  const router = useRouter()
  const [active, setActive] = useState(true)
  const [mounted, setMounted] = useState(false)
  const clickedRef = useRef(false)

  useEffect(() => setMounted(true), [])

  // Prefetch target route for snappier nav
  useEffect(() => {
    router.prefetch?.(href)
  }, [router, href])

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches

  const scale = useMotionValue(1)
  const inverse = useTransform(scale, (v) => 1 / v)

  const boxShadow = useTransform(scale, (v) => {
    const progress = Math.max(0, Math.min(1, (v - 1) / (breatheScale - 1 || 0.0001)))
    
    // ✅ detect mobile screen
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640

    // ✅ adjust glow + transparency
    const glow = isMobile ? 8 + 14 * progress : 12 + 22 * progress
    const alpha = isMobile ? 0.18 + 0.18 * progress : 0.22 + 0.22 * progress

    return `0 0 ${glow}px rgba(255,233,0,${alpha})`
  })

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
          const el = document.getElementById("enter-protocol-wrap")
          if (el) el.style.opacity = String(v)
        },
        onComplete: () => setActive(true),
      }
    )
    return () => controls.stop()
  }, [mounted, fadeDelay, fadeDuration, prefersReduced])

  useEffect(() => {
    if (!active || prefersReduced) return
    const controls = animate(scale, [1, breatheScale, 1], {
      duration: breatheDuration,
      repeat: Infinity,
      ease: [0.45, 0.05, 0.55, 0.95],
    })
    return () => controls.stop()
  }, [active, prefersReduced, scale, breatheDuration, breatheScale])

  const handleClick = () => {
    if (clickedRef.current) return
    clickedRef.current = true

    setActive(false)
    animate(scale, 0.96, { duration: 0.18, ease: "easeOut" })

    const wrap = document.getElementById("enter-protocol-wrap")
    if (wrap) wrap.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 280, easing: "ease-in-out", fill: "forwards"
    })

    setTimeout(() => router.push(href), 300)
  }

  return (
    <motion.div
      id="enter-protocol-wrap"
      style={{ scale, boxShadow, transformOrigin: "center", opacity: 0 }}
      className="inline-block rounded-md will-change-transform will-change-opacity scale-90 sm:scale-100"
    >
      <MotionButton
        type="button"
        onClick={handleClick}
        disabled={!mounted}
        aria-label={label}
        className="
          cursor-pointer bg-brand text-black font-semibold rounded-md
          px-4.5 py-[0.25rem] text-[13.5px] 
          sm:px-4 sm:py-1.5 md:px-6 md:py-2 
          min-h-[38px] sm:min-h-0
          hover:bg-brand-hover focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand
          active:scale-[0.99] font-mono transition-all
        "
      >
        <motion.span
          className="!text-[13px] sm:!text-[14px] md:!text-[15px]"   // <-- force label size
          style={{ scale: inverse, display: "inline-block" }}
        >
          {label}
        </motion.span>
      </MotionButton>
    </motion.div>
  )
}   