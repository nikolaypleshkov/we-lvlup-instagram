import { useMediaQuery, Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { userSelector } from '../../redux/selectors/user';
import { RootState } from '../../redux/store';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import useStyles from "./style";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import MovieIcon from '@mui/icons-material/Movie';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
const BottomNav = () => {
    const authUser = useSelector(userSelector); 
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const match = useMediaQuery("(max-width: 600px)");
    const location = useLocation();
    const path = location.pathname;
  return match ? (
      <Paper component="footer" sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1400 }} >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction component={Link} link-name="Go to Home Page" icon={path === "/" ? <HomeIcon sx={{ color: "#fb3958" }} /> : <HomeOutlinedIcon sx={{color: "#000"}} />} to="/" />
        <BottomNavigationAction component={Link} to="/search" link-name="Go to Search Page" icon={path === "/search" ? <SearchIcon sx={{ color: "#fb3958" }} /> : <SearchOutlinedIcon sx={{color: "#000"}} />} />
        <BottomNavigationAction component={Link} link-name="Go to Profile Page" icon={path === `/profile/${authUser?.uuid}` ? <AccountCircle sx={{ color: "#fb3958" }} /> : <AccountCircleOutlinedIcon sx={{color: "#000"}} />} to={`/profile/${authUser?.uuid}`} />
      </BottomNavigation>
      </Paper>
  ) : null
}

export default BottomNav