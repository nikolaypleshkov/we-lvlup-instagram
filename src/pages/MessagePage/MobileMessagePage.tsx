import { CircularProgress, IconButton, InputBase, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import useStyles from "./style";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from "@mui/icons-material/Clear";
import { DocumentData, query, collection, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../service/firebaseSetup';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors/user';
import UserAvatar from '../../components/UserAvatart/UserAvatart';
import { useNavigate } from 'react-router-dom';
const MobileMessagePage = () => {
    const classes = useStyles();
    const [users, setUsers] = useState<DocumentData[]>([]);
    const [contacts, setContacts] = useState<DocumentData[]>([]);
    const [filteredContacts, setFilteredContacts] = useState<DocumentData[]>([]);
    const [hasResults, setHasResults] = useState<boolean>(false);
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false);
    const authUser = useSelector(userSelector);
    const navigate = useNavigate();
    const getUser = async (id: string) => {
      const qry = query(collection(db, "users"), where("uuid", "==", id));
      const querySnapshot = await getDocs(qry);
  
      return querySnapshot.docs[0];
    };
  
    useEffect(() => {
      const unsub = async () => {
        const qry = query(collection(db, "users", authUser?.uuid!, "messages"));
        const querySnapshot = await getDocs(qry);
        querySnapshot.docs.forEach((doc) => {
          getUser(doc.id).then((res) => setUsers((prevUser) => [...prevUser, res]));
        });
      };
      return() => {
        unsub();
      }
    }, []);
  
    useEffect(() => {
      const fetchData = async () => {
        const q = query(collection(db, "users"), orderBy("followers", "desc"));
        const data = await getDocs(q);
        const onlyFollowing = data.docs.filter((profile) => authUser?.followingID.includes(profile.data().uuid));
        setContacts(onlyFollowing.map((user) => ({ ...user.data() })));
      };
      return () => {
        fetchData();
      };
    }, []);
    useEffect(() => {
      setFilteredContacts(
        contacts.filter((user) => user?.username.toLowerCase().includes(search.toLowerCase()))
      );
      setHasResults(true);
      setLoading(false);
    }, [search, contacts]);

    function navigateToRoom(id: string){
        navigate(`/messageRoom/${id}`)
    }
  return (
    <Layout title="Messages">
        <div className={classes.messageContainer}>
        <InputBase
          className={classes.input}
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          endAdornment={
            loading ? (
              <CircularProgress size={15} />
            ) : (
              <IconButton className={classes.clearIcon} aria-label="Clear Inut search text">
                <ClearIcon />
              </IconButton>
            )
          }
          />
          {
        hasResults && (
          filteredContacts.map((user) => (
            <ListItem button key={user.uuid} onClick={() => navigateToRoom(user.uuid)}>
              <ListItemIcon>
                <UserAvatar username={user.username} src={user.profileImage} size={35} />
              </ListItemIcon>
              <ListItemText primary={user.username} />
            </ListItem>

          ))
        )
      }
        </div>

    </Layout>
  )
}

export default MobileMessagePage