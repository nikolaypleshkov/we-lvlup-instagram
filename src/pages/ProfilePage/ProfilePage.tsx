/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogTitle,
  Divider,
  Hidden,
  Modal,
  Typography,
  Zoom
} from "@mui/material";
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
  where
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import Layout from "../../layout/Layout";
import { isAuth, userSelector } from "../../redux/selectors/user";
import useStyles from "./style";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { updateUser, User } from "../../redux/feature/userSlice";
import UserAvatar from "../../components/UserAvatart/UserAvatart";
import Profile from "../../components/Profile/Profile";
import { db } from "../../service/firebaseSetup";
import { followUser, unfollowUser } from "../../service/api";
import { AppDispatch } from "../../redux/store";
import Stories from 'react-insta-stories'
import { makeStyles } from "@mui/styles";

const ProfilePage = () => {
  const { id } = useParams();
  const authUser = useSelector(userSelector);
  const classes = useStyles();
  const authenticated = useSelector(isAuth);

  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState<DocumentData>();
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleOptionMenu = () => {
    setShowMenu(true);
  };
  const handleMenuClose = () => {
    setShowMenu(false);
  };
  const getUserInfo = async (userId: string) => {
    const q = query(collection(db, "users"), where("uuid", "==", userId));
    await getDocs(q)
      .then((doc) => {
        setUser(doc.docs[0].data());
        setLoading(false);
      })
      .catch((err) => {
        alert("Something went wrong: " + err);
      });
  };

  useEffect(() => {
    setIsOwner(authUser?.uuid === id);
    const unsubscribe = onSnapshot(
      query(collection(db, "users"), where("uuid", "==", id)),
      (doc) => {
        setUser(doc.docs[0].data());
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [db, id]);
  return authenticated ? (
    <Layout title="Profile">
      <div className={classes.container}>
        {loading ? (
          <Box sx={{
            display: "grid",
            placeItems: "center",
            height: "100%"
          }}>

          <CircularProgress />
          </Box>
        ) : (
          <>
            <Hidden xsDown>
              <Card className={classes.cardLarge}>
                <CardContent className={classes.cardContentLarge}>
                  <ProfileNameSection
                    user={user!}
                    isOwner={isOwner}
                    handleOptionsMenuClick={handleOptionMenu}
                    authUser={authUser!}
                  />
                  <PostCountSection user={user!} />
                  <NameBioSection user={user!} />
                </CardContent>
              </Card>
            </Hidden>
            {showMenu && <OptionsMenu handleCloseMenu={handleMenuClose} />}
            <Profile user={user!} isOwner={isOwner} />
          </>
        )}
      </div>
    </Layout>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'transparent',
  border: "0px !important"
};

const useModalStyles = makeStyles(() => ({
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundcolor: "red"
    }
  },
  img: {
    outline: "none"
  }
}));

function ProfileNameSection({
  user,
  isOwner,
  authUser,
  handleOptionsMenuClick
}: {
  user: User | DocumentData;
  isOwner: boolean;
  authUser: User;
  handleOptionsMenuClick: () => void;
}) {
  const classes = useStyles();
  const modalClasses = useModalStyles();
  // const authUser = useSelector(userSelector);
  const dispatch: AppDispatch = useDispatch();
  const [showUnfollowDialog, setUnfollowDialog] = React.useState(false);
  const [isFollowing, setIsFollowing] = useState(() => authUser?.followingID.includes(user?.uuid));
  const [stories, setStories] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let followButton;
  const isFollower = user.followingID.includes(authUser?.uuid);
  const handleFollow = async () => {
    if (isFollowing) {
      const newFollowing: string[] | undefined = authUser?.followingID.filter(
        (id) => id !== user.uuid
      );
      setIsFollowing(() => newFollowing?.includes(user?.uuid));

      unfollowUser(authUser!, user?.uuid!)
        .then(() => {
          dispatch(updateUser(authUser?.uuid!));
        })
        .catch((err) => alert("Something went wrong: " + err));
    } else {
      const newFollowing: string[] = [authUser?.followingID, user.uuid];
      setIsFollowing(() => newFollowing.includes(user?.uuid));
      followUser(authUser!, user?.uuid!)
        .then(async () => {
          await setDoc(doc(db, "users", user?.uuid!, "notifications", authUser?.uuid!), {
            type: "follow",
            user: authUser?.uuid,
            post: "",
            createdAt: Timestamp.now()
          });
        })
        .then(() => {
          dispatch(updateUser(authUser?.uuid!));
        })
        .catch((err) => alert("Something went wrong: " + err));
    }
  };
  if (isFollowing) {
    followButton = (
      <Button onClick={() => setUnfollowDialog(true)} variant="outlined">
        Following
      </Button>
    );
  } else if (isFollower) {
    followButton = (
      <Button variant="contained" color="primary" className={classes.button} onClick={handleFollow}>
        Follow Back
      </Button>
    );
  } else {
    followButton = (
      <Button variant="contained" color="primary" className={classes.button} onClick={handleFollow}>
        Follow
      </Button>
    );
  }

  useEffect(() => {
    const unsub = onSnapshot(query(collection(db, "users", user.uuid, "stories")), (snapshot) => {
      const storiesImage: string[] = [];
      snapshot.docs.forEach((story: DocumentData) => {
        storiesImage.push(story.data().storyImage);
      });
      setStories(storiesImage);
    });

    return () => {
      unsub();
    }
  }, [])
  return (
    <>
      <Hidden xsDown>
        <section className={classes.usernameSection}>
          {isOwner ? (
            <>
            <Button onClick={handleOpen}>
              <UserAvatar size={77} username={user.username} src={user.profileImage} border={stories?.length > 0 ? "#f56565" : ""} />
            </Button>
              <Typography className={classes.username}>{user.username}</Typography>
            </>
          ) : (
            <>
              <UserAvatar size={77} username={user.username} src={user.profileImage} />
              <Typography className={classes.username}>{user.username}</Typography>
              <div className={classes.settingsWrapper}>{followButton}</div>
            </>
          )}
        </section>
        
      </Hidden>
      <Hidden smUp>
        <section>
          {isOwner && (
            <Link to="/settings">
              <Button variant="outlined" style={{ width: "100%" }}>
                Edit Profile
              </Button>
            </Link>
          )}
        </section>
      </Hidden>
      {showUnfollowDialog && (
        <UnfollowDialog
          user={user}
          onClose={() => setUnfollowDialog(false)}
          handleFollow={handleFollow}
        />
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" sx={{border: "0px !important"}}>
        <Box sx={modalClasses}>
        <Stories 
        stories={stories}
        defaultInterval={1500}
        width={432}
        height={668}
        keyboardNavigation={true}
        currentIndex={currentIndex}
        onStoryEnd={() => setCurrentIndex((prev) => prev + 1)}
        onAllStoriesEnd={() => setOpen(false)}
      />
        </Box>
      </Modal>
    </>
  );
}

function UnfollowDialog({
  onClose,
  user,
  handleFollow
}: {
  onClose: () => void;
  user: User | DocumentData;
  handleFollow: () => Promise<void>;
}) {
  const classes = useStyles();

  return (
    <Dialog
      open
      classes={{
        scrollPaper: classes.unfollowDialogScrollPaper
      }}
      onClose={onClose}
      TransitionComponent={Zoom}>
      <div className={classes.wrapper}>
        <Avatar
          src={user.profileImage}
          alt={`${user.username}'s avatar`}
          className={classes.avatar}
        />
      </div>
      <Typography align="center" variant="body2" className={classes.unfollowDialogText}>
        Unfollow @{user.username}?
      </Typography>
      <Divider />
      <Button
        className={classes.unfollowButton}
        onClick={() => {
          handleFollow();
          onClose();
        }}>
        Unfollow
      </Button>
      <Divider />
      <Button onClick={onClose} className={classes.cancelButton}>
        Cancel
      </Button>
    </Dialog>
  );
}

function PostCountSection({ user }: { user: User | DocumentData }) {
  const classes = useStyles();
  return (
    <>
      <Hidden smUp>
        <Divider />
      </Hidden>
      <section className={classes.followingSection}>
        <Box className={classes.followingText}>
          <Typography className={classes.followingCount}>{user?.posts.length}</Typography>
          <Hidden xsDown>
            <Typography>Posts</Typography>
          </Hidden>
        </Box>
        <Box className={classes.followingText} component={Link} to={`/followers/${user.uuid}`}>
          <Typography className={classes.followingCount}>{user?.followersID.length}</Typography>
          <Hidden xsDown>
            <Typography>Followers</Typography>
          </Hidden>
        </Box>
        <Box className={classes.followingText} component={Link} to={`/following/${user.uuid}`}>
          <Typography className={classes.followingCount}>{user?.followingID.length}</Typography>
          <Hidden xsDown>
            <Typography>Following</Typography>
          </Hidden>
        </Box>
      </section>
      <Hidden smUp>
        <Divider />
      </Hidden>
    </>
  );
}

function NameBioSection({ user }: { user: User | DocumentData }) {
  const classes = useStyles();

  return (
    <section className={classes.section}>
      <Typography className={classes.typography}>{user.fullname}</Typography>
      <Typography>{user.bio}</Typography>
    </section>
  );
}

function OptionsMenu({ handleCloseMenu }: { handleCloseMenu: () => void }) {
  const classes = useStyles();
  const [showLogOutMessage, setLogOutMessage] = React.useState(false);

  function handleLogOutClick() {
    setLogOutMessage(true);
  }

  return (
    <Dialog
      open
      classes={{
        scrollPaper: classes.dialogScrollPaper,
        paper: classes.dialogPaper
      }}
      TransitionComponent={Zoom}>
      {showLogOutMessage ? (
        <DialogTitle className={classes.dialogTitle}>
          Logging Out
          <Typography color="textSecondary">
            You need to log back in to continue using Instagram.
          </Typography>
        </DialogTitle>
      ) : (
        <>
          <OptionsItem text="Change Password" />
          <OptionsItem text="Nametag" />
          <OptionsItem text="Authorized Apps" />
          <OptionsItem text="Notifications" />
          <OptionsItem text="Privacy and Security" />
          <OptionsItem text="Log Out" onClick={handleLogOutClick} />
          <OptionsItem text="Cancel" onClick={handleCloseMenu} />
        </>
      )}
    </Dialog>
  );
}

function OptionsItem({ text, onClick }: { text: string; onClick?: () => void }) {
  return (
    <>
      <Button style={{ padding: "12px 8px" }} onClick={onClick}>
        {text}
      </Button>
      <Divider />
    </>
  );
}

export default ProfilePage;
