import React, { Dispatch, useState, ReactEventHandler } from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import MenuIcon from '@mui/icons-material/Menu';
import useSwipeableDrawer from 'hooks/useSwipeableDrawer';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FolderSpecialOutlinedIcon from '@mui/icons-material/FolderSpecialOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link } from 'react-router-dom';

const drawerBleeding = 56;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  openStauts: boolean;
  setOpenState: (open: boolean | ((prevVar: boolean) => boolean)) => void;
}

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

const settings = [
  {
    path: "/settings",
    label: "Settings",
    icon: <SettingsOutlinedIcon />,
  },
  {
    path: "/saved",
    label: "Saved",
    icon: <FolderSpecialOutlinedIcon />
  },
  {
    path: "/favourites",
    label: "Favourites",
    icon: <GradeOutlinedIcon />
  },
  {
    path: "/logout",
    label: "Logout",
    icon: <LogoutOutlinedIcon />
  }
]

export default function SwipeableEdgeDrawer(props: Props) {
  const { window, openStauts, setOpenState } = props;
  const [open, setOpen] = useState(openStauts);

  const toggleSwiper = () =>{
    setOpenState(false);
  }

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <Box sx={{ textAlign: 'center', pt: 1 }}>
      </Box>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={openStauts}
        onClose={toggleSwiper}
        onOpen={toggleSwiper}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: 'text.secondary' }}>Menu</Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <Box component="div" sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
          }}>
          {
            settings.map((element, i) => (
              <Button component={Link} to={element.path} key={i} sx={{
                width: "100%",
                textAlign: "center",
                display: "flex",
                justifyContent: "stretch",
                color: "#000",
                alignItems: "center"
              }}>
                <span>
                  {element.icon}
                </span> 
                &nbsp;
                <span>
                  {element.label}
                </span>
              </Button >
            ))
          }
          </Box>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}