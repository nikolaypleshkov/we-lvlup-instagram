/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { imgSelector } from '../../redux/selectors/imageSelector'
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "tui-image-editor/dist/tui-image-editor.css";
// import ImageEditor from "@toast-ui/react-image-editor";
import { addDoc, collection, Timestamp, doc, updateDoc, query, where, getDocs } from "firebase/firestore";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { db } from '../../service/firebaseSetup';
import { updateUser } from '../../redux/feature/userSlice';
import { userSelector } from '../../redux/selectors/user';
import { AppDispatch } from '../../redux/store';
import Layout from '../../layout/Layout';
import { resetImage } from '../../redux/feature/imageSlice';

const EditPage = () => {
  const image = useSelector(imgSelector);
  const authUser  = useSelector(userSelector);
  const [imageUrl, setImageUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleReset = () => {
    dispatch(resetImage());
    navigate(-1);
  };

  const handleUpload = async() => {
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
      });
  };

  const guid = () => {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
  return image?.length ? (
    <Layout title="Edit">
      <h1>Edit Page</h1>
      <img src={image} height={250} width={450} />
      {/* <ImageEditor
        includeUI={{
          loadImage: {
            path: image,
            name: "SampleImage"
          },
          menu: ["shape", "filter"],
          initMenu: "filter",
          uiSize: {
            width: "1000px",
            height: "700px"
          },
          menuBarPosition: "bottom"
        }}
        cssMaxHeight={500}
        cssMaxWidth={700}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70
        }}
        usageStatistics={true}
      /> */}
      <Box>
        <Typography>Dont liked it?</Typography>
        <Button onClick={handleReset}>Take new photo NOW!</Button>
      </Box>
      <Box>
        <Typography>You like it?</Typography>
        <Button onClick={handleUpload}>Upload now!</Button>
      </Box>
    </Layout>
  ) : (
    <Navigate to="/uploadStory" />
  )
};

export default EditPage;
