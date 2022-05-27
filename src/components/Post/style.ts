import { Theme } from "@mui/system";
import { makeStyles, withStyles } from "@mui/styles";

export default makeStyles((theme: Theme) => ({
    article: {
      border: "1px solid #e6e6e6",
      background: "#ffffff",
      marginBottom: 60,
      [theme.breakpoints.down("xs")]: {
        border: "unset",
        marginBottom: 0
      }
    },
    postHeader: {
      borderBottom: "1px solid rgba(var(--ce3,239,239,239),1)",
      display: "grid",
      gridAutoFlow: "column",
      gridTemplateColumns: "auto minmax(auto, 20px)",
      gridGap: 10,
      alignItems: "center",
      padding: 16,
      justifyContent: "start"
    },
    moreIcon: {
      height: 24,
      width: 18,
      justifySelf: "center",
      "&:hover": {
        cursor: "pointer"
      }
    },
    image: {
      width: "100%"
    },
    postButtons: {
      display: "grid",
      gridAutoFlow: "column",
      gridTemplateColumns: "24px 24px 24px minmax(24px, auto)",
      gridGap: 16,
      padding: "6px 0px !important"
    },
    postButtonsWrapper: {
      padding: "0px 16px 8px !important"
    },
    commentUsername: {
      fontWeight: "600 !important"
    },
    datePosted: {
      fontSize: "10px !important"
    },
    likes: {
      fontWeight: "600 !important",
      "&:hover": {
        cursor: "pointer"
      }
    },
    like: {
      animation: "$like-button-animation 0.45s",
      animationTimingFunction: "ease-in-out",
      transform: "scale(1)"
    },
    liked: {
      animation: "$liked-button-animation 0.45s",
      animationTimingFunction: "ease-in-out",
      transform: "scale(1)"
    },
    "@keyframes like-button-animation": {
      "0%": { transform: "scale(1)" },
      "25%": { transform: "scale(1.2)" },
      "50%": { transform: "scale(0.95)" },
      "100%": { transform: "scale(1)" }
    },
    "@keyframes liked-button-animation": {
      "0%": { transform: "scale(1)" },
      "25%": { transform: "scale(1.2)" },
      "50%": { transform: "scale(0.95)" },
      "100%": { transform: "scale(1)" }
    },
    textField: {
      padding: "10px 0px !important"
    },
    root: {
      fontSize: "14px !important"
    },
    underline: {
      "&::before": {
        border: "none !important"
      },
      "&::after": {
        border: "none !important"
      },
      "&:hover&:before": {
        border: "none !important"
      }
    },
    commentContainer: {
      display: "grid",
      gridAutoFlow: "column",
      gridTemplateColumns: "auto minmax(auto, 56px)",
      padding: "0px 0px 0px 16px !important"
    },
    commentButton: {
      width: "48px !important",
      padding: "unset"
    },
    moreButton: {
      color: "#999 !important",
      padding: "0px !important",
      "&:hover": {
        background: "transparent !important"
      }
    },
    saveIcon: {
      justifySelf: "right"
    },
    commentsLink: {
      color: "#999",
      margin: "5px 0 !important"
    },
    collapsed: {
      display: "flex",
      alignItems: "center"
    },
    expanded: {
      display: "block"
    },
    caption: {
      fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", Helvetica, Arial, sans-serif`,
      fontSize: "14px !important"
    },
    captionWrapper: {
      display: "flex",
      alignItems: "center",
      wordBreak: "break-all"
    },
    username: {
      fontWeight: "600 !important",
      marginRight: "5px !important"
    }
  }));