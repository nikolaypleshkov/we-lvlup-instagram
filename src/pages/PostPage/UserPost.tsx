/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Typography, Box, IconButton, Button, Hidden, Divider, Menu } from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import UserAvatar from "../../components/UserAvatart/UserAvatart";
import { userSelector } from "../../redux/selectors/user";
import { db } from "../../service/firebaseSetup";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useStyles from "./style";
import CommentList from "./CommentList";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { AppDispatch } from "../../redux/store";
import { updateUser } from "../../redux/feature/userSlice";
const UserPost = ({ post }: { post: DocumentData }) => {
  const classes = useStyles();
  const authUser = useSelector(userSelector);
  const dispatch: AppDispatch = useDispatch();
  const [showCaption, setCaption] = useState(false);
  const [userDocId, setUserDocId] = useState<string>("");
  const [user, setUser] = useState<DocumentData>();
  const [likes, setLikes] = useState<Array<DocumentData>>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState<Array<DocumentData>>([]);
  const [replies, setReplies] = useState<Array<DocumentData>>([]);
  const [anchorEl1, setAnchorEl1] = useState<null | HTMLElement>(null);
  const openDropdown1 = Boolean(anchorEl1);
  const navigate = useNavigate();
  const handleClick1 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const getUserInfo = async (userId: string) => {
    const q = query(collection(db, "users"), where("uuid", "==", userId));
    await getDocs(q)
      .then((doc) => {
        setUser(doc.docs[0].data());
        setUserDocId(doc.docs[0].id);
      })
      .catch((err) => {
        alert("Something went wrong: " + err);
      });
  };

  useEffect(() => {
    getUserInfo(post.createdByUserId);
  }, [post.createdByUserId]);

  useEffect(() => {
    onSnapshot(collection(db, "posts", post.uuid, "likes"), (snapshot) => setLikes(snapshot.docs));
  }, [post.uuid]);

  useEffect(() => {
    setIsLiked(likes.findIndex((like) => like.id === authUser?.uuid!) !== -1);
  }, [authUser?.uuid, likes]);

  const handleLike = async (id: string) => {
    if (isLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", authUser?.uuid!));
    } else {
      await setDoc(doc(db, "posts", id!, "likes", authUser?.uuid!), {
        user: authUser?.uuid
      })
        .then(async () => {
          await setDoc(doc(db, "users", userDocId!, "notifications", authUser?.uuid!), {
            type: "like",
            user: authUser?.uuid,
            post: post.uuid,
            createdAt: Timestamp.now()
          }).catch((err) => alert("Something went wrong creating doc: " + err));
        })
        .catch((err) => alert("Something went wrong: " + err));
    }
  };

  useEffect(() => {
    onSnapshot(collection(db, "posts", post.uuid, "comments"), (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setReplies((prevRep) => [...prevRep, doc.data().replies]);
      });
      setComments(snapshot.docs);
    });
  }, []);

  async function handleDelete(postId: string){
    try{
      await deleteDoc(doc(db, "posts", postId)).then(async() => {
        const newPosts = authUser?.posts.filter((id) => id!== postId);
        await updateDoc(doc(db, "users", authUser?.uuid!), {
          posts: newPosts
        }).then(() => {
          dispatch(updateUser(authUser?.uuid!));
          navigate(`/profile/${authUser?.uuid}`);
        })
      })
    }
    catch(err){
      alert("Something went wrong: " + err)
    }
  }

  return (
    <>
      <article className={classes.article} style={{ marginTop: 45 }}>
        <div className={classes.postHeader}>
          <UserAvatar username={user?.username} src={user?.profileImage} size={30} />
          <Typography variant="body2">{user?.username}</Typography>
          {authUser?.uuid === user?.uuid && (
            <Box sx={{ position: "absolute", right: 25 }} component={Button} onClick={handleClick1}>
              <MoreHorizIcon />
            </Box>
          )}
        </div>
        <Menu
          anchorEl={anchorEl1}
          id="account-menu"
          open={openDropdown1}
          onClose={handleClose1}
          onClick={handleClose1}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              display: "flex",
              flexDirection: "row",
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0
              }
            }
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start"
            }}>
            <Button onClick={() => handleDelete(post.uuid)}>Delete</Button>
          </Box>
        </Menu>
        <Box component={Link} to={`/post/${post.uuid}`}>
          <img
            src={post.postImage}
            alt={post.description}
            className={classes.image}
            loading="lazy"
          />
        </Box>
        <div className={classes.postButtonsWrapper}>
          <div className={classes.postButtons}>
            <IconButton onClick={() => handleLike(post.uuid)}>
              <FavoriteIcon
                sx={{
                  fill: isLiked ? "red" : null
                }}
              />
            </IconButton>
            <IconButton component={Link} to={`/comments/${post.uuid}`}>
              <ChatBubbleOutlinedIcon />
            </IconButton>
          </div>
          <Typography className={classes.likes} variant="subtitle2">
            <span>{likes.length > 0 && `${likes.length} likes`}</span>
          </Typography>
          <div className={showCaption ? classes.expanded : classes.collapsed}>
            <Link to={`/${user?.username}`}>
              <Typography variant="subtitle2" component="span" className={classes.username}>
                {user?.username}
              </Typography>
            </Link>
            {showCaption ? (
              <Typography
                variant="body2"
                component="span"
                dangerouslySetInnerHTML={{ __html: post.description }}
              />
            ) : (
              <div className={classes.captionWrapper}>
                <Button className={classes.moreButton} onClick={() => setCaption(true)}>
                  more
                </Button>
              </div>
            )}
          </div>
          <Link to={`/comments/${post.uuid}`}>
            <Typography className={classes.commentsLink} variant="body2" component="div">
              View all {comments.length} comments
            </Typography>
          </Link>
          {comments.map((comment: DocumentData) => (
            <CommentList key={comment.id} comment={comment} />
          ))}
          <Typography color="textSecondary" className={classes.datePosted}>
            5 DAYS AGO
          </Typography>
        </div>
        <Hidden xsDown>
          <Divider />
          {/* <Comment /> */}
        </Hidden>
      </article>
    </>
  );
};

export default UserPost;
