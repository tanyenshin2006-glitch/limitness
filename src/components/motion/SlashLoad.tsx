"use client"
import { motion } from "framer-motion"

export function SlashLoad({
  className = "h-10 w-10",
  duration = 0.9,
  delay = 0.1,
  color = "#FFE900",
}: {
  className?: string
  duration?: number
  delay?: number
  color?: string
}) {
  const len = 60                // diagonal length
  const strokeWidth = 8.5       // thinner: 1 : 7 ratio
  const x1 = 32, y1 = 74
  const x2 = 68, y2 = 26

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden
      role="presentation"
    >
      <motion.line
        x1={x1} y1={y1} x2={x2} y2={y2}
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
