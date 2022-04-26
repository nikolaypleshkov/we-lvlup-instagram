import React, {useEffect, useState} from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box, { BoxProps } from "@mui/material/Box";
import { Link, LinkProps, useLocation } from "react-router-dom";
import useStyles from "./styles";
import { Button, Paper } from "@mui/material";
import SwipeableEdgeDrawer from "components/SwipeableEdgeDrawer/SwipeableEdgeDrawer";
import MenuIcon from '@mui/icons-material/Menu';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import { useDispatch, useSelector } from 'react-redux'
import store, { RootState } from 'redux/store';

const TopBar = (): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appbarRoot}>
        <Toolbar>
          {
            location.pathname === "/profile" 
            ? <Box component="h2" sx={{
              color: "#000"
            }}>{user?.username}</Box> 
            : <Box component="div" className={classes.logo} > </Box>
          }
            <div  className={classes.navlinks}>
              <Button className={classes.link}>
                <AddBoxOutlinedIcon sx={{color: "black"}} />
              </Button>
              <Button className={classes.link}>
                <FavoriteBorderTwoToneIcon sx={{color: "black"}} />
              </Button>

              {
                location.pathname === "/profile" && (
                  <Button className={classes.link} onClick={() => setOpen(true)}>
                     <MenuIcon sx={{color: "black"}} /> 
                  </Button>
                )
              }
            </div>
        </Toolbar>
      </AppBar>
      {
        location.pathname === "/profile" && (
          <SwipeableEdgeDrawer openStauts={open} setOpenState={setOpen}  />
        )

      }
    </div>
  );
}

export default TopBar