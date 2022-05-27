import { Hidden } from '@mui/material';
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import MiniProfile from '../../components/MiniProfile/MiniProfile';
import Post from '../../components/Post/Post';
import PostSkeleton from '../../components/Post/PostSkeleton';
import Stories from '../../components/Stories/Stories';
import Story from '../../components/Stories/Story';
import Suggestions from '../../components/Suggestions/Suggestions';
import Layout from '../../layout/Layout';
import { isAuth } from '../../redux/selectors/user';
import { db } from '../../service/firebaseSetup';
import useStyles from './style';
const HomePage = () => {
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const authenticated = useSelector(isAuth);
  const location = useLocation();
  const classes = useStyles();
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        setPosts(snapshot.docs);
        setLoading(false)
      }
    );
    return () => {
      unsubscribe();
    };
  }, [db]);
  return !authenticated ? (
    <Navigate to='/login' replace state={{ from: location }} />
  ) : (
    <Layout title='Feed'>
      <div className={classes.container}>
        {/* Feed Postts */}
        <div style={{ marginTop: 52 }}>
          <Stories />
          {loading
            ? Array(9)
                .fill(0)
                .map((item, index) => <PostSkeleton key={index} />)
            : posts.map((post, i) => (
                <Post post={post.data()} index={1} key={i} />
              ))}
        </div>
      <Hidden xsDown>
        <div className={classes.sidebarContainer}>
          <div className={classes.sidebarWrapper}>
              <MiniProfile />
              <Suggestions />
          </div>
        </div>
      </Hidden>
      </div>
    </Layout>
  );
};

export default HomePage;
