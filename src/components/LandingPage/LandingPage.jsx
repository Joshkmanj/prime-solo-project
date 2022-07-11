import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// CSS
import './LandingPage.css';



function LandingPage() {
  const [heading, setHeading] = useState('Welcome to Shifty');
  const history = useHistory();

  const goToLogin = (event) => {
    history.push('/login');
  };
  const goToRegistration = (event) => {
    history.push('/registration');
  };

  return (
    <div className="landing-grid">
      <h2 className='landing-heading'>{heading}</h2>

      <Typography sx={{ display: { xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block' }, variant: 'h3' }}>
        <strong>Please switch to a mobile device (or a smaller screen) for optimal viewing.</strong>
      </Typography>
      {/* <Typography sx={{ variant:'p' }}>
            Shifty is a shift trading platform that was created to solve a problem that I had encountered at my former job.
            In order to trade a shift, you would either have to fill out a paper form and turn it into a drop box, or you
            would have to find an open computer to fill out a request. In either scenario, it would take several business days
            for the transaction to be approved. If the date was within a certain timeframe, you would have to call/text a department 
            administrator to get their approval. When I first started working in the Emergency Department in 2019 there was
            a committee of employees who were super-users of this shift scheduling software, whose purpose was to be a resource
            for other employees to ask for help with the app. I believe that if auxiliary staff resources are consistently spent
            helping employees use a tool thats unrelated to their primary function, then your UI/UX is miserably inadequate, and your software ineffectual. 
            Shifty has a simple user interface, and makes picking up and giving away shifts a breeze.
          </Typography> */}





      {/* <RegisterForm /> */}
      {/* <h4>Already a Member?</h4> */}

      <Box className='landing-nav'>
        <Button variant="contained" onClick={goToLogin}
        >Login</Button>
        <Button variant="outlined" onClick={goToRegistration}
        >Register</Button>
      </Box>


    </div>
  );
}

export default LandingPage;
