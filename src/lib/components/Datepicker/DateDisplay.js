import React, { Component } from 'react'
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import DeleteIcon from '@mui/icons-material/Clear'
import moment from 'moment'

const styles = theme => ({
  root: {
    width: theme.spacing(30),
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  header: {
    margin: theme.spacing(2),
    // width: '100%',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between'
  },
  list: {
    flex: '1',
    overflowY: 'auto'
  }
})

class DateDisplay extends Component {
  state = {
    selectedYear: false
  }

  componentDidMount () {
    if (!this.props.monthDaySelected) {
      this.setState({ selectedYear: true })
    }
  }

  getFormatedDate = date => {
    // const dateTime = new dateTimeFormat('en-US', {
    //   year: 'numeric',
    //   month: 'short',
    //   day: '2-digit'
    // }).format(date)

    // return `${dateTime}`

    return moment(date).format('ll')
  }

  removeDateAtIndex = index => () => {
    this.props.onRemoveAtIndex(index)
  }

  render () {
    const { classes, selectedDates, readOnly } = this.props

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography variant='subtitle1'>{this.props.selectedDatesTitle}</Typography>
          <Typography variant='subtitle1' color={readOnly ? 'textSecondary' : 'primary'}>
            {selectedDates.length}
          </Typography>
        </div>
        <List dense className={classes.list}>
          {selectedDates.map((date, index) => (
            <ListItem
              key={`${date.toString()}`}
              button={readOnly}
              disabled={readOnly}
              onClick={this.removeDateAtIndex(index)}
            >
              <ListItemText primary={this.getFormatedDate(date)} />
              {!readOnly && <DeleteIcon color='error' />}
            </ListItem>
          ))}
        </List>
      </div>
    )
  }
}

export default withStyles(styles)(DateDisplay)
