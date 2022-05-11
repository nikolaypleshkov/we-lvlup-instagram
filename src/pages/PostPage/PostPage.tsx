import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import UserAvatar from "components/Avatar/UserAvatar";
import { collection, DocumentData, getDocs, query, where } from "firebase/firestore";
import {Link, useNavigate, useParams } from "react-router-dom";
import { db } from "service/firebaseSetup";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import { useDispatch, useSelector } from "react-redux";
import { dislikePost, likePost } from "redux/actions/postAction";
import { RootState } from "redux/store";

const PostPage = () => {
  const { id } = useParams();
  const { authUser } = useSelector((state: RootState) => state.auth);
  const { posts } = useSelector((state: RootState) => state.posts);
  const [post, setPost] = useState<DocumentData>();
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState<Boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPost = async () => {
    const q = query(collection(db, "posts"), where("uuid", "==", id));
    await getDocs(q).then((doc) => {
      const data = doc.docs[0].data();
      const likesID: string[] = data.likesID;
      setLiked(likesID.includes(authUser?.uuid!));
      setPost(data);
    });
  };

  useEffect(() => {
    
    getPost()
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [posts]);

  const handleLike = () => {
      dispatch(likePost(authUser!, id!));
  };

  return (
    <div>
      <Button onClick={() => navigate(-1)} >Go Back</Button>
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          width: "100%"
        }}>
        <Typography variant="h6">Post</Typography>
        {loading ? (
          <Card sx={{ maxWidth: "100%", marginTop: "2rem" }}>
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
        ) : (
          <Card
            sx={{
              maxWidth: "500px",
              marginTop: "2rem"
            }}>
            <CardHeader
              avatar={
                <UserAvatar
                  username={post?.createdBy.username}
                  src={post?.createdBy.profileImage}
                />
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              subheader={post?.createdBy.username}
            />
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
              src={`${post?.postImage}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${post?.postImage}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            />

            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites" onClick={handleLike}>
                <FavoriteOutlinedIcon
                  sx={{
                    fill: post?.likesID.includes(authUser?.uuid!)  ? "red" : null 
                  }}
                />
              </IconButton>
              <IconButton aria-label="share" component={Link} to={`/comments/${post?.uuid}`}>
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
                <strong>{post?.likesID.length} likes</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>{post?.createdBy.username}</strong> {post?.description}
              </Typography>
              {post?.comments > 0 ? (
                <Button component={Link} to={`/comments/${post?.uuid}`}>
                  <Typography variant="body2" color="text.secondary">
                    View all {post?.comments} comments
                  </Typography>
                </Button>
              ) : null}
            </CardContent>
          </Card>
        )}
      </Box>
    </div>
  );
};

export default PostPage;
