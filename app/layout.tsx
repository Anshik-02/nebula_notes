import type { Metadata } from "next";
import { Geist, Geist_Mono,Sora } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700'], 
  variable: '--font-sora',
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nebula Notes",
  description: "Your notes in the cloud.",
    icons: {
    icon: "/favicon.ico",   
    shortcut: "/ne.png",
    apple: "/ne.png",  
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={` ${sora.variable} antialiased`}
      >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
