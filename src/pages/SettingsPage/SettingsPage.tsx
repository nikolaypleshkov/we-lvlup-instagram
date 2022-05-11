import { Button, Input, TextareaAutosize, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "redux/store";
import ImageUploading, { ImageListType } from "react-images-uploading";
import UserAvatar from "components/Avatar/UserAvatar";
import { PrimaryButton } from "components/Buttons/Buttons";
import CardBox from "components/Card/CardBox";
import { profileConfig } from "redux/actions/authActions";
import { updateUserProfile } from "service/api/auth-service";
const SettingsPage = () => {
  const { authUser } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [imageProp, setImageProp] = useState({ image: authUser?.profileImage, index: 0 });
  const [userData, setUserData] = useState({
      username: authUser?.username,
      bio: authUser?.bio
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const maxNumber: number = 69;

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
    updateUserProfile(authUser?.uuid!, imageProp.image!, userData.bio!, userData.username!)
      .then((res) => {
        dispatch(profileConfig(authUser?.uuid!));
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          width: "100%"
        }}>
        <ImageUploading value={images} onChange={onChange} maxNumber={maxNumber}>
          {({ onImageUpload }) => (
            <Box
              component="section"
              sx={{
                display: "grid",
                placeItems: "center",
                width: "100%"
              }}>
              <input placeholder={authUser?.username} ref={inputRef} onBlur={(e) => setUserData(data => ({...data, username: e.target.value}))} />
              <Button onClick={() => inputRef.current?.focus()}>Change username</Button>
              <Button
                sx={{
                  marginTop: ".5rem"
                }}
                onClick={onImageUpload}>
                Click To Change Profile Picture
              </Button>
              {imageProp.image ? (
                <UserAvatar username={authUser?.username} src={imageProp.image} />
              ) : (
                <UserAvatar username={authUser?.username} src={authUser?.profileImage} />
              )}{" "}
              <Box
                component="form"
                sx={{
                  marginTop: "1rem"
                }}
                onSubmit={(e: React.FormEvent<HTMLInputElement>) => handleSubmit(e)}>
                <Typography>Change your bio</Typography>
                <TextareaAutosize
                  aria-label="tell us more about yourself"
                  minRows={3}
                  placeholder={userData.bio}
                  style={{ width: "100%" }}
                  onBlur={(e) => setUserData(data => ({...data, bio: e.target.value}))}
                />
                <PrimaryButton
                  style={{
                    marginTop: "1rem"
                  }}>
                  Finish
                </PrimaryButton>
              </Box>
            </Box>
          )}
        </ImageUploading>
      </Box>
    </div>
  );
};

export default SettingsPage;
