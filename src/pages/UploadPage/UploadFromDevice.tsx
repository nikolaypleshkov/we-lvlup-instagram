import { Stack, TextField, Button, LinearProgress } from "@mui/material";
import {
  addDoc,
  collection,
  Timestamp,
  updateDoc,
  query,
  where,
  getDocs,
  limit,
  doc
} from "firebase/firestore";
import heic2any from "heic2any";
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import { updateUser } from "../../redux/feature/userSlice";
import { userSelector } from "../../redux/selectors/user";
import { AppDispatch } from "../../redux/store";
import { db } from "../../service/firebaseSetup";

const UploadFromDevice = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>();
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState<string>("false");
  const [fileBlob, setFileBlob] = useState();
  const authUser = useSelector(userSelector);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target.files as FileList;
    const file = target[0];
    if (file) {
      if (file.type.toLowerCase() === "image/heic" || file.name.toLowerCase().includes(".heic")) {
        const blobUrl = URL.createObjectURL(file);
        // convert "fetch" the new blob url
        const blobRes = await fetch(blobUrl);

        // convert response to blob
        const blob = await blobRes.blob();

        // convert to PNG - response is blob
        const conversionResult: any = await heic2any({ blob });
        // setImage(file);
        setFileBlob(conversionResult);
        // convert to blob url
        const url = URL.createObjectURL(conversionResult);
        setImagePreview(url);
        setImage(file);
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          reader.readAsDataURL(file);
        };
        const _file: any = file;
        setFileBlob(_file);
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
      }
    }
  };

  const handleUpload = async () => {
    let storyId = "";
   const storyCollection =  query(collection(db, "users", authUser?.uuid!, "stories"), limit(1));
   await getDocs(storyCollection).then(async(doc) => {
        await addDoc(collection(db, "users", authUser?.uuid!, "stories"), {
        timestamp: Timestamp.now(),
        storyImage: imagePreview,
        createdByUserId: authUser?.uuid
      })
   }).then(() => {
     navigate("/");
   })
  };
  return (
    <Layout title="Upload From Device">
      <div className="imageUpload">
        <h3 className="uploadTitle">Post an image as story</h3>
        <input type="file" onChange={(e) => handleChange(e)} className="imageInput" />
        <Stack direction="column" spacing={2} className="postRow">
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              width="100%"
              loading="lazy"
              style={{
                marginTop: "2rem"
              }}
            />
          )}
          <Button variant="outlined" className="postButton" onClick={handleUpload}>
            Post
          </Button>
        </Stack>
      </div>
    </Layout>
  );
};

export default UploadFromDevice;
