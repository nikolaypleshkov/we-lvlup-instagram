import { Hidden, Divider, Tabs, Tab, Typography, Button, CircularProgress, Box } from "@mui/material";

import React, { useEffect, useState } from "react";
import { User } from "../../redux/feature/userSlice";
import ImageGallery from "../ImageGallery/ImageGallery";
import useStyles from "./style";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import { collection, DocumentData, getDocs, query } from "firebase/firestore";
import { db } from "../../service/firebaseSetup";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/selectors/user";
import { Link } from "react-router-dom";
import { relative } from "path/posix";
const Profile = ({ user, isOwner }: { user: User | DocumentData; isOwner?: boolean }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <>
      <section className={classes.section}>
        <Hidden xsDown>
          <Divider />
        </Hidden>
        <Hidden smDown>
          <Tabs
            value={value}
            onChange={(_, value) => setValue(value)}
            centered
            classes={{ indicator: classes.tabsIndicator }}>
            <Tab
              icon={<span className={classes.postsIconLarge} />}
              label="POSTS"
              classes={{
                root: classes.tabRoot,
                labelIcon: classes.tabLabelIcon
              }}
            />
            {isOwner && (
              <Tab
                icon={<span className={classes.savedIconLarge} />}
                label="SAVED"
                classes={{
                  root: classes.tabRoot,
                  labelIcon: classes.tabLabelIcon
                }}
              />
            )}
          </Tabs>
        </Hidden>
        <Hidden smUp>
          <Tabs
            value={value}
            onChange={(_, value) => setValue(value)}
            centered
            className={classes.tabs}
            classes={{ indicator: classes.tabsIndicator }}>
            <Tab
              icon={<GridViewOutlinedIcon fill={value === 0 ? "#3897f0" : undefined} />}
              classes={{ root: classes.tabRoot }}
            />
            {isOwner && (
              <Tab
                icon={<BookmarkAddedOutlinedIcon fill={value === 1 ? "#3897f0" : undefined} />}
                classes={{ root: classes.tabRoot }}
              />
            )}
          </Tabs>
        </Hidden>
        <Hidden smUp>{user.posts.length === 0 && <Divider />}</Hidden>
        {value === 0 && <ProfilePosts user={user} isOwner={isOwner} />}
        {value === 1 && <SavedPosts />}
      </section>
    </>
  );
};

function ProfilePosts({ user, isOwner }: { user: User | DocumentData; isOwner?: boolean }) {
  const classes = useStyles();
  const [posts, setPosts] = useState<DocumentData[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const getPosts = async () => {
    const q = query(collection(db, "posts"));
    const querySnapshot = await getDocs(q);
    let filter: DocumentData[] = querySnapshot.docs;
    filter = filter.filter((post) => user.posts.includes(post.data().uuid));
    setPosts(filter);
    setLoading(false);
  };
  useEffect(() => {
    getPosts();
  }, [user.posts]);

  if (user.posts.length === 0) {
    return (
      <section className={classes.savedPostsSection}>
        <div className={classes.noContent}>
          <div className={classes.savePhotoIcon} />
          <Typography variant="h4">Posts</Typography>
          {isOwner ? (
            <>
              <Typography align="center">
                Upload photos that you want to share with friends.
              </Typography>
              <Button component={Link} to="/upload/post">
                Upload
              </Button>
            </>
          ) : (
            <>
              <Typography align="center">No posts yet</Typography>
            </>
          )}
        </div>
      </section>
    );
  }

  return (
    <article className={classes.article}>
      <div className={classes.postContainer}>
        {posts.map((post) => (
          <ImageGallery post={post} key={post.id} />
        ))}
      </div>
    </article>
  );
}

function SavedPosts() {
  const classes = useStyles();
  const authUser = useSelector(userSelector);
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const getPosts = async () => {
    const q = query(collection(db, "posts"));
    const querySnapshot = await getDocs(q);
    let filter: DocumentData[] = querySnapshot.docs;
    filter = filter.filter((post) => authUser?.saved.includes(post.data().uuid));
    setPosts(filter);
  };
  useEffect(() => {
    getPosts().then(() => setLoading(false));
  }, []);

  return (
    <>
      {posts?.length > 0 ? (
        <article className={classes.article}>
          <div className={classes.postContainer} style={{position: "relative"}}>
            {loading ? (
              <Box sx={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, 50%)"}}>
              <CircularProgress size={45} />
              </Box>
            ) : (
              posts.map((post) => <ImageGallery post={post} key={post.id} />)
            )}
          </div>
        </article>
      ) : (
        <>
          <section className={classes.savedPostsSection}>
            <div className={classes.noContent}>
              <div className={classes.savePhotoIcon} />
              <Typography variant="h4">Save</Typography>
              <Typography align="center">
                Save photos and videos that you want to see again. No one is notified, and only you
                can see what youve saved.
              </Typography>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Profile;
