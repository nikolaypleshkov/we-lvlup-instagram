import { Theme, Tooltip } from "@mui/material";
import { withStyles, makeStyles } from "@mui/styles";


export default makeStyles((theme: Theme) => ({
    article: {
      margin: "12px 0",
      gridTemplateColumns: "minmax(auto, 600px)",
      justifyContent: "center",
    },
    card: {
      display: "grid",
      gridAutoFlow: "column",
      gridTemplateColumns: "minmax(auto, 500px)",
      gridGap: 10,
      alignItems: "center",
      padding: "8px 16px !important"
    },
    typography: {
        width: "100%",
        textAlign: "center",
      [theme.breakpoints.down("xs")]: {
        fontSize: "1rem !important"
      }
    },
    paper: {
      padding: "8px 0 !important"
    }
  }));