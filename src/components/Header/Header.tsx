/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Fade,
  Grid,
  Hidden,
  IconButton,
  InputBase,
  Menu,
  Typography,
  useMediaQuery
} from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { db } from "../../service/firebaseSetup";
import useStyles, { RedTooltip } from "./style";
import { WhiteTooltip } from "./style";
import ClearIcon from "@mui/icons-material/Clear";
import CircularProgress from "@mui/material/CircularProgress";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import UserAvatar from "../UserAvatart/UserAvatart";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/selectors/user";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { logout, updateUser } from "../../redux/feature/userSlice";
import { AppDispatch } from "../../redux/store";
import NotificationTooltip from "../Notification/NotificationTooltip";
import NotificationList from "../Notification/NotificationList";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import SendIcon from "@mui/icons-material/Send";
import HomeIcon from "@mui/icons-material/Home";
import SwipeableEdgeDrawer from "../SwipeableEdgeDrawer/SwipeableEdgeDrawer";
import MenuIcon from "@mui/icons-material/Menu";
const Header = () => {
  const classes = useStyles();
  const location = useLocation();
  const path = location.pathname;
  return (
    <>
      <AppBar className={classes.appBar}>
        <section className={classes.section}>
          <Logo />
          <Search />
          <Links path={path} />
        </section>
      </AppBar>
    </>
  );
};

const Logo = () => {
  const classes = useStyles();
  return (
    <div className={classes.logoContainer}>
      <Link to="/" link-name="Go to Home Page">
        <div className={classes.logoWrapper}>
          <img src={logo} alt="Instagram" className={classes.logo} />
        </div>
      </Link>
    </div>
  );
};

const Search = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState<DocumentData[]>([]);
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<DocumentData[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<DocumentData[]>([]);
  const [hasResults, setHasResults] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "users"), orderBy("followers", "desc"));
      const data = await getDocs(q);
      setContacts(data.docs.map((user) => ({ ...user.data() })));
    };
    return () => {
      fetchData();
    };
  }, []);
  useEffect(() => {
    setFilteredContacts(
      contacts.filter((user) => user?.username.toLowerCase().includes(search.toLowerCase()))
    );
    setHasResults(filteredContacts.length > 0);
    setLoading(false);
  }, [search, contacts]);

  function handleClearInput() {
    setSearch("");
    setHasResults(false);
  }

  return (
    <Hidden smDown>
      <WhiteTooltip
        arrow
        TransitionComponent={Fade}
        open={hasResults}
        title={
          hasResults && (
            <Grid className={classes.resultContainer} container>
              {filteredContacts.map((result: DocumentData) => (
                <Grid
                  key={result.id}
                  item
                  className={classes.resultLink}
                  component={Link}
                  to={`/profile/${result.uuid}`} link-name="Visit User Profile Page">
                  <div className={classes.resultWrapper}>
                    <div className={classes.avatarWrapper}>
                      <Avatar src={result.profileImage} alt="user avatar" />
                    </div>
                    <div className={classes.nameWrapper}>
                      <Typography variant="body1">{result.username}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {result.fullname}
                      </Typography>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          )
        }>
        <InputBase
          className={classes.input}
          onChange={(event) => setSearch(event.target.value)}
          startAdornment={<span className={classes.searchIcon} />}
          endAdornment={
            loading ? (
              <CircularProgress size={15} />
            ) : (
              <IconButton onClick={handleClearInput} className={classes.clearIcon} aria-label="Clear Inut search text">
                <ClearIcon />
              </IconButton>
            )
          }
          placeholder="Search"
          value={search}
        />
      </WhiteTooltip>
    </Hidden>
  );
};
const settings = [
  {
    path: "/settings",
    label: "Settings",
    icon: <SettingsOutlinedIcon />
  },
  {
    path: "/logout",
    label: "Logout",
    icon: <LogoutOutlinedIcon />
  }
];

const Links = ({ path }: { path: string }) => {
  const classes = useStyles();
  const authUser = useSelector(userSelector);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorEl1, setAnchorEl1] = useState<null | HTMLElement>(null);
  const openDropdown = Boolean(anchorEl);
  const openDropdown1 = Boolean(anchorEl1);
  const dispatch: AppDispatch = useDispatch();
  const [notification, setNotification] = useState<DocumentData[]>();
  const [menuHeader, setMenuHeader] = useState("");
  const [open, setOpen] = useState(false);
  const [menuData, setMenuData] = useState([
    {
      path: "/settings",
      label: "Settings",
      icon: <SettingsOutlinedIcon />
    },
    {
      path: "/logout",
      label: "Logout",
      icon: <LogoutOutlinedIcon />
    }
  ]);

  const match = useMediaQuery("(max-width: 600px");
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick1 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const [showTooltip, setTooltip] = React.useState(true);
  const [showList, setList] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(handleHideTooltip, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "users/" + authUser?.uuid, "notifications"),
      async (doc) => {
        try {
          setNotification(doc.docs);
        } catch (err) {
          alert(err);
        }
      },
      (err) => {
        alert(err);
      }
    );
    return () => {
      unsub();
    };
  }, [authUser]);

  const clearNotification = async () => {
    notification?.forEach(async (nf) => {
      await deleteDoc(doc(db, "users", authUser?.uuid!, "notifications", nf.data().user));
    });
    dispatch(updateUser(authUser?.uuid!));
  };

  function handleToggleList() {
    setList((prev) => !prev);
    if (showList) {
      clearNotification();
    }
  }

  function handleHideTooltip() {
    setTooltip(false);
  }

  function handleHideList() {
    setList(false);
  }
  return (
    <div className={classes.linksContainer}>
      {showList && <NotificationList handleHideList={handleHideList} notification={notification} />}
      <div className={classes.linksWrapper}>
        {!match && (
          <Link to="/" link-name="Go to Home Page">
            {path === "/" ? <HomeIcon sx={{ color: "#fb3958" }} /> : <HomeOutlinedIcon />}
          </Link>
        )}

        <Link to="/messages" link-name="Go to Message Page">
          <Badge color="error">
            {path === "/messages" ? <SendIcon sx={{ color: "#fb3958" }} /> : <SendOutlinedIcon />}
          </Badge>
        </Link>

        <Button onClick={handleClick1} aria-label="Open upload dropdown menu">
          {path === "/upload/post" || path === "/upload/story" ? (
            <AddBoxIcon sx={{ color: "#fb3958" }} />
          ) : (
            <AddBoxOutlinedIcon sx={{ color: "#000" }} />
          )}
        </Button>
        <Menu
          anchorEl={anchorEl1}
          id="account-menu"
          open={openDropdown1}
          onClose={handleClose1}
          onClick={handleClose1}
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start"
            }}>
            <Button component={Link} to="/upload/post" link-name="Go to Upload Post page">
              <AccountCircleOutlinedIcon />
              &nbsp;Post
            </Button>
            <Button component={Link} to="/upload/story" link-name="Go to Upload Story Page">
              <BookmarkAddedOutlinedIcon />
              &nbsp;Story
            </Button>
          </Box>
        </Menu>
        <RedTooltip
          className={classes.notifications}
          onClick={handleToggleList}
          title={<NotificationTooltip notifications={notification} />}
          open={showTooltip}
          onClickCapture={handleHideTooltip}
          arrow>
          <Badge badgeContent={notification?.length} color="error">
            <FavoriteBorderIcon sx={{ fill: "#000" }} />
          </Badge>
        </RedTooltip>
        {match && (
          <Button
            onClick={() => {
              setOpen(true);
              setMenuHeader("Profile");
              setMenuData(settings);
            }} aria-label="Open Bottom Menu navigation">
            <MenuIcon sx={{ color: "black" }} />
          </Button>
        )}
        {!match && (
          <Button onClick={handleClick} aria-label="Open User Menu dropdown">
            <UserAvatar username={authUser?.username} src={authUser?.profileImage} size={30} />
          </Button>
        )}
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start"
            }}>
            <Button component={Link} to={`/profile/${authUser?.uuid}`} link-name="Visit your profile">
              <AccountCircleOutlinedIcon />
              &nbsp;Profile
            </Button>
            <Button aria-label="View saved posts">
              <BookmarkAddedOutlinedIcon />
              &nbsp;Saved
            </Button>
            <Button component={Link} to="/settings" link-name="Go to Setting Page">
              <SettingsOutlinedIcon />
              &nbsp;Settings
            </Button>
          </Box>
          <Divider />
          <Button onClick={() => dispatch(logout())} aria-label="Logout from profile">
            <LogoutOutlinedIcon />
            &nbsp;Logout
          </Button>
        </Menu>
      </div>
      {match && (
        <SwipeableEdgeDrawer
          openStauts={open}
          setOpenState={setOpen}
          data={menuData}
          menuHeader={menuHeader}
        />
      )}
    </div>
  );
};

export default Header;
