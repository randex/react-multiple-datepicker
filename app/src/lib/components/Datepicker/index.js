import React, {useCallback, useEffect, useReducer, useState} from 'react'
import PropTypes from 'prop-types'
import DateUtilities from './utils'
import Calendar from './Calendar'
import {Dialog} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import {getListForStartAndEndTs, sortDate} from "./rendifyHelper";
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  dialogPaper: {
    minHeight: 600,
    maxHeight: 600,
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      margin: `${theme.spacing(1)}px`,
    }
  }
}))

function initState(selectedDates) {
  return {
    selectedDates: selectedDates ? [...selectedDates] : [],
    minDate: null,
    maxDate: null
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'setSelectedDates':
      return {...state, selectedDates: action.payload}
    default:
      return new Error('wrong action type in multiple date picker reducer')
  }
}

const DatePicker = ({
                      open,
                      readOnly,
                      onCancel,
                      onSubmit,
                      selectedDates: outerSelectedDates,
                      disabledDates,
                      cancelButtonText,
                      submitButtonText = 'Submit',
                      selectedDatesTitle = 'Selected Dates',
                      disabledDatesTitle,
                      disableClock,
                      times,
                      halfDisabledDates,
                      chooseMulti
                    }) => {
  // Tekitame aegadest topelt halduse - Komponenti antakse kasutaja puhke kellaajad
  // Kui aga valitud päev on halfDisabledDate - siis näitame algus kella hoopis selle järgi
  const [timesInternal, setTimesInternal] = useState(times || [])
  const [noticeTxt, setNoticeTxt] = useState('')
  const [outterChosenStartTs, setChosenOuterStartTs] = React.useState(null);
  const [outterChosenEndTs, setChosenOuterEndTs] = React.useState(null);

  if (cancelButtonText == null) {
    cancelButtonText = readOnly ? 'Dismiss' : 'Cancel'
  }

  const [{selectedDates, minDate, maxDate}, dispatch] = useReducer(
    reducer,
    outerSelectedDates,
    initState
  )

  const classes = useStyles();

  // When triggered internally in Calendar
  const setOuterStartEndTs = (start, end) => {
    setChosenOuterStartTs(start);
    setChosenOuterEndTs(end);
  };

  const onSelect = useCallback(
    day => {
      if (readOnly) {
        return
      }

      let selectedDatesPayload = []

      if (DateUtilities.dateIn(selectedDates, day)) {
        selectedDatesPayload = selectedDates.filter(date => !DateUtilities.isSameDay(date, day));

        dispatch({
          type: 'setSelectedDates',
          payload: selectedDatesPayload
        })
      } else {
        selectedDatesPayload = [...selectedDates, day];

        dispatch({type: 'setSelectedDates', payload: selectedDatesPayload})
      }

      // RENDIFY LOGIC BEGIN
      // On toote kella ajad ning on ka renditud päevad
      if (times && halfDisabledDates) {
        const anyHalfRentDay = halfDisabledDates.find(half => selectedDatesPayload.find((sel => DateUtilities.isSameDay(sel, half))));

        if (anyHalfRentDay) {
          let startTs, endTs;
          try {
            // for Date.prototype
            startTs = moment().set('hours', anyHalfRentDay.getHours() + 1) // + 1 on ajabuhver peale renditagastust.
          }
          catch (e) {
            // for moment js
            startTs = moment().set('hours', anyHalfRentDay.hour() + 1) // + 1 on ajabuhver peale renditagastust.
          }

          try {
            endTs = moment().set('hours', times[times.length - 1].getHours())
          }
          catch (e) {
            endTs = moment().set('hours', times[times.length - 1].hour())
          }

          // Arvutame uue alguse kuupäev rendi päeva pealt.
          setTimesInternal(getListForStartAndEndTs(startTs, endTs));
        } else {
          setTimesInternal(times)
        }
      } else {
        return; // Pole bronnitud päevi ja kuupäevad on juba on init paika pandud.
      }

    },
    [selectedDates, dispatch, readOnly, halfDisabledDates, times]
  )

  const onRemoveAtIndex = useCallback(
    index => {
      if (readOnly) {
        return
      }
      const newDates = [...selectedDates]
      if (index > -1) {
        newDates.splice(index, 1)
      }

      dispatch({type: 'setSelectedDates', payload: newDates})
    },
    [selectedDates, dispatch, readOnly]
  )

  const dismiss = useCallback(
    () => {
      dispatch({type: 'setSelectedDates', payload: []})
      onCancel()
    },
    [dispatch, onCancel]
  )

  const handleCancel = useCallback(
    e => {
      e.preventDefault()
      dismiss()
    },
    [dismiss]
  )

  const handleOk = useCallback(
    e => {
      e.preventDefault()
      if (readOnly) {
        return
      }


      /* validation 1 */
      if (selectedDates.length === 0 || (chooseMulti && selectedDates.length === 1)) {
        setNoticeTxt("Vali alguse- ja lõpukuupäev");

        setTimeout(() => {
          setNoticeTxt('');
        }, 3000);

        return;
      }

      /* validation 2 */
      if (!disableClock && (!outterChosenStartTs || !outterChosenEndTs)) {
        setNoticeTxt("Vali ka rendi algus ja lõpp kellaajad.");

        setTimeout(() => {
          setNoticeTxt('');
        }, 3000);

        return;
      }

      /* validation 3 */
      if(chooseMulti === false){
        if(selectedDates.length > 1) {
          setNoticeTxt("Vali ainult üks päev");

          return;
        }

        if(moment(outterChosenEndTs).isBefore(outterChosenStartTs)) {
          setNoticeTxt("Alguse kellaaeg on hiljem kui lõpu.");
          return;
        }
      }


      if(!disableClock) {
        /* validation 4 */
        const sortedDates = sortDate(selectedDates); // järjekorda ja vaatame et päevade vahel ei oleks tühjust.
        let triggered = false;

        sortedDates.forEach((sd, i) => {
          if (triggered) {
            return;
          }

          const chosen = sd;
          const nextChosen = sortedDates[i + 1];
          const duration = moment.duration(moment(nextChosen).diff(moment(chosen)));

          if (nextChosen && duration.asDays() > 1) {
            triggered = true;
            setNoticeTxt("Päevade vahel ei tohi olla tühja päeva.");
          }
        });

        if(triggered) {
          return;
        }
      }

      onSubmit({selectedDates, outterChosenStartTs, outterChosenEndTs})
    },
    [onSubmit, selectedDates, readOnly, outterChosenEndTs, outterChosenStartTs, chooseMulti, chooseMulti]
  )

  useEffect(
    () => {
      if (open) {
        dispatch({
          type: 'setSelectedDates',
          payload: outerSelectedDates != null ? outerSelectedDates : []
        })
      }
    },
    [open, outerSelectedDates]
  )

  return (
    <Dialog open={open} classes={{paper: classes.dialogPaper}}>
      {/* <DialogContent> */}
      <Calendar
        selectedDates={selectedDates}
        disabledDates={disabledDates}
        disabledDatesTitle={disabledDatesTitle}
        onSelect={onSelect}
        onRemoveAtIndex={onRemoveAtIndex}
        minDate={minDate}
        maxDate={maxDate}
        onCancel={handleCancel}
        onOk={handleOk}
        readOnly={readOnly}
        disableClock={disableClock}
        cancelButtonText={cancelButtonText}
        submitButtonText={submitButtonText}
        selectedDatesTitle={selectedDatesTitle}
        times={timesInternal}
        noticeTxt={noticeTxt}
        setOuterStartEndTs={setOuterStartEndTs}
      />
      {/* </DialogContent> */}
    </Dialog>
  )
}

DatePicker.propTypes = {
  open: PropTypes.bool.isRequired,
  readOnly: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectedDates: PropTypes.array,
  cancelButtonText: PropTypes.string,
  submitButtonText: PropTypes.string,
  selectedDatesTitle: PropTypes.string,
  disabledDatesTitle: PropTypes.string,
  disableClock: PropTypes.string,
  halfDisabledDates: PropTypes.array,
  times: PropTypes.array,
  chooseMulti: PropTypes.bool
}

export default DatePicker
