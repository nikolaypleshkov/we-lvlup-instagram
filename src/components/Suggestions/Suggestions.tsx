/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Box, Button, CircularProgress, Paper, Typography } from "@mui/material";
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateUser } from "../../redux/feature/userSlice";
import { userSelector } from "../../redux/selectors/user";
import { AppDispatch } from "../../redux/store";
import { db } from "../../service/firebaseSetup";
import UserAvatar from "../UserAvatart/UserAvatart";
import useStyles from "./style";
const authUser = {
  username: "n1.pleshkov",
  fullname: "Nikolay Pleshkov"
};
const Suggestions = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<DocumentData[]>([]);
  const authUser = useSelector(userSelector);
  const dispatch: AppDispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    const fetchUsers = async () => {
      const q = query(collection(db, "users"), limit(5));
      const querySnapshot = await getDocs(q);
      let suggested: Array<DocumentData> = [];
      querySnapshot.forEach((doc) => {
        suggested.push(doc.data());
      });
      suggested = suggested
        .filter((user) => !authUser?.followingID.includes(user.uuid))
        .filter((user) => user.uuid !== authUser?.uuid);
      setUsers(suggested);
      setLoading(false);
    };

    fetchUsers();
  }, [authUser?.followingID, authUser]);

  const handleFollow = async (id: string) => {
    const isFollowed = authUser?.followingID.includes(id);
    if (isFollowed) {
      const newFollowing = authUser?.followingID.filter((followingId) => followingId !== id);
      //Current Authenticated User
      const currentUserQuery = query(collection(db, "users"), where("uuid", "==", authUser?.uuid));
      const querySnapshot = await (await getDocs(currentUserQuery)).docs[0];
      const docRef = doc(db, "users", querySnapshot.id);
      await updateDoc(docRef, {
        followingID: newFollowing,
        following: newFollowing?.length
      });
      // The Unfollowed User
      const currentUserQuery1 = query(collection(db, "users"), where("uuid", "==", id));
      const querySnapshot1 = await (await getDocs(currentUserQuery1)).docs[0];
      const docRef1 = doc(db, "users", querySnapshot1.id);
      const newFollowing1 = querySnapshot1
        ?.data()
        .followingID.filter((followedID: string) => followedID !== authUser?.uuid);
      await updateDoc(docRef1, {
        followersID: newFollowing1,
        followers: newFollowing1?.length
      });

      dispatch(updateUser(authUser?.uuid!));
    } else {
      //Current Authenticated User
      const currentUserQuery = query(collection(db, "users"), where("uuid", "==", authUser?.uuid));
      const querySnapshot = await (await getDocs(currentUserQuery)).docs[0];
      const newFollowing = [...querySnapshot.data().followingID, id];
      const docRef = doc(db, "users", querySnapshot.id);
      await updateDoc(docRef, {
        followingID: newFollowing,
        following: newFollowing?.length
      });
      // The Followed User
      const currentUserQuery1 = query(collection(db, "users"), where("uuid", "==", id));
      const querySnapshot1 = await (await getDocs(currentUserQuery1)).docs[0];
      const docRef1 = doc(db, "users", querySnapshot1.id);
      const newFollowing1 = [...querySnapshot1.data().followersID, authUser?.uuid];
      await updateDoc(docRef1, {
        followersID: newFollowing1,
        followers: newFollowing1?.length
      })
      .then(async() => {
        await setDoc( doc(db, 'users', id!, 'notifications', authUser?.uuid!),{
          type: 'follow',
          user: authUser?.uuid,
          post: "",
          createdAt: Timestamp.now(),
        }) 
      });
      dispatch(updateUser(authUser?.uuid!));
    }
  };
  return (
    <article className={classes.article}>
      <Paper className={classes.paper}>
        <Typography
          color="textSecondary"
          variant="subtitle2"
          component="h2"
          align="center"
          gutterBottom
          className={classes.typography}>
          Suggestions For You
        </Typography>
        {loading ? (
          <div style={{ width: "100%", textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          users.map((user, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 1
              }}>
              <UserAvatar username={user?.username} src={user?.profileImage} size={30} />
              <Box
                sx={{
                  flex: 1,
                  margin: 3
                }}
                component={Link}
                to={`/profile/${user.uuid}`}>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {user?.username}
                </Typography>
                <Typography variant="body2">{user?.fullname}</Typography>
              </Box>
              <Button onClick={() => handleFollow(user?.uuid)}>Follow</Button>
            </Box>
          ))
        )}
        {!users.length && (
          <Typography
            color="textSecondary"
            variant="subtitle2"
            component="h2"
            align="center"
            gutterBottom
            className={classes.typography}>
            Invite your friends now
          </Typography>
        )}
      </Paper>
    </article>
  );
};

export default Suggestions;
