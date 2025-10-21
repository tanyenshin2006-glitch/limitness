import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "LIMITNESS",
  description: "The protocol begins when you see yourself.",
  icons: {
    icon: "/icon.png", // or "/icon.png" or "/images/slash.svg"
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark"> 
      <head>
         <link rel="icon" href="/icon.png" />
      </head>
      <body className="bg-background text-foreground">{children}</body>
    </html>
  )
}