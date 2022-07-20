import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Story from "./Story";
import { Modal, Typography } from "@mui/material";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../service/firebaseSetup";
import Stories from "react-insta-stories";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const StoriesComponent = () => {
  const [stories, setStories] = useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = useState<string | any>();
  const [images, setImages] = useState<any[]>([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    onSnapshot(query(collection(db, "stories"), orderBy("timestamp", "desc")), (snapshot) => {
      setStories(snapshot.docs);
      snapshot.docs.forEach((story) => {
        setImages(images.concat(story.data().storyImage))
      })
    });
  }, [db]);
  return stories.length ? (
    <Box
      sx={{
        padding: "1.5rem",
        background: "#fff",
        marginTop: "2rem",
        borderWidth: "1px",
        borderColor: "#edf2f7",
        borderRadius: "0.125rem",
        marginBottom: "100px"
      }}>
      <Box
        sx={{
          display: "flex",
          overflow: "scroll",
          position: "absolute",
          width: "100%"
        }}>
        {stories.map((story) => (
          <Story
            key={story?.data().uuid}
            story={story.data()}
            handleOpen={handleOpen}
            setImage={setImage}
          />
        ))}
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" sx={{zIndex: 1600}}>
        <Stories stories={images!} defaultInterval={1500} width={432} height={768} />
      </Modal>
    </Box>
  ) : null;
};

export default StoriesComponent;
