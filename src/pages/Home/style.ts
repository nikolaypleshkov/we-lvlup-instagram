import { Theme, Tooltip } from "@mui/material";
import { withStyles, makeStyles } from "@mui/styles";

 export default makeStyles((theme: Theme) => ({
    container: {
      display: "grid",
      // gridAutoFlow: "column",
      gridTemplateColumns: "minmax(auto, 600px) 300px",
      gridGap: 35,
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "minmax(auto, 600px)",
        justifyContent: "center"
      },
      "&.slickSlider": {
        display: "grid"
      }
    },
    sidebarContainer: {
      display: "grid",
      margin: "0px 28px 24px",
      justifyContent: "center",
      gridTemplateColumns: "minmax(auto, 300px)"
    },
    sidebarWrapper: { position: "fixed", width: 293 }
}));