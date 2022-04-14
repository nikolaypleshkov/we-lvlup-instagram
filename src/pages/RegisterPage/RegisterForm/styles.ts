import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
    form: {
        minWidth: "100%",
        marginTop: "5%"
    },
    textInput: {
        width: "100%",
        marginTop: "2%"
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
    terms: {
        color: "#8e8e8e",
        fontSize: "12px",
        lineHeight: "13px",
        margin: "0px 40px",
        textAlign: "center"
    }
}))
