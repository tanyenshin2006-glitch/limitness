import type { Metadata } from "next";
import "./globals.css";
import { 
  League_Spartan, 
  Geist,
  Geist_Mono,
  Inter,
} from "next/font/google"

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-heading",
  display:"swap"
})

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body-fallback",
  display:"swap"
})

export const metadata: Metadata = {
  title: {
    default: "LIMITNESS",
    template: "%s | LIMITNESS",
  },
  description: "The protocol begins when you see yourself.",
  keywords: [
    "LIMITNESS",
    "performance protocol",
    "recovery supplement",
    "self awareness",
    "self actualization",
    "cult branding",
    "biohacking",
  ],
  openGraph: {
    title: "LIMITNESS — Entry Protocol",
    description: "The protocol begins when you see yourself.",
    url: "https://limitness.co", // update to your actual domain
    siteName: "LIMITNESS",
    images: [
      {
        url: "/og-image.jpg", // 1200x630 recommended
        width: 1200,
        height: 630,
        alt: "LIMITNESS Protocol",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LIMITNESS — Entry Protocol",
    description: "The protocol begins when you see yourself.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://limitness.co"), // replace with real domain
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="en" 
      className={`
        ${leagueSpartan.variable} 
        ${geist.variable} 
        ${geistMono.variable} 
        ${inter.variable}
      `}
    > 
      <head>
        <meta name="theme-color" content="#0A0A0A" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/icon.png" />
      </head>
      <body className="bg-background text-foreground">{children}</body>
    </html>
  )
}