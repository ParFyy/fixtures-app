import Account from "./icons/account";
import Ajustments from "./icons/ajustments";

export default function Menu ({ open, setOpen, icon }: { open: boolean, setOpen: Function, icon: "AccountSettings" | "Ajustments" }) {
  return (
    <div>
      <div className={`rounded-t-full bg-white px-4 py-4`} onClick={() => setOpen(!open)}>
        { icon === "AccountSettings" ? <Account /> : <Ajustments /> }
      </div>
      {/* <div className={"bg-white " + (open ? `h-[50vh] transition-all` : 'h-0 transition-all')}>
        <h1>Menu</h1>
      </div> */}
    </div>
  )
}