import React, { useState, useEffect, EventHandler } from "react";
import Box from "@mui/material/Box";
import useStyles from "./styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardBox from "components/Card/CardBox";
import Button from "@mui/material/Button";
import { Link, Navigate, useLocation } from "react-router-dom";
import LoginForm from "pages/LoginPage/LoginForm/LoginForm";
import Footer from "layouts/Footer/Footer";
import logo from "assets/images/logo/logo.webp";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { PrimaryButton } from "components/Buttons/Buttons";
import UserAvatar from "components/Avatar/UserAvatar";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { updateUserProfile } from "service/api/auth-service";
import { profileConfig } from "redux/actions/authActions";
const UserSettingPage = () => {
  const classes = useStyles();
  const { authenticated, initAuth, authUser } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const [images, setImages] = useState([]);
  const [imageProp, setImageProp] = useState({ image: "", index: 0 });
  const [bio, setBio] = useState("");
  const dispatch = useDispatch();
  const maxNumber = 69;

  const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    setImages(imageList as never[]);
    imageList.forEach((image, i) => {
      const url: string = image.dataURL!;
      const index = i;
      setImageProp((prevProps) => ({
        image: url,
        index: index
      }));
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    updateUserProfile(authUser?.uuid!, imageProp.image, bio, authUser?.username)
      .then((res) => {
        dispatch(profileConfig(authUser?.uuid!));
        
      })
      .catch((err) => {
        alert(err);
      });
  };

  return initAuth ? (
    <Box component="main" className={classes.content}>
      <Grid container justifyContent="center" spacing={4} className={classes.gridContainer}>
        <Grid item className={classes.card}>
          <ImageUploading value={images} onChange={onChange} maxNumber={maxNumber}>
            {({
              onImageUpload,
            }) => (
              <CardBox>
                <Box component="div" className={classes.cardLogoContainer}>
                  <Box
                    component="img"
                    src={logo}
                    alt="instagram-logo"
                    className={classes.cardLogo}
                  />
                </Box>
                <Box
                  component="section"
                  sx={{
                    marginTop: "5%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}>
                  <Typography variant="h6" className={classes.headerText}>
                    Welcome
                  </Typography>
                  <Typography className={classes.headerText}>{authUser?.username}</Typography>
                  <Button
                    sx={{
                      marginTop: ".5rem"
                    }}
                    onClick={onImageUpload}>
                    Click To Set Profile Picture
                  </Button>
                  <UserAvatar username={authUser?.username} src={imageProp.image} />
                  <Box
                    component="form"
                    sx={{
                      marginTop: "1rem"
                    }}
                    onSubmit={(e: React.FormEvent<HTMLInputElement>) => handleSubmit(e)}>
                    <Typography className={classes.mutedText}>
                      Tell us more about yourself
                    </Typography>
                    <TextareaAutosize
                      aria-label="tell us more about yourself"
                      minRows={3}
                      placeholder="Add Bio"
                      style={{ width: "100%" }}
                      onBlur={(e) => setBio(e.target.value)}
                    />
                    <PrimaryButton
                      style={{
                        marginTop: "1rem"
                      }}>
                      Finish
                    </PrimaryButton>
                  </Box>
                </Box>
              </CardBox>
            )}
          </ImageUploading>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  ) : (
    <Navigate to="/home" replace state={{ from: location }} />
  );
};

export default UserSettingPage;
