"use client"
import { SignIn, SignOutButton, SignedIn, SignedOut, UserButton, UserProfile, useUser } from '@clerk/clerk-react';
import FixturesWrapper from './components/FixturesWrapper';
import { useState } from 'react';

export default function Home() {
  const { user } = useUser();
  const [signingIn, setSigningIn] = useState(false)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
      <div className='max-w-sm p-6 bg-white'>
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Fixtures</h5>
        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Select a date to see fixtures on that date</p>
        <FixturesWrapper />
      </div>
    </main>
  )
}
