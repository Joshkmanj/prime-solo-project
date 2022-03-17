import React from 'react';
import NavBar from '../NavBar/NavBar';
import LogOutButton from '../LogOutButton/LogOutButton';

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
  
  
//--------- MUI List item stuff --------
const messages = [
  {
    id: 1,
    weekday: 'Monday',
    secondary: '7:00am - 3:30pm',
    date: '3/1',
  },
  {
    id: 2,
    weekday: 'Tuesday',
    secondary: '7:00am - 3:30pm',
    date: '3/2',
  },
  {
    id: 3,
    weekday: 'Wednesday',
    secondary: 'off :)',
    date: '3/3',
  },
  {
    id: 4,
    weekday: 'Thursday',
    secondary: 'off :)',
    date: '3/4',
  },
  {
    id: 5,
    weekday: "Friday",
    secondary: '7:00am - 3:30pm',
    date: '3/5',
  },
  {
    id: 6,
    weekday: 'Saturday',
    secondary: '7:00am - 3:30pm',
    date: '3/16',
  },
  {
    id: 7,
    weekday: 'Sunday',
    secondary: '7:00am - 3:30pm',
    date: '12/17',
  },
];

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});


//--------- MUI List item stuff --------


  
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
          {messages.map(({ id, weekday, secondary, date }) => (
            <React.Fragment key={id}>

{/*------- Here's logic that gives a subheader to list items dynamically ------*/}
              {id === 1 && (
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
                <ListItemAvatar 
                // sx={{ bgcolor: pink[500] }}
                >
                  <Avatar>{date}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={weekday} secondary={secondary} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/*---------- Bottom App bar ------------*/}
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <StyledFab color="secondary" aria-label="add">
            <AddIcon />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>


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
