/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import UserAvatar from '../UserAvatart/UserAvatart';
import useStyles from './style';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Link } from 'react-router-dom';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import { Box, Button, Divider, Hidden, IconButton, Typography } from '@mui/material';
import { db } from '../../service/firebaseSetup';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors/user';
import FavoriteIcon from '@mui/icons-material/Favorite';
interface PostInterface {
  uuid: string;
  postImage: string;
  likes: number;
  description: string;
  comments: DocumentData[];
}
const Post = ({ post, index }: { post: DocumentData; index: number }) => {
  const classes = useStyles();
  const authUser = useSelector(userSelector);
  const [showCaption, setCaption] = useState(false);
  const [showOptionsDialog, setOptionsDialog] = useState(false);
  const [user, setUser] = useState<DocumentData>();
  const [userDocId, setUserDocId] = useState<string>('');
  const [likes, setLikes] = useState<Array<DocumentData>>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState<Array<DocumentData>>([]);
  const [replies, setReplies] = useState<Array<DocumentData>>([]);
  const showFollowSuggestions = index === 1;
  
  const getUserInfo = async (id: string) => {
    const q = query(collection(db, 'users'), where('uuid', '==', id));
    await getDocs(q)
      .then((doc) => {
        setUser(doc.docs[0].data());
        setUserDocId(doc.docs[0].id);
      })
      .catch((err) => {
        alert('Something went wrong: ' + err);
      });
  };

  useEffect(() => {
    getUserInfo(post.createdByUserId);
  }, [post.createdByUserId]);

  useEffect(() => {
    onSnapshot(collection(db, "posts", post.uuid, "likes"), (snapshot) =>
      setLikes(snapshot.docs)
    )
  }, [post.uuid]);

  useEffect(() => {
    setIsLiked(likes.findIndex((like) => like.id === authUser?.uuid!) !== -1);
  }, [authUser?.uuid, likes])

  const handleLike = async (id: string) => {
    if(isLiked){
      await deleteDoc(doc(db, "posts", id, "likes", authUser?.uuid!));
    }
    else {
      await setDoc(doc(db, "posts", id!, "likes", authUser?.uuid!), {
        user: authUser?.uuid
      })
      .then(async () => {
        await setDoc(
          doc(db, 'users', userDocId!, 'notifications', authUser?.uuid!),
          {
            type: 'like',
            user: authUser?.uuid,
            post: post.uuid,
            createdAt: Timestamp.now(),
          }
        ).catch((err) => alert('Something went wrong creating doc: ' + err));
      })
      .catch((err) => alert('Something went wrong: ' + err));
    }
  };

  useEffect(() => {
    onSnapshot(collection(db, "posts", post.uuid, "comments"), (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setReplies((prevRep) => ([...prevRep, doc.data().replies]))
      })
      setComments(snapshot.docs);   
    })
  }, [])

  return (
    <>
        <article
          className={classes.article}
          style={{ marginBottom: showFollowSuggestions ? 30 : 0 }}
        >
          <Box className={classes.postHeader} component={Link} to={`/profile/${user?.uuid}`}>
            <UserAvatar
              username={user?.username}
              src={user?.profileImage}
              size={30}
            />
            <Typography variant='body2'>{user?.username}</Typography>
          </Box>
          <Box component={Link} to={`/post/${post.uuid}`}>
            <img
              src={post.postImage}
              alt={post.description}
              className={classes.image}
              loading='lazy'
            />
          </Box>
          <div className={classes.postButtonsWrapper}>
            <div className={classes.postButtons}>
              <IconButton onClick={() => handleLike(post.uuid)}>
                <FavoriteIcon  sx={{
                    fill: isLiked ? "red" : null
            }} />
              </IconButton>
              <IconButton component={Link} to={`/comments/${post.uuid}`}>
                <ChatBubbleOutlinedIcon />
              </IconButton>
            </div>
            <Typography className={classes.likes} variant='subtitle2'>
              <span>{likes.length > 0 && `${likes.length} likes`}</span>
            </Typography>
            <div className={showCaption ? classes.expanded : classes.collapsed}>
              <Link to={`/profile/${user?.username}`}>
                <Typography
                  variant='subtitle2'
                  component='span'
                  className={classes.username}
                >
                  {user?.username}
                </Typography>
              </Link>
              {showCaption ? (
                <Typography
                  variant='body2'
                  component='span'
                  dangerouslySetInnerHTML={{ __html: post.description }}
                />
              ) : (
                <div className={classes.captionWrapper}>
                 
                  <Button
                    className={classes.moreButton}
                    onClick={() => setCaption(true)}
                  >
                    more
                  </Button>
                </div>
              )}
            </div>
            <Link to={`/comments/${post.uuid}`}>
              <Typography
                className={classes.commentsLink}
                variant='body2'
                component='div'
              >
                View all {comments.length} comments
              </Typography>
            </Link>
            {comments.map((comment: DocumentData) => (
            <div key={comment.id}>
              <Link to={`/profile/${comment.createdByUserId}`}>
                <Typography
                  variant="subtitle2"
                  component="span"
                  className={classes.commentUsername}
                >
                  {/* {comment.user.username} */}
                </Typography>{" "}
                <Typography variant="body2" component="span">
                  {comment.comment}
                </Typography>
              </Link>
            </div>
          ))}
            <Typography color='textSecondary' className={classes.datePosted}>
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

export default Post;
