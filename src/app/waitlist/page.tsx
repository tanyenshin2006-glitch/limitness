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

export default function Homepage() {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: { name: '', phone: '', email: '' }
  })

  const [submitted, setSubmitted] = useState(false)

  const onSubmit = async (data: FormData) => {
      await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      })
      setSubmitted(true)
  }

  return(
    <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-20">
        <p className="font-mono text-xl md:text-3xl text-white tracking-[0.2em]">
            CONTROLLED BATCH 01
        </p>
        <p className="font-body mt-6 text-xs md:text-base text-white/60 tracking-[0.15em] text-center">
          A structured muscle recovery product, released in limited batches.
        </p>
        <p className="font-body mt-6 text-xs md:text-base text-white/60 tracking-[0.15em] text-center">
          The batch is currently in controlled development.
        </p>

        {submitted ? (
          <div className="flex flex-col items-center gap-4 tracking-wider text-center mt-6">
            <p className="text-white text-xs md:text-sm">Received.</p>
            <p className="text-white/60 text-xs md:text-sm">
                Selected applicants will be contacted<br />
                when the batch is ready.
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
            className="flex flex-col items-center"
            noValidate
          >
            <label className="self-start text-white text-xs tracking-wider mt-6">
              NAME
            </label>
            <input
              {...register("name")}
              type="name"
              placeholder="John Doe"
              className="mt-2 bg-transparent border border-white/40 text-white placeholder-white/40 tracking-wider text-xs md:text-sm w-full max-w-sm focus:outline-none focus:border-brand px-3 py-2 max-w-md"
            />
            {errors.name && (
                <p className="text-red-400 text-xs mt-1 md:mt-2">{errors.name.message}</p>
            )}
            
            <label className="self-start text-white text-xs tracking-wider mt-3 md:mt-5">
              PHONE NUMBER
            </label>
            <input
              {...register("phone")}
              type="phone"
              placeholder="+60123456789"
              className="mt-2 bg-transparent border border-white/40 text-white placeholder-white/40 tracking-wider text-xs md:text-sm w-full max-w-sm focus:outline-none focus:border-brand px-3 py-2 max-w-md"
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
                className="mt-2 bg-transparent border border-white/40 text-white placeholder-white/40 tracking-wider text-xs md:text-sm w-full max-w-sm focus:outline-none focus:border-brand px-3 py-2 max-w-md"
            />
            {errors.email && (
                <p className="text-red-400 text-xs mt-1 md:mt-2">{errors.email.message}</p>
            )}

            <button 
              type="submit" 
              className="font-mono mt-6 md:mt-8 px-3 py-2 border border-brand text-brand hover:bg-brand hover:text-black transition-colors duration-[600ms] tracking-wider text-xs md:text-sm cursor-pointer"
            >
                JOIN WAITLIST
            </button>
          </form>
        )}
    </section>
  )
}