import React from 'react'
import Box from "@mui/material/Box";
import useStyles from "./styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardBox from 'components/Card/CardBox';
import Button from "@mui/material/Button";
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