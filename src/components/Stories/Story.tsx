/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import Box from "@mui/material/Box";
import { collection, DocumentData, getDocs, query, where } from "firebase/firestore";
import { userInfo } from "os";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "../../redux/feature/userSlice";
import { db } from "../../service/firebaseSetup";
import "./Story.css";
interface StoryInterface {
  story: DocumentData;
  setImage: Dispatch<SetStateAction<string | undefined>>;
  handleOpen: () => void;
}
const Story = (props: StoryInterface) => {
  const { story, setImage, handleOpen } = props;
    const [user, setUser] = useState<DocumentData>();
  const getUserInfo = async (id: string) => {
    const qry = query(collection(db, "users"), where("uuid", "==", id));
    const querySnapshot = await getDocs(qry);

    querySnapshot.forEach((doc) => {
      setUser(doc.data());
    });
  };

  useEffect(() => {
    getUserInfo(story?.createdByUserId);
  }, [])

  const handleClick = () => {
    handleOpen();
    setImage(story?.storyImage!)
  }
  return (
    <Box onClick={handleClick} sx={{
        marginLeft: ".75rem"
    }}>
      <img src={user?.profileImage} alt={user?.username} className="story-img"/>
      <p style={{
          fontSize: ".75rem",
          width: "4rem",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          textAlign: "center"
      }}>{user?.username}</p>
      
    </Box>
  );
};

export default Story;