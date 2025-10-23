export function GetMonthWithYear(date: Date) {
  return date.toLocaleString('en-US', {
    month: 'long',
    year: 'numeric'
  })
}
