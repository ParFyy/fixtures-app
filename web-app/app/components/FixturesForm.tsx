import { SignedIn, useAuth } from "@clerk/clerk-react";
import { NewFixture } from "../../..//types";
import { v4 as uuidv4 } from "uuid";

export default function FixturesForm({ fixture, onCloseModal }: { fixture: NewFixture, onCloseModal: Function }) {
    const { getToken } = useAuth();

    function updateFixture(token: string) {
        fetch("https://tcjeu94naj.execute-api.eu-west-2.amazonaws.com/prod/fixtures/add",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": token
                  },
                method: 'POST',
                body: JSON.stringify(
                {
                    team_for: fixture.team_for,
                    team_against: fixture.team_against,
                    venue: fixture.venue
                } as NewFixture)
            }
        )
    }
    function getFixtures(token: string) {
        fetch("https://tcjeu94naj.execute-api.eu-west-2.amazonaws.com/prod/fixtures",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": token
                  },
                method: 'GET'
            }
        )
    }

  return (
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {fixture ? `${fixture?.team_for} vs ${fixture?.team_against}`: 'Add a new fixture'}
                </h3>
                <button type="button" onClick={() => onCloseModal()} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Venue</label>
                        <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={fixture?.venue || ''} readOnly/>
                    </div>
                    <div className={`col-span-2 sm:col-span-1 ${fixture?.points_for ? '' : 'hidden'}`}>
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Points For</label>
                        <input type="text" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={fixture?.points_for || ''} readOnly/>
                    </div>
                    <div className={`col-span-2 sm:col-span-1 ${fixture?.points_against ? '' : 'hidden'}`}>
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Points Against</label>
                        <input type="text" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={fixture?.points_against || ''} readOnly/>
                    </div>
                </div>
                <div className="flex justify-between">
                    <button onClick={() => onCloseModal()} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Back</button>
                    <div>
                        <SignedIn>
                            {fixture ? (
                                <button onClick={async () => console.log(await getToken({ template: 'LambdaAuthorizer'} )||'')} className="mr-2 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule={"evenodd"} d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule={'evenodd'}></path></svg>
                                New
                            </button>
                            ) : ''}
                            <button onClick={async () => updateFixture(await getToken({ template: 'LambdaAuthorizer' }) || '')} className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule={"evenodd"} d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule={'evenodd'}></path></svg>
                                { fixture ? 'Update' : 'Add' }
                            </button>
                        </SignedIn>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
