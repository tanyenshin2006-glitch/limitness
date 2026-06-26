import type { Metadata } from "next";
import "./globals.css";
import { 
  League_Spartan, 
  Geist,
  DM_Mono
} from "next/font/google"
import NavigationMenu from "@/components/NavigationMenu"
import BackgroundHum from "@/components/BackgroundHum"

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

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "LIMITNESS",
    template: "%s | LIMITNESS",
  },
  alternates: {
    canonical: 'https://www.limitness.co',
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
    url: "https://www.limitness.co", // update to your actual domain
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
  metadataBase: new URL("https://www.limitness.co"), // replace with real domain
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="en" 
      className={`
        ${leagueSpartan.variable} 
        ${geist.variable} 
        ${dmMono.variable} 
      `}
    > 
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/icon.png" />
      </head>
      <body className="bg-background text-foreground">       
        <NavigationMenu />
         <BackgroundHum volume={0.2} aria-hidden />
        {children}
      </body>
    </html>
  )
}