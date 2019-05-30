import React from 'react';
import PropTypes from 'prop-types';
import compose from 'just-compose';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { connect } from 'react-redux';
import * as Themes from './themes';
import LandingPage from './components/LandingPage';

require('typeface-roboto');

class App extends React.Component {
  static propTypes = {
    reduxTheme: PropTypes.object.isRequired,
  };

  render() {
    const { reduxTheme } = this.props;

    return (
      <MuiThemeProvider theme={createMuiTheme(Themes[reduxTheme.current])}>
        <CssBaseline />
        <LandingPage />
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = (state) => ({
  reduxTheme: state.theme,
});

export default compose(
  connect(mapStateToProps, null),
)(App)
