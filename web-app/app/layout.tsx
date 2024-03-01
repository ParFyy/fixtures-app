"use client"
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider, SignedOut } from '@clerk/nextjs'
import Navbar from './components/navbar'
import { SignIn, SignedIn, UserButton } from '@clerk/clerk-react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider publishableKey="pk_test_Ym9zcy1sYWItMTYuY2xlcmsuYWNjb3VudHMuZGV2JA">
      <html lang="en">
        <head>
          <title>Fixtures</title>
          <link rel='manifest' href='../manifest.json'></link>
        </head>
          <body className={inter.className}>
            <SignedOut>
              <div aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className='relative'>
                  <SignIn />
                </div>
              </div>
            </SignedOut>
            <SignedIn>
              <div className='flex justify-end mr-3 mt-3'><UserButton /></div>
              {children}
              <Navbar />
            </SignedIn>
          </body>
      </html>
    </ClerkProvider>
  )
}