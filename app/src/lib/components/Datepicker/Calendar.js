import React, {useCallback, useEffect, useRef, useState} from 'react'
import WeekHeader from './WeekHeader'
import Month from './Month'
import {defaultUtils as utils} from './dateUtils'
import CalendarToolbar from './CalendarToolbar'
import CalendarButtons from './CalendarButtons'
import DateDisplay from './DateDisplay'
import {makeStyles} from '@material-ui/core'
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import moment from "moment";
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles(theme => ({
  root: {
    flex: '1',
    display: 'flex',
    maxHeight: '100%',
  },
  selectorContainer: {
    // marginTop: theme.spacing(2)
    // boxShadow: 'inset 0 0 10px #000000'
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  calendarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: `0 ${theme.spacing(2)}px`
  },
  infoContainer: {
    background: 'rgb(232, 244, 253)',
    padding: '5px',
    margin: '5px',
    borderRadius: '4px'
  },
  infoIcon: {
    color: '#2196f3'
  }
}))

const Calendar = ({
                    initialDate,
                    maxDate,
                    minDate,
                    selectedDates,
                    disabledDates,
                    onSelect,
                    onCancel,
                    onOk,
                    readOnly,
                    onRemoveAtIndex,
                    cancelButtonText,
                    submitButtonText,
                    selectedDatesTitle,
                    disabledDatesTitle,
                    disableClock,
                    times,
                    noticeTxt,
                    setOuterStartEndTs
                  }) => {
  const [chosenStartTs, setChosenStartTs] = React.useState(100);
  const [chosenEndTs, setChosenEndTs] = React.useState(100);

  const calendar = useRef(null)
  const classes = useStyles();

  const [displayDate, setDisplayDate] = useState(() =>
    utils.getFirstDayOfMonth(initialDate || new Date())
  )

  const handleMonthChange = useCallback(
    months => {
      setDisplayDate(displayDate => utils.addMonths(displayDate, months))
    },
    [setDisplayDate]
  )

  useEffect(
    () => {
      setDisplayDate(utils.getFirstDayOfMonth(initialDate || new Date()))
    },
    [initialDate]
  )

  useEffect(() => {
    setOuterStartEndTs(times[chosenStartTs], times[chosenEndTs]);
  }, [chosenEndTs, chosenStartTs])

  maxDate = maxDate || utils.addYears(new Date(), 100)
  minDate = minDate || utils.addYears(new Date(), -100)

  const toolbarInteractions = {
    prevMonth: utils.monthDiff(displayDate, minDate) > 0,
    nextMonth: utils.monthDiff(displayDate, maxDate) < 0
  }

  return (
    <div className={classes.root}>
      <div className={classes.selectorContainer}>
        <div className={classes.calendarContainer}>
          {noticeTxt &&
          <div className={classes.infoContainer}>
            <p><InfoIcon className={classes.infoIcon}/> {noticeTxt}</p>
          </div>}
          <CalendarToolbar
            displayDate={displayDate}
            onMonthChange={handleMonthChange}
            prevMonth={toolbarInteractions.prevMonth}
            nextMonth={toolbarInteractions.nextMonth}
          />
          <WeekHeader/>
          <Month
            displayDate={displayDate}
            key={displayDate.toDateString()}
            selectedDates={selectedDates}
            disabledDates={disabledDates}
            minDate={minDate}
            maxDate={maxDate}
            onSelect={onSelect}
            readOnly={readOnly}
            ref={calendar}
          />
          {!disableClock && <>
            <FormControl variant="outlined">
              <Select
                labelId="start-select-outlined-label"
                id="start-select-outlined"
                value={chosenStartTs}
                onChange={(event) => {
                  // Value has to be a primitive (number, string)
                  // Otherwise changes are not reflected to UI
                  const val = event.target.value;

                  if (val !== 100) {
                    setChosenStartTs(val);
                  }
                }}
                label="Algusaeg"
              >
                <MenuItem value={100}>
                  <em>Algusaeg</em>
                </MenuItem>
                {times.map((e, i) => {
                  return (
                    <MenuItem
                      key={`time${e.id}`}
                      value={i}
                    >
                      {moment(e).format('HH:mm')}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <br/>
            <FormControl variant="outlined">
              <Select
                labelId="end-select-outlined-label"
                id="end-select-outlined"
                value={chosenEndTs}
                onChange={(event) => {
                  // Value has to be a primitive (number, string)
                  // Otherwise changes are not reflected to UI
                  const val = event.target.value;

                  if (val !== 100) {
                    setChosenEndTs(val);
                  }
                }}
                label="Tagastus kellaaeg"
              >
                <MenuItem value={100}>
                  <em>Tagastus kellaaeg</em>
                </MenuItem>
                {times.map((e, i) => {
                  return (
                    <MenuItem
                      key={`time${e.id}`}
                      value={i}
                    >
                      {moment(e).format('HH:mm')}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl></>}
        </div>
        <CalendarButtons
          readOnly={readOnly}
          onCancel={onCancel}
          onOk={onOk}
          cancelButtonText={cancelButtonText}
          submitButtonText={submitButtonText}
        />
      </div>
      <DateDisplay
        selectedDatesTitle={selectedDatesTitle}
        disabledDatesTitle={disabledDatesTitle}
        selectedDates={selectedDates}
        readOnly={readOnly}
        disabledDates={disabledDates || []}
        onRemoveAtIndex={onRemoveAtIndex}
      />
    </div>
  )
}

export default Calendar
