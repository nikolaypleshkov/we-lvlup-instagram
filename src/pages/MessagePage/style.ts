import { Theme } from "@mui/system";
import { makeStyles } from "@mui/styles";


 export default makeStyles((theme: Theme) => ({
    table: {
        minWidth: 650,
      },
      chatSection: {
        width: '100%',
        height: '80vh'
      },
      headBG: {
          backgroundColor: '#e0e0e0'
      },
      borderRight500: {
          borderRight: '1px solid #e0e0e0'
      },
      messageArea: {
        height: '70vh',
        overflowY: 'auto',
        background: "rgb(250, 250, 250)"
      },
      input: {
        height: 28,
        fontSize: "14px !important",
        background: "rgba(var(--b3f,250,250,250),1)",
        border: "solid 1px rgba(var(--b6a,219,219,219),1)",
        borderRadius: 3,
        color: "rgba(var(--i1d,38,38,38),1)",
        outline: 0,
        padding: "3px 3px 3px 26px",
        zIndex: 2
      },
      searchIcon: {
      //   backgroundImage: `url(${IconSheet})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "-167px -306px",
        height: 10,
        width: 10,
        left: 11,
        position: "absolute",
        top: 9,
        zIndex: 2
      },
    clearIcon: {
      //   backgroundImage: `url(${IconSheet})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "-250px -98px",
        height: 20,
        width: 20,
        cursor: "pointer"
      },
      messageContainer: {
        marginTop: "2.4rem"
      }
  }));