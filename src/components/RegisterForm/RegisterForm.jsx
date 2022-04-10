// -----< Regular imports >------------
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
// -----< // END Regular imports >-----


//---------< MUI imports >----------------------
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
//---------< // END MUI imports >----------------



function RegisterForm() {

  // ------------< Variables >-----------
  // local state: These variables hold the username and password before they are dispatched.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [shiftTime, setShiftTime] = useState('');
  const [shiftSchedule, setShiftSchedule] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  // Redux store: This grabs the redux store error messages that are used on this screen.
  const errors = useSelector((store) => store.errors);
  // --------< // END Variables >--------

  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        shiftTime: shiftTime,
        shiftSchedule: shiftSchedule,
      },
    });
  }; // end registerUser



  const handleScheduleChange = (event) => {
    setShiftSchedule(event.target.value);
  };
  const handleTimeChange = (event) => {
    setShiftTime(event.target.value);
  };


  const handlePasswordChange = (prop) => (event) => {
    setPassword( event.target.value);
  };

  const handleClickShowPassword = () => {
    setPasswordVisibility(!passwordVisibility)
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };






  return (
    <div>

      {/* ---------------------MUI------------------------- */}
      <Card sx={{ maxWidth: 345 }}>
        <form className="formPanel" onSubmit={registerUser}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Register User
            </Typography>
            {errors.registrationMessage && (
              <h3 className="alert" role="alert">
                {errors.registrationMessage}
              </h3>
            )}
            <div>
              <label htmlFor="username">
                Usernannnnme:
                <input
                  type="text"
                  name="username"
                  value={username}
                  required
                  onChange={(event) => setUsername(event.target.value)}
                />
              </label>
            </div>



            <div>
              <label htmlFor="password">
                Password:
                <input
                  type="password"
                  name="password"
                  value={password}
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>
            </div>



              <TextField
                required
                id="outlined-required"
                label="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />





              {/* -------------< Password Input >-------------- */}
            <Box sx={{ minWidth: 120 }}>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={passwordVisibility ? 'text' : 'password'}
                  value={password}
                  name="Password"
                  onChange={handlePasswordChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end">
                        {passwordVisibility ? <Visibility/> : <VisibilityOff/> }
                      </IconButton>
                    </InputAdornment>} label="Password" />
              </FormControl>
            </Box>
            {/* -------------< // END Password Input >-------------- */}

            {/* -------------< Shift Schedule selection >-------------- */}
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth variant="standard">
                <InputLabel id="Schedule-picker">Shift Schedule</InputLabel>
                <Select labelId="Schedule-picker" id="Schedule-picker"
                  value={shiftSchedule}
                  onChange={handleScheduleChange}>
                  <MenuItem value={1}>Schedule A</MenuItem>
                  <MenuItem value={2}>Schedule B</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {/* -------------< // END Shift Schedule selection >-------------- */}


            {/* -------------< Shift Time selection >-------------- */}
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="shift-time-picker">
                  Shift Time
                </InputLabel>
                <Select labelId="Schedule-picker" id="Schedule-picker"
                  value={shiftTime}
                  onChange={handleTimeChange}>
                  <MenuItem value={'day'}>7:00am - 3:30pm</MenuItem>
                  <MenuItem value={'eve'}>3:00pm - 11:30pm</MenuItem>
                  <MenuItem value={'nht'}>11:00pm - 7:30am</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {/* -------------< // END Shift Time selection >-------------- */}


            <Typography variant="body2" color="text.secondary">
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" size="small" type="submit" name="submit" value="Register"
              sx={{ flexGrow: 1 }}>Register</Button>
          </CardActions>
        </form>
      </Card>
    </div>




  );
}

export default RegisterForm;
