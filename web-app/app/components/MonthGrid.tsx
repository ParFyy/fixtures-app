export default function MonthGrid({ date, busyDays, dayClicked }: props) {
  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  function getDateDivs(date: string, busyDays: number[], dayClicked: Function)
  {
    const splitDate = date.split('/').map((str) => parseInt(str));
    const daysInMonth = new Date(splitDate[1], splitDate[0], 0).getDate();
    const dayMonthStarts = new Date(splitDate[1], splitDate[0]-1, 1).getDay() || 7;
  
    const divs = [];
    divs.push(getEmptyDivs(dayMonthStarts))
  
    for (let i = 1; i <= daysInMonth; i++) {
      divs.push(dateDiv(i.toString(), busyDays.includes(i), i, dayClicked))
    }
  
    return divs
  }

  function dateDiv(day: string, busy: boolean, key: number = 1, dayClicked: Function) {
    return (
      <div onClick={() => dayClicked(day)} key={key} className={`hover:bg-gray-100 hover:cursor-pointer flex justify-center items-center h-10 w-10 mx-1 my-1 rounded-full${busy ? ' bg-gray-200' : ''}`} data-modal-target="crud-modal" data-modal-toggle="crud-modal">
        {day}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-7 place-content-center">
      {daysOfWeek.map((day, i) => <div key={i} className="font-bold text-center px-1 py-1">{day}</div>)}
      {getDateDivs(date, busyDays, dayClicked)}
    </div>
  )
}

function getEmptyDivs(numberOfDivs: number) {
  const divs = [];
  for (let i = 1; i <= numberOfDivs - 1; i++) {
    divs.push(<div key={i}></div>)
  }
  return divs;
}

type props = {
  date: string,
  busyDays: number[],
  dayClicked: Function
}