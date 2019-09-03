import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import compose from 'recompose/compose'
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
  Switch,
  Toolbar ,
  Typography,
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import BeachAccessIcon from '@material-ui/icons/BeachAccess'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ImageIcon from '@material-ui/icons/Image'
import InboxIcon from '@material-ui/icons/Inbox'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import WorkIcon from '@material-ui/icons/Work'
import { connect } from 'react-redux'

import { updateTheme, updateThemeType } from './../actions/themeActions'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
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
}))

function LandingPage(props) {
  const classes = useStyles()
  const theme = useTheme()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)

  const { reduxTheme, updateTheme, updateThemeType } = props

  const toggleChangeTheme = (event) => {    
    updateTheme(event.target.checked ? 2 : 1)
  }

  const toggleChangeThemeType = (event) => {    
    updateThemeType(event.target.checked ? "dark" : "light")
  }

  const toggleDrawerOpen = () => {
    setDrawerOpen((prevDrawerOpen) => !prevDrawerOpen)
  }

  const toggleMenuOpen = (event) => {
    setMenuAnchorEl((prevMenuAnchorEl) => (prevMenuAnchorEl) ? null : event.currentTarget)
  }

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
            onClick={toggleDrawerOpen}
            className={clsx(classes.menuButton, drawerOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap>
            Here&apos;s a title
          </Typography>
          <div>
            <IconButton
              onClick={toggleMenuOpen}
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
              onClose={toggleMenuOpen}
            >
              <MenuItem onClick={toggleMenuOpen}>Profile</MenuItem>
              <MenuItem onClick={toggleMenuOpen}>My account</MenuItem>
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
          <IconButton onClick={toggleDrawerOpen}>
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
            onChange={toggleChangeTheme}
            color="secondary"
          />
          <span className={classes.toggleLabel}>Theme 2</span>
        </div>
        <div className={classes.toggle}>
          <span className={classes.toggleLabel}>Light mode</span>
          <Switch
            checked={reduxTheme.type === "dark"} 
            onChange={toggleChangeThemeType}
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
      </main>
    </div>
  )
}

LandingPage.propTypes = {
  reduxTheme: PropTypes.object.isRequired,
  updateTheme: PropTypes.func.isRequired,
  updateThemeType: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  reduxTheme: state.theme,
})

const mapDispatchToProps = (dispatch) => ({
  updateTheme: (theme) => dispatch(updateTheme(theme)),
  updateThemeType: (type) => dispatch(updateThemeType(type)),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(LandingPage)
