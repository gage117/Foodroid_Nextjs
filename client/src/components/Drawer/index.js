import {Link} from 'react-router-dom';
//* Auth0
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MuiDrawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TodayIcon from '@material-ui/icons/Today';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ExploreIcon from '@material-ui/icons/Explore';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';
// import stylesheet simply for accessing pseudo-elements because inline styles don't allow access to them
import "./styles.css"

// drawerWidth variable is declared in Main page
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  iconWidthOverride: {
    minWidth: "36px"
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
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    drawerPaper: {
      width: drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }));

function Drawer({open, setOpen}) {  
    const classes = useStyles();
    const theme = useTheme();

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const {loginWithRedirect, logout} = useAuth0();
    
    return (
        <MuiDrawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Meal Planner', 'Shopping List', 'Saved Recipes', 'Explore Recipes', 'How Foodroid Works'].map((text) => (
            <>
              {(() => {
                switch (text) {
                case 'Meal Planner':
                  return (
                    <Link to={"/"} key={text}>
                      <ListItem button key={text}>
                        <ListItemIcon classes={{root: classes.iconWidthOverride}}>
                          <TodayIcon />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                    </Link>
                  )
                case 'Shopping List':
                  return (
                    <Link to={"/shopping-list"} key={text}>
                      <ListItem button key={text}>
                        <ListItemIcon classes={{root: classes.iconWidthOverride}}>
                          <ListAltIcon />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                    </Link>
                  )
                case 'Saved Recipes':
                  return (
                    <Link to={"/saved-recipes"} key={text}>
                      <ListItem button key={text}>
                        <ListItemIcon classes={{root: classes.iconWidthOverride}}>
                          <FavoriteBorderIcon />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                    </Link>
                  )
                case 'Explore Recipes':
                  return (
                    <Link to={"/explore"} key={text}>
                      <ListItem button key={text}>
                        <ListItemIcon classes={{root: classes.iconWidthOverride}}>
                          <ExploreIcon />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                    </Link>
                  )
                case 'How Foodroid Works':
                  return (
                    <Link to={"/how-it-works"} key={text}>
                      <ListItem button key={text}>
                        <ListItemIcon classes={{root: classes.iconWidthOverride}}>
                          <HelpOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                    </Link>
                  )
                default:
                  break;
              }})()}
            </>
          ))}
        </List>
        <Divider />
        <List>
          {['My Profile', 'Login', 'Logout'].map((text) => {
            switch (text) {
              case 'My Profile':
                return (
                  <Link to={"/profile"} key={text}>
                    <ListItem button key={text}>
                      <ListItemIcon classes={{root: classes.iconWidthOverride}}>
                        <AccountCircleIcon />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  </Link>
                );
              case 'Login':
                return (
                  <ListItem button key={text} onClick={() => loginWithRedirect()}>
                    <ListItemIcon classes={{root: classes.iconWidthOverride}}>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                )
              case 'Logout':
                return (
                  <ListItem button key={text} onClick={() => logout({ returnTo: window.location.origin })}>
                    <ListItemIcon classes={{root: classes.iconWidthOverride}}>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                )
              default:
                break;
            }
            }
          )}
        </List>
      </MuiDrawer>
    );
}

export { Drawer, drawerWidth };