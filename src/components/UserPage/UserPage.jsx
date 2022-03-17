// import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

import { Box } from '@mui/material';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);


  const pages = ['Home', 'Give Away Shift', 'Trade Shift', 'Pick Up Shift', 'Vacation Request', 'Call in sick', 'About'];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = (pageName) => {
      console.log('NavMenu: page name is:', pageName);

      // This switch statement creates logic that will lead a user to
      //  different pages based on which button they click on.
      switch (pageName) {
        case 'Home':
          console.log('Switch home');
          break;
        case 'Give Away Shift':
          console.log('Switch Give Away Shift');
          break;
        case 'Trade Shift':
          console.log('Switch Trade Shift');
          break;
        case 'Pick Up Shift':
          console.log('Switch Pick Up Shift');
          break;
        case 'Vacation Request':
          console.log('Switch Vacation Request');
          break;
        case 'Call in sick':
          console.log('Switch Call in sick');
          break;
        case 'About':
          console.log('Switch About');
          break;
      
        default:
          console.log('Switch Default case');
          break;
      }// End Switch

      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = (settingName) => {
      console.log('UserMenu: setting name is:', settingName);
      setAnchorElUser(null);
    };


  
  return (
<Box>
<AppBar position="static">
      <Container maxWidth="xl">

        <Toolbar disableGutters>



          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Profile Photo" 
                src="https://media-exp1.licdn.com/dms/image/C4E03AQGlycW9Vpes2w/profile-displayphoto-shrink_800_800/0/1647360104027?e=1652918400&v=beta&t=rBnpDU56XgPtE4XOBxYKGHvRK0JdU2VkudtdyU1TM98" 
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting}
                onClick={()=>{handleCloseUserMenu(setting)}}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>



          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page}
                // This adds functionality of the menu items
                onClick={()=>{handleCloseNavMenu(page)}}>
                  <Typography 
                  textAlign="center"
                  >{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>


          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            ShiftAce
          </Typography>



          {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box> */}
          






        </Toolbar>

      </Container>
    </AppBar>







</Box>



    // <div className="container">
    //   {/* <h2>Welcome, {user.username}!</h2> */}
    //   {/* <p>Your ID is: {user.id}</p> */}
    // </div>

  );
}

// this allows us to use <App /> in index.js
export default UserPage;
