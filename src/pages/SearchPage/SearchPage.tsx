import { Hidden, Fade, Grid, Avatar, Typography, InputBase, CircularProgress, IconButton, Button, Card, CardContent } from '@mui/material';
import { Theme } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { Box } from '@mui/system';
import { DocumentData, query, collection, orderBy, getDocs, doc, setDoc, Timestamp, updateDoc, where } from 'firebase/firestore';
import React, { Dispatch, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import UserAvatar from '../../components/UserAvatart/UserAvatart';
import Layout from '../../layout/Layout'
import { updateUser } from '../../redux/feature/userSlice';
import { userSelector } from '../../redux/selectors/user';
import { AppDispatch } from '../../redux/store';
import { db } from '../../service/firebaseSetup';
import useStyles from "./style";

const SearchPage = () => {
    const [loading, setLoading] = useState(false);
    const [contacts, setContacts] = useState<DocumentData[]>([]);
    const [search, setSearch] = useState<string>("");
    const [users, setUsers] = useState<DocumentData[]>([]);
    const [filteredContacts, setFilteredContacts] = useState<DocumentData[]>([]);
    const [hasResults, setHasResults] = useState<boolean>(false);
  
    useEffect(() => {
      const fetchData = async () => {
        const q = query(collection(db, "users"), orderBy("followers", "desc"));
        const data = await getDocs(q);
        setContacts(data.docs.map((user) => ({ ...user.data() })));
      };
      return () => {
        fetchData();
      };
    }, []);
    useEffect(() => {
      setFilteredContacts(
        contacts.filter((user) => user?.username.toLowerCase().includes(search.toLowerCase()))
      );
      setHasResults(search.length > 1);
      setLoading(false);
    }, [search, contacts]);
  return (
    <Layout title="Search">
        <Box sx={{width: "100%", textAlign: "center"}} mt={5}>
            <Search search={search} setSearch={setSearch} setHasResults={setHasResults} loading={loading} />
        </Box>
      <Grid container justifyContent="center" alignItems="center">
        {hasResults && 
          filteredContacts?.map((_user, i) => <UserCard user={_user} key={_user.uuid} />)}
      </Grid>
    </Layout>
  )
}

const Search = ({ search, setSearch, setHasResults, loading} : { search: string, setSearch: Dispatch<React.SetStateAction<string>>, setHasResults: Dispatch<React.SetStateAction<boolean>>, loading: boolean}) => {
    const classes = useStyles();
  
    function handleClearInput() {
      setSearch("");
      setHasResults(false);
    }
  
    return (
        <InputBase
        className={classes.input}
        onChange={(event) => setSearch(event.target.value)}
        startAdornment={<span className={classes.searchIcon} />}
        endAdornment={
          loading ? (
            <CircularProgress size={15} />
          ) : (
            <IconButton onClick={handleClearInput} className={classes.clearIcon} aria-label="Clear Inut search text">
              x
            </IconButton>
          )
        }
        placeholder="Search"
        value={search}
      />
    );
  };


const useUserCardStyles = makeStyles((theme: Theme) => ({
    card: {
      display: "inline-block",
      backgroundColor: theme.palette.grey[200],
      margin: theme.spacing(1)
    },
    content: {
      display: "flex",
      alignItems: "center",
      paddingTop: theme.spacing(2),
      "&:last-child": {
        paddingBottom: theme.spacing(2)
      },
      minWidth: "383px",
      justifyContent: "flex-start"
    },
    avatar: {
      width: 48,
      height: 48
    },
    name: {
      lineHeight: 1
    },
    button: {
      backgroundColor: "#fff",
      boxShadow: "0 1px 4px 0 rgba(0,0,0,0.12)",
      "&:hover": {
        backgroundColor: "#fff",
        color: "#000"
      }
    }
  }));
  
  const UserCard = ({ user }: { user: DocumentData }) => {
    const classes = useUserCardStyles();
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
          <Box px={3} component={Link} to={`/profile/${user.uuid}`}>
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

export default SearchPage