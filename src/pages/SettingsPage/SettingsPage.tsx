/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import Layout from '../../layout/Layout';
import useStyles from './style';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import path from 'path/posix';
import UserAvatar from '../../components/UserAvatart/UserAvatart';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors/user';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db, storage } from '../../service/firebaseSetup';
import { updateUser } from '../../redux/feature/userSlice';
import { AppDispatch } from '../../redux/store';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';
const options = ['Edit Profile', 'About Instagram'];

const DrawerMenu = () => {
  const location = useLocation();
  const handleSelected = (index: number) => {
    switch (index) {
      case 0:
        return location.pathname.includes('edit');
      default:
        break;
    }
  };
  const handleClick = (i: number) => {
    switch (i) {
      case 0:
        break;
      default:
        break;
    }
  };
  const classes = useStyles();
  return (
    <List>
      {options.map((option, i) => (
        <ListItem
          key={option}
          button
          selected={handleSelected(i)}
          classes={{
            selected: classes.listItemSelected,
            button: classes.listItemButton,
          }}
        >
          <ListItemText primary={option} />
        </ListItem>
      ))}
    </List>
  );
};
const SettingsPage = () => {
  const classes = useStyles();
  const location = useLocation();

  const [showDrawer, setDrawer] = useState(false);

  function toggleDrawer() {
    setDrawer((prev) => !prev);
  }
  return (
    <Layout title='Edit Profile'>
      <section className={classes.section}>
        <IconButton
          edge='start'
          onClick={toggleDrawer}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <nav>
          <Hidden smUp implementation='css'>
            <Drawer
              variant='temporary'
              anchor='left'
              open={showDrawer}
              onClose={toggleDrawer}
              classes={{ paperAnchorLeft: classes.temporaryDrawer }}
            >
              {<DrawerMenu />}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation='css'>
            <Box className={classes.permanentDrawerRoot}>
              <Drawer
                variant='permanent'
                open
                classes={{
                  paper: classes.permanentDrawerPaper,
                  root: classes.permanentDrawerRoot,
                }}
              >
                {<DrawerMenu />}
              </Drawer>
            </Box>
          </Hidden>
        </nav>
        <main>
          <ProfileSettings />
        </main>
      </section>
    </Layout>
  );
};

const ProfileSettings = () => {
  const classes = useStyles();
  const authUser = useSelector(userSelector);
  const dispatch: AppDispatch = useDispatch();
  const fileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(authUser?.profileImage!);
  const [fullname, setFullname] = useState<string>(authUser?.fullname!);
  const [username, setUsername] = useState<string>(authUser?.username!);
  const [bio, setBio] = useState<string>(authUser?.bio!);
  const [loading, setLoading] = useState(false);

  const getImage = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fileRef = ref(storage, `images/${image?.name!}`);
    const uploadTask = uploadBytesResumable(fileRef, image!);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log('Something went wrong', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          const q = query(
            collection(db, 'users'),
            where('uuid', '==', authUser?.uuid)
          );
          const querySnapshot = await getDocs(q);
          const docRef = doc(db, 'users', querySnapshot.docs[0].id);
          await updateDoc(docRef, {
            profileImage: url,
            username: username,
            fullname: fullname,
            bio: bio
          })
            .then(() => {
              dispatch(updateUser(authUser?.uuid!));
              setLoading(false);
            })
            .catch((err) => {
              alert(err);
            });
        });
      }
    );
  };

  return (
    <section className={classes.container}>
      <div className={classes.pictureSectionItem}>
        <UserAvatar
          size={38}
          src={previewImage ? previewImage : authUser?.profileImage}
          username={authUser?.username}
        />
        <div className={classes.justifySelfStart}>
          <Typography className={classes.typography}>
            {authUser?.username}
          </Typography>
          <Button
            color='primary'
            className={classes.typographyChangePic}
            onClick={() => fileRef.current?.click()}
          >
            Change Profile Photo
          </Button>
          <input
            type='file'
            ref={fileRef}
            style={{ display: 'none' }}
            onChange={(e) => getImage(e)}
          />
        </div>
      </div>
      <form className={classes.form} onSubmit={(e) => handleUpdate(e)}>
        <div className={classes.sectionItemWrapper}>
          <aside></aside>
          <TextField
            variant='outlined'
            fullWidth
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            type='text'
            className={classes.textField}
            required
            inputProps={{
              className: classes.textFieldInput,
            }}
          />
        </div>
        <div className={classes.sectionItemWrapper}>
          <aside></aside>
          <TextField
            variant='outlined'
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type='text'
            className={classes.textField}
            required
            inputProps={{
              className: classes.textFieldInput,
            }}
          />
        </div>
        <div className={classes.sectionItem}>
          <aside></aside>
          <TextField
            variant='outlined'
            multiline
            maxRows={3}
            rows={3}
            fullWidth
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          />
        </div>
        <div className={classes.sectionItem}>
          <div />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.justifySelfStart}
          >
            {loading ? <CircularProgress /> : 'Sumbit'}
          </Button>
        </div>
      </form>
    </section>
  );
};

function SectionItem({
  type = 'text',
  text,
  formItem,
}: {
  type?: string;
  text: string;
  formItem: any;
}) {
  const classes = useStyles();

  return (
    <div className={classes.sectionItemWrapper}>
      <aside>
        <Hidden smUp>
          <Typography className={classes.typography}>{text}</Typography>
        </Hidden>
      </aside>
      <TextField
        variant='outlined'
        fullWidth
        value={formItem}
        type={type}
        className={classes.textField}
        inputProps={{
          className: classes.textFieldInput,
        }}
      />
    </div>
  );
}

export default SettingsPage;
