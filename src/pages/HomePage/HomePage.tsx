import React, { useState, useEffect } from "react";
import BottomNav from "layouts/BottomNavigation";
import TopBar from "layouts/TopBar/TopBar";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  QuerySnapshot,
  Timestamp,
  where
} from "firebase/firestore";
import { db } from "service/firebaseSetup";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import CardCollection from "components/CardCollection/CardCollection";
import PostCard from "./PostCard";
import { Typography } from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { Divider } from "@mui/material";
import { login, profileConfig } from "redux/actions/authActions";
import { User } from "redux/types";

function HomePage() {
  const { authUser } = useSelector((state: RootState) => state.auth);
  const { posts } = useSelector((state: RootState) => state.posts);
  const [data, setData] = useState<DocumentData>([]);
  const [olderData, setOlderData] = useState<DocumentData>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const treeDaysAgo = Timestamp.fromMillis(Date.now() - 259200000);
  const dispatch = useDispatch();

  const loadPosts = async () => {
    console.log("here");
    const q = query(collection(db, "posts"), where("timestamp", ">", treeDaysAgo));
    const querySnapshot = await getDocs(q);
    const followingID: string[] | undefined = authUser?.followingID;
    let _data: Array<DocumentData> = [];
    console.log("following id");
    console.log(followingID);
    querySnapshot.forEach((doc) => {
      if (followingID?.includes(doc.data().createdByUserId)) {
        _data.push(doc.data());
      }
    });
    return _data;
  };

  const loadOldPost = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "posts"), where("timestamp", "<", treeDaysAgo))
    );
    const followingID: string[] | undefined = authUser?.followingID;
    let _data: Array<DocumentData> = [];
    querySnapshot.forEach((doc) => {
      if (followingID?.includes(doc.data().createdByUserId)) {
        _data.push(doc.data());
      }
    });
    // setOlderData(_data);
    setLoading(false);
  };

  useEffect(() => {
    // loadPosts()
    //   .then((res) => {
    //     setData(res);
    //     setLoading(false);
    //   })
    // .catch((err) => console.log(err));
    // loadOldPost();
  }, [authUser]);
  return (
    <>
      <TopBar />
      <nav></nav>
      <div className="main">
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            width: "100%"
          }}>
          {loading &&
            Array(9)
              .fill(0)
              .map((item, index) => (
                <Card sx={{ minWidth: "100%", marginTop: "2rem" }} key={index}>
                  <CardHeader
                    avatar={<Skeleton variant="circular" animation="wave" width={40} height={40} />}
                    subheader={<Skeleton animation="wave" width={80} />}
                  />
                  <Skeleton variant="rectangular" animation="wave" height={194} />
                  <CardActions></CardActions>
                  <CardContent>
                    <Skeleton animation="wave" width={80} />
                    <Skeleton animation="wave" width={110} />
                  </CardContent>
                </Card>
              ))}
          {data?.length! > 0 ? (
            <>
              {data.map((element: DocumentData, i: number) => (
                <PostCard element={element} key={element.uuid} />
              ))}
              <Box
                sx={{
                  display: "grid",
                  placeItems: "center",
                  marginBottom: "5rem",
                  marginTop: 5
                }}>
                <Divider
                  sx={{
                    width: "100%"
                  }}>
                  <CheckCircleOutlinedIcon
                    sx={{
                      fill: "#DD2A7B"
                    }}
                  />
                </Divider>
                <Typography variant="h6">You're all caught up</Typography>
                <Typography variant="caption">
                  You've seen all new posts from the past 3 days.
                </Typography>
              </Box>
            </>
          ) : (
            <CardCollection />
          )}
        </Box>
        {olderData.map((element: DocumentData, i: number) => (
          <PostCard element={element} key={i} />
        ))}
      </div>
      <BottomNav />
    </>
  );
}

export default HomePage;
