import { SignedIn } from "@clerk/nextjs";
import { NewFixture } from "../../../types";
import { DateToDDmmYYYY } from "../helpers/dateHelper";

export default function FixturesList({ fixtures, setSelectedFixture, onCloseModal }: { fixtures: NewFixture[], setSelectedFixture: Function, onCloseModal: Function}) {
  return (
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Fixtures on {fixtures[0].date_time === null ? DateToDDmmYYYY(fixtures[0].date_time) : ''}
                </h3>
                <button onClick={() => onCloseModal()} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-4 md:p-5">
                <p className="text-gray-500 dark:text-gray-400 mb-4">Select fixture:</p>
                <ul className="space-y-4 mb-4">
                    {fixtures.map((fixture, i) => 
                        <li key={i}>
                            <label onClick={() => setSelectedFixture(fixture)} htmlFor="job-1" className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">                           
                                <div className="block">
                                    <div className="w-full text-lg font-semibold">{fixture.team_for.team.display_name} vs {fixture.team_against.team.display_name}</div>
                                    <div className="w-full text-gray-500 dark:text-gray-400">{fixture.venue}</div>
                                </div>
                                <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/></svg>
                            </label>
                        </li>
                    )}
                </ul>
                <div className="flex justify-between">
                    <button onClick={() => onCloseModal()} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Back</button>
                    <SignedIn>
                        <button className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule={"evenodd"} d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule={'evenodd'}></path></svg>
                            New
                        </button>
                    </SignedIn>
                </div>
            </div>
        </div>
    </div>
  )
}