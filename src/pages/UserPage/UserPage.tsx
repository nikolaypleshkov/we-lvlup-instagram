import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import TopBar from 'layouts/TopBar';
import { Link } from 'react-router-dom';
import BottomNavigation from 'layouts/BottomNavigation';
import { Box } from '@mui/material';
import SwipeableEdgeDrawer from 'components/SwipeableEdgeDrawer/SwipeableEdgeDrawer';

const UserPage = () => {
  return (
    <div className='main'>
            <Box>
              <h1>User Profile Page</h1>
            </Box>
    </div>
  )
}

export default UserPage