const DateUtilities = {
  pad (value, length) {
    while (value.length < length) value = `0${value}`
    return value
  },

  clone (date) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    )
  },

  toString (date) {
    return `${date.getFullYear()}-${DateUtilities.pad(
      (date.getMonth() + 1).toString(),
      2
    )}-${DateUtilities.pad(date.getDate().toString(), 2)}`
  },

  toDayOfMonthString (date) {
    return DateUtilities.pad(date.getDate().toString())
  },

  toMonthAndYearString (date) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    return `${months[date.getMonth()]} ${date.getFullYear()}`
  },

  moveToDayOfWeek (date, dayOfWeek) {
    while (date.getDay() !== dayOfWeek) date.setDate(date.getDate() - 1)
    return date
  },

  isSameDay (first, second) {
    return (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    )
  },

  dateIn (datesArray, date) {
    return (
      datesArray.filter(day => !DateUtilities.isSameDay(day, date)).length !== datesArray.length
    )
  },

  isBefore (first, second) {
    if (this.isSameDay(first, second)) return
    return first.getTime() < second.getTime()
  },

  isAfter (first, second) {
    return first.getTime() > second.getTime()
  }
}

export default DateUtilities

export function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
