import React from 'react'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    marginBottom: theme.spacing(1),
    '& > *': {
      width: 36,
      margin: `0 ${theme.spacing(1)}`,
      [theme.breakpoints.down('sm')]: {
        margin: `0 2px`,
      }
    }
  }
}))

const Week = props => <Typography variant='overline' color='textSecondary' {...props} />

const WeekHeader = () => {
  const classes = useStyles()

  const weekdayNames = moment.weekdaysShort(true)

  return (
    <div className={classes.root}>
      {weekdayNames.map(name => (
        <Week key={name}>{name}</Week>
      ))}
    </div>
  )
}

export default WeekHeader
