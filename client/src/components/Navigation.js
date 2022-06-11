import { AppBar, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import React from 'react';
import DeviceForm from './DeviceForm';
import Controls from './controls/Controls';
import AddUserForm from './AddUserForm';

//ICONEIDEN IMPORTIT
import MenuIconSharp from '@material-ui/icons/MenuSharp';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import LibraryBooksSharpIcon from '@material-ui/icons/LibraryBooksSharp';
import PersonAddSharpIcon from '@material-ui/icons/PersonAddSharp';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import CloseIconSharp from '@material-ui/icons/CloseSharp';
import PeopleAltSharpIcon from '@material-ui/icons/PeopleAltSharp';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import BuildSharpIcon from '@material-ui/icons/BuildSharp';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  logoutButton:
  {
    marginLeft: 'Auto',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0,
  },
}));

function ResponsiveDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [openPopupLaite, setPopupLaite] = React.useState(false);
  const [openPopupHenk, setPopupHenk] = React.useState(false);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handlePopupLaite = () => {
    setPopupLaite(!openPopupLaite);
  };
  const handlePopupHenk = () => {
    setPopupHenk(!openPopupHenk);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //SIVUPALKKI LINKITYKSINEEN ICONEINA KÄYTETÄÄN SHARP VERSIOITA, LISTA ICONEISTA: https://material-ui.com/components/material-icons/
  //DIVIDEREILLA JAETAAN AIHEITTAIN
  const drawer = (
    <div className={classes.toolbar}>
      <List component="nav">
        <ListItem button key="Etusivu"
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
          button component={Link} to={"/"}>
            <ListItemIcon><HomeSharpIcon /></ListItemIcon>
            <ListItemText primary="Etusivu" />
        </ListItem>
        <Divider />
        <ListItem button key="Laitteet"
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
          button component={Link} to={"/devices"}>
            <ListItemIcon><LibraryBooksSharpIcon /></ListItemIcon>
            <ListItemText primary="Laitteet" />
        </ListItem>
        <ListItem button key="Laitteiden lisäys"
          selected={selectedIndex === 2}
          button onClick={() => handlePopupLaite()}>
            <ListItemIcon><AddSharpIcon /></ListItemIcon>
            <ListItemText primary="Lisää laite" />
        </ListItem>
        <ListItem button key="Huolto"
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
          button component={Link} to={""}>
            <ListItemIcon><BuildSharpIcon /></ListItemIcon>
            <ListItemText primary="Huoltolista" />
        </ListItem>
        <Divider />
        <ListItem button key="Käyttäjät"
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
          button component={Link} to={"/users"}>
            <ListItemIcon><PeopleAltSharpIcon /></ListItemIcon>
            <ListItemText primary="Käyttäjät" />
        </ListItem>
        <ListItem button key="Lisää käyttäjä"
          selected={selectedIndex === 5}
          button onClick={() => handlePopupHenk()}>
            <ListItemIcon><PersonAddSharpIcon /></ListItemIcon>
            <ListItemText primary="Lisää käyttäjä" />
        </ListItem>
        <Divider />
        <ListItem button key="Kirjaudu ulos"
          selected={selectedIndex === 6}
          button component={Link} to={"/logout"}>
            <ListItemIcon><ExitToAppSharpIcon /></ListItemIcon>
            <ListItemText primary="Kirjaudu ulos" />
        </ListItem>
      </List>
    </div>
  );

  // YLÄPALKKI
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}>
            <MenuIconSharp />
          </IconButton>
          <Typography variant="h6" noWrap>
            RYHMÄ-C
          </Typography>
          <div className={classes.logoutButton}>
            <Link to="/logout">
              <IconButton color="secondary"><ExitToAppSharpIcon /></IconButton>
            </Link>
            <Controls.Popup
              title='Lisää laite'
              openPopup={openPopupLaite == true}
              onClick={() => handlePopupLaite()}
            >
            <DeviceForm/>
            </Controls.Popup>

            <Controls.Popup
              title='Lisää käyttäjä'
              openPopup={openPopupHenk == true}
              onClick={() => handlePopupHenk()}
            >
            <AddUserForm/>
            </Controls.Popup>
          </div>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
              <CloseIconSharp />
            </IconButton>
            {drawer}
          </Drawer>
        </Hidden><Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <div className={classes.content}>
        <div className={classes.toolbar} />
      </div>
    </div>
  );
}
export default ResponsiveDrawer;