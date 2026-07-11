"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu } from 'lucide-react';
import Link from "next/link"

const NAV_LINKS = [
    { label: "WHAT", href: "/what" },
    { label: "WHY", href: "/why" },
    { label: "WHY PROTOCOL", href: "/why-protocol" },
    { label: "PROTOCOL ENTRY", href: "/protocol-entry" },
    { label: "WAITLIST", href: "/waitlist" },
]

export default function NavigationMenu() {

    const [isOpen, setIsOpen ] = useState(false)
    const close = () => setIsOpen(false)
    const toggleMenu = () => setIsOpen(!isOpen)


    return(
        <>
            <nav className="fixed top-0 w-full px-6 md:px-20 py-10 flex justify-between items-center z-50 bg-background">
                <div className="flex items-center gap-2">
                    <Link href="/">
                        <span className="text-brand font-bold tracking-wider text-2xl">
                            LIMITNESS
                        </span>
                    </Link>
                </div>
                <button 
                    onClick={toggleMenu}
                    className="text-white hover:text-brand cursor-pointer transition-colors duration-600"
                >
                {isOpen ? (
                    <Image src="limitness_icon.svg" alt="close" width={18} height={18} />
                ) : (
                    <Menu size={18}/>
                )}
                </button>
            </nav>

            <div
                className={`fixed inset-0 z-40 bg-black flex flex-col justify-center px-6 md:px-20 transition-opacity duration-500 ${
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            >
                <ul className="flex flex-col gap-10">
                    {NAV_LINKS.map((link, i) => (
                        <li
                            key={link.href}
                            className="transition-all duration-500"
                            style={{
                                transitionDelay: isOpen ? `${i * 60 + 100}ms` : "0ms",
                                opacity: isOpen ? 1 : 0,
                                transform: isOpen ? "translateY(0)" : "translateY(16px)",
                            }}
                        >
                            <Link
                                href={link.href}
                                onClick={close}
                                className="text-white text-4xl md:text-5xl font-bold tracking-widest hover:text-brand transition-colors duration-600"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )

}