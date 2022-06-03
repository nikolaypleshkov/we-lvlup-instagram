import {
  Box,
  Button,
  ButtonProps,
  Card,
  CardHeader,
  FormControl,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { WithStyles } from '@mui/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, Link } from 'react-router-dom';
import CardBox from '../../components/Card/CardBox';
import SEO from '../../components/SEO';
import { isAuth } from '../../redux/selectors/user';
import LoginForm from './LoginForm';
import useStyles from './style';
const LoginPage = () => {
  const classes = useStyles();
  const authenticated = useSelector(isAuth);
  const location = useLocation();

  return authenticated ? (
    <Navigate to='/' replace state={{ from: location }} />
  ) : (
    <>
      <SEO title='Login' />
      <Box component='main' className={classes.content}>
        <Grid
          container
          justifyContent='center'
          spacing={4}
          className={classes.gridContainer}
          sx={{
            marginLeft: "0 !important" }}
        >
          <Grid item className={classes.card}>
            <CardBox>
              <LoginForm />
            </CardBox>
                <CardBox>
                    <Typography align='center' className={classes.typo}>
                        Create an account? <Button component={Link} to="/register" color="primary">Sign up</Button>
                    </Typography>
                </CardBox>
          </Grid>
        </Grid>
        {/* <Footer /> */}
      </Box>
    </>
  );
};

export default LoginPage;
