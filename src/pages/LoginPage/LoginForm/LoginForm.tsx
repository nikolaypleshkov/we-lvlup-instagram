import React from "react"
import Box, { BoxProps } from "@material-ui/core/Box";
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import TextField from "@material-ui/core/TextField"
import FacebookIcon from "@material-ui/icons/Facebook";
import { PrimaryButton } from "../../../components/Buttons/Buttons";
import useStyles from "./styles";
import  logo  from "../../../assets/images/logo/logo.webp";
import { useForm } from "react-hook-form"
import "styles/components/Form.scss";
type FormData = {
  email: string;
  password: string;
}

interface IBox{
  src: BoxProps,
  className: string,
  alt: string
}

const BoxImage = (props: IBox) => <Box component="img" {...props} />

const LoginForm = () => {
  const classes = useStyles();
  const { register, setValue, handleSubmit, formState: { errors }} = useForm<FormData>();

  return (
    <> 
      <Box component="div" className={classes.cardLogoContainer}> 
        <BoxImage src={logo} className={classes.cardLogo} alt="instagram-logo"/>
      </Box>
      <Box component="form" className={classes.form}>
        <FormControl className={classes.form}>
          <TextField size="small" id="outlined-size-small" variant="outlined" placeholder="Email" className={classes.textInput} />
        </FormControl>
        <FormControl className={classes.form}>
          <TextField size="small" type="password" id="outlined-password-input" variant="outlined" placeholder="Password" className={classes.textInput} />
        </FormControl>
        <FormControl className={classes.form}>
          <PrimaryButton>Login</PrimaryButton>
        </FormControl>
        <FormControl className={classes.form}>
          <div className="space-breaker">
            <div className="line1"></div>
            <div className="line1-text">or</div>
            <div className="line1"></div>
          </div>
        </FormControl>
        <FormControl className={classes.form}>
          <Button color="primary"> <FacebookIcon />Log in with Facebook</Button>
          <Button>Forgotten your password?</Button>
        </FormControl>
      </Box>
    </>
  )
}

export default LoginForm