import { Theme } from "@mui/system";
import { makeStyles } from "@mui/styles";

export default  makeStyles((theme: Theme) => ({
    image: {
      width: "100%",
      height: "181px",
      userSelect: "none"
    },
    gridPostContainer: {
      position: "relative"
    },
    gridPostOverlay: {
      [theme.breakpoints.down("xs")]: {
        gridAutoFlow: "row",
        alignContent: "space-evenly"
      },
      position: "absolute",
      display: "grid",
      placeItems: "center",
      gridAutoFlow: "column",
      width: "100%",
      height: "100%",
      justifyContent: "space-evenly",
      "&:hover": {
        background: "rgba(0,0,0,0.6)",
        cursor: "pointer",
        "& > div": {
          opacity: 1
        }
      }
    },
    gridPostInfo: {
      color: "#ffffff",
      display: "grid",
      gridAutoFlow: "column",
      gridGap: 5,
      placeItems: "center",
      opacity: 0
    },
    likes: {
      backgroundRepeat: "no-repeat",
      backgroundPosition: "-328px -239px",
      backgroundSize: "355px 344px",
      height: 16,
      width: 16
    },
    comments: {
      backgroundRepeat: "no-repeat",
      backgroundPosition: "-327px -203px",
      backgroundSize: "355px 344px",
      height: 16,
      width: 18
    }
  }));
  