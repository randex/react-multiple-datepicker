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
  const toggleOpen = useCallback(() => setOpen(o => !o), [setOpen])
  const onCancel = useCallback(() => setOpen(false), [setOpen])
  const onSubmit = useCallback(
    dates => {
      setDates(dates)
      setOpen(false)
    },
    [setDates]
  )

  // -- 3 tüüpi kuupäevad
  // Ei saa päevi vahele jätta. <-- implement in rendify frontend

  const ms = 86400000;
  const later = new Date().getTime() + ms;
  const earlier = new Date().getTime() + 84400000;
  const tomorrowLater = new Date(later);
  const theDayAfterTomorrow = new Date(tomorrowLater.getTime() + ms)
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
        readOnly
        selectedDatesTitle={"Valitud rendipäevad"}
        disabledDatesTitle={"Broneeritud päevad"}
        onSubmit={onSubmit}
        disabledDates={[new Date(), tomorrowLater, theDayAfterTomorrow]}
        halfDisabledDates={[new Date(theDayAfterTomorrow.getTime() + ms)]}
        times={[tomorrowEarly, tomorrowLater]}
      />
      <Typography color='textSecondary'>
        <code>{JSON.stringify(dates)}</code>
      </Typography>
    </div>
  )
}

export default Demo
