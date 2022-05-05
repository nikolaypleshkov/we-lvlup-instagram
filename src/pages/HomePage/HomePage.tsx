import React, { useState, useEffect } from "react";
import BottomNav from "layouts/BottomNavigation";
import TopBar from "layouts/TopBar";
import { collection, DocumentData, getDocs, QuerySnapshot } from "firebase/firestore";
import { db } from "service/firebaseSetup";
import UserAvatar from "components/Avatar/UserAvatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import IconButton from "@mui/material/IconButton";
import { Box, Button, Skeleton } from "@mui/material";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { likePost, dislikePost } from "redux/actions/postAction";
function HomePage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [data, setData] = useState<DocumentData>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [liked, setLiked] = useState<Boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      let _data: DocumentData = [];
      querySnapshot.forEach((doc) => {
        const likesID: string[] = doc.data().likesID;
        _data.push(doc.data());
      });
      setData(_data);
      setLoading(false);
    };

    getData();
  }, []);

  const handleLike = (id: string) => {
    // const likedPost = data.filter()
    if (!liked) {
      dispatch(likePost(user!, id!));
      setLiked(true);
    } else {
      dispatch(dislikePost(user!, id!));
      setLiked(false);
    }
  };
  return (
    <>
      <TopBar />
      <div className="main">
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            width: "100%"
          }}>
          {loading
            ? Array(9)
                .fill(0)
                .map((item, index) => (
                  <Card sx={{ minWidth: "100%", marginTop: "2rem" }} key={index}>
                    <CardHeader
                      avatar={
                        <Skeleton variant="circular" animation="wave" width={40} height={40} />
                      }
                      subheader={<Skeleton animation="wave" width={80} />}
                    />
                    <Skeleton variant="rectangular" animation="wave" height={194} />
                    <CardActions></CardActions>
                    <CardContent>
                      <Skeleton animation="wave" width={80} />
                      <Skeleton animation="wave" width={110} />
                    </CardContent>
                  </Card>
                ))
            : data.map((element: any, i: number) => (
                <Card sx={{ minWidth: "100%", marginTop: "2rem" }} key={element.uuid}>
                  <CardHeader
                    avatar={
                      <UserAvatar
                        username={element.createdBy.username}
                        src={element.createdBy.profileImage}
                      />
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    subheader={element.createdBy.username}
                  />
                  <Box component={Link} to={`/post/${element.uuid}`}>
                    <CardMedia
                      component="img"
                      loading="lazy"
                      height="164"
                      width="164"
                      alt="Post Image"
                      sx={{
                        objectFit: "contain",
                        maxWidth: "100%",
                        height: "auto"
                      }}
                      src={`${element.postImage}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${element.postImage}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    />
                  </Box>
                  <CardActions disableSpacing>
                    <IconButton
                      aria-label="add to favorites"
                      onClick={() => handleLike(element.uuid)}>
                      <FavoriteOutlinedIcon
                        sx={{
                          fill: element.likesID.includes(user?.uuid!) || liked ? "red" : null
                        }}
                      />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ModeCommentOutlinedIcon />
                    </IconButton>
                    <IconButton
                      aria-label="save"
                      sx={{
                        marginLeft: "auto"
                      }}>
                      <BookmarkAddOutlinedIcon />
                    </IconButton>
                  </CardActions>
                  <CardContent
                    sx={{
                      marginBottom: "24px",
                      marginTop: "-20px"
                    }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>{element.likesID.length} likes</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>{element.createdBy.username}</strong> {element.description}
                    </Typography>
                    {element.comments > 0 ? (
                      <Button>
                        <Typography variant="body2" color="text.secondary">
                          View all {element.comments} comments
                        </Typography>
                      </Button>
                    ) : null}
                  </CardContent>
                </Card>
              ))}
        </Box>
      </div>
      <BottomNav />
    </>
  );
}

export default HomePage;
