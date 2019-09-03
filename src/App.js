import React from 'react'
import { useSelector } from 'react-redux'
import { CssBaseline } from '@material-ui/core'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

import * as themes from './themes'
import LandingPage from './components/LandingPage'

require('typeface-roboto')

export default function App() {
  const reduxTheme = useSelector((state) => state.theme)

  const currentTheme = `Theme_${reduxTheme.current}_${reduxTheme.type}`

  return (
    <MuiThemeProvider theme={createMuiTheme(themes[currentTheme])}>
      <CssBaseline />
      <LandingPage />
    </MuiThemeProvider>
  )
}
