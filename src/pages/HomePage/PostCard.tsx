import { Box, CardContent, Typography, Button, Card, CardHeader, IconButton, CardMedia, CardActions } from '@mui/material'
import UserAvatar from 'components/Avatar/UserAvatar'
import { collection, DocumentData, getDocs, query, where } from 'firebase/firestore'
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useDispatch, useSelector } from 'react-redux'
import { likePost } from 'redux/actions/postAction'
import { RootState } from 'redux/store'
import { User } from 'redux/types'
import { db } from 'service/firebaseSetup'
const PostCard = ({element, user} : {element: DocumentData, user?: User}) => {
    const { authUser } = useSelector((state: RootState) => state.auth);
    const [userInfo, setUserInfo] = useState<User>();
    const dispatch = useDispatch();
    const handleLike = (id: string) => {
        dispatch(likePost(authUser!, id!));
      };
    const getUserInfo = async (id: string) => {
        const querySnapshot = await getDocs(query(collection(db, "users"), where("uuid", "==", id)));
        setUserInfo(querySnapshot.docs[0].data() as User);
    }
    useEffect(() => {
      getUserInfo(element.createdByUserId);
    })
  return (
    <Card sx={{ minWidth: "100%", marginTop: "2rem" }}>
      <CardHeader
        avatar={
          <UserAvatar
            username={userInfo?.username}
            src={userInfo?.profileImage}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        subheader={userInfo?.username}
        component={Link}
        to={`/profile/${element.createdByUserId}`}
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
              fill: element.likesID.includes(authUser?.uuid!) ? "red" : null
            }}
          />
        </IconButton>
        <Box component={Link} to={`/comments/${element.uuid}`}>
          <IconButton>
            <ModeCommentOutlinedIcon />
          </IconButton>
        </Box>
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
        {element.comments.length > 0 ? (
          <Button component={Link} to={`/comments/${element.uuid}`}>
            <Typography variant="body2" color="text.secondary">
              View all {element.comments.length} comments
            </Typography>
          </Button>
        ) : null}
      </CardContent>
    </Card>
  )
}

export default PostCard