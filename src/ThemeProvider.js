import React from 'react'
import { ThemeProvider, createMuiTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const theme = createMuiTheme();

const useStyles = makeStyles((theme) => {
});

function ThemeProviderRoot ({ children }) {// eslint-disable-next-line
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  )
}

export default ThemeProviderRoot
