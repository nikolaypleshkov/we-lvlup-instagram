/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { Dispatch, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  query,
  collection,
  where,
  getDocs,
  DocumentData,
  updateDoc,
  doc,
  setDoc,
  Timestamp,
  orderBy
} from "firebase/firestore";
import { db } from "../../service/firebaseSetup";
import { Button, Card, CardContent, CircularProgress, Grid, TextField } from "@mui/material";
import UserAvatar from "../../components/UserAvatart/UserAvatart";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/selectors/user";
import { updateUser } from "../../redux/feature/userSlice";
import { AppDispatch } from "../../redux/store";
import Layout from "../../layout/Layout";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";
const FollowingPage = () => {
  const { id } = useParams();
  const authUser = useSelector(userSelector);
  const [following, setFollowing] = useState<Array<string>>([]);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<Array<DocumentData>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [contacts, setContacts] = useState<DocumentData[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<DocumentData[]>([]);
  const [hasResults, setHasResults] = useState<boolean>(false);
  const navigate = useNavigate();
  const getUser = async (id: string) => {
    const qry = query(collection(db, "users"), where("uuid", "==", id));
    const querySnapshot = await getDocs(qry);
    return querySnapshot.docs[0].data();
  };

  useEffect(() => {
    const getFollwingUsers = async () => {
      const qry = query(collection(db, "users"), where("uuid", "==", id));
      const querySnapshot = await getDocs(qry);
      const follwingUsers: Array<string> = querySnapshot.docs[0].data().followingID;
      setFollowing(follwingUsers);
      follwingUsers.forEach((id) => {
        getUser(id).then((res) => setUsers((prevUser) => [...prevUser, res]));
      });
      setLoading(false);
    };
    return () => {
      getFollwingUsers();
    };
  }, []);

  useEffect(() => {
    setFilteredContacts(
      users.filter((user) => user?.username.toLowerCase().includes(search.toLowerCase()))
    );
    setLoading(false);
  }, [search, users]);
  return (
   
    <Layout title="Following">
      <Button onClick={() => navigate(-1)}>Go Back</Button>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10%",
          width: "100%"
        }}>
        <Typography variant="subtitle1">Following</Typography>
        <Search search={search} setSearch={setSearch} />
      </Box>
      <Grid container justifyContent="center" alignItems="center">
        {loading ? (
          <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          filteredContacts.length ?  filteredContacts?.map((_user, i) => <UserCard user={_user} key={_user.uuid} />) :
          users?.map((_user, i) => <UserCard user={_user} key={_user.uuid} />)

        )}
      </Grid>
    </Layout>
  );
};



const useStyles = makeStyles((theme: Theme) => ({
  card: {
      display: 'inline-block',
      backgroundColor: theme.palette.grey[200],
      margin: theme.spacing(1),
  },
  content: {
      display: 'flex',
      alignItems: 'center',
      paddingTop: theme.spacing(2),
      '&:last-child': {
          paddingBottom: theme.spacing(2),
      },
      minWidth: "383px",
      justifyContent: "flex-start",
  },
  avatar: {
      width: 48,
      height: 48,
  },
  name: {
      lineHeight: 1,
  },
  button: {
      backgroundColor: '#fff',
      boxShadow: '0 1px 4px 0 rgba(0,0,0,0.12)',
      '&:hover': {
          backgroundColor: '#fff',
          color: '#000',
      },
  },
}));

const UserCard = ({ user } : { user: DocumentData}) => {
  const classes = useStyles();
  const authUser = useSelector(userSelector);
  const dispatch: AppDispatch = useDispatch();

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
      })

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
      }).then(async () => {
        await setDoc(doc(db, "users", id!, "notifications", authUser?.uuid!), {
          type: "follow",
          user: authUser?.uuid,
          post: "",
          createdAt: Timestamp.now()
        });
      });
      dispatch(updateUser(authUser?.uuid!));
    }
  };
  return (
      <Card className={classes.card}>
          <CardContent className={classes.content}>
             <UserAvatar src={user.profileImage} username={user.username} size={35} />
              <Box px={3} component={Link} to={`/profile/${user.uuid}`} >
                  <Typography variant="h6" className={classes.name}>
                      {user.username}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                      {user.fullname}
                  </Typography>
              </Box>
              <Box>
                <Button onClick={() => handleFollow(user.uuid)}>
                  {authUser?.followingID.includes(user.uuid) ? "Unfollow" : "Follow"}
                </Button>
              </Box>
          </CardContent>
      </Card>
  );
};


function Search({ search, setSearch } : { search: string, setSearch: Dispatch<React.SetStateAction<string>> }) {
  return (
    <Grid item xs={12} style={{ padding: "10px"}} >
      <TextField id="outlined-basic-search" label="Search" variant="outlined" onChange={(e) => setSearch(e.target.value)} value={search} />
    </Grid>
  );
}

export default FollowingPage;
