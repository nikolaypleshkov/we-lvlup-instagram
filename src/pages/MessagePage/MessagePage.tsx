import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  Fab,
  Grid,
  ListItemIcon,
  Paper,
  TextField,
  IconButton,
  useMediaQuery
} from "@mui/material";
import {
  query,
  collection,
  where,
  getDocs,
  DocumentData,
  onSnapshot,
  doc,
  updateDoc,
  orderBy,
  setDoc
} from "firebase/firestore";
import React, { Dispatch, FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import UserAvatar from "../../components/UserAvatart/UserAvatart";
import Layout from "../../layout/Layout";
import { isAuth, userSelector } from "../../redux/selectors/user";
import { db } from "../../service/firebaseSetup";
import useStyles from "./style";

const MessagePage = () => {
  const classes = useStyles();
  const authUser = useSelector(userSelector);
  const authenticate = useSelector(isAuth);
  const [search, setSearch] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const match = useMediaQuery("(max-width: 600px");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() =>{
    if(match){
      navigate("/mobile-chat")
    }
  }, [])
  return authenticate ?(
    <Layout title="Messages">
      <div
        style={{
          marginTop: 65,
          width: "150%"
        }}>
        <Grid container component={Paper} className={classes.chatSection}>
          <Grid item xs={3} className={classes.borderRight500}>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <UserAvatar username={authUser?.username} src={authUser?.profileImage} />
                </ListItemIcon>
                <ListItemText primary={authUser?.username} sx={{ marginLeft: 5 }} />
              </ListItem>
            </List>
            <Divider />
            {/* search */}
            <Search setSearch={setSearch} />
            <Divider />
            <ProfileList search={search} setRoomId={setRoomId} />
          </Grid>
          <MessageDisplay roomId={roomId} />
        </Grid>
      </div>
    </Layout>
  ) : <Navigate to="/login" replace state={{ from: location }} />;
};

function Search({ setSearch }: { setSearch: Dispatch<React.SetStateAction<string>> }) {
  return (
    <Grid item xs={12} style={{ padding: "10px" }}>
      <TextField
        id="outlined-basic-email"
        label="Search"
        variant="outlined"
        fullWidth
        onChange={(e) => setSearch(e.target.value)}
      />
    </Grid>
  );
}

function ProfileList({
  search,
  setRoomId
}: {
  search: string;
  setRoomId: Dispatch<React.SetStateAction<string>>;
}) {
  const authUser = useSelector(userSelector);
  const [users, setUsers] = useState<DocumentData[]>([]);
  const [contacts, setContacts] = useState<DocumentData[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<DocumentData[]>([]);
  const [hasResults, setHasResults] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  
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
      setContacts(data.docs.map((user) => ({ ...user.data() })));
    };
    return () => {
      fetchData();
    };
  }, []);
  useEffect(() => {
    if(search.length <= 1 ){
      setHasResults(false);
    }
    setFilteredContacts(
      contacts.filter((user) => user?.username.toLowerCase().includes(search.toLowerCase()))
    );
    setHasResults(search.length > 0);
    setLoading(false);
  }, [search, contacts]);

  async function createRoom(userId: string) {

    const docRef = doc(db, "users", authUser?.uuid!, "messages", userId);
    await setDoc(docRef, {
      messages: []
    }).then(async () => {
      const docRef1 = doc(db, "users", userId, "messages", authUser?.uuid!);
      await setDoc(docRef1, {
        messages: []
      });
    });
  }
  return (
    <List>
      {users.map((room) => (
        <ListItem button key={room.id} onClick={() => setRoomId(room.id)}>
          <ListItemIcon>
            <UserAvatar username={room.data().username} src={room.data().profileImage} size={35} />
          </ListItemIcon>
          <ListItemText primary={room.data().username} />
        </ListItem>
      ))}
      {
        hasResults && (
          filteredContacts.map((user) => (
            <ListItem button key={user.uuid} onClick={() => createRoom(user.uuid)}>
              <ListItemIcon>
                <UserAvatar username={user.username} src={user.profileImage} size={35} />
              </ListItemIcon>
              <ListItemText primary={user.username} />
            </ListItem>

          ))
        )
      }
    </List>
  );
}

function MessageDisplay({ roomId }: { roomId: string }) {
  const classes = useStyles();
  const [input, setInput] = useState<string>("");
  const [rooms, setRooms] = useState<DocumentData>();
  const authUser = useSelector(userSelector);

  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const docRef = doc(db, "users", authUser?.uuid!, "messages", roomId);
    await updateDoc(docRef, {
      messages: [...rooms?.messages, { message: input, userId: authUser?.uuid }]
    }).then(async () => {
      const docRef1 = doc(db, "users", roomId, "messages", authUser?.uuid!);
      await updateDoc(docRef1, {
        messages: [...rooms?.messages, { message: input, userId: authUser?.uuid }]
      });
    });
    setInput("");
  }

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users", authUser?.uuid!, "messages"), (snapshot) => {
      const room = snapshot.docs.filter((doc) => doc.id === roomId);
      setRooms(room[0].data());
    });

    return () => {
      unsub();
    };
  }, [roomId]);
  return (
    <>
      {roomId.length ? (
        <Grid item xs={9}>
          <List className={classes.messageArea}>
            {rooms?.messages.map((room: any, i: number) => (
              <Message
                key={i}
                isOwner={authUser?.uuid === room.userId}
                message={room.message}
                userId={room.userId}
              />
            ))}
          </List>
          <Divider />
          <Grid
            component="form"
            container
            onSubmit={(e: FormEvent<HTMLFormElement>) => sendMessage(e)}>
            <Grid item xs={10}>
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
            </Grid>
            <Grid item xs={2}>
              <Button color="primary" aria-label="send" type="submit">
                Send
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <NoMessages />
      )}
    </>
  );
}

function Message({ isOwner, message, userId }: { isOwner: boolean; message: string; userId: any }) {
  const authUser = useSelector(userSelector);
  const [user, setUser] = useState<DocumentData>();
  const getUser = async (id: string) => {
    const qry = query(collection(db, "users"), where("uuid", "==", id));
    const querySnapshot = await getDocs(qry);
    setUser(querySnapshot.docs[0].data());
  };

  useEffect(() => {
    getUser(userId);
  }, [userId]);
  return (
    <ListItem>
      <Grid container>
        <Grid item xs={12}>
          {isOwner && (
            <div
              style={{
                position: "relative",
                fontSize: "16px",
                padding: "10px",
                width: "120px",
                backgroundColor: "#a1a1a157",
                border: "1px solid #b6b6b6d7",
                borderRadius: "40px",
                marginLeft: "auto"
              }}>
              <ListItemText primary={message} sx={{}} />
            </div>
          )}
          {!isOwner && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <UserAvatar src={user?.profileImage} username={user?.username} size={30} />

              <div
                style={{
                  position: "relative",
                  fontSize: "16px",
                  padding: "10px",
                  width: "120px",
                  backgroundColor: "#fff",
                  border: "1px solid #b6b6b6d7",
                  borderRadius: "30px",
                  marginLeft: 2
                }}>
                <ListItemText primary={message} sx={{}} />
              </div>
            </div>
          )}
        </Grid>
      </Grid>
    </ListItem>
  );
}

function NoMessages() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "15rem"
      }}>
      <svg
        aria-label="Direct"
        className="_8-yf5 "
        color="#262626"
        fill="#262626"
        height="96"
        role="img"
        viewBox="0 0 96 96"
        width="96">
        <circle
          cx="48"
          cy="48"
          fill="none"
          r="47"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          strokeWidth="2"></circle>
        <line
          fill="none"
          stroke="currentColor"
          stroke-linejoin="round"
          strokeWidth="2"
          x1="69.286"
          x2="41.447"
          y1="33.21"
          y2="48.804"></line>
        <polygon
          fill="none"
          points="47.254 73.123 71.376 31.998 24.546 32.002 41.448 48.805 47.254 73.123"
          stroke="currentColor"
          stroke-linejoin="round"
          strokeWidth="2"></polygon>
      </svg>
      <Typography variant="body2">Your messages</Typography>
      <Typography variant="subtitle2" color="#8a8a8a">
        Send private messages to a friend.
      </Typography>
      <Button>Send message</Button>
    </Box>
  );
}
export default MessagePage;
