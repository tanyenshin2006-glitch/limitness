"use client"

import Link from "next/link"

export default function Homepage() {
  return(
    <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-2">
      <p className="font-body text-2xl md:text-3xl text-white tracking-[0.2em]">
        Structured recovery.
      </p>
      <p className="font-body mt-6 text-sm md:text-base text-white/60 tracking-[0.15em]">
          Designed for post-training recovery.
      </p>
      <Link href="/waitlist">
        <button
          className="font-mono mt-8 px-3 py-2 border border-brand text-brand hover:bg-brand hover:text-black transition-colors duration-[600ms] tracking-wider text-sm cursor-pointer"
        >
          JOIN WAITLIST
        </button>
      </Link>
      <p className="font-body mt-4 text-[10px] md:text-sm text-white/30 tracking-[0.15em]">
          See yourself.
      </p>
    </section>
  )
}