"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { phoneSchema } from "@/lib/schemas/phone"

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    phone: phoneSchema,
    email: z.email("Invalid email"),
})

type FormData = z.infer<typeof schema>

export default function ProtocolEntry() {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onSubmit',
        defaultValues: { name: '', phone: '', email: '' }
    })

    const [submitted, setSubmitted] = useState(false)

    const onSubmit = async (data: FormData) => {
        await fetch('/api/protocol-entry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        setSubmitted(true)
    }

    return (
        <main className="min-h-screen px-6 md:px-20 pt-40 pb-20">
            <h1 className="text-white font-bold tracking-wider text-4xl md:text-5xl mb-12">PROTOCOL ENTRY</h1>

            <div className="flex flex-col gap-6 max-w-2xl">
                <p className="text-white text-lg leading-relaxed">
                    This isn&apos;t a sample. It&apos;s a 7-session commitment.
                </p>

                <p className="text-white/70 leading-relaxed">
                    Protocol Entry is not the Controlled Batch 01 waitlist. It&apos;s a separate track — a short, structured protocol for those willing to train, take, and observe across 7 sessions before the full release.
                </p>

                <div className="mt-8">
                    <h2 className="text-white font-bold tracking-wider text-sm mb-4">ENTRY CONDITION</h2>
                    <ul className="flex flex-col gap-2">
                        <li className="text-white/70 leading-relaxed">Use only after meaningful training sessions.</li>
                        <li className="text-white/70 leading-relaxed">Not for casual or daily use.</li>
                    </ul>
                </div>

                <div className="mt-4">
                    <h2 className="text-white font-bold tracking-wider text-sm mb-4">WHAT&apos;S REQUIRED</h2>
                    <ul className="flex flex-col gap-3">
                        <li className="text-white/70 leading-relaxed">Train with sufficient intensity, each session.</li>
                        <li className="text-white/70 leading-relaxed">Take within 30 minutes post-training, as instructed.</li>
                        <li className="text-white/70 leading-relaxed">Log your response after every session — taste, immediate observation, same-day response, next-day recovery.</li>
                        <li className="text-white/70 leading-relaxed">Keep other conditions steady. No new supplements during the protocol. Keep diet consistent.</li>
                        <li className="text-white/70 leading-relaxed mt-4">Observe. Don&apos;t assume. Response defines use.</li>
                    </ul>
                </div>

                <p className="text-white/50 text-sm tracking-wider mt-4">
                    Applications are reviewed. Not all are accepted.
                </p>

                {submitted ? (
                    <div className="flex flex-col gap-4 tracking-wider mt-6">
                        <p className="text-white text-xs md:text-sm">Received.</p>
                        <p className="text-white/60 text-xs md:text-sm">
                            Selected applicants will be contacted<br />
                            before the protocol begins.
                        </p>
                        <div className="text-brand font-bold text-xs md:text-sm flex flex-row gap-2">
                            LIMITNESS
                            <Image
                                src="/limitness_icon.svg"
                                alt="Limitness"
                                width={14}
                                height={14}
                                className="border-none outline-none block"
                            />
                        </div>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col mt-2"
                        noValidate
                    >
                        <label className="self-start text-white text-xs tracking-wider mt-4">
                            NAME
                        </label>
                        <input
                            {...register("name")}
                            type="text"
                            placeholder="John Doe"
                            className="mt-2 bg-transparent border border-white/40 text-white placeholder-white/40 tracking-wider text-xs md:text-sm w-full max-w-sm focus:outline-none focus:border-white px-3 py-2"
                        />
                        {errors.name && (
                            <p className="text-red-400 text-xs mt-1 md:mt-2">{errors.name.message}</p>
                        )}

                        <label className="self-start text-white text-xs tracking-wider mt-3 md:mt-5">
                            PHONE NUMBER
                        </label>
                        <input
                            {...register("phone")}
                            type="tel"
                            placeholder="+60123456789"
                            className="mt-2 bg-transparent border border-white/40 text-white placeholder-white/40 tracking-wider text-xs md:text-sm w-full max-w-sm focus:outline-none focus:border-white px-3 py-2"
                        />
                        {errors.phone && (
                            <p className="text-red-400 text-xs mt-1 md:mt-2">{errors.phone.message}</p>
                        )}

                        <label className="self-start text-white text-xs tracking-wider mt-3 md:mt-5">
                            EMAIL
                        </label>
                        <input
                            {...register("email")}
                            type="email"
                            placeholder="johndoe@email.com"
                            className="mt-2 bg-transparent border border-white/40 text-white placeholder-white/40 tracking-wider text-xs md:text-sm w-full max-w-sm focus:outline-none focus:border-white px-3 py-2"
                        />
                        {errors.email && (
                            <p className="text-red-400 text-xs mt-1 md:mt-2">{errors.email.message}</p>
                        )}

                        <button
                            type="submit"
                            className="font-mono mt-6 md:mt-8 self-start px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors duration-[600ms] tracking-wider text-xs md:text-sm cursor-pointer"
                        >
                            APPLY FOR PROTOCOL ENTRY
                        </button>
                    </form>
                )}

                <p className="text-white tracking-wider mt-8">
                    See yourself.
                </p>
            </div>
        </main>
    )
}
