import { Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import UserAvatar from "components/Avatar/UserAvatar";
import { collection, DocumentData, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "service/firebaseSetup";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

const CommentsList = ({ comments }: { comments: DocumentData }) => {
  const { comment, createdBy, likes } = comments;
  const [user, setUser] = useState<DocumentData>();

  const getUserInfo = async (id: string) => {
    const qry = query(collection(db, "users"), where("uuid", "==", id));
    const querySnapshot = await getDocs(qry);

    querySnapshot.forEach((doc) => {
      setUser(doc.data());
    });
  };

  useEffect(() => {
    getUserInfo(createdBy);
  }, []);
  return (
    <div style={{
        marginTop: "2rem"
    }}>
        <Paper style={{ boxShadow: "none"}}>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <UserAvatar src={user?.profileImage} username={user?.username} size={30} />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4 style={{
                        margin: 0,
                        textAlign: "left"
                    }}>{user?.username}</h4>
                    <p style={{ textAlign: "left"}}>
                        {comment}
                    </p>
                    <Button sx={{
                        marginLeft: "-5%",
                        color: "#838383"
                    }}>Reply</Button>               
                </Grid>
                <Grid justifyContent="right" item>
                    <IconButton sx={{ textAlign: "right"}} size="small">
                        <FavoriteOutlinedIcon sx={{
                            height: 15 
                        }} />
                    </IconButton>

                </Grid>
            </Grid>
        </Paper>
    </div>
  );
};

export default CommentsList;
