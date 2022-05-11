import {
  collection,
  collectionGroup,
  doc,
  DocumentData,
  getDocs,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "redux/store";
import { db } from "service/firebaseSetup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import UserAvatar from "components/Avatar/UserAvatar";
import { Divider, InputAdornment, InputBase, TextareaAutosize } from "@mui/material";
import TextField from "@mui/material/TextField";
import CommentsList from "./CommentsList";
const CommentsPage = () => {
  const { id } = useParams();
  const { authUser } = useSelector((state: RootState) => state.auth);
  const { posts } = useSelector((state: RootState) => state.posts);
  const [post, setPost] = useState<DocumentData>();
  const [comments, setComments] = useState<Array<DocumentData>>([]);
  const [comment, setComment] = useState<string>("");
  const [userComments, setUserComments] = useState<Array<DocumentData>>([]);
  const inputRef = useRef(null);
  const isInitMount = useRef(true);
  const navigate = useNavigate();

  const getPost = async () => {
    const q = query(collection(db, "posts"), where("uuid", "==", id));
    await getDocs(q)
      .then((doc) => {
        const data = doc.docs[0].data();
        setComments(data.comments);
        setPost(data);
        return data.comments;
      })
      .catch((err) => {
        alert("Something went wrong " + err);
      });
  };

  const commentPost = async () => {
    if (comments.length > 0) {
      setComments((prevState) => [
        ...prevState,
        { comment: comment, createdBy: authUser?.uuid, likes: [] }
      ]);
    } else {
      setComments((prevState) => [{ comment: comment, createdBy: authUser?.uuid, likes: [] }]);
    }
    isInitMount.current = false;
  };

  const updatePost = async () => {
    const docRef = doc(db, "posts", id!);
    await updateDoc(docRef, { comments: comments })
      .then((res) => setComment(""))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    if (!isInitMount.current) {
      updatePost();
      setComment("")
    }
  }, [comments]);

  return (
    <div>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          width: "100%"
        }}>
        <Typography>Comments</Typography>
        <Card
          sx={{
            minWidth: "90%",
            marginTop: "2rem",
            marginBottom: "15rem"
          }}>
          <CardContent
            sx={{
              marginBottom: "5%"
            }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5%"
              }}>
              <UserAvatar
                size={30}
                src={post?.createdBy.profileImage}
                username={post?.createdBy.username}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  marginLeft: "1.2rem"
                }}>
                <strong>{post?.createdBy.username}</strong> {post?.description}
              </Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                marginBottom: post?.comments < 0 ? "6.4rem" : null
              }}>
              {comments.length > 0
                ? comments?.map((doc, i) => <CommentsList comments={doc} key={i} />)
                : "No comments yet"}
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1500, background: "#fff" }}>
        <Divider />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "5%"
          }}>
          <UserAvatar username={authUser?.username} src={authUser?.profileImage} size={30} />
          <TextareaAutosize
            placeholder="Write a comment"
            aria-label="write a comment"
            minRows={2}
            style={{
              resize: "none",
              border: "0px",
              width: "90%",
              marginLeft: "1rem",
              background: "transparent"
            }}
            ref={inputRef}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button onClick={commentPost}>Post</Button>
        </Box>
      </Box>
    </div>
  );
};

export default CommentsPage;
