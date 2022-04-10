import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


function LandingPage() {
  const [heading, setHeading] = useState('Welcome to Shifty');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      {/* <Box sx={{display:'flex'}}> */}
      <h2>{heading}</h2>

      <div className="grid">
          <Typography sx={{ display: { xs: 'none', sm: 'block', md:'block', lg: 'block', xl: 'block' }, variant:'h3' }}>
            <strong>Please switch to a mobile device (or a smaller screen) for optimal viewing.</strong>
          </Typography>
          {/* <Typography sx={{ variant:'p' }}>
            Shifty is a shift trading platform that was created to solve a problem that I had encountered at my former job.
            In order to trade a shift, you would either have to fill out a paper form and turn it into a drop box, or you
            would have to find an open computer to fill out a request. In either scenario, it would take several business days
            for the transaction to be approved. If the date was within a certain timeframe, you would have to call/text a department 
            administrator to get their approval. When I first started working in the Emergency Department in 2019 there was
            a committee of employees who were super-users of this shift scheduling software, whose purpose was to be a resource
            for other employees to ask for help with the app. Shifty has a simple user interface, and makes picking up and giving
            away shifts a breeze.
          </Typography> */}
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            {/* <button className="btn btn_sizeSm" >
              Login
            </button> */}
            <Button variant="contained" onClick={onLogin} size="small">Login</Button>
          </center>
        {/* </div> */}
      </div>
          {/* </Box> */}
    </div>
  );
}

export default LandingPage;
