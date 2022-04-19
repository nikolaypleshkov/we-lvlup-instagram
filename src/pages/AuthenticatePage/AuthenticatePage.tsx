import React from "react";
import Box, { BoxProps } from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardBox from "components/Card/CardBox";
import banner from "assets/images/banner/phone-banner.webp";
import { Link } from "react-router-dom";
import LoginForm from "pages/LoginPage/LoginForm/LoginForm";
import Footer from "layouts/Footer/Footer";
import useStyles from "./styles";

interface IBox {
  src: BoxProps;
  className: string;
  alt: string;
}

const BoxImage = (props: IBox) => {
  return <Box component="img" {...props} />;
};
// IntrinsicAttributes
const AuthenticatePage = () => {
  const classes = useStyles();
  return (
    <Box component="main" className={classes.content}>
      <Grid container justifyContent="center" spacing={4} className={classes.gridContainer}>
        <Grid item xs={6} md={8} className={classes.bannerImage}>
          <BoxImage src={banner} className={classes.image} alt="home-banner-img" />
        </Grid>
        <Grid item xs={6} md={4} className={classes.card}>
          <CardBox>
            <LoginForm />
          </CardBox>
          <CardBox>
            <Typography align="center" className={classes.typo}>
              Don't have an an account?&nbsp;
              <Button component={Link} color="primary" to="register">
                Sign up
              </Button>
            </Typography>
          </CardBox>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
};

export default AuthenticatePage;
