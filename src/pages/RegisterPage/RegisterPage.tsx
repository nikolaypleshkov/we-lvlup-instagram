import React from "react"
import Box from "@mui/material/Box";
import useStyles from "./styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import RegisterForm from "pages/RegisterPage/RegisterForm/RegisterForm";
import CardBox from "components/Card/CardBox";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Footer from "layouts/Footer/Footer";
const RegisterPage = () => {
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

export default RegisterPage