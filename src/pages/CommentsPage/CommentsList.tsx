/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Box, Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import UserAvatar from "../../components/UserAvatart/UserAvatart";
import {
  collection,
  collectionGroup,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../service/firebaseSetup";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import RepliesList from "./RepliesList";
import { userSelector } from "../../redux/selectors/user";

const CommentsList = ({
  comment,
  userId,
  postId,
  commentInput,
  setCommentInput,
  setIsReply,
  setPostId,
  setCommentId,
  setReplies,
  replies
}: {
  comment: DocumentData;
  userId: string;
  postId: string;
  commentInput: string;
  setCommentInput: React.Dispatch<React.SetStateAction<string>>;
  isReply: boolean;
  setIsReply: React.Dispatch<React.SetStateAction<boolean>>;
  setPostId: React.Dispatch<React.SetStateAction<string>>;
  setCommentId: React.Dispatch<React.SetStateAction<string>>;
  setReplies: React.Dispatch<React.SetStateAction<Array<DocumentData>>>;
  replies: DocumentData[]
}) => {
  const authUser = useSelector(userSelector);
  const [user, setUser] = useState<DocumentData>();
  const [likes, setLikes] = useState<Array<string>>([]);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const getUserInfo = async (id: string) => {
    const qry = query(collection(db, "users"), where("uuid", "==", id));
    const querySnapshot = await getDocs(qry);

    querySnapshot.forEach((doc) => {
      setUser(doc.data());
    });
  };

  const likeComment = async (commentId?: string) => {
    if (!isLiked) {
      const likesToPush = [...likes, authUser?.uuid];

      updateDoc(doc(db, "posts", postId, "comments", comment.id!), {
        likesID: likesToPush
      });
    } else {
      let likesToPush = [...likes];
      likesToPush = likesToPush.filter((id) => id !== authUser?.uuid);
      updateDoc(doc(db, "posts", postId, "comments", comment.id!), {
        likesID: likesToPush
      });
    }
  };

  const replyToComment = async () => {
   setCommentInput("@" + user?.username);
   setIsReply(true);
   setCommentId(comment.id);
   setPostId(postId);
   setReplies(comment.data().replies);
  }

  useEffect(() => {
    onSnapshot(doc(db, "posts", postId, "comments", comment.id!), (snapshot) => {
      setLikes(snapshot.data()?.likesID!);
      const likesId: string[] = snapshot.data()?.likesID;
      const currentReplies: DocumentData[] = snapshot.data()?.replies;
      setIsLiked(likesId.includes(authUser?.uuid!));
      setReplies(currentReplies);
    });
  }, [db]);
  useEffect(() => {
    getUserInfo(userId);
  }, []);

  return (
    <div
      style={{
        marginTop: "2rem"
      }}>
      <Paper style={{ boxShadow: "none" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item component={Link} to={`/profile/${user?.uuid}`}>
            <UserAvatar src={user?.profileImage} username={user?.username} size={30} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <Typography
              component={Link}
              to={`/profile/${user?.uuid}`}
              style={{
                margin: 0,
                textAlign: "left"
              }}>
              {user?.username}
            </Typography>
            <p style={{ textAlign: "left" }}>{comment.data().comment}</p>
            <Button
              sx={{
                color: "#838383"
              }}
              onClick={() => replyToComment()}
              >
              Reply
            </Button>
            {comment.data().likesID.length} likes

            <Box mt={2}>
              {replies &&
                comment.data().replies.map((data: DocumentData, i: number) => (
                  <div key={i}>
                    <Divider />
                    <RepliesList reply={data} />
                  </div>
                ))}
            </Box>
          </Grid>
          <Grid justifyContent="right" item>
            <IconButton
              sx={{ textAlign: "right" }}
              size="small"
              onClick={() => likeComment(comment.id)}>
              <FavoriteOutlinedIcon
                sx={{
                  height: 15,
                  fill: isLiked ? "red" : null
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default CommentsList;
