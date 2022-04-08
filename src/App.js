import React from 'react'
import ThemeProvider from './ThemeProvider'
import Demo from './Demo'
import { StyledEngineProvider } from '@mui/material';

function App () {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider>
        <Demo />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App