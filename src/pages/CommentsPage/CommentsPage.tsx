import {
  addDoc,
  collection,
  collectionGroup,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../service/firebaseSetup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import UserAvatar from "../../components/UserAvatart/UserAvatart";
import { Divider, InputAdornment, InputBase, TextareaAutosize } from "@mui/material";
import CommentsList from "./CommentsList";
import { userSelector } from "../../redux/selectors/user";
const CommentsPage = () => {
  const { id } = useParams();
  const authUser  = useSelector(userSelector);
  const [post, setPost] = useState<DocumentData>();
  const [comments, setComments] = useState<Array<DocumentData>>([]);
  const [comment, setComment] = useState<string>("");
  const [user, setUser] = useState<DocumentData>();
  const [replies, setReplies] = useState<Array<DocumentData>>([]);
  const [isReply, setIsReply] = useState<boolean>(false);
  const [postId, setPostId] = useState<string>("");
  const [commentId, setCommentId] = useState<string>("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const commentPost = async (e: FormEvent) => {
    e.preventDefault();
    if (isReply) {
      const replyToPush = [
        ...replies,
        {
          createdBy: authUser?.uuid,
          reply: comment
        }
      ];
      console.log(replyToPush);
      
      updateDoc(doc(db, "posts", postId, "comments", commentId!), {
        replies: replyToPush
      });

      setIsReply(false);
      setComment("");
    } else {
      const commentToSend = comment;
      setComment("");

      await addDoc(collection(db, "posts", id!, "comments"), {
        comment: commentToSend,
        createdByUserId: authUser?.uuid,
        replies: [],
        likesID: [],
        timestamp: serverTimestamp()
      });
    }
  };

  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts", id!, "comments"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [db]);

  useEffect(() => {
    fetchPosts(id!);
  }, []);

  const getUserInfo = async (id: string) => {
    const qry = query(collection(db, "users"), where("uuid", "==", id));
    const querySnapshot = await getDocs(qry);

    querySnapshot.forEach((doc) => {
      setUser(doc.data());
    });
  };

  const fetchPosts = async (id: string) => {
    const q = query(collection(db, "posts"), where("uuid", "==", id));
    const fetchedPosts: Array<DocumentData> = [];
    await getDocs(q).then((document) => {
      document.forEach((doc) => {
        fetchedPosts.push(doc.data());
      });
    });
    setPost(fetchedPosts[0]);
    getUserInfo(fetchedPosts[0].createdByUserId);
  };

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
              <UserAvatar size={30} src={user?.profileImage} username={user?.username} />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  marginLeft: "1.2rem"
                }}>
                <strong>{user?.username}</strong> {post?.description}
              </Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                marginBottom: post?.comments < 0 ? "6.4rem" : null
              }}>
              {comments.length > 0
                ? comments?.map((doc, i) => (
                    <CommentsList
                      setPostId={setPostId}
                      setCommentId={setCommentId}
                      setReplies={setReplies}
                      replies={replies}
                      isReply={isReply}
                      setIsReply={setIsReply}
                      commentInput={comment}
                      setCommentInput={setComment}
                      comment={doc}
                      userId={doc.data().createdByUserId}
                      postId={id!}
                      key={doc.id}
                    />
                  ))
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
          <Button type="submit" disabled={!comment.trim()} onClick={commentPost}>
            Post
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default CommentsPage;
