import {useSelector, useDispatch} from 'react-redux';
import * as React from 'react';
import { Box } from '@mui/material';
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


import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';

import { useHistory } from 'react-router-dom';

import PickupModal from '../PickupModal/PickupModal'



function NavBar() {

  const history = useHistory()
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const pages = ['Home', 'Drop a Shift', 'Trade Shift', 'Take a Shift', 'Vacation Request', 'Call in sick', 'About'];
  const settings = ['Profile', 'Colleagues', 'Full Calendar', 'Logout'];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);


  
    //------------------- Menu openers --------------------------
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
    //------------------- Menu openers --------------------------


    //------------------- Menu Option logic -------------------------------------
    const handleCloseNavMenu = (pageName) => {

      // This switch statement creates logic that will lead a user to
      //  different pages based on which button they click on.
      switch (pageName) {
        case 'Home':
          console.log('Switch: routing to -> home View');
          history.push('/user')
          break;
        case 'Drop a Shift':
          console.log('Switch: routing to -> Give Away Shift View');
          // dispatch({type: SET_MODIFIER, payload:'Shift Giveaway'})
          // history.push('/modify-shift/drop/-1')
          break;
        case 'Trade Shift':
          console.log('Switch: routing to -> Trade Shift View');
          // dispatch({type: SET_MODIFIER, payload:'Shift Trade'})
          // history.push('/modify-shift/trade/-1')
          break;
        case 'Take a Shift':
          console.log('Switch: routing to -> Pick Up Shift View');
          // dispatch({type: SET_MODIFIER, payload:'Shift Pick-up'})
          // history.push('/modify-shift/pick-up/-1')
          break;
        case 'Vacation Request':
          console.log('Switch: routing to -> Vacation Request View');
          // dispatch({type: SET_MODIFIER, payload:'Vacation Request'})
          // history.push('/modify-shift/vaycay/-1')
          break;
        case 'Call in sick':
          console.log('Switch: routing to -> Call in sick View');
          break;
        case 'About':
          console.log('Switch: routing to -> About View');
          history.push('/about')
          break;
      
        default:
          console.log('Switch: Closing shift modification menu');
          break;
      }// End Switch

      setAnchorElNav(null);
    }; // END nav menu logic
  
    const handleCloseUserMenu = (settingName) => {

      // This switch statement creates logic that will lead a user to
      //  different pages based on which button they click on.
      switch (settingName) {
        case 'Profile':
          console.log('Switch Profile');
          break;
        case 'Account':
          console.log('Switch: routing to -> Account View');
          break;
        case 'Dashboard':
          console.log('Switch: routing to -> Dashboard View');
          break;
        case 'Logout':
          console.log('Switch: routing to -> Logout View');
          dispatch({ type: 'LOGOUT' })
          break;      
        default:
          console.log('Switch: Closing user menu');
          break;
      }// End Switch

      setAnchorElUser(null);
    };// END user menu logic
    //------------------- END Menu Option logic -------------------------------------

    const StyledFab = styled(Fab)({
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    });


  return (
    <Box>
      <AppBar position="static">
        <Container maxWidth="xl">

          <Toolbar disableGutters>


            {/* This is the profile icon */}
            <Box>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Profile Photo"
                    src={user.image_path}
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
                {/* Here are the profile menu options */}
                {settings.map((setting) => (
                  <MenuItem key={setting}
                    onClick={() => { handleCloseUserMenu(setting) }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>


            {/* This is the menu icon */}
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
                {/* Here are the menu options */}
                {pages.map((page) => (
                  <MenuItem key={page}
                    // This adds functionality of the menu items
                    onClick={() => { handleCloseNavMenu(page) }}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
              <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
            </Box>

            {/* Here's the logo */}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              Shifty
            </Typography>


            {/* This gives a box that when clicked will close off any open menus */}
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






      {/*---------- Bottom App bar ------------*/}
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer">
            {/* <MenuIcon /> */}
          </IconButton>
          {/* <StyledFab color="secondary" aria-label="add">
            <AddIcon />
          </StyledFab> */}
            <PickupModal user={user}/>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
          <Typography>{user.first_name} {user.last_name}</Typography>
          </IconButton>
          <IconButton color="inherit">
            {/* <MoreIcon /> */}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
export default NavBar;