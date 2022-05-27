import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";


export default makeStyles((theme: Theme) => ({
    listContainer: {
      background: "rgba(var(--cdc,255,255,255),1)",
      borderRadius: "3px",
      border: "solid 1px rgba(var(--f23,255,255,255),1)",
      boxShadow: "0 0 5px rgba(var(--jb7,0,0,0),.0975)",
      display: "block",
      maxHeight: "362px !important",
      minHeight: "100px !important",
      overflowX: "hidden",
      overflowY: "auto",
      padding: "0",
      position: "absolute",
      top: "54px !important",
      whiteSpace: "normal",
      maxWidth: "500px !important",
      width: "500px !important",
      [theme.breakpoints.down("sm")]: {
        width: "100% !important",
        right: 0
      }
    },
    listItem: {
      background: "#fafafa",
      borderBottom: "solid 1px rgba(var(--b38,219,219,219),1)",
      "&:hover": {
        background: "rgba(var(--b3f,250,250,250),1)"
      },
      color: "black !important",
      width: "100% !important",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      minHeight: "40px !important",
      padding: "6px 8px 7px",
      position: "relative",
      justifyContent: "space-between"
    },
    listItemWrapper: {
      display: "flex",
      alignItems: "center",
      height: "50px",
      padding: "8px 16px"
    },
    avatarWrapper: {
      margin: "0 10px 0 0"
    },
    nameWrapper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    },
    typography: {
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
      [theme.breakpoints.down("xs")]: {
        maxWidth: "140px !important"
      }
    }
}));