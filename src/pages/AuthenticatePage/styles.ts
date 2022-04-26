import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";
export default makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    height: "100%"
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    height: "100%",
    background: "transparent !important"
  },
  bannerImage: {
    maxWidth: "530px !important",
    "@media screen and (max-width: 912px)": {
      display: "none"
    }
  },
  image: {
    maxWidth: "100%",
    height: "auto"
  },
  gridContainer: {
    marginTop: "5% !important",
  },
  card: {

    "@media screen and (max-width: 912px)": {
      maxWidth: "100% !important",
      flexBasis: "unset !important"
    }
  },
  typo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));
