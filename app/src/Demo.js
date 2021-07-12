import React, {useCallback, useState} from 'react'
import {makeStyles} from '@material-ui/styles'
import {Button, Typography} from '@material-ui/core'
import MultipleDatePicker from './lib'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: theme.spacing(3)
  }
}))

const Demo = props => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [dates, setDates] = useState([])
  const [startTs, setStartTs] = useState(null)
  const [endTs, setEndTs] = useState(null)
  const toggleOpen = useCallback(() => setOpen(o => !o), [setOpen])
  const onCancel = useCallback(() => setOpen(false), [setOpen])
  const onSubmit = useCallback(
    ({selectedDates, outterChosenStartTs, outterChosenEndTs}) => {
      setDates(selectedDates)
      setStartTs(outterChosenStartTs)
      setEndTs(outterChosenEndTs)
      setOpen(false)
    },
    [setDates, setStartTs]
  )

  // -- 3 tüüpi kuupäevad
  // Ei saa päevi vahele jätta. <-- implement in rendify frontend

  const ms = 86400000;
  const later = new Date().getTime() + ms;
  const earlier = new Date().getTime() + 82200000;
  const tomorrowLater = new Date(later);
  const tomorrowEarly = new Date(earlier);

  return (
    <div className={classes.root}>
      <Button variant='contained' color='primary' className={classes.button} onClick={toggleOpen}>
        Select Dates
      </Button>
      <MultipleDatePicker
        open={open}
        selectedDates={dates}
        onCancel={onCancel}
        selectedDatesTitle={"Valitud rendipäevad"}
        disabledDatesTitle={"Broneeritud päevad"}
        onSubmit={onSubmit}
        halfDisabledDates={[tomorrowEarly]}
        times={[new Date(), new Date(new Date().getTime() + 26400000)]}
      />
      <Typography color='textSecondary'>
        <code>{JSON.stringify(dates)}</code>
        <code>{JSON.stringify(startTs)}</code>
        <code>{JSON.stringify(endTs)}</code>
      </Typography>
    </div>
  )
}

export default Demo
