import Header from '@/components/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  openGraph: {
    title: 'Nlogify',
    description: 'Nlogify - Post, Share, Update ⭐',
    url: 'https://nlogify.vercel.app/',
    siteName: 'Nlogify',
    images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/nlogify.appspot.com/o/images%2Fogimage.png?alt=media&token=fc86075b-a133-4d5b-878b-91b4a6f6e0a1',
        width: 800,
        height: 600,
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/nlogify.appspot.com/o/images%2Fogimage-second.png?alt=media&token=672b0838-17de-45f0-bd0c-250912f07cc1',
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <Header />
        {children}
        <Footer/>
      </body>
    </html>
  )
}
