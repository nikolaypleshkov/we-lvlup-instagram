import React, { useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import TopBar from "layouts/TopBar";
import { Link } from "react-router-dom";
import BottomNavigation from "layouts/BottomNavigation";
import { Box, Button } from "@mui/material";
import SwipeableEdgeDrawer from "components/SwipeableEdgeDrawer/SwipeableEdgeDrawer";
import UserAvatar from "components/Avatar/UserAvatar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import Typography from "@mui/material/Typography";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import BottomNav from "layouts/BottomNavigation";
import ImageGallery from "components/ImageGallery/ImageGallery";
import { userPosts } from "redux/actions/postAction";
const UserPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { posts } = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch();
  const getData = async () => {
    dispatch(userPosts(user));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <TopBar />
      <div className="main">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "stretch",
            alignItems: "flex-start"
          }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%"
            }}>
            <UserAvatar username={user?.username} src={user?.profileImage} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
              <p>{user?.posts.length}</p>
              <p>Posts</p>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
              <p>{user?.followers}</p>
              <p>Followers</p>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
              <p>{user?.following}</p>
              <p>Following</p>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "90%",
              marginLeft: "5%"
            }}>
            <Typography
              variant="h6"
              sx={{
                marginTop: "2%",
                fontSize: "11pt",
                fontWeight: 800
              }}>
              {user?.fullname}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                marginTop: "2%",
                fontSize: "11pt"
              }}>
              {user?.bio}
            </Typography>

            <Box
              sx={{
                display: "flex",
                width: "100%"
              }}>
              <Button
                sx={{
                  width: "100%",
                  color: "#000",
                  border: "1px solid #8e8e8e",
                  marginTop: "2%"
                }}>
                Edit Profile
              </Button>
              <Button
                sx={{
                  background: "#b3b3b345",
                  marginLeft: "6px",
                  color: "#000"
                }}>
                <PersonAddAltIcon />
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: "5%"
          }}>
          <ImageGallery _posts={posts} />
        </Box>
      </div>
      <BottomNav />
    </>
  );
};

export default UserPage;
