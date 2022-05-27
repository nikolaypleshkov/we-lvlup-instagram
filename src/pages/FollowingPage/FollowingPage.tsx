/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  query,
  collection,
  where,
  getDocs,
  DocumentData,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../../service/firebaseSetup';
import { Button, CircularProgress } from '@mui/material';
import UserAvatar from '../../components/UserAvatart/UserAvatart';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors/user';
import { updateUser } from '../../redux/feature/userSlice';
import { AppDispatch } from '../../redux/store';

const FollowingPage = () => {
  const { id } = useParams();
  const authUser = useSelector(userSelector);
  const [following, setFollowing] = useState<Array<string>>([]);
  const [users, setUsers] = useState<Array<DocumentData>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();


  const getUser = async (id: string) => {
    const qry = query(collection(db, 'users'), where('uuid', '==', id));
    const querySnapshot = await getDocs(qry);
    return querySnapshot.docs[0].data();
  };

  useEffect(() => {
    const getFollwingUsers = async () => {
        const qry = query(collection(db, 'users'), where('uuid', '==', id));
        const querySnapshot = await getDocs(qry);
        const follwingUsers: Array<string> =
          querySnapshot.docs[0].data().followingID;
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

  const handleFollow = async (id: string) => {
      const isFollowed = authUser?.followingID.includes(id)
      if(isFollowed){
          const newFollowing = authUser?.followingID.filter((followingId) => followingId !==id );
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
        const newFollowing1 = querySnapshot1?.data().followingID.filter((followedID: string) => followedID !== authUser?.uuid );
        await updateDoc(docRef1, {
              followersID: newFollowing1,
              followers: newFollowing1?.length
          });

          dispatch(updateUser(authUser?.uuid!));
      }

    else {
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
        });
        dispatch(updateUser(authUser?.uuid!));
    }
  };
  return (
    <>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
      <Box
        sx={{
          display: 'grid',
          placeItems: 'center',
          marginTop: '10%',
          width: '100%',
        }}
      >
        <Typography variant='h4'>Following</Typography>
        {loading ? (
          <Box
            sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}
          >
            <CircularProgress />
          </Box>
        ) : (
          users?.map((_user, i) => (
            <Box
              key={_user.uuid}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                width: '100%',
                marginTop: 5,
              }}
            >
              <UserAvatar
                username={_user.username}
                src={_user.profileImage}
                size={50}
              />
              <Typography
                component={Link}
                to={`/profile/${_user.uuid}`}
                variant='subtitle1'
              >
                {_user.username}
              </Typography>
              <Button onClick={() => handleFollow(_user.uuid)}>
                {authUser?.followingID.includes(_user.uuid)
                  ? 'Unfollow'
                  : 'Follow'}
              </Button>
            </Box>
          ))
        )}
      </Box>
    </>
  );
};

export default FollowingPage;
