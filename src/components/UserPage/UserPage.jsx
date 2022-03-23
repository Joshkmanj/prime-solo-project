import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import NavBar from '../NavBar/NavBar';
// import LogOutButton from '../LogOutButton/LogOutButton';

//---------List item imports
// import * as React from 'react';

import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
//---------List item imports



function UserPage() {

  const user = useSelector((store) => store.user)
  const schedule = useSelector((store) => store.schedule)
  const calendar = useSelector((store) => store.calendar)
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('In useEffect');
    dispatch({ type: 'FETCH_CALENDAR', payload: user.id })
  }, [])


  ///----------------- avatar menu
  
  ///----------------- avatar menu


  return (

    <>
      {/* Top app bar */}
      <NavBar />
      {/* <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 300,
          '& ul': { padding: 0 },
        }}
        subheader={<li />}
      >
        {[0, 1, 2, 3, 4].map((sectionId) => (
          <li key={`section-${sectionId}`}>
            <ul>
              <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
              {calendar.map(({ id, calendar_date, week_number, week_day_name, staff_id, shift_time }) => (
                <ListItem button>
                  <ListItemAvatar>
                    {shift_date.length < 4 ? (<Avatar sx={{ fontSize: 'medium' }}>{shift_date}</Avatar>) : (<Avatar sx={{ fontSize: 'small' }}>{shift_date}</Avatar>)}
                  </ListItemAvatar>
                  <ListItemText primary={week_day_name} secondary={shift_time} />
                </ListItem>
              ))}
            </ul>
          </li>
        ))}
      </List> */}


      <React.Fragment>
        <CssBaseline />
        <Paper square sx={{ pb: '50px' }}>
          <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
            Schedule
          </Typography>
          <List sx={{ mb: 2 }}>
            {calendar.map(cDate => (
              <React.Fragment key={cDate.id}>

                {/*------- Here's logic that gives a subheader to list items dynamically ------*/}
                {cDate.week_day_name === 'Monday' && (
                  <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                    Week  
                    {/* {cDate.week_number} */}
                  </ListSubheader>
                )}
                {/* {id === 3 && (
                <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                  Next Week
                </ListSubheader>
              )} */}

                <ListItem button onClick={()=>{console.log('You clicked this:', cDate.abrv_date);}}>
                  <ListItemAvatar>
                    {cDate.abrv_date.length < 5 ? (<Avatar sx={{ fontSize: 'medium' }}>{cDate.abrv_date}</Avatar>) : (<Avatar sx={{ fontSize: 'small' }}>{cDate.abrv_date}</Avatar>)}
                  </ListItemAvatar>
                  {(cDate.shift_time) ? <ListItemText primary={cDate.week_day_name} secondary={cDate.shift_time} sx={{ bgcolor: '#9aca38' }}/> : <ListItemText primary={cDate.week_day_name} secondary={cDate.shift_time} />}
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Paper>




      </React.Fragment>

    </>


    // <div className="container">
    //   {/* <h2>Welcome, {user.username}!</h2> */}
    //   {/* <p>Your ID is: {user.id}</p> */}
    // </div>
  )
}

// this allows us to use <App /> in index.js
export default UserPage;
