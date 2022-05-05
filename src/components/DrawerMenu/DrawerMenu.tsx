import React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

interface Props {
  open: boolean;
  setOpen: (open: boolean | ((prevVar: boolean) => boolean)) => void;
  data: any;
  menuHeader: string;
}

const DrawerMenu = (props: Props) => {
  const { open, setOpen, data } = props;

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  return (
    <div>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          component="div"
          sx={{
            width: 250
          }}>
          {data.map((element: any, i: any) => (
            <Button
              component={Link}
              to={element.path}
              key={i}
              sx={{
                width: "100%",
                textAlign: "center",
                display: "flex",
                justifyContent: "stretch",
                color: "#000",
                alignItems: "center"
              }}>
              <span>{element.icon}</span>
              &nbsp;
              <span>{element.label}</span>
            </Button>
          ))}
        </Box>
      </Drawer>
    </div>
  );
};

export default DrawerMenu;
