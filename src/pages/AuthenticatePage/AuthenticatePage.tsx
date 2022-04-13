import React, { ElementType, FunctionComponent } from 'react'
import Box from "@material-ui/core/Box";
import { BoxProps, Button, Typography }  from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";
import CardBox from '../../components/Card/CardBox';
import banner from "../../assets/images/banner/phone-banner.webp";
import LoginForm from '../../components/Forms/Login/LoginForm';
import RegisterForm from '../../components/Forms/Register/RegisterForm';
import Footer from '../../layouts/Footer/Footer';
import { Link } from 'react-router-dom';

interface IBox{
  src: BoxProps,
  className: string,
  alt: string
}
const BoxImage = (props: IBox) => <Box component="img" {...props} />
// IntrinsicAttributes
const AuthenticatePage: FunctionComponent = () =>{
    const classes = useStyles();

  return (
    <Box component="main" className={classes.content}> 
       <Grid container justifyContent='center' spacing={4} className={classes.gridContainer}> 
            <Grid item xs={6} md={8} className={classes.bannerImage}>
              <BoxImage src={banner} className={classes.image} alt="home-banner-img" />
            </Grid>
            <Grid item xs={6} md={4} className={classes.card}>
                <CardBox >
                  <LoginForm />
                </CardBox>
                <CardBox>
                    <Typography align='center' className={classes.typo}>
                        Don't have an an account?&nbsp;<Button component={Link} color="primary" to="register">Sign up</Button>
                    </Typography>
                </CardBox>
            </Grid>
       </Grid>
       <Footer />
    </Box>
  )
}

export default AuthenticatePage