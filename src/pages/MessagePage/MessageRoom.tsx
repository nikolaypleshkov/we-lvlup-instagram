import { Grid, List, Divider, TextField, Button, ListItem, ListItemText, Box } from '@mui/material';
import { DocumentData, updateDoc, onSnapshot, collection, getDocs, query, where, doc } from 'firebase/firestore';
import React, { FormEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useParams } from 'react-router-dom'
import UserAvatar from '../../components/UserAvatart/UserAvatart';
import Layout from '../../layout/Layout';
import { isAuth, userSelector } from '../../redux/selectors/user';
import { db } from '../../service/firebaseSetup';
import useStyles from "./style";
const MessageRoom = () => {
    const { id } = useParams();
    const authenticated = useSelector(isAuth);
    const location = useLocation();
  return authenticated ? (
    <Layout title="Chat Room">
        <Box>
        <MessageDisplay roomId={id!}/>
        </Box>
    </Layout>
  ): <Navigate to='/login' replace state={{ from: location }} />
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
        {roomId.length && (
          <Grid item xs={9} sx={{ marginTop: 2}}>
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
                <Button color="primary" aria-label="send" type="submit" sx={{
                    marginTop: "9px"
                }}>
                  Send
                </Button>
              </Grid>
            </Grid>
          </Grid>
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
                  padding: "16px",
                  width: "fit-content",
                  backgroundColor: "#a1a1a157",
                  border: "1px solid #b6b6b6d7",
                  borderTopLeftRadius: "30px",
                  borderBottomLeftRadius: "30px",
                  borderTopRightRadius: "25px",
                  borderBottomRightRadius: "25px",
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
                    width: "fit-content",
                    backgroundColor: "#fff",
                    border: "1px solid #b6b6b6d7",
                    borderTopRightRadius: "30px",
                    borderBottomRightRadius: "30px",
                    borderTopLeftRadius: "30px",
                    borderBottomLeftRadius: "30px",
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
export default MessageRoom