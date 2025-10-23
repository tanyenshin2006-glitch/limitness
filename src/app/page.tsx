"use client"

import { FadeIn } from "@/components/motion/FadeIn"
import { GlitchTextHardIdle } from "@/components/motion/GlitchTextCRT"
import { EnterProtocolButton } from "@/components/EnterProtocolButton"
import { SlashLoad } from "@/components/motion/SlashLoad"
import BackgroundHum from "@/components/BackgroundHum"

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden">
      
      {/* Background Sound */}
      <BackgroundHum volume={0.2} aria-hidden />

      {/* Cinematic layers */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_80%)] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/grain.png')] opacity-[0.06] mix-blend-overlay pointer-events-none"
      />

      {/* Content container with safe margins */}
      <div className="w-full max-w-screen-xl px-4 sm:px-6">
        <h1 className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-baseline md:items-center gap-3 lg:gap-6 xl:gap-10 2xl:gap-14 text-center md:text-left font-extrabold tracking-tight">

          {/* LIMITNESS glitch */}
          <div className="md:justify-self-end">
            <GlitchTextHardIdle
              bootDelayMs={900}
              burstMs={220}
              idleMin={1600}
              idleMax={2400}
              rgbOpacity={0.5}
              majorChance={0.1}
              className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-heading max-w-[95vw] leading-tight"
            >
              LIMITNESS
            </GlitchTextHardIdle>
          </div>

          {/* Slash */}
          <div className="justify-self-center my-3 md:my-0">
            <SlashLoad
              className="w-40 sm:w-52 lg:w-60 text-brand mx-3 drop-shadow-[0_0_6px_rgba(255,233,0,0.8)]"
              duration={1.2}
              delay={0.6}
              aria-hidden="true"
            />
          </div>

          {/* See Yourself */}
          <div className="md:justify-self-start">
            <FadeIn delay={0} duration={0.6} y={10}>
              <span className="block text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-foreground font-body tracking-wide select-none leading-tight max-w-[95vw]">
                see yourself
              </span>
            </FadeIn>
          </div>
        </h1>

        {/* Button */}
        <FadeIn delay={1.9} duration={0.4} y={20}>
          <div className="sm:mt-8 mt-10 flex justify-center select-none px-4 sm:px-0">
              <EnterProtocolButton />
          </div>
        </FadeIn>
      </div>
    </main>
  )
}
