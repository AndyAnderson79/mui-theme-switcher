import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import {
  AppBar, 
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Switch,
  Toolbar ,
  Typography,
 } from '@material-ui/core';
 import { withStyles } from '@material-ui/core/styles';
 import AccountCircleIcon from '@material-ui/icons/AccountCircle';
 import BeachAccessIcon from '@material-ui/icons/BeachAccess';
 import ImageIcon from '@material-ui/icons/Image';
 import MenuIcon from '@material-ui/icons/Menu';
 import WorkIcon from '@material-ui/icons/Work';
 import { connect } from 'react-redux';
 import { updateTheme, updateThemeType } from './../actions/themeActions';

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
    margin: theme.spacing(1),
  },
  toggleLabel: {
    margin: theme.spacing(1),
  },
  list: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(1),
  },
})

class LandingPage extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    reduxTheme: PropTypes.object.isRequired,
    updateTheme: PropTypes.func.isRequired,
    updateThemeType: PropTypes.func.isRequired,
  };

  state = {
    anchorEl: null,
  }

  handleToggleChangeTheme = (e) => {
    const { updateTheme } = this.props;
    
    updateTheme(e.target.checked ? 2 : 1)
  };

  handleToggleChangeType = (e) => {
    const { updateThemeType } = this.props;
    
    updateThemeType(e.target.checked ? "dark" : "light")
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
              Here&apos;s a title
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
          <span className={classes.toggleLabel}>Theme 1</span>
          <Switch
            checked={reduxTheme.current === 2} 
            onChange={this.handleToggleChangeTheme}
            color="secondary"
          />
          <span className={classes.toggleLabel}>Theme 2</span>
        </div>
        <div className={classes.toggle}>
          <span className={classes.toggleLabel}>Light mode</span>
          <Switch
            checked={reduxTheme.type === "dark"} 
            onChange={this.handleToggleChangeType}
            color="secondary"
          />
          <span className={classes.toggleLabel}>Dark mode</span>
        </div>
        <List className={classes.list}>
          <ListItem button>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
          </ListItem>
          <ListItem button>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Work" secondary="Jan 7, 2014" />
          </ListItem>
          <ListItem button>
            <ListItemAvatar>
              <Avatar>
                <BeachAccessIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Vacation" secondary="July 20, 2014" />
          </ListItem>
        </List>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  reduxTheme: state.theme,
});

const mapDispatchToProps = (dispatch) => ({
  updateTheme: (theme) => dispatch(updateTheme(theme)),
  updateThemeType: (type) => dispatch(updateThemeType(type)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(LandingPage)
