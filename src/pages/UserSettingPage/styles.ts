import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";
export default makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        height: "100%",
    },
    content: { 
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
        height: "100%",
        background: "transparent !important"
    },
    bannerImage:{
        maxWidth: "430px",
        ["@media screen and (max-width: 912px)"]: {
            display: "none"
        }
    },
    image: {
        maxWidth: "100%",
        height: "auto"
    },
    gridContainer: {
        width: "100%"
    },
    card: {
        ["@media screen and (max-width: 912px)"]: {
            maxWidth: "100%",
            flexBasis: "unset !important"
        }
    },
    typo: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    form: {
        minWidth: "100%",
        display: "grid"
    },
    grid: {
        display: "grid",
        marginTop: "5%"
    },
    formControl: {
        marginTop: "5% !important",
    },
    textInput: {
        width: "100%"
    },
    cardLogoContainer:{
        maxHeight: "100%",
        maxWidth: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "15px"
    },
    cardLogo: {
        objectFit: "contain",
        maxHeight: "100px",
        maxWidth: "150px"
    },
    mutedText: {
        fontWeight: 800,
        color: "#8e8e8e",
        fontSize: "17px",
        lineHeight: "20px",
        margin: "6px 40px 10px",
        textAlign: "center",
        fontFamily: "Roboto"
    },
    headerText: {
        fontWeight: 800,
        color: "#000",
        lineHeight: "20px",
        margin: "6px 40px 10px",
        textAlign: "center",
    },
    terms: {
        color: "#8e8e8e",
        fontSize: "12px",
        lineHeight: "13px",
        margin: "0px 40px",
        textAlign: "center"
    }
}));