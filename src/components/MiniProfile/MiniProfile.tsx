import { Box, Typography, Button } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/feature/userSlice';
import { userSelector } from '../../redux/selectors/user';
import { AppDispatch } from '../../redux/store';
import UserAvatar from '../UserAvatart/UserAvatart';

const MiniProfile = () => {
   const authUser = useSelector(userSelector);
   const dispatch: AppDispatch = useDispatch();

   const handleLogout = () => {
       dispatch(logout());
   }
    return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
          mt={4}>
          <UserAvatar username={authUser?.username} src={authUser?.profileImage} />
          <Box sx={{
              flex: 1,
              margin: 3
          }}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              {authUser?.username}
            </Typography>
            <Typography variant="body2">{authUser?.fullname}</Typography>
          </Box>
          <Button onClick={handleLogout}>Logout</Button>
        </Box>
      );
}

export default MiniProfile