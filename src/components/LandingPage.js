import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, 
  Menu,
  MenuItem,
  IconButton,
  Switch,
  Toolbar ,
  Typography,
  withStyles,
 } from '@material-ui/core';
 import AccountCircleIcon from '@material-ui/icons/AccountCircle';
 import MenuIcon from '@material-ui/icons/Menu';
 import { connect } from 'react-redux';
 import { updateTheme } from './../actions/themeActions';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toggle: {
    display: 'flex',
    alignItems: 'center',
  },
  toggleLabel: {
    margin: theme.spacing(1),
  },
})

class LandingPage extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    reduxTheme: PropTypes.object.isRequired,
  };

  state = {
    anchorEl: null,
  }

  handleChange = (e) => {
    const { updateTheme } = this.props;
    
    updateTheme(e.target.checked ? "DarkTheme" : "LightTheme")
  };

  handleMenu = (e) => {
    this.setState({ anchorEl: e.currentTarget })
  };

  handleClose = () => {
    this.setState({ anchorEl: null })
  };

  render() {
    const { classes, reduxTheme } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon color="secondary" />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Here's a title. Happy now?
            </Typography>
            <div>
              <IconButton
                onClick={this.handleMenu}
                color="secondary"
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.toggle}>
          <span className={classes.toggleLabel}>LightTheme</span>
          <Switch
            checked={reduxTheme.current === "DarkTheme"} 
            onChange={this.handleChange}
            color="secondary"
          />
          <span className={classes.toggleLabel}>DarkTheme</span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  reduxTheme: state.theme,
});

const mapDispatchToProps = (dispatch) => ({
  updateTheme: (theme) => dispatch(updateTheme(theme)),
});

LandingPage = withStyles(styles)(LandingPage);
LandingPage = connect(mapStateToProps, mapDispatchToProps)(LandingPage);

export default LandingPage
