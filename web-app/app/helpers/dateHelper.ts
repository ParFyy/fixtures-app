export function DateToMMYYYY(date: Date): string {
  return date.getMonth()+1 + '/' + date.getFullYear();
}

export function DateToDDmmYYYY(date: Date): string {
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
}

export function IsDateInPast(date: Date): boolean {
  return (new Date() > date)
}

export function DDmmYYYYToDate(dateString: string): Date {
  if(!dateString) return new Date(0, 0, 0)

  const splitString = dateString.split('/').map((x) => parseInt(x));
  return new Date(splitString[2], splitString[1], splitString[0])
}