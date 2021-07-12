import moment from "moment";

export const getListForStartAndEndTs = (startTs, endTs) => {
  debugger;
  const start = moment(startTs);
  const end = moment(endTs);
  const diffHour = end.diff(start, 'hours');
  const listOfTimes = [start];

  // starting from 1 as we already have first element
  for (let i = 1; i <= diffHour; i++) {
    const previousHour = moment(listOfTimes[i - 1]).add(1, 'hours');
    listOfTimes.push(previousHour);
  }
  return listOfTimes;
};


export function sortDate(dates) {
  return dates.sort((a, b) => moment(a).diff(moment(b)))
}
