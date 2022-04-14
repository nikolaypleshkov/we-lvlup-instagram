import { makeStyles } from "@material-ui/styles";

export default makeStyles(() => ({
    footer: {
        alignItems: "stretch",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        margin: 0,
        padding: 0,
        marginTop: "10%",
        position: "relative",
        ["@media screen and (max-width: 912px)"]: {
            display: "none"
        }
    },
    ulContainer: {
        margin: "5px 40px 30px",
        padding: "13px"
    },
    ul: {
        display: "flex",
        margin: "0px 48px 10px",
        flexWrap: "nowrap",
        alignItems: "center",
        fontSize: "9.5pt",
        whiteSpace: "nowrap",
        color: "#8e8e8e",
        justifyContent: "center"
    },
    li:{
        width: "unset !important"
    }
}));