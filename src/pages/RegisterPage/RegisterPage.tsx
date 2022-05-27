import React from "react"
import Box from "@mui/material/Box";
import useStyles from "./style";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import RegisterForm from "./RegisterForm";
import CardBox from "../../components/Card/CardBox";
import Button from "@mui/material/Button";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuth } from "../../redux/selectors/user";
const RegisterPage = () => {
    const classes = useStyles();
    const authenticated = useSelector(isAuth);
    const location = useLocation();
  
    return authenticated ? (
      <Navigate to='/settings' replace state={{ from: location }} />
    ) : (
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
    </Box>
  )
}

export default RegisterPage;