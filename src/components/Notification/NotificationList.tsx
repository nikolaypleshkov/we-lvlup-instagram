/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Grid, Avatar, Typography, Button, GridClasses } from '@mui/material';
import {
  collection,
  DocumentData,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userSelector } from '../../redux/selectors/user';
import { db } from '../../service/firebaseSetup';
import UserAvatar from '../UserAvatart/UserAvatart';
import useStyles from './style';

const NotificationList = ({
  handleHideList,
  notification
}: {
  handleHideList: () => void;
  notification?: DocumentData[] | null
}) => {
  const classes = useStyles();
  const authUser = useSelector(userSelector);

  const listContainerRef = React.useRef<GridClasses>();
  return (
    <Grid className={classes.listContainer} container>
      { notification && notification?.map((notification) => {
        const isLike = notification.data().type === 'like';
        const isFollow = notification.data().type === 'follow';

        return (
          <Grid key={notification.id} item className={classes.listItem}>
            <UserInfo
              id={notification.data().user}
              isLike={isLike}
              isFollow={isFollow}
            />
            <div>
              {isLike && (
                <Link to={`/post/${notification.data().post}`}>
                  <PostInfo id={notification.data().post} />
                </Link>
              )}
              {isFollow && <Button>Follow</Button>}
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
};

const PostInfo = ({ id }: { id: string }) => {
  const [image, setImage] = useState<string>('');

  useEffect(() => {
    const getPostImage = async () => {
      const q = query(collection(db, 'posts'), where('uuid', '==', id));
      const qsnapshot = await getDocs(q);
      const docData = qsnapshot.docs[0];
      setImage(docData.data().postImage);
    };

    getPostImage();
  }, []);
  return <Avatar src={image} alt="post-name" />
};
const UserInfo = ({
  id,
  isLike,
  isFollow,
}: {
  id: string;
  isLike: boolean;
  isFollow: boolean;
}) => {
  const classes = useStyles();
  const [user, setUser] = useState<DocumentData>();

  useEffect(() => {
    const getUser = async (id: string) => {
      const q = query(collection(db, 'users'), where('uuid', '==', id));
      const qsnapshot = await getDocs(q);
      setUser(qsnapshot.docs[0].data());
      console.log(qsnapshot.docs[0].data());
    };

    getUser(id);
  }, []);
  return (
    <div className={classes.listItemWrapper}>
      <div className={classes.avatarWrapper}>
        <UserAvatar src={user?.profileImage} username={user?.username!} />
      </div>
      <div className={classes.nameWrapper}>
        <Link to={`/${user?.username}`}>
          <Typography variant='body1'>{user?.username}</Typography>
        </Link>
        <Typography
          variant='body2'
          color='textSecondary'
          className={classes.typography}
        >
          {isLike && `likes your photo. 4d`}
          {isFollow && `started following you. 5d`}
        </Typography>
      </div>
    </div>
  );
};

export default NotificationList;
