import React from 'react'
import Box, { BoxProps } from "@material-ui/core/Box";
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import FacebookIcon from "@material-ui/icons/Facebook";
import { PrimaryButton } from '../../Buttons/Buttons'
import useStyles from "../Login/styles";
import  logo  from "../../../assets/images/logo/logo.webp";
import Typography from '@material-ui/core/Typography';

interface IBox{
  src: BoxProps,
  className: string,
  alt: string
}
const BoxImage = (props: IBox) => <Box component="img" {...props} />

const RegisterForm = () => {
  const classes = useStyles();
  return (
    <Box component="form" className={classes.form}>
      <Box component="div" className={classes.cardLogoContainer}> 
        <BoxImage src={logo} className={classes.cardLogo} alt="instagram-logo"/>
      </Box>
      <Box component="p" className={classes.mutedText}>
        Sign up to see photos and videos from your friends.
      </Box>
      <FormControl className={classes.form}>
        <PrimaryButton > <FacebookIcon />Log in with Facebook</PrimaryButton>
      </FormControl>
      <FormControl className={classes.form}>
      <div className="space-breaker">
        <div className="line1"></div>
        <div className="line1-text">or</div>
        <div className="line1"></div>
      </div>
    </FormControl>
    <FormControl className={classes.form}>
      <TextField size="small" id="outlined-basic" variant="outlined" placeholder="Email" className={classes.textInput} />
      <TextField size="small" id="outlined-basic" variant="outlined" placeholder="Full Name" className={classes.textInput} />
      <TextField size="small" id="outlined-basic" variant="outlined" placeholder="Username" className={classes.textInput} />
      <TextField size="small" type="password" id="outlined-password-input" variant="outlined" placeholder="Password" className={classes.textInput} />
    </FormControl>
      <FormControl className={classes.form}>
        <PrimaryButton>Next</PrimaryButton>
      </FormControl>
    <FormControl className={classes.form}>
      <Typography className={classes.terms}>
        By signing up, you agree to our <strong>Terms</strong>. Learn how we collect, use and share your data in our <strong>Data Policy</strong>, and how we use cookies and similar technology in our <strong>Cookie Policy</strong>.
      </Typography>
    </FormControl>
  </Box>
  )
}

export default RegisterForm