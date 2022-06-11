import React from 'react';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';

import Login from './components/Login';
import Logout from './components/Logout';
import Devices from './components/Devices';
import Navigation from './components/Navigation';
import Users from './components/Users';
import Demo from './components/Demo';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#FFFFFF"
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)'
      }
    }
  },
  props: {
    MuiIconButton: {
      disableRipple: true
    }
  },

  breakpoints: {
    values: {
      xs: 400,
      sm: 600,
    }
  }
})

const useStyles = makeStyles({
  appMain: {
    width: 'auto',
    marginLeft: 250,
    marginRight: 10,
    [theme.breakpoints.down('xs')]:
    {
      width: '100%',
      marginLeft: 0,
    }
  },
})

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.appMain}>
        <BrowserRouter>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/devices" component={Devices} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/demo" component={Demo} /> {/*Komponenttien demoa varten*/}
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;