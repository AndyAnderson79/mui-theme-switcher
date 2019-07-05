import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { compose } from 'redux';
import {
  AppBar, 
  Avatar,
  Divider,
  Drawer,
  Menu,
  MenuItem,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  //Snackbar,
  Switch,
  Toolbar ,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ImageIcon from '@material-ui/icons/Image';
import InboxIcon from '@material-ui/icons/Inbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import WorkIcon from '@material-ui/icons/Work';
import { connect } from 'react-redux';
import { updateTheme, updateThemeType } from './../actions/themeActions';

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
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
});

class LandingPage extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    reduxTheme: PropTypes.object.isRequired,
    updateTheme: PropTypes.func.isRequired,
    updateThemeType: PropTypes.func.isRequired,
  };

  state = {
    drawerOpen: false,
    menuAnchorEl: null,
    snackbarOpen: false,
  }

  handleToggleChangeTheme = (e) => {
    const { updateTheme } = this.props;
    
    updateTheme(e.target.checked ? 2 : 1)
  };

  handleToggleChangeType = (e) => {
    const { updateThemeType } = this.props;
    
    updateThemeType(e.target.checked ? "dark" : "light")
  };

  handleDrawerOpen = () => {
    this.setState({ drawerOpen: true })
  };

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false })
  };

  handleMenuOpen = (e) => {
    this.setState({ menuAnchorEl: e.currentTarget })
  };

  handleMenuClose = () => {
    this.setState({ menuAnchorEl: null })
  };

  handleSnackbarOpen = () => {
    this.setState({ snackbarOpen: true })
  };

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false })
  };

  render() {
    const { classes, theme, reduxTheme } = this.props;
    const { drawerOpen, menuAnchorEl } = this.state;

    return (
      <div className={classes.root}>
        <AppBar 
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: drawerOpen,
          })}
        >
          <Toolbar>
            <IconButton 
              edge="start" 
              color="inherit" 
              aria-label="Menu"
              onClick={this.handleDrawerOpen}
              className={clsx(classes.menuButton, drawerOpen && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} noWrap>
              Here&apos;s a title
            </Typography>
            <div>
              <IconButton
                onClick={this.handleMenuOpen}
                color="secondary"
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={menuAnchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(menuAnchorEl)}
                onClose={this.handleMenuClose}
              >
                <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={drawerOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, i) => (
              <ListItem button key={i}>
                <ListItemIcon>{i % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, i) => (
              <ListItem button key={i}>
                <ListItemIcon>{i % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: drawerOpen,
          })}
        >
          <div className={classes.drawerHeader} />
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
          <TestComponent />
        </main>
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
  withStyles(styles, { withTheme: true }),
)(LandingPage);

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  button: {
    margin: theme.spacing(1),
  },
  buttonClicked: {
    margin: theme.spacing(2)
  },
}));

const TestComponent = () => {
  const classes = useStyles();
  const [clicked, setClicked] = React.useState(false);

  const handleButtonClick = () => {
    setClicked(!clicked)
  };

  return (
    <div>
      <IconButton
        className={clsx(classes.button, {
          [classes.buttonClicked]: clicked,
        })}
        onClick={handleButtonClick}
      >
        <MenuIcon />
      </IconButton>
    </div>
  )
}
