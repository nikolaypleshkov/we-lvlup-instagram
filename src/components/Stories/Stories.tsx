import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Story from "./Story";
import { Modal, Typography } from "@mui/material";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../service/firebaseSetup";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Stories = () => {
  const [stories, setStories] = useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = useState<string>();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    onSnapshot(
      query(collection(db, "stories"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setStories(snapshot.docs);
      }
    );
  }, [db]);
  return stories.length ?(
    <Box
      sx={{
        display: "flex",
        padding: "1.5rem",
        background: "#fff",
        marginTop: "2rem",
        borderWidth: "1px",
        borderColor: "#edf2f7",
        borderRadius: "0.125rem",
        overflowX: "scroll"
      }}>
      {stories.map((story) => (
        <Story key={story?.data().uuid} story={story.data()} handleOpen={handleOpen} setImage={setImage} />
      ))}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <img src={image} height={100} width={100}/>
        </Box>
      </Modal>
    </Box>
  ): null
};

export default Stories;
