import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

// MUI imports
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';






function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login



  const handleClickShowPassword = () => {
    setPasswordVisibility(!passwordVisibility)
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };



  return (
    <form className="formPanel" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}

      {/* <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            required
            value={username}
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
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div> */}

      <Box sx={{ minWidth: 120 }}>
              {/* -------------< Username Input >-------------- */}
              <FormControl sx={{ m: 1, width: '25ch', bgcolor:'white' }} variant="outlined">
                <TextField
                  id="username-input"
                  label="Username"
                  // placeholder='Username'
                  value={username}
                  required
                  onChange={(event) => setUsername(event.target.value)} />
              </FormControl>
              {/* -------------< // END Username Input >-------------- */}

              {/* -------------< Password Input >-------------- */}
              <FormControl sx={{ m: 1, width: '25ch', bgcolor:'white' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="password-input"
                  type={passwordVisibility ? 'text' : 'password'}
                  value={password}
                  name="Password"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end">
                        {passwordVisibility ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>} label="Password" />
              </FormControl>
              {/* -------------< // END Password Input >-------------- */}

      </Box>

      {/* <div> */}
        {/* <Button type="submit" name="submit">
          Log In
        </Button> */}
        <Box sx={{ textAlign:'center'}}>

        <Button type="submit" variant="contained" name="submit" sx={{ width:6/10, m:2}}>
          Log in
        </Button>
        </Box>
        {/* <input className="btn" type="submit" name="submit" value="Log In" /> */}
      {/* </div> */}
    </form>
  );
}

export default LoginForm;
