import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { makeStyles, Typography, ButtonBase } from '@material-ui/core'

const useCircleStyles = makeStyles(theme => ({
  root: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: 'rgba(0, 0, 0, 0)'
    // marginLeft: theme.spacing(1.5)
  },
  rootText: {
    color: theme.palette.text.primary
  },
  rootTextDisabled: {
    color: theme.palette.text.disabled
  },
  todayRoot: {
    background: theme.palette.background.default
  },
  checkedRoot: {
    background: theme.palette.primary.main
  },
  checkedRootDisabled: {
    background: theme.palette.action.disabled
  },
  checkedText: {
    color:
      theme.palette.type === 'dark'
        ? theme.palette.getContrastText(theme.palette.primary.main)
        : theme.palette.common.white
  },
  text: {
    textAlign: 'center'
  }
}))

const Circle = ({ label, disabled, checked, onCheck, className, isToday }) => {
  const classes = useCircleStyles()

  const handleClick = useCallback(
    () => {
      if (!disabled) {
        onCheck(!checked)
      }
    },
    [onCheck, disabled, checked]
  )

  return (
    <ButtonBase
      className={classNames(
        classes.root,
        {
          [classes.rootText]: !checked && !disabled,
          [classes.rootTextDisabled]: disabled,
          [classes.todayRoot]: isToday,
          [classes.checkedRoot]: checked && !disabled,
          [classes.checkedRootDisabled]: checked && disabled
        },
        className
      )}
      disabled={disabled}
      onClick={handleClick}
    >
      <Typography
        color='inherit'
        variant='body1'
        className={classNames(classes.text, { [classes.checkedText]: checked })}
      >
        {label}
      </Typography>
    </ButtonBase>
  )
}

Circle.propTypes = {
  classes: PropTypes.object,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  disabled: PropTypes.bool,
  checked: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
  className: PropTypes.string
}

export default Circle
