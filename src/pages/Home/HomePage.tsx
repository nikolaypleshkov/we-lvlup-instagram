import { Button, Hidden } from "@mui/material";
import { collection, DocumentData, getDocs, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import MiniProfile from "../../components/MiniProfile/MiniProfile";
import Post from "../../components/Post/Post";
import PostSkeleton from "../../components/Post/PostSkeleton";
import StoriesComponent from "../../components/Stories/Stories";
import Story from "../../components/Stories/Story";
import Suggestions from "../../components/Suggestions/Suggestions";
import Layout from "../../layout/Layout";
import { isAuth, userSelector } from "../../redux/selectors/user";
import { db } from "../../service/firebaseSetup";
import useStyles from "./style";
import InfiniteScroll from 'react-infinite-scroll-component';
import { getPostsFirstBarch, getPostsNextBatch } from "../../service/api";

const HomePage = () => {
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastPostKey, setLastPostKey] = useState<string | undefined>("");
  const [nextPostLoading, setNextPostLoading] = useState(false);

  const authUser = useSelector(userSelector);
  const authenticated = useSelector(isAuth);
  const location = useLocation();
  const classes = useStyles();

  const getMorePosts = async(lastKey?: string) => {
    getPostsNextBatch(lastKey).then((res) => {
      if(res?.posts.length){
        setPosts(posts?.concat(res?.posts.filter((post) => authUser?.followingID.includes(post.createdByUserId))));
        setLastPostKey(res?.lastPostKey);
      }
    })
  }

  useEffect(() => {
    getPostsFirstBarch().then((res) => {
      setPosts(res?.posts.filter((post) => authUser?.followingID.includes(post.createdByUserId))!);
      setLastPostKey(res?.lastPostKey);
      setLoading(false);
    })
  }, [db, authUser]);
  
  return !authenticated ? (
    <Navigate to="/login" replace state={{ from: location }} />
  ) : (
    <Layout title="Feed">
      <div className={classes.container}>
        <div>
          <StoriesComponent />
          {loading
            ? Array(9)
                .fill(0)
                .map((item, index) => <PostSkeleton key={index} />)
            :
             posts?.map((post, i) => (
               <article style={{marginTop: 55}}>
                <Post post={post} index={1} key={post.uuid + i *2} />
               </article>
              ))}
              {posts?.length > 0 && <Button aria-label="Load More Posts" onClick={() => getMorePosts(lastPostKey)} sx={{width:  "100%", textAlign: "center"}}>Load More Posts</Button>
}
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
