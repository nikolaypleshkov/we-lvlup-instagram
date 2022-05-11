import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { query, collection, where, getDocs, DocumentData } from "firebase/firestore";
import { db } from "service/firebaseSetup";
import { Button, CircularProgress } from "@mui/material";
import UserAvatar from "components/Avatar/UserAvatar";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

const FollowingPage = () => {
  const { id } = useParams();
  const { authUser } = useSelector((state: RootState) => state.auth);
  const [following, setFollowing] = useState<Array<string>>([]);
  const [users, setUsers] = useState<Array<DocumentData>>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const navigate = useNavigate();
 
  const getFollwingUsers = async () => {
    const qry = query(collection(db, "users"), where("uuid", "==", id));
    const querySnapshot = await getDocs(qry);
    const follwingUsers: Array<string> = querySnapshot.docs[0].data().followingID;
    setFollowing(follwingUsers);
    let _users: Array<DocumentData> = [];
    follwingUsers.forEach((id) => {
      getUser(id).then((res) => setUsers((prevUser) => [...prevUser, res]));
    });
    setLoading(false);
  };

  const getUser = async (id: string) => {
    const qry = query(collection(db, "users"), where("uuid", "==", id));
    const querySnapshot = await getDocs(qry);
    return querySnapshot.docs[0].data();
  };

  useEffect(() => {
    getFollwingUsers();
  }, []);
  return (
    <>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          marginTop: "10%",
          width: "100%"
        }}>
        <Typography variant="h4">Following</Typography>
        {loading ? (
          <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          users?.map((_user, i) => (
            <Box key={_user.uuid} sx={{display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%", marginTop: 5}}>
              <UserAvatar username={_user.username} src={_user.profileImage} size={50} />
              <Typography variant="subtitle1">{_user.username}</Typography>
              <Button>
                {
                  authUser?.followingID.includes(_user.uuid) ? "Unfollow" : "Follow"
                }
                </Button>
            </Box>
          ))
        )}
      </Box>
    </>
  );
};

export default FollowingPage;
