"use client"
import { useEffect, useState } from "react"
import MonthGrid from "./MonthGrid"
import { Fixture } from "../../../../tasburgh-badminton-club/types"
import { NewFixture } from "../../../types"
import { DateToMMYYYY } from "../helpers/dateHelper"
import Modal from './Modal'

export default function FixturesWrapper() {
  const [allFixtures, setAllFixtures] = useState([] as NewFixture[]);
  const [selectedMonth, setMonth] = useState(() => {
    const date = new Date();
    date.setDate(1);
    return date;
  });
  const [busyDays, setBusyDays] = useState([] as number[]);
  const [selectedDate, setSelectedDate] = useState('');
  const [modalOpen, setModalOpen] = useState(false)
  
  useEffect(() => {
    fetch('https://s8gfxyfcmd.execute-api.eu-west-2.amazonaws.com')
      .then((res) => res.json())
      .then((data: Fixture[]) => {        
        const fixtures = data.map((fixture): NewFixture => {
          const splitDate = fixture.date.split('/').map((str) => parseInt(str))
          const splitTime = fixture.start_time.split(':').map((str) => parseInt(str))
          return {
            id: '#',
            team_for: {
              can_edit: false,
              team: {
                id: `${fixture.team_for}!${crypto.randomUUID()}`,
                display_name: fixture.team_for
              }
            },
            team_against: {
              can_edit: false,
              team: {
                id: `${fixture.team_against}!${crypto.randomUUID()}`,
                display_name: fixture.team_against
              }
            },
            date_time: new Date(splitDate[2], splitDate[1]-1, splitDate[0], splitTime[0], splitTime[1]),
            venue: fixture.venue,
            points_for: fixture.points_for,
            points_against: fixture.points_against
          }
        });
        setAllFixtures(fixtures)
      })
  }, [])

  useEffect(() => {
    setBusyDays(getBusyDays(allFixtures, selectedMonth))
  }, [selectedMonth, allFixtures])

  function ajustMonth(ajustment: number) {
    setMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + ajustment ))
  }

  const dayClicked = (date: number) => {
    const dateString = `${date}/${selectedMonth.getMonth()+1}/${selectedMonth.getFullYear()}`
    setSelectedDate(dateString)
    setModalOpen(true)
  }

  return (
    <div>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <h5 className="my-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white text-center">{DateToMMYYYY(selectedMonth)}</h5>
      <hr className="h-px mb-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <MonthGrid
        date={DateToMMYYYY(selectedMonth)}
        busyDays={busyDays}
        dayClicked={dayClicked}
      />
      <div id="controls" className="flex justify-between mt-3">
        <button type="button" onClick={() => ajustMonth(-1)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">PREV</button>
        <button type="button" onClick={() => ajustMonth(+1)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">NEXT</button>
      </div>
      {modalOpen ? (
        <Modal
          fixtures={allFixtures.filter((fixture) => fixture.date_time !== undefined && [fixture.date_time?.getDate(),fixture.date_time?.getMonth()+1,fixture.date_time?.getFullYear].join('/') === selectedDate)}
          closeModal={() => setModalOpen(false)}
        />
      ) : ''}
    </div>
  )
}

function getBusyDays(fixtures: NewFixture[], selectedMonth: Date) {
  return fixtures.filter(fixture => fixture.date_time?.getMonth() == selectedMonth.getMonth() && fixture.date_time.getFullYear() === selectedMonth.getFullYear())
  .map((fixture) => fixture.date_time?.getDate() || 0)
}