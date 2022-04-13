import React from 'react'
import Box from "@material-ui/core/Box";
import useStyles from "./styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import RegisterForm from '../../components/Forms/Register/RegisterForm';
import CardBox from '../../components/Card/CardBox';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Footer from '../../layouts/Footer/Footer';
const SignupPage = () => {
    const classes = useStyles();
  return (
    <Box component="main" className={classes.content}>
        <Grid container justifyContent='center' spacing={4} className={classes.gridContainer}>
            <Grid item className={classes.card}>
                <CardBox>
                    <RegisterForm />
                </CardBox>
                <CardBox>
                    <Typography align='center' className={classes.typo}>
                        Have an account? <Button component={Link} to="/login" color="primary">Sign in</Button>
                    </Typography>
                </CardBox>
            </Grid>
        </Grid>
        <Footer />
    </Box>
  )
}

export default SignupPage