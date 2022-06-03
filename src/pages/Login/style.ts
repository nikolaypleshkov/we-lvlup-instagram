import { Theme } from "@mui/system";
import { makeStyles } from "@mui/styles";


 export default makeStyles((theme: Theme) => ({
    signUpCard: {
      maxWidth: 348,
      padding: "16px 40px",
      marginBottom: 10,
      display: "grid",
      alignItems: "center",
      gridTemplateColumns: "2fr 1fr"
    },
    card: {
      maxWidth: 348,
      padding: "16px 40px",
      marginBottom: 10
    },
    section: {
      display: "grid",
      placeItems: "center",
      height: "100vh"
    },
    cardHeader: {
    //   backgroundImage: `url(${IconSheet})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "-98px 0",
      height: 51,
      width: 175,
      margin: "22px auto 12px"
    },
    textField: {
      marginBottom: 6
    },
    button: {
      margin: "8px 0px"
    },
    typography: {
      margin: "10px 0px"
    },
    orContainer: {
      margin: "10px 0px",
      display: "grid",
      gridTemplateColumns: "1fr auto 1fr",
      gridGap: 18,
      placeItems: "center"
    },
    orLine: {
      justifySelf: "stretch",
      height: 1,
      background: "#e6e6e6"
    },
    facebookIcon: {
      height: 16,
      width: 16,
      marginRight: 8
    },
    form: {
        minWidth: "100%",
        display: "grid"
    },
    textInput: {
        width: "100%"
    },
    cardLogoContainer:{
        maxHeight: "100%",
        maxWidth: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "15px",
    },
    cardLogo: {
        objectFit: "contain",
        maxHeight: "100px",
        maxWidth: "150px"
    },

    grid: {
        display: "grid",
        marginTop: "5%"
    },
    formControl: {
        marginTop: "5% !important",
    },
    gridContainer: {
        width: "100%"
    },
    typo: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    content: { 
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
        height: "100%",
        background: "transparent !important"
    },
  }));