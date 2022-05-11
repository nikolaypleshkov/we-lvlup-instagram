import React, { useEffect } from 'react'
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import MovieIcon from '@mui/icons-material/Movie';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useStyles from "./styles";
import { Link } from 'react-router-dom';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import { useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
const BottomNav = () => {
    const { authUser } = useSelector((state: RootState) => state.auth); 
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const match = useMediaQuery("(max-width: 600px)");

    useEffect(() => {
      console.log(authUser?.uuid);
      
    })
  return match ? (
      <Paper component="footer" sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1500 }} >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction component={Link} icon={<HomeIcon sx={{
          color: "#000"
        }}  />} to="/home" />
        <BottomNavigationAction icon={<SearchIcon />} />
        <BottomNavigationAction icon={<MovieIcon />} />
        <BottomNavigationAction icon={<StorefrontIcon />} />
        <BottomNavigationAction component={Link} icon={<AccountCircleIcon sx={{
          color: "#000"
        }}  />} to={`/profile/${authUser?.uuid}`} />
      </BottomNavigation>
      </Paper>
  ) : null
}

export default BottomNav;
