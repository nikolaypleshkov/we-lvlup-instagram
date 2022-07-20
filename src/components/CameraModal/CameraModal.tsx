import { Modal, Box } from '@mui/material'
import ImageCapture from '../ImageCapture/ImageCapture';
import React, { Dispatch, SetStateAction, useState } from 'react'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'transparent',
    zIndex: 1500
  };

  interface CameraModalInterface {
    open: boolean,
    handleOpen: Dispatch<SetStateAction<boolean>>
  }

const CameraModal = (props: CameraModalInterface) => {
  const { open, handleOpen } = props;
  return (
    <Modal
    open={open}
    onClose={() => handleOpen(false)}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"sx={{zIndex: 1500}}>
    <Box sx={style}>
        <ImageCapture />
    </Box>
  </Modal>
  )
}

export default CameraModal