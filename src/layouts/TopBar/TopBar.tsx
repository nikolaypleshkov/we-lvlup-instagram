import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box, { BoxProps } from "@mui/material/Box";
import { Link, LinkProps, useLocation } from "react-router-dom";
import useStyles from "./styles";
import {
  Avatar,
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  useMediaQuery
} from "@mui/material";
import SwipeableEdgeDrawer from "components/SwipeableEdgeDrawer/SwipeableEdgeDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "redux/store";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FolderSpecialOutlinedIcon from "@mui/icons-material/FolderSpecialOutlined";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ViewComfyIcon from "@mui/icons-material/ViewComfy";
import DownloadingIcon from "@mui/icons-material/Downloading";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import DrawerMenu from "components/DrawerMenu/DrawerMenu";
import UserAvatar from "components/Avatar/UserAvatar";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { HomeOutlined } from "@mui/icons-material";
interface MenuData {
  path: string;
  label: string;
  icon: JSX.Element;
}

const settings = [
  {
    path: "/settings",
    label: "Settings",
    icon: <SettingsOutlinedIcon />
  },
  {
    path: "/saved",
    label: "Saved",
    icon: <BookmarkAddedOutlinedIcon />
  },
  {
    path: "/favourites",
    label: "Favourites",
    icon: <GradeOutlinedIcon />
  },
  {
    path: "/logout",
    label: "Logout",
    icon: <LogoutOutlinedIcon />
  }
];

const TopBar = (): JSX.Element => {
  const classes = useStyles();
  const location = useLocation();
  const match = useMediaQuery("(max-width: 600px");
  // const { user } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.posts);
  const [open, setOpen] = useState(false);
  const [menuHeader, setMenuHeader] = useState("");
  const [menuData, setMenuData] = useState([
    {
      path: "/settings",
      label: "Settings",
      icon: <SettingsOutlinedIcon />
    },
    {
      path: "/saved",
      label: "Saved",
      icon: <FolderSpecialOutlinedIcon />
    },
    {
      path: "/favourites",
      label: "Favourites",
      icon: <GradeOutlinedIcon />
    },
    {
      path: "/logout",
      label: "Logout",
      icon: <LogoutOutlinedIcon />
    }
  ]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openDropdown = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appbarRoot}>
        <Toolbar>
          {location.pathname.toString().split("/").includes("profile") ? (
            <Box
              component="h3"
              sx={{
                color: "#000",
                whiteSpace: "nowrap"
              }}>
              {user?.username}
            </Box>
          ) : (
            <Box component="div" className={classes.logo}>
              {" "}
            </Box>
          )}
          <div className={classes.navlinks}>
            {
              !match && 
              <Button href="/home" className={classes.link} sx={{color: "#000"}}>
                  <HomeOutlined />
              </Button>
            }
            <Button className={classes.link}>
              <AddBoxOutlinedIcon
                sx={{ color: "black" }}
                onClick={() => {
                  setOpen(true);
                  setMenuHeader("Create");
                  setMenuData([
                    {
                      path: "/add-post",
                      label: "Post",
                      icon: <ViewComfyIcon />
                    },
                    {
                      path: "/story",
                      label: "Story",
                      icon: <DownloadingIcon />
                    }
                  ]);
                }}
              />
            </Button>
            <Button className={classes.link}>
              <FavoriteBorderTwoToneIcon sx={{ color: "black" }} />
            </Button>
            {location.pathname.toString().split("/").includes("profile") && match ?(
              <Button
                className={classes.link}
                onClick={() => {
                  setOpen(true);
                  setMenuHeader("Profile");
                  setMenuData(settings);
                }}>
                <MenuIcon sx={{ color: "black" }} />
              </Button>
            ): null}
            {match ? null : (
              <>
                <Button onClick={handleClick}>
                  <UserAvatar username={user?.username} src={user?.profileImage} size={30} />
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={openDropdown}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      display: "flex",
                      flexDirection: "row",
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0
                      }
                    }
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                  <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start"}}>
                  <Button component={Link} to={`/profile/${user?.uuid}`} >
                      <AccountCircleOutlinedIcon />&nbsp;Profile
                  </Button>
                  <Button >
                      <BookmarkAddedOutlinedIcon />&nbsp;Saved
                  </Button>
                  <Button component={Link} to="/settings">
                      <SettingsOutlinedIcon />&nbsp;Settings
                  </Button>
                  </Box>
                  <Divider />
                  <Button href="/logout">
                      <LogoutOutlinedIcon />&nbsp;Logout
                  </Button>
                </Menu>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {match ? (
        <SwipeableEdgeDrawer
          openStauts={open}
          setOpenState={setOpen}
          data={menuData}
          menuHeader={menuHeader}
        />
      ) : (
        <DrawerMenu open={open} setOpen={setOpen} menuHeader={menuHeader} data={menuData} />
      )}
    </div>
  );
};

export default TopBar;
