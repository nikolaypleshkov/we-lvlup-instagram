import React, { useState, useEffect, ChangeEvent, FormEvent } from "react"
import Box, { BoxProps } from "@mui/material/Box";
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import FacebookIcon from "@mui/icons-material/Facebook";
import { PrimaryButton } from "components/Buttons/Buttons";
import useStyles from "./styles";
import  logo  from "../../../assets/images/logo/logo.webp";
import { SubmitHandler, useForm } from "react-hook-form";
import "styles/components/Form.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { login, setError } from "redux/actions/authActions";
import Message from "components/Message";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

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

const schema = Joi.object({
  email: Joi.string().email({ tlds: {allow: false} }).required(),
  password: Joi.string().required()
})

const LoginForm = () => {
  const classes = useStyles();
  const { register, setValue, handleSubmit, formState: { errors }, getValues} = useForm<FormData>({
    resolver: joiResolver(schema)
  });
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      if(error){
        dispatch(setError(""))
      }
    }
  }, [error, dispatch]);

  useEffect(() => {
    const data = { email, password};
    if(email && password){
      setIsEmpty(false)
    }
    else {
      setIsEmpty(true);
    }
    
  }, [email, password]);

  function formSubmit(e: FormEvent): void{
    e.preventDefault();
    if(error){
      dispatch(setError(""));
    }
    setLoading(true);
    dispatch(login({ email, password }, () => setLoading(false)));
  }

  return (
    <> 
      <Box component="div" className={classes.cardLogoContainer}> 
        <BoxImage src={logo} className={classes.cardLogo} alt="instagram-logo"/>
      </Box>
      <form className={classes.form} onSubmit={(e) => formSubmit(e)}>
        { error && <Message type="danger" message={error} />}
        <FormControl className={classes.formControl}>
          <TextField size="small" id="outlined-email-input" variant="outlined" placeholder="Email" className={classes.textInput} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField size="small" type="password" id="outlined-password-input" variant="outlined" placeholder="Password" className={classes.textInput} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <FormControl className={classes.formControl}>
          <PrimaryButton type="submit" disabled={loading || isEmpty}>
            {loading ? "Loading..." : "Login"}
          </PrimaryButton>
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
      </form>
    </>
  )
}

export default LoginForm