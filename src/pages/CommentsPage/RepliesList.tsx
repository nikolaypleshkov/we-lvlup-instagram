import { Grid } from "@mui/material";
import UserAvatar from "../../components/UserAvatart/UserAvatart";
import { collection, DocumentData, getDocs, query, where } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../../service/firebaseSetup";

const RepliesList = ({reply} : {reply: DocumentData }) => {
    const [user, setUser] = useState<DocumentData>();

    const getUserInfo = async (id: string) => {
        const qry = query(collection(db, "users"), where("uuid", "==", id));
        const querySnapshot = await getDocs(qry);
    
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      };

  useEffect(() => {
    getUserInfo(reply.createdBy);
  }, []);
  return (
    <Grid container wrap="nowrap" spacing={2} mt={1}>
      <Grid item>
        <UserAvatar src={user?.profileImage} username={user?.username} size={30} />
      </Grid>
      <Grid justifyContent="left" item xs zeroMinWidth>
        <h4
          style={{
            margin: 0
          }}>
          {user?.username}
        </h4>
        <p>{reply.reply}</p>
      </Grid>
    </Grid>
  );
};

export default RepliesList;
