import NavBar from '../NavBar/NavBar';

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function AboutPage() {

  const technologies = ['React', 'Redux', 'Sagas', 'Node', 'Axios', 'Express', 'Material UI', 'PostgresQL'];
  const people = ['Parents', 'Staci', 'Friends', 'Liz Kerber', 'Dane Smith', 'Kris', 'Mentors', 'Prime Staff & Students'];


  return (
    <>
      <div className="container">
        <NavBar />
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} mb={9}>

          <Typography variant="h5" component="div" gutterBottom mt={5}>
            Technologies used:
          </Typography>
          {technologies.map((tech, index) => (
            <Grid item xs={2} sm={4} md={4} key={tech}>
              <Item elevation={(index + 1)}>{tech}</Item>
            </Grid>
          ))}
          <Typography variant="h5" component="div" gutterBottom mt={4}>
            Biggest Challenges:
          </Typography>
          <Grid item xs={4} sm={4} md={4}>
            <Item elevation={12}>PostgresQl:
              <li>
                Generating a calendar from scratch
              </li>
              <li>
                Very complicated & convoluted queries
              </li>
            </Item>
          </Grid>
          <Grid item xs={4} sm={4} md={4} mt={1}>
            <Item elevation={24}>Material UI
            <li>
                When it's good, it's great
              </li>
            <li>
                It takes time and tutorials to learn how parts interact
              </li>
            </Item>
          </Grid>
          <Grid item xs={4} sm={4} md={4} mt={1}>
            <Item elevation={12}>PostgresQl again</Item>
          </Grid>

          <Typography variant="h5" component="div" gutterBottom mt={4}>
            Awesome people:
          </Typography>
          {people.map((name, index) => (
            <Grid item xs={2} sm={4} md={4} key={name}>
              <Item elevation={(8 - index)}>{name}</Item>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default AboutPage;
