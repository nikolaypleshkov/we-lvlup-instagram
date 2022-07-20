import { Typography } from '@mui/material'
import { collection, DocumentData, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../service/firebaseSetup';
import useStyles from './style';

const CommentList = ({comment} : {comment: DocumentData}) => {
    const classes = useStyles();
    const [user, setUser] = useState<DocumentData>();
  const getUserInfo = async (userId: string) => {
    const q = query(collection(db, 'users'), where('uuid', '==', userId));
    await getDocs(q)
      .then((doc) => {
        setUser(doc.docs[0].data());
      })
      .catch((err) => {
        alert('Something went wrong: ' + err);
      });
  };

  useEffect(() => {
    getUserInfo(comment.data().createdByUserId);
  }, [])
  return (

    <div>
    <Link to={`/profile/${comment.data().createdByUserId}`}>
      <Typography
        variant="subtitle2"
        component="span"
        className={classes.commentUsername}
      >
        {user?.username}
      </Typography>{" "}
      <Typography variant="body2" component="span">
        {comment.data().comment}
      </Typography>
    </Link>
  </div>
  )
}

export default CommentList