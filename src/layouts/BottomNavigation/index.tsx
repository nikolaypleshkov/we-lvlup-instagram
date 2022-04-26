import React from 'react'
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
const BottomNav = () => {
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
  return (
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
        }}  />} to="/profile" />
      </BottomNavigation>
      </Paper>
  )
}

export default BottomNav;
