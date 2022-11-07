import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import ModifyShift from '../ModifyShift/ModifyShift';

import { createTheme, ThemeProvider } from "@mui/material/styles";

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);


    // ========< MUI GLOBAL THEME >==========
  // MUI info link https://mui.com/material-ui/customization/theme-components/#global-style-overrides
  // const theme = createTheme({
  //   typography: {
  //     allVariants: {
  //       fontFamily: ['Montserrat', 'sans-serif'].join(','),
  //     },
  //   },
  //   palette: {
  //     primary: {
  //         light: '#5f7993',
  //         main: '#607d8b',
  //         dark: '#34515e',
  //         contrastText: '#fafafa'
  //     },
  //     secondary: {
  //         main: '#d60000',
  //         contrastText: '#fafafa'
  //     }
  //   },
  // });

  const theme = createTheme( {
    palette: {
      type: 'light',
      primary: {
        main: '#149ad0',
      },
      secondary: {
        main: '#4e2190',
      },
      info: {
        main: '#4e2190',
      },
      error: {
        main: '#d60000',
      },
      success: {
        main: '#019344',
      },
    },
    typography: {
      allVariants: {
        fontFamily: ['Montserrat', 'system-ui', 'sans-serif'].join(','),
      },
    },
  });

  // light blue: #149ad0
  // dark blue: #3a77d0
  // purple: #4e2190
  // green: #019344


  // red: #d60000
  // light: '#5f7993',
  // main: '#607d8b',
  // dark: '#34515e',


  return (
    <>
    <ThemeProvider theme={theme}>
    <Router>
      {/* <div> */}

        {/* <Nav /> */}

        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/modify-shift/:modifier/:shiftId"
          >
            <ModifyShift />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>

        {/* <Footer /> */}

      {/* </div> */}
    </Router>
    </ThemeProvider>
    </>
  );
}

export default App;
