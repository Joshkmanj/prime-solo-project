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

  const user = useSelector((store)=> store.user)
  const schedule = useSelector((store)=> store.schedule)
  const dispatch = useDispatch();
  
  useEffect(()=>{
    console.log('In useEffect');
    dispatch({type:'FETCH_SHIFTS', payload: user.id})
  },[])


//--------- MUI List item stuff --------
const calendar = [
  {
    id: 1,
    week_day_name: 'Monday',
    shift_time: '7:00am - 3:30pm',
    shift_date: '3/1',
  },
  {
    id: 2,
    week_day_name: 'Tuesday',
    shift_time: '7:00am - 3:30pm',
    shift_date: '3/2',
  },
  {
    id: 3,
    week_day_name: 'Wednesday',
    shift_time: 'off :)',
    shift_date: '3/3',
  },
  {
    id: 4,
    week_day_name: 'Thursday',
    shift_time: 'off :)',
    shift_date: '3/4',
  },
  {
    id: 5,
    week_day_name: "Friday",
    shift_time: '7:00am - 3:30pm',
    shift_date: '3/5',
  },
  {
    id: 6,
    week_day_name: 'Saturday',
    shift_time: '7:00am - 3:30pm',
    shift_date: '3/16',
  },
  {
    id: 7,
    week_day_name: 'Sunday',
    shift_time: '7:00am - 3:30pm',
    shift_date: '12/17',
  },
];


//--------- MUI List item stuff --------
/*
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
// document.write(today);
*/

// let todaysDate = (today);
// console.log('current day is:', todaysDate);
  
  return (

<>
{/* Top app bar */}
<NavBar />

<React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: '50px' }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
          Schedule
        </Typography>
        <List sx={{ mb: 2 }}>
          {schedule.map(({ id, current_week_number, week_number, week_day_name, shift_time, shift_date }) => (
            <React.Fragment key={id}>

{/*------- Here's logic that gives a subheader to list items dynamically ------*/}
              { week_day_name === 'Monday' && (
                <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                  Current Week
                </ListSubheader>
              )}
              {/* {id === 3 && (
                <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                  Next Week
                </ListSubheader>
              )} */}

              <ListItem button>
                <ListItemAvatar>
                {shift_date.length < 4 ? (<Avatar sx={{ fontSize: 'medium' }}>{shift_date}</Avatar>) : (<Avatar sx={{ fontSize: 'small' }}>{shift_date}</Avatar>)}
                </ListItemAvatar>
                <ListItemText primary={week_day_name} secondary={shift_time} />
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
