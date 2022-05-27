/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import React, { ChangeEvent, FormEvent, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Skeleton,
  TextField,
} from '@mui/material';
import { app, db, storage } from '../../service/firebaseSetup';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
import {
  addDoc,
  collection,
  doc,
  FieldValue,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import { v4 as uuidv4 } from 'uuid';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { userSelector } from '../../redux/selectors/user';
import { updateUser } from '../../redux/feature/userSlice';
import { AppDispatch } from '../../redux/store';
import UserAvatar from '../UserAvatart/UserAvatart';
import heic2any from 'heic2any';
import uploadHEIC from 'heic2any';
const ImageUploader = () => {
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>();
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState<string>('false');
  const [fileBlob, setFileBlob] = useState();
  const authUser = useSelector(userSelector);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  // const convertToHeic = async(url: RequestInfo) => {
  //   const output = await fetch(url).then(async (data) => {
  //     const buffer = Buffer.from(await data.arrayBuffer())
  //     return heicConvert({buffer, format: "PNG"});
  //   });

  //   const imgBase64 = btoa(
  //     output.reduce(
  //       (data: any, byte: number) => `${data}${String.fromCharCode(byte)}`
  //     )
  //   );

  //   setImagePreview(`data:image/png;base64,${imgBase64}`);
  // }

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target.files as FileList;
    const file = target[0];
    if (file) {
      if (
        file.type.toLowerCase() === 'image/heic' ||
        file.name.toLowerCase().includes('.heic')
      ) {
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
  const handleUpload = () => {
    const fileRef = ref(storage, `images/${image?.name}`);
    const uploadTask = uploadBytesResumable(fileRef, fileBlob!);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.log('Something went wrong', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          let postId = '';
          setImageUrl(url);
          await addDoc(collection(db, 'posts'), {
            timestamp: Timestamp.now(),
            description: description,
            postImage: url,
            likes: 0,
            likesID: [],
            comments: 0,
            commentsID: 0,
            createdBy: authUser,
            createdByUserId: authUser?.uuid,
          })
            .then(async (document) => {
              postId = document.id;
              const postRef = doc(db, 'posts', document.id);
              await updateDoc(postRef, {
                uuid: document.id,
              }).catch((err) => {
                alert('Something went wrong: ' + err);
                setMessage(err);
              });

              return postId;
            })
            .then(async (id) => {
              const q = query(
                collection(db, 'users'),
                where('uuid', '==', authUser?.uuid)
              );
              const querySnapshot = await getDocs(q);
              const snapshot = querySnapshot.docs[0];
              const posts: Array<string> = snapshot.data().posts;
              const userRef = doc(db, 'users', snapshot.id);
              posts.push(id);
              await updateDoc(userRef, {
                posts: posts,
              });
              setMessage('Post is uploaded');
              setTimeout(() => {
                navigate('/');
              }, 1000);
            })
            .then(() => {
              dispatch(updateUser(authUser?.uuid!));
            });
          setProgress(0);
          setDescription('');
          setImage(null);
        });
      }
    );
  };
  return (
    <div
      style={{
        marginTop: '5rem',
      }}
    >
      <Box
        sx={{
          marginTop: '10%',
        }}
      >
        <Grid container spacing={2} columns={16}>
          <Grid item xs={8}>
            <Box mt={2}>
              <LinearProgress variant='determinate' value={progress} />
              <input type='file' onChange={(e) => handleChange(e)} />
            </Box>
          </Grid>
          <Grid item xs={8}>
            {imagePreview && (
              <Box
                sx={{
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <TextField
                  placeholder='Describe your post...'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <Card sx={{ minWidth: '100%', marginTop: '2rem' }}>
                  <CardHeader
                    avatar={
                      <UserAvatar
                        username={authUser?.username}
                        src={authUser?.profileImage}
                        size={30}
                      />
                    }
                    subheader={authUser?.username}
                  />
                  <CardMedia>
                    <img
                      src={imagePreview}
                      alt='post image'
                      width='100%'
                      loading='lazy'
                      style={{
                        marginTop: '2rem',
                      }}
                    />
                  </CardMedia>
                  <CardActions></CardActions>
                  <CardContent>
                    <Box display='flex'>
                      <Typography variant='body2' fontWeight={800} mr={2}>
                        {authUser?.username}
                      </Typography>
                      <Typography variant='body2'>{description}</Typography>
                    </Box>
                  </CardContent>
                </Card>
                <Button
                  onClick={handleUpload}
                  disabled={!imagePreview.toString().trim()}
                >
                  Upload
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ImageUploader;
