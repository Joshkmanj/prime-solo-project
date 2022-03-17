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


function NavBar() {

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const pages = ['Home', 'Give Away Shift', 'Trade Shift', 'Pick Up Shift', 'Vacation Request', 'Call in sick', 'About'];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
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
          break;
        case 'Give Away Shift':
          console.log('Switch: routing to -> Give Away Shift View');
          break;
        case 'Trade Shift':
          console.log('Switch: routing to -> Trade Shift View');
          break;
        case 'Pick Up Shift':
          console.log('Switch: routing to -> Pick Up Shift View');
          break;
        case 'Vacation Request':
          console.log('Switch: routing to -> Vacation Request View');
          break;
        case 'Call in sick':
          console.log('Switch: routing to -> Call in sick View');
          break;
        case 'About':
          console.log('Switch: routing to -> About View');
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
                    <Typography
                      textAlign="center"
                    >{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Here's the logo */}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              ShiftAce
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







    </Box>
  )
}
export default NavBar;