import { Avatar, AvatarGroup } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  where
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { db } from "service/firebaseSetup";
import CardList from "./CardList";

const CardCollection = () => {
  const { authUser } = useSelector((state: RootState) => state.auth);
  const [users, setUsers] = useState<DocumentData[]>([]);
  const [userCollection, setUserCollection] = useState<DocumentData[]>([]);
  const date = new Date();
  const getUsers = async () => {
    const qry = query(collection(db, "users"), orderBy("followers", "asc"), limit(5));
    const querySnapshot = await getDocs(qry);
    let data: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    data = data
      .filter((doc) => doc.uuid !== authUser?.uuid)
      .filter((doc) => !authUser?.followingID.includes(doc.uuid));
    console.log(data);

    setUsers(data);

    setUserCollection((prevState) => [...prevState, users.slice(-2)]);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <Button
        sx={{
          position: "absolute",
          right: 0
        }}>
        View all
      </Button>
      <Box
        sx={{
          display: "flex",
          overflowX: "scroll"
        }}>
        {users.map((user) => (
          <CardList _user={user} key={user.uuid} />
        ))}
      </Box>
    </div>
  );
};

export default CardCollection;
