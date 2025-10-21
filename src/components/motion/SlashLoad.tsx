"use client"
import { motion } from "framer-motion"

export function SlashLoad({
  className = "h-10 w-10 text-brand",
  duration = 0.9,
  delay = 0.1,
  color = "#FFE900",
}: {
  className?: string
  strokeWidth?: number
  duration?: number
  delay?: number
  color?: string
}) {
  const len = 96         // effective visual path length
  const strokeWidth = len / 6  // 1:6 ratio → 16

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden
      role="presentation"
    >
      <motion.line
        x1="26" y1="82" x2="74" y2="18"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="butt"
        strokeDasharray={len}
        strokeDashoffset={len}
        initial={{ strokeDashoffset: len, opacity: 0.9 }}
        animate={{
          strokeDashoffset: 0,
          opacity: 1,
          filter: [
            "drop-shadow(0 0 0px rgba(255,233,0,0))",
            "drop-shadow(0 0 12px rgba(255,233,0,0.45))",
            "drop-shadow(0 0 0px rgba(255,233,0,0))",
          ],
        }}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </motion.svg>
  )
}