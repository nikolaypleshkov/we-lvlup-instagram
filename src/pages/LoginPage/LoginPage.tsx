import React from 'react'
import Box from "@material-ui/core/Box";
import useStyles from "./styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardBox from 'components/Card/CardBox';
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import LoginForm from "pages/LoginPage/LoginForm/LoginForm";
import Footer from 'layouts/Footer/Footer';
const LoginPage = () => {
    const classes = useStyles();
  return (
    
    <Box component="main" className={classes.content}>
        <Grid container justifyContent='center' spacing={4} className={classes.gridContainer}>
            <Grid item className={classes.card}>
                <CardBox>
                    <LoginForm />
                </CardBox>
                <CardBox>
                    <Typography align='center' className={classes.typo}>
                        Don't have an account? <Button component={Link} to="/register" color="primary">Sign up</Button>
                    </Typography>
                </CardBox>
            </Grid>
        </Grid>
        <Footer />
    </Box>
  )
}

export default LoginPage