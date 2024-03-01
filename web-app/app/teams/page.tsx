"use client"

import { useEffect, useState } from "react"

export default function Teams(){
  type getTeamResponse = {
    id: string,
    DisplayName: string
  }

  const [ teamName, setTeamName ] = useState('')
  const [ teams, setTeams ] = useState([])

  function createTeam() {
    fetch('https://nfnvyv9j52.execute-api.eu-west-2.amazonaws.com/prod/teams/create/' + teamName, {
      method: 'POST'
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
      <div className='max-w-sm p-6 bg-white w-full'>
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Teams</h5>
        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">List of your teams</p>
        <div id="toast-undo" className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
          <div className="text-sm font-normal">
            Tasburgh 1 (XD)
          </div>
          <div className="flex items-center ms-auto space-x-2 rtl:space-x-reverse">
            <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" aria-label="Close">
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            </button>
          </div>
        </div>
        <div className="relative">
          <input type="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type team name here..." onChange={(e) => setTeamName(e.target.value)} />
          <button onClick={() => createTeam()} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
        </div>
      </div>
    </main>
  )
}