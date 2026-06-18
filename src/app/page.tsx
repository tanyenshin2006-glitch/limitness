"use client"

import IntroSequence from "@/components/IntroSequence"
import Homepage from "@/components/Homepage"

export default function Page() {
  return (
    <IntroSequence>
       <Homepage />
      {/* <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden translate-y-[-6vh] sm:translate-y-0">

        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_80%)] pointer-events-none" />
        <div aria-hidden="true" className="absolute inset-0 bg-[url('/grain.png')] opacity-[0.06] mix-blend-overlay pointer-events-none" />
      </main> */}
    </IntroSequence>
  )
}