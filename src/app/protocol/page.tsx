"use client"

import BackgroundHum from "@/components/BackgroundHum"
import { FadeIn } from "@/components/motion/FadeIn"
import { useState, useEffect } from "react"

export default function ProtocolSoon() {

    const [volume, setVolume] = useState(0)

    useEffect(() => {
        const start = 0
        const end = 0.4
        const duration = 2000 // 2 seconds
        const steps = 40
        const interval = duration / steps
        const increment = (end - start) / steps

        let current = start
        const timer = setInterval(() => {
            current += increment
            setVolume(Math.min(current, end))
            if (current >= end) clearInterval(timer)
        }, interval)

        return () => clearInterval(timer)
    }, [])

    return(
        <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden">
            
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_80%)] pointer-events-none"
            />

            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[url('/grain.png')] opacity-[0.06] mix-blend-overlay pointer-events-none"
            />

            <BackgroundHum volume={volume} />

                <FadeIn delay={0.1} duration={0.8} y={20}>
                    <div className="text-center">

                        <div className="text-brand text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-extrabold tracking-[0.12em] font-heading select-none">
                            ENTRY SEQUENCE LOCKED
                        </div>

                        <div className="mt-3 text-sm sm:text-base md:text-base lg:text-base xl:text-base text-foreground-secondary tracking-[0.06em] font-body select-none animate-pulse opacity-90">
                            standby for synchronization signal
                        </div>

                    </div>
                </FadeIn>
        </main>

    )
}

