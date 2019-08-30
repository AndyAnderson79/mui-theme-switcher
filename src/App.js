import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import { connect } from 'react-redux'

import * as themes from './themes'
import LandingPage from './components/LandingPage'

require('typeface-roboto')

function App(props) {
  const { reduxTheme } = props

  const currentTheme = `Theme_${reduxTheme.current}_${reduxTheme.type}`

  return (
    <MuiThemeProvider theme={createMuiTheme(themes[currentTheme])}>
      <CssBaseline />
      <LandingPage />
    </MuiThemeProvider>
  )
}

App.propTypes = {
  reduxTheme: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  reduxTheme: state.theme,
});

export default compose(
  connect(mapStateToProps, null),
)(App)
