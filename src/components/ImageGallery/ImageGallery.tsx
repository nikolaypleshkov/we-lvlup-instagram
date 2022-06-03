import { CircularProgress, ImageList, ImageListItem, Typography } from "@mui/material";
import { collection, DocumentData, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../service/firebaseSetup";
import useStyles from "./style";

const ImageGallery = ({ post }: { post: DocumentData }) => {
  const classes = useStyles();
  const [likes, setLikes] = useState<DocumentData[]>([]);
  const [comments, setComments] = useState<DocumentData[]>([]);
  async function getLikes(id: string){
    const docSnapshot = await getDocs(collection(db, "posts", id, "likes"));
    setLikes(docSnapshot.docs);
  }

  async function getComments(id: string){

    const docSnapshot = await getDocs(collection(db, "posts", id, "comments"));
    setComments(docSnapshot.docs);
  }
  useEffect(() => {
    getLikes(post.id);
    getComments(post.id);

  }, [post.id])
  return (
    <>
        <Link className={classes.gridPostContainer} to={`/post/${post.id}`}>
          <div className={classes.gridPostOverlay}>
            <div className={classes.gridPostInfo}>
              <span className={classes.likes} />
              <Typography>{likes.length}</Typography>
            </div>
            <div className={classes.gridPostInfo}>
              <span className={classes.comments} />
              <Typography>{comments.length}</Typography>
            </div>
          </div>
          <img src={post.data().postImage} alt="Post cover" className={classes.image} />
        </Link>
    </>
  );
};

export default ImageGallery;
