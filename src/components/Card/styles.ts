import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    root: {
        maxWidth: "350px",
        marginTop: "5%",
        backgroundColor: "#fff",
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
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