import React, {ChangeEvent, FormEvent, useState} from 'react';
import { Button } from '@mui/material';
import { app, db, storage } from 'service/firebaseSetup';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, FieldValue, Timestamp } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import LinearProgress from '@mui/material/LinearProgress';

const ImageUploader = () => {
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const {user} = useSelector((state: RootState) => state.auth);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if(file){
      setImage(file);
    }
  }
  const handleUpload = () => {
    const fileRef = ref(storage, `images/${image?.name}`);
    const uploadTask = uploadBytesResumable(fileRef, image!);
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(progress);
    }, (error) => {
      console.log("Something went wrong", error);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
        setImageUrl(url);
        await addDoc(collection(db, "posts"), ({
          timestamp: Timestamp.now(),
          description: description,
          postImage: url,
          likes: 0,
          likesID: [],
          comments: 0,
          commentsID: 0,
          createdBy: user,
          createdByUserId: user?.uuid
        }));
        setProgress(0);
        setDescription("");
        setImage(null);
      })
    });
  }
  return (
      <div>
          <img src={imageUrl} alt="post image" width={200} />
          <LinearProgress variant="determinate"  value={progress}  />
          <input type="text" placeholder="Describe your post..." onChange={(e) => setDescription(e.target.value)} value={description}  />
          <input type="file" onChange={(e) => handleChange(e)}/>
          <Button onClick={handleUpload}>
            Upload
          </Button>
      </div>
  )
}

export default ImageUploader