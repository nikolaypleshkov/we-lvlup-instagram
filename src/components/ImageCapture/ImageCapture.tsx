/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { imageSlector, imgSelector } from "../../redux/selectors/imageSelector";
import { saveImage } from "../../redux/feature/imageSlice";
const ImageCapture = () => {
    const dispatch: AppDispatch = useDispatch();
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string>("");
  const navigate = useNavigate();
  const capture = useCallback(() => {
    const img = webcamRef.current?.getScreenshot()!;
    dispatch(saveImage(img));
    navigate("/editImage")
  }, [webcamRef]);
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
          <Webcam
            audio={false}
            height={250}
            width="100%"
            ref={webcamRef}
            screenshotFormat="image/webp"
            videoConstraints={{ height: 250, width: 400, facingMode: "user" }}
          />
          <RadioButtonUncheckedIcon onClick={capture} fontSize="large" />
    </div>
  );
};

export default ImageCapture;
