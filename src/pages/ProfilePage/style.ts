import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";


export default makeStyles((theme: Theme) => {
    const followingSectionLarge = {
      display: "grid",
      gridAutoFlow: "column",
      gridGap: 40,
      gridTemplateColumns:
        "minmax(auto, max-content) minmax(auto, max-content) minmax(auto, max-content)"
    };
    const followingTextLarge = {
      display: "grid",
      gridGap: 5,
      gridAutoFlow: "column",
      gridTemplateColumns: "minmax(auto, max-content) minmax(auto, max-content)"
    };
    return {
      container: {
        maxWidth: 935,
        marginTop: 55
      },
      followingSection: {
        [theme.breakpoints.down("sm")]: {
          // ...followingSectionLarge

        display: "flex",
        justifyContent: "space-between"
        },
        [theme.breakpoints.down("xs")]: {
          display: "grid !important",
          gridAutoFlow: "row",
          padding: "10px 0"
        },
        ...followingSectionLarge
      },
      followingText: {
        [theme.breakpoints.up("sm")]: {
          ...followingTextLarge
        },
        [theme.breakpoints.down("xs")]: {
          display: "grid",
          justifyItems: "center",
          "& p": {
            fontSize: "0.9rem"
          }
        }
      },
      followingCount: {
        fontWeight: "600 !important"
      },
      cardLarge: {
        background: "transparent !important",
        border: "unset !important",
        gridAutoFlow: "column",
        gridTemplateColumns: "minmax(auto, 290px) minmax(auto, 645px)"
      },
      cardContentLarge: {
        display: "grid",
        gridGap: 20
      },
      cardSmall: {
        background: "transparent !important",
        border: "unset !important",
        [theme.breakpoints.down("xs")]: {
          width: "100vw"
        }
      },
      sectionSmall: {
        display: "grid",
        gridAutoFlow: "column",
        marginBottom: 16,
        gridTemplateColumns: "77px auto",
        gridGap: 20
      },
      typography: {
        fontWeight: "600 !important"
      },
      section: {
        "& p": {
          [theme.breakpoints.down("xs")]: {
            fontSize: "0.9rem"
          }
        }
      },
      usernameSection: {
        display: "grid",
        gridGap: 10,
        gridAutoFlow: "column",
        gridTemplateColumns: "minmax(auto, max-content) minmax(auto, 112px) 30px",
        alignItems: "center"
      },
      username: {
        fontSize: "20px !important",
        fontWeight: "300 !important"
      },
      button: {
        lineHeight: "unset !important",
        height: "50px !important",
      },
      settings: {
        height: 30,
        width: 30
      },
      settingsWrapper: {
        padding: 15,
        "&:hover": {
          cursor: "pointer"
        }
      },
      usernameDivSmall: {
        display: "grid",
        // gridGap: 20,
        gridAutoFlow: "column",
        // gridTemplateColumns: "minmax(auto, max-content) minmax(auto, 112px) 30px",
        alignItems: "center",
        gridTemplateColumns: "minmax(auto, max-content) 30px",
        gridGap: 10
      },
      dialogScrollPaper: {
        display: "grid !important",
        gridTemplateColumns: "minmax(auto, 480px) !important"
      },
      dialogPaper: {
        borderRadius: 12
      },
      dialogTitle: {
        textAlign: "center"
      },
      wrapper: {
        display: "grid",
        justifyContent: "center",
        padding: "32px 16px 16px"
      },
      avatar: {
        width: 90,
        height: 90
      },
      unfollowDialogScrollPaper: {
        display: "grid",
        gridTemplateColumns: "minmax(auto, 496px)"
      },
      cancelButton: {
        padding: "12px 8px !important"
      },
      unfollowButton: {
        color: `${theme.palette.error.main} !important`,
        padding: "12px 8px !important"
      },
      unfollowDialogText: {
        padding: "16px 16px 32px !important"
      },
      arrowIcon: {
        backgroundRepeat: "no-repeat",
        backgroundPosition: "-187px -306px",
        height: "6px",
        width: "9px"
      },
      buttonSmall: {
        width: "30px",
        height: "30px",
        minWidth: "30px"
      },
      buttonSelected: {
        width: "30px !important",
        height: "30px !important",
        minWidth: "30px !important",
        opacity: "0.7 !important"
      }
    };
  });