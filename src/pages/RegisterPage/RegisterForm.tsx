import React, { useEffect, useState } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import FacebookIcon from "@mui/icons-material/Facebook";
import useStyles from "./style";
import logo from "../../assets/images/logo.svg";
import { UserInterface } from "./user";
import { SubmitHandler, useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import ErrorIcon from "@mui/icons-material/Error";
import { useDispatch } from "react-redux";
import Message from "../../components/Message";
import { Navigate, useLocation } from "react-router-dom";
import { Button, IconButton, Tooltip } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signup } from "../../redux/feature/userSlice";
import { AppDispatch } from "../../redux/store";

const schema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "bg", "eu"] }
    })
    .required(),
  fullname: Joi.string().min(3).required(),
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
});

const RegisterForm = () => {
  const classes = useStyles();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<UserInterface>({
    resolver: joiResolver(schema)
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const formSubmit: SubmitHandler<UserInterface> = async (data: UserInterface) => {
    const { email, fullname, username, password } = data;
    setLoading(true);
    const userData = { email, fullname, username, password };
    dispatch(signup(userData));
  };
  return (
    <>
      <Box component="div" className={classes.cardLogoContainer}>
        <img src={logo} className={classes.cardLogo} alt="instagram-logo" />
      </Box>
      <Box component="p" className={classes.mutedText}>
        Sign up to see photos and videos from your friends.
      </Box>
      <Box className={classes.grid}>
        <FormControl className={classes.form}>
          <Button color="primary">
            <FacebookIcon />
            Log in with Facebook
          </Button>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Button color="primary">
            <GoogleIcon />
            Log in with Google
          </Button>
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
        {/* { error && <Message type="danger" message={error} />} */}
        <FormControl className={classes.formControl}>
          <TextField
            size="small"
            id="outlined-email-input"
            variant="outlined"
            placeholder="Email"
            className={classes.textInput}
            {...register("email")}
          />
          {errors.email?.message && (
            <Tooltip title={errors.email?.message}>
              <p className="error-label">
                <ErrorIcon />
              </p>
            </Tooltip>
          )}
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            size="small"
            id="outlined-fullname-input"
            variant="outlined"
            placeholder="Full Name"
            className={classes.textInput}
            {...register("fullname")}
          />
          {errors.fullname?.message && (
            <Tooltip title={errors.fullname?.message}>
              <p className="error-label">
                <ErrorIcon />
              </p>
            </Tooltip>
          )}
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            size="small"
            id="outlined-username-input"
            variant="outlined"
            placeholder="Username"
            className={classes.textInput}
            {...register("username")}
          />
          {errors.username?.message && (
            <Tooltip title={errors.username?.message}>
              <p className="error-label">
                <ErrorIcon />
              </p>
            </Tooltip>
          )}
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            size="small"
            type="password"
            id="outlined-password-input"
            variant="outlined"
            placeholder="Password"
            className={classes.textInput}
            {...register("password")}
          />
          {errors.password?.message && (
            <Tooltip title={errors.password?.message}>
              <p className="error-label">
                <ErrorIcon />
              </p>
            </Tooltip>
          )}
        </FormControl>
        <FormControl className={classes.formControl}>
          <Button color="primary" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Next"}
          </Button>
        </FormControl>
      </form>
      <Box component="p" className={classes.mutedText}>
        By signing up, you agree to our <strong>Terms</strong>. We collect, use and share
        your data, we use cookies and similar technology in our <strong>Cookie Policy</strong>.
      </Box>
    </>
  );
};

export default RegisterForm;
