import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import UserAvatar from "components/Avatar/UserAvatar";
import { DocumentData } from "firebase/firestore";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow } from "redux/actions/authActions";
import { RootState } from "redux/store";

const CardList = ({ _user }: { _user: DocumentData }) => {
    const { authUser } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
  const handleFollow = (id: string) => {
      dispatch(follow(authUser?.uuid!, id))
  };
  return (
    <Box
      sx={{
        padding: 6,
        border: "1px solid #000",
        marginLeft: ".5rem",
        marginRight: ".5rem",
        marginTop: 5
      }}>
      <UserAvatar username={_user.username} src={_user.profileImage} />
      {_user.username}
      <Button onClick={() => handleFollow(_user.uuid)}>Follow</Button>
    </Box>
  );
};

export default CardList;
