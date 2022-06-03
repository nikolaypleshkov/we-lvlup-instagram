import Layout from "../../layout/Layout";
import { Button, Box, Typography, Grid } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "tui-image-editor/dist/tui-image-editor.css";
import TuiImageEditor from "tui-image-editor";
import ImageCapture from "../../components/ImageCapture/ImageCapture";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CollectionsIcon from "@mui/icons-material/Collections";
import CameraModal from "../../components/CameraModal/CameraModal";

const UploadStoryPage = () => {
  const navigate = useNavigate();
  const [fromDeivce, setFromDevice] = useState(false);
  const [fromCamera, setFromCamera] = useState<boolean>(false);
  return (
    <Layout title="Upload Story">
      <Box
        sx={{
          marginTop: "10%"
        }}>
        <Typography
          variant="h4"
          mb={5}
          sx={{
            width: "100%",
            textAlign: "center"
          }}>
          Upload Story
        </Typography>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Box
              component={Link}
              to={"/upload/fromDevice"}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
              <Typography variant="body1">Choose from device</Typography>
              <Button>
                <CollectionsIcon fontSize="large" />
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
              <Typography variant="body1">Take from camera</Typography>
              <Button onClick={() => setFromCamera(true)}>
                <CameraAltIcon fontSize="large" />
              </Button>
            </Box>
          </Grid>
        </Grid>
        <CameraModal open={fromCamera} handleOpen={setFromCamera} />
      </Box>
    </Layout>
  );
};

export default UploadStoryPage;
