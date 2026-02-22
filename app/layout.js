import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = {
  metadataBase: new URL("https://yourdomain.com"), // 🔥 replace with real domain

  title: {
    default: "Get-a-Developer | Hire Professional Developers Online",
    template: "%s | Get-a-Developer",
  },

  description:
    "Hire professional frontend, backend, and full-stack developers easily and securely.",

  keywords: [
    "hire developer",
    "freelance developer",
    "frontend developer",
    "backend developer",
    "full stack developer",
  ],

  icons: {
    icon: "/butt.png",          // main favicon
    shortcut: "/butt.png",
    apple: "/butt.png",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Get-a-Developer",
    description: "Find and hire verified developers for your next project.",
    url: "https://yourdomain.com",
    siteName: "Get-a-Developer",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/butt.png", // your logo preview when shared
        width: 1200,
        height: 630,
        alt: "Get-a-Developer Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Get-a-Developer",
    description: "Hire developers easily and securely.",
    images: ["/butt.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#121212] text-[#E0E0E0]`}
      >
        {children}
      </body>
    </html>
  );
}