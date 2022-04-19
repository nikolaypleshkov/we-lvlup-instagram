import React from "react"
import Box, { BoxProps } from "@mui/material/Box";
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import FacebookIcon from "@mui/icons-material/Facebook";
import { PrimaryButton } from "components/Buttons/Buttons";
import useStyles from "./styles";
import  logo  from "../../../assets/images/logo/logo.webp";
import { SubmitHandler, useForm } from "react-hook-form"
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

  const formSubmit: SubmitHandler<FormData> = async(data: FormData) => {
    const { email, password } = data;

    console.log(data);
  }

  return (
    <> 
      <Box component="div" className={classes.cardLogoContainer}> 
        <BoxImage src={logo} className={classes.cardLogo} alt="instagram-logo"/>
      </Box>
      <Box component="form" className={classes.form} onSubmit={() => handleSubmit(formSubmit)}>
        <FormControl className={classes.formControl}>
          <TextField size="small" id="outlined-email-input" variant="outlined" placeholder="Email" className={classes.textInput} {...register("email")} />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField size="small" type="password" id="outlined-password-input" variant="outlined" placeholder="Password" className={classes.textInput} {...register("password")} />
        </FormControl>
        <FormControl className={classes.formControl}>
          <PrimaryButton type="submit">Login</PrimaryButton>
        </FormControl>
        <Box component="div" className={classes.grid}>
          <FormControl className={classes.formControl}>
            <div className="space-breaker">
              <div className="line1"></div>
              <div className="line1-text">or</div>
              <div className="line1"></div>
            </div>
          </FormControl>
          <FormControl className={classes.formControl}>
            <PrimaryButton color="primary"> <FacebookIcon />Log in with Facebook</PrimaryButton>
            <Button>Forgotten your password?</Button>
          </FormControl>
        </Box>
      </Box>
    </>
  )
}

export default LoginForm