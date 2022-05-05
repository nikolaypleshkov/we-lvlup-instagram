import { Theme } from "@mui/system";
import { makeStyles } from "@mui/styles";
import logo from "assets/images/logo/logo.webp"
export default makeStyles((theme: Theme) => ({
    root: {
        width: "90%",
        flexGrow: 1
    },
    appbarRoot: {
        background: "#fafafa !important",
    },
    logo: {
        flexGrow: "1",
        cursor: "pointer",
        color: "#000",
        width: "32%",
        backgroundImage: `url(${logo})`,
        backgroundPosition: 'center', 
        backgroundSize: 'contain', 
        backgroundRepeat: 'no-repeat',
        height: '4vh',
    },
    navlinks: {
        display: "flex",
        justifyContent: "flex-end",
        width: "100%"
    },
    link: {
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        color: "#000 !important",
        fontSize: "20px",
        marginLeft: "5%",
        "&:hover": {
          color: "yellow",
          borderBottom: "1px solid white",
        },
    }
})) 