import React, {useCallback, useEffect, useReducer, useState} from 'react'
import PropTypes from 'prop-types'
import DateUtilities from './utils'
import Calendar from './Calendar'
import {Dialog} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  dialogPaper: {
    minHeight: 482,
    maxHeight: 482,
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
                      halfDisabledDates
}) => {
  // Tekitame aegadest topelt halduse - Komponenti antakse kasutaja puhke kellaajad
  // Kui aga valitud päev on halfDisabledDate - siis näitame algus kella hoopis selle järgi
  const [timesInternal, setTimesInternal] = useState(times || [])

  if (cancelButtonText == null) {
    cancelButtonText = readOnly ? 'Dismiss' : 'Cancel'
  }

  const [{selectedDates, minDate, maxDate}, dispatch] = useReducer(
    reducer,
    outerSelectedDates,
    initState
  )

  const classes = useStyles()

  const onSelect = useCallback(
    day => {
      if (readOnly) {
        return
      }

      // RENDIFY LOGIC BEGIN
      // On toote kella ajad ning on ka renditud päevad
      if (times && halfDisabledDates) {
        const isHalfDisabledDate = halfDisabledDates.find(e => DateUtilities.isSameDay(day, e))
        if (isHalfDisabledDate) {
          alert('see päev on renditud')
          var later = new Date().getTime() + 86400000;
          var earlier = new Date().getTime() + 82400000;
          var tomorrowLater = new Date(later);
          var tomorrowEarly = new Date(earlier);

          setTimesInternal([tomorrowEarly, tomorrowLater])
        } else {
          setTimesInternal(times || [])
        }
        // RENDIFY END
      }

      if (DateUtilities.dateIn(selectedDates, day)) {
        dispatch({
          type: 'setSelectedDates',
          payload: selectedDates.filter(date => !DateUtilities.isSameDay(date, day))
        })
      } else {
        dispatch({type: 'setSelectedDates', payload: [...selectedDates, day]})
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
      onSubmit(selectedDates)
    },
    [onSubmit, selectedDates, readOnly]
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
  times: PropTypes.array
}

export default DatePicker
