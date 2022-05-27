import React, { useState, useEffect, ChangeEvent, FormEvent } from "react"
import Box, { BoxProps } from "@mui/material/Box";
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from '@mui/icons-material/Google';
import useStyles from "./style";
import  logo  from "../../assets/images/logo.svg";
import Message from "../../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { errorSelector, isAuth } from "../../redux/selectors/user";
import { login , loginWithGoogle} from "../../redux/feature/userSlice";
import { AppDispatch } from "../../redux/store";

const LoginForm = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector(errorSelector);

  useEffect(() => {
    if(email && password){
      setIsEmpty(false)
    }
    else {
      setIsEmpty(true);
    }
    
  }, [email, password]);

  function formSubmit(e: FormEvent): void{
    e.preventDefault();
    const userData = {
        email: email,
        password: password,
    }
    dispatch(login(userData));
}

const logWithGoogle = async() => {
  dispatch(loginWithGoogle(null));
}

  return (
    <> 
      <Box component="div" className={classes.cardLogoContainer}> 
        <img src={logo} className={classes.cardLogo} alt="instagram-logo"/>
      </Box>
      <form className={classes.form} onSubmit={(e) => formSubmit(e)}>
        {/* { error && <Message type="danger" message="Wrong email or password" />} */}
        <FormControl className={classes.formControl}>
          <TextField size="small" id="outlined-email-input" variant="outlined" placeholder="Email" type="email" className={classes.textInput} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField size="small" type="password" id="outlined-password-input" variant="outlined" placeholder="Password" className={classes.textInput} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <FormControl className={classes.formControl}>
          <Button type="submit" disabled={loading || isEmpty}>
            {loading ? "Loading..." : "Login"}
          </Button>
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
            <Button color="primary"> <FacebookIcon />Log in with Facebook</Button>
          </FormControl>
          <FormControl className={classes.formControl}>
            <Button color="primary" onClick={logWithGoogle}> <GoogleIcon />Log in with Google</Button>
          </FormControl>
        </Box>
      </form>
    </>
  )
}

export default LoginForm