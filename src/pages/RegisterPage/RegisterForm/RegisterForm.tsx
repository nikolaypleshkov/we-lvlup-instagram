import React, { useState } from "react"
import Box, { BoxProps } from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl"
import TextField from "@material-ui/core/TextField"
import FacebookIcon from "@material-ui/icons/Facebook";
import { PrimaryButton } from "../../../components/Buttons/Buttons"
import useStyles from "./styles";
import  logo  from "../../../assets/images/logo/logo.webp";
import Typography from "@material-ui/core/Typography";
import { signUpWithEmail } from "../../../service/api/auth-service";
import { UserInterface } from "./user";
import { SubmitHandler, useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import ErrorIcon from "@material-ui/icons/Error";
import "styles/components/Form.scss";

interface IBox{
  src: BoxProps,
  className: string,
  alt: string
}

const BoxImage = (props: IBox) => <Box component="img" {...props} />

const schema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "bg", "eu"] } }).required(),
  fullname: Joi.string().min(3).required(),
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
})

const RegisterForm = () => {
  const classes = useStyles();
  const { register, handleSubmit, formState: { errors } } = useForm<UserInterface>({
    resolver: joiResolver(schema),
  });
  const [message, setMessage] = useState("");

  const formSubmit: SubmitHandler<UserInterface> = async(data: UserInterface) =>{
    const { email, fullname, username, password } = data;
     try{
        signUpWithEmail(email, password, fullname, username)
        .then((res) => {
          console.log(res);
          setMessage(res);
        })
        .catch((err) => {
          console.log(err); 
       });
     }
     catch(error){
       alert("Something went wrong: " + error);
     }
  }
  return (
    <>
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
    <form className={classes.form} onSubmit={handleSubmit(formSubmit)}>
      <p className={message == "Successful" ? "success-message" : "error-message"}>{message}</p>
      <FormControl className={classes.form}>
        <TextField size="small" id="outlined-email-input" variant="outlined" placeholder="Email" className={classes.textInput}  {...register("email")}/>
          {errors.email?.message && <p className="error-label"><ErrorIcon /></p>}
      </FormControl>
      <FormControl className={classes.form}>
        <TextField size="small" id="outlined-fullname-input" variant="outlined" placeholder="Full Name" className={classes.textInput} {...register("fullname")} />
        {errors.fullname?.message &&  <p className="error-label"><ErrorIcon /></p>}
      </FormControl>
      <FormControl className={classes.form}>
        <TextField size="small" id="outlined-username-input" variant="outlined" placeholder="Username" className={classes.textInput} {...register("username")} />
        {errors.username?.message &&  <p className="error-label"><ErrorIcon /></p>}
      </FormControl>
      <FormControl className={classes.form}>
        <TextField size="small" type="password" id="outlined-password-input" variant="outlined" placeholder="Password" className={classes.textInput} {...register("password")} />
        {errors.password?.message &&  <p className="error-label"><ErrorIcon /></p>}
      </FormControl>
      <FormControl className={classes.form}>
        <PrimaryButton type="submit">Next</PrimaryButton>
      </FormControl>
    </form>
    <FormControl className={classes.form}>
      <Typography className={classes.terms}>
        By signing up, you agree to our <strong>Terms</strong>. Learn how we collect, use and share your data in our <strong>Data Policy</strong>, and how we use cookies and similar technology in our <strong>Cookie Policy</strong>.
      </Typography>
    </FormControl>
    </>
  )
}

export default RegisterForm

