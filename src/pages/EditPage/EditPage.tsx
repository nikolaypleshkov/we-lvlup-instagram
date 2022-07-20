/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { imgSelector } from "../../redux/selectors/imageSelector";
import { Box, Button, Grid, LinearProgress, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "tui-image-editor/dist/tui-image-editor.css";
// import ImageEditor from "@toast-ui/react-image-editor";
import {
  addDoc,
  collection,
  Timestamp,
  doc,
  updateDoc,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { db } from "../../service/firebaseSetup";
import { updateUser } from "../../redux/feature/userSlice";
import { userSelector } from "../../redux/selectors/user";
import { AppDispatch } from "../../redux/store";
import Layout from "../../layout/Layout";
import { resetImage } from "../../redux/feature/imageSlice";
import "./EditPage.css"
const EditPage = () => {
  const image = useSelector(imgSelector);
  const authUser = useSelector(userSelector);
  const [imageUrl, setImageUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleReset = () => {
    dispatch(resetImage());
    navigate(-1);
  };

  const handleUpload = async () => {
    let storyId = "";
    await addDoc(collection(db, "stories"), {
      timestamp: Timestamp.now(),
      storyImage: image,
      createdByUserId: authUser?.uuid
    })
      .then(async (document) => {
        storyId = document.id;
        const postRef = doc(db, "stories", document.id);
        await updateDoc(postRef, {
          uuid: document.id
        }).catch((err) => {
          alert("Something went wrong: " + err);
        });

        return storyId;
      })
      .then(async (id) => {
        const q = query(collection(db, "users"), where("uuid", "==", authUser?.uuid));
        const querySnapshot = await getDocs(q);
        const snapshot = querySnapshot.docs[0];
        const storyPosts: Array<string> = snapshot.data().storyPosts;
        const userRef = doc(db, "users", snapshot.id);
        storyPosts.push(id);
        await updateDoc(userRef, {
          storyPosts: storyPosts
        });
      })
      .then(() => {
        dispatch(updateUser(authUser?.uuid!));
        navigate("/")
      });
  };

  const guid = () => {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
  };
  return image?.length ? (
    <Layout title="Edit">
       <div className="imageUpload">
        <h3 className="uploadTitle">Upload Story</h3>
        <Stack direction="column" spacing={2} className="postRow">
            <img
              src={image}
              alt="Preview"
              width="100%"
              loading="lazy"
              style={{
                marginTop: "2rem"
              }}
            />
          <Box>
            <Button onClick={handleReset}>Take photo again</Button>
          </Box>
          <Box>
            <Button onClick={handleUpload}>Upload</Button>
          </Box>
        </Stack>
      </div>
    </Layout>
  ) : (
    <Navigate to="/upload/story" />
  );
};

export default EditPage;
