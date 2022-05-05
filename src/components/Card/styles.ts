import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
    root: {
        maxWidth: "350px",
        marginTop: "5%",
        backgroundColor: "#fff",
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        marginBottom: "10%"
    },
    cardActions: {
        display: "flex",
        justifyContent: "center"
    },
    cardContent: {
        backgroundColor: "#fff",
    },
    cardHeader: {
        fontSize: "20px"
    },
    form: {
        minWidth: "100%",
        marginTop: "5%"
    },
    textInput: {
        width: "100%",
        marginTop: "5%"
    }
}))