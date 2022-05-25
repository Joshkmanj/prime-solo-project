// -----< Regular imports >-------
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar';
// -----< // END Regular imports >-----

//---------< MUI imports >----------------
import NestedModal from '../ModModal/ModModal.jsx'
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
//---------< // END MUI imports >---------


import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';



function UserPage() {

  // --------< Redux store variables >-----------------
  const user = useSelector((store) => store.user) // This grabs all the user's relevant data.
  // const schedule = useSelector((store) => store.schedule) // This grabs ONLY the shifts an employee works.
  const calendar = useSelector((store) => store.calendar) // This grabs calendar data, plus all the shifts an employee works.
  // --------< // END Redux store variables >----------

  const dispatch = useDispatch(); // This initializes useDispatch


  useEffect(() => { // On page load
    // console.log('In useEffect'); // Test log
    dispatch({ type: 'FETCH_CALENDAR', payload: user.id }) // This triggers a GET request for the user's calendar schedule
    dispatch({ type: 'FETCH_OPEN_SHIFTS', payload: user.id }) // This triggers a GET request for all open shifts
  }, [])



  return (

    <>
      <NavBar />
      <React.Fragment>
        <CssBaseline />
        <Paper square sx={{ pb: '50px' }}>
          <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
            Schedule
          </Typography>
          <List sx={{ mb: 2 }}>
            {calendar.map(cDate => (
              <React.Fragment key={cDate.id}>
                {cDate.week_day_name === 'Monday' && (
                  <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                    Week {cDate.week_number}
                  </ListSubheader>
                )}
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar sx={{ fontSize: 'medium' }}>{cDate.abrv_date}</Avatar>
                  </ListItemAvatar>
                  <NestedModal cDate={cDate} user={user} />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </React.Fragment>
    </>
  )
}

export default UserPage; // this allows us to use <UserPage /> in App.js
