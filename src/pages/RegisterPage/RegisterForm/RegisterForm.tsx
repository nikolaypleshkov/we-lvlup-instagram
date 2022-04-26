import React, { useEffect, useState } from "react"
import Box, { BoxProps } from "@mui/material/Box";
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import FacebookIcon from "@mui/icons-material/Facebook";
import { PrimaryButton } from "../../../components/Buttons/Buttons"
import useStyles from "./styles";
import  logo  from "../../../assets/images/logo/logo.webp";
import Typography from "@mui/material/Typography";
import { UserInterface } from "./user";
import { SubmitHandler, useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import ErrorIcon from "@mui/icons-material/Error";
import "styles/components/Form.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { signup, setError } from "redux/actions/authActions";
import Message from "components/Message";
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
  const { register, handleSubmit, formState: { errors }, setError } = useForm<UserInterface>({
    resolver: joiResolver(schema),
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    return () => {
      if(error){
        // dispatch(setError(""));
      }
    }
  }, [error, dispatch])

  const formSubmit: SubmitHandler<UserInterface> = async(data: UserInterface) =>{
    const { email, fullname, username, password } = data;
    if(error){
      // dispatch(setError(""));
    }
    setLoading(true);
    dispatch(signup({ email, password, fullname, username}, () => setLoading(false)));
  }
  return (
    <>
      <Box component="div" className={classes.cardLogoContainer}> 
        <BoxImage src={logo} className={classes.cardLogo} alt="instagram-logo"/>
      </Box>
      <Box component="p" className={classes.mutedText}>
        Sign up to see photos and videos from your friends.
      </Box>
      <Box className={classes.grid}>
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
      </Box>
    <form className={classes.form} onSubmit={handleSubmit(formSubmit)}>
      { error && <Message type="danger" message={error} />}
      <FormControl className={classes.formControl}>
        <TextField size="small" id="outlined-email-input" variant="outlined" placeholder="Email" className={classes.textInput}  {...register("email")}/>
          {errors.email?.message && <p className="error-label"><ErrorIcon /></p>}
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField size="small" id="outlined-fullname-input" variant="outlined" placeholder="Full Name" className={classes.textInput} {...register("fullname")} />
        {errors.fullname?.message &&  <p className="error-label"><ErrorIcon /></p>}
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField size="small" id="outlined-username-input" variant="outlined" placeholder="Username" className={classes.textInput} {...register("username")} />
        {errors.username?.message &&  <p className="error-label"><ErrorIcon /></p>}
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField size="small" type="password" id="outlined-password-input" variant="outlined" placeholder="Password" className={classes.textInput} {...register("password")} />
        {errors.password?.message &&  <p className="error-label"><ErrorIcon /></p>}
      </FormControl>
      <FormControl className={classes.formControl}>
        <PrimaryButton type="submit" disabled={loading}>
          {loading ? "Loading..." : "Next"}
        </PrimaryButton>
      </FormControl>
    </form>
    <FormControl className={classes.formControl}>
      <Typography className={classes.terms}>
        By signing up, you agree to our <strong>Terms</strong>. Learn how we collect, use and share your data in our <strong>Data Policy</strong>, and how we use cookies and similar technology in our <strong>Cookie Policy</strong>.
      </Typography>
    </FormControl>
    </>
  )
}

export default RegisterForm

