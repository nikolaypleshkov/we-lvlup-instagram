import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import TopBar from "layouts/TopBar/TopBar";
import { Link, useParams } from "react-router-dom";
import BottomNavigation from "layouts/BottomNavigation";
import { Box, Button, Skeleton } from "@mui/material";
import SwipeableEdgeDrawer from "components/SwipeableEdgeDrawer/SwipeableEdgeDrawer";
import UserAvatar from "components/Avatar/UserAvatar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import Typography from "@mui/material/Typography";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import BottomNav from "layouts/BottomNavigation";
import ImageGallery from "components/ImageGallery/ImageGallery";
import { userPosts, userPostsWithId } from "redux/actions/postAction";
import CircularProgress from "@mui/material/CircularProgress";
import CardCollection from "components/CardCollection/CardCollection";

const UserPage = () => {
  const { id } = useParams();
  const { authUser } = useSelector((state: RootState) => state.auth);
  const { posts, user } = useSelector((state: RootState) => state.posts);
  const [loading, setLoading] = useState<Boolean>(true);
  const [showCard, setShowCard] = useState<Boolean>(false);
  const dispatch = useDispatch();
  
  const getData = async () => {
    dispatch(userPostsWithId(id!));
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    getData()
      .then(() => {
        console.log("in then");
      })
      .catch(() => {
        alert("Something went wron.");
      });
  }, [id]);
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
            {loading ? (
              <>
                <Skeleton variant="circular" animation="wave" width={40} height={40} />
                <Skeleton variant="text" animation="wave" width={300} />
              </>
            ) : (
              <>
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
                component={Link}
                to={`/following/${user?.uuid}`}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: "#000"
                  }}>
                  <p>{user?.following}</p>
                  <p>Following</p>
                </Box>
              </>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "90%",
              marginLeft: "5%"
            }}>
            {loading ? (
              <Skeleton variant="text" animation="wave" width={90} />
            ) : (
              <Typography
                variant="h6"
                sx={{
                  marginTop: "2%",
                  fontSize: "11pt",
                  fontWeight: 800
                }}>
                {user?.fullname}
              </Typography>
            )}
            <Typography
              variant="h6"
              sx={{
                marginTop: "2%",
                fontSize: "11pt",
                fontWeight: 800
              }}></Typography>
            {loading ? (
              <Skeleton variant="text" animation="wave" width={110} />
            ) : (
              <Typography
                variant="h6"
                sx={{
                  marginTop: "2%",
                  fontSize: "11pt"
                }}>
                {user?.bio}
              </Typography>
            )}

            <Box
              sx={{
                display: "flex",
                width: "100%"
              }}>
              <Button
                component={Link}
                to={`/settings`}
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
                }}
                onClick={() => setShowCard((prevState) => !prevState)}>
                <PersonAddAltIcon />
              </Button>
            </Box>
            <Button color="error">
              {
                authUser?.uuid !== user?.uuid &&(
                  authUser?.followingID.includes(user?.uuid!) ? "Unfollow" : "Follow"
                )
              }
            </Button>
          </Box>
        </Box>
        {showCard && <CardCollection />}
        <Box
          sx={{
            marginTop: "5%"
          }}>
          {loading ? (
            <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            <ImageGallery _posts={posts} />
          )}
        </Box>
      </div>
      <BottomNav />
    </>
  );
};

export default UserPage;
