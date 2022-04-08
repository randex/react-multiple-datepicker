import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IconButton, Typography } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import LeftIcon from '@mui/icons-material/ArrowLeft'
import RightIcon from '@mui/icons-material/ArrowRight'
import moment from 'moment'
import { capitalizeFirstLetter } from './utils'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    margin: `${theme.spacing(1)} 0`
  }
})

class CalendarToolbar extends Component {
  static propTypes = {
    displayDate: PropTypes.object.isRequired,
    nextMonth: PropTypes.bool,
    onMonthChange: PropTypes.func,
    prevMonth: PropTypes.bool
  }

  static defaultProps = {
    nextMonth: true,
    prevMonth: true
  }

  handleTouchTapPrevMonth = e => {
    e.preventDefault()
    if (this.props.onMonthChange) {
      this.props.onMonthChange(-1)
    }
  }

  handleTouchTapNextMonth = e => {
    e.preventDefault()
    if (this.props.onMonthChange) {
      this.props.onMonthChange(1)
    }
  }

  render () {
    const { classes, displayDate } = this.props

    const dateTimeFormatted = moment(displayDate).format('MMMM YYYY')
    // const dateTimeFormatted = new dateTimeFormat('en-US', {
    //   month: 'long',
    //   year: 'numeric'
    // }).format(displayDate)

    return (
      <div className={classes.root}>
        <IconButton
          disabled={!this.props.prevMonth}
          onClick={this.handleTouchTapPrevMonth}
          size="large">
          <LeftIcon />
        </IconButton>
        <Typography variant='subtitle1'>{capitalizeFirstLetter(dateTimeFormatted)}</Typography>
        <IconButton
          disabled={!this.props.nextMonth}
          onClick={this.handleTouchTapNextMonth}
          size="large">
          <RightIcon />
        </IconButton>
      </div>
    );
  }
}

export default withStyles(styles)(CalendarToolbar)
