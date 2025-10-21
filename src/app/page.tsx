"use client"

import { FadeIn } from "@/components/motion/FadeIn"
import { GlitchTextHardIdle } from "@/components/motion/GlitchTextCRT"
import { EnterProtocolButton } from "@/components/EnterProtocolButton"
import { SlashLoad } from "@/components/motion/SlashLoad"
import BackgroundHum from "@/components/BackgroundHum"


export default function Page() {
  return (

    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden">

      {/*Background Sound*/}
      <BackgroundHum volume={0.2} aria-hidden/>

      {/* Faint vignette for cinematic depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_80%)] pointer-events-none"
      />

      {/* Optional faint grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/grain.png')] opacity-[0.06] mix-blend-overlay pointer-events-none"
      />

      {/* Title */}
        <h1 className="grid grid-cols-3 items-center text-5xl md:text-6xl font-extrabold tracking-tight text-center gap-4">

            {/* LIMITNESS glitch in */}
             <div className="justify-self-end">
            <GlitchTextHardIdle
              bootDelayMs={900}        
              burstMs={220}            
              idleMin={1600}           
              idleMax={2400}
              rgbOpacity={0.5}
              majorChance={0.1}
              className="text-7xl font-heading"
            >
              LIMITNESS
            </GlitchTextHardIdle>
            </div>


            {/* Slash charge in */}
            <div className="justify-self-center">
            <SlashLoad
              className="w-60 text-brand mx-3 drop-shadow-[0_0_6px_rgba(255,233,0,0.8)]"
              duration={1.2}
              delay={0.6} // starts slightly after LIMITNESS glitch finishes
              aria-hidden="true"
            />
            </div>

            {/* see yourself fade in */}
            <div className="justify-self-start">
            <FadeIn delay={0} duration={0.6} y={10}>
              <span className="text-foreground font-body tracking-wide] select-none">see yourself</span>
            </FadeIn>
            </div>

        </h1>

      {/* Enter Protocol button */}
      <FadeIn delay={1.9} duration={0.4} y={20}>
        <div className="mt-10 justify-center select-none ">
          <EnterProtocolButton />
        </div>
      </FadeIn>

    </main>
  )
}