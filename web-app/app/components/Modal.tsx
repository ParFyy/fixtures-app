import { useState } from "react";
import { NewFixture } from "../../../types";
import FixturesForm from "./FixturesForm";
import FixturesList from "./FixturesList";

export default function Modal({ fixtures, closeModal }: { fixtures: NewFixture[], closeModal: Function }){
  const [selectedFixture, setSelectedFixture] = useState(undefined)

  function FixturesFormClosed() {
    fixtures.length > 1 ? setSelectedFixture(undefined) : closeModal()
  }
  
  function GetContent(fixtures: NewFixture[]) {
    if (fixtures.length > 1 && !selectedFixture) {
      return <FixturesList fixtures={fixtures} setSelectedFixture={setSelectedFixture} onCloseModal={closeModal} />
    }
  
    return <FixturesForm fixture={selectedFixture || fixtures[0]} onCloseModal={() => FixturesFormClosed()} />
  }

  return (
    <div id="crud-modal" tabIndex={-1} aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div onClick={() => closeModal()} className="h-full w-full bg-black absolute opacity-40" data-modal-toggle="crud-modal"></div>
        {GetContent(fixtures)}
    </div>
  )
}