import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: "100%",
    },
    content: { 
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
        height: "100%"
    },
    bannerImage:{
        maxWidth: "530px",
        ["@media screen and (max-width: 912px)"]: {
            display: "none"
        }
    },
    image: {
        maxWidth: "100%",
        height: "auto"
    },
    gridContainer: {
        marginTop: "5%"
    },
    card: {
        ["@media screen and (max-width: 912px)"]: {
            padding: "0px !important",
            maxWidth: "100%",
            flexBasis: "unset !important"
        }
    },
    typo: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}));