import { infoColor, whiteColor } from "assets/jss/aiditto-pro-style/aidittoColorStyles.js";

const styles = theme => ({
  root: {
    padding: "2rem"
  },
  formStyle: {
    border: "1px solid lightgray",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 4px 25px rgba(0,0,0,0.25)",
    [theme.breakpoints.down("md")]: {
      marginBottom: "50px"
    }
  },

  leftAdminWrapper: {
    borderRight: "1px solid lightgray",
    [theme.breakpoints.down("md")]: {
      borderRight: "none"
    }
  },
  list: {
    paddingBottom: "0",
    width: "30vw",
    marginBottom: "2rem",
    [theme.breakpoints.between("sm", "md")]: {
      width: "40vw"
    },
    [theme.breakpoints.down("sm")]: {
      width: "75vw"
    }
  },
  listItem: {
    borderBottom: "1px solid lightgray"
  },
  inputWrapper: {
    display: "flex",
    alignItems: "flex-end",
    margin: "0 auto",
    "& form": {
      width: "100%",
      "& .MuiFormControl-root": {
        width: "60%",
        marginBottom: "1rem",
        "& .MuiInput-underline:before": {
          borderColor: "1px solid green !important"
        },
        "& .MuiFormLabel-root.Mui-focused": {
          color: "black !important"
        }
      }
    }
  },
  plusIcon: {
    fontSize: "2.5rem !important",
    cursor: "pointer",
    color: "green",
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: "#138913",
      color: "#f8f8f8"
    }
  },
  btnColorPrimary: {
    backgroundColor: "#e35756 !important"
  },
  btnColorInfo: {
    backgroundColor: infoColor[1],
    color: whiteColor,
    "&:hover": {
      backgroundColor: infoColor[2]
    }
  },

  itemDialog: {
    "& .MuiDialog-paperWidthSm": {
      [theme.breakpoints.up("lg")]: {
        minWidth: "15%"
      },
      [theme.breakpoints.between("md", "lg")]: {
        minWidth: "25%"
      },
      [theme.breakpoints.between("sm", "md")]: {
        minWidth: "35%"
      },
      [theme.breakpoints.down("sm")]: {
        minWidth: "50%"
      },
      [theme.breakpoints.down("xs")]: {
        minWidth: "80%"
      }
    },
    "& .MuiDialog-paper": {
      overflowY: "unset"
    }
  },
  formInputStyles: {
    marginBottom: "10px"
  },
  dropDownWrapper: {
    "& .MuiButtonBase-root": {
      width: "100%",
      margin: "20px 0"
    }
  },
  saveButton: {
    marginTop: "2rem",
    width: "40%",
    alignSelf: "flex-end"
  },
  saveButtonModal: {
    width: "40%"
  },
  expandableWrapper: {
    "& .MuiExpansionPanelSummary-root": {
      flexDirection: "column",
      "& .MuiButtonBase-root": {
        paddingTop: "0"
      }
    },
    "& .MuiExpansionPanelSummary-content": {
      marginBottom: "0",
      paddingBottom: "0",
      width: "100%"
    },
    "& .MuiListItem-container": {
      width: "100%",
      "& .MuiListItemText-root, .MuiListItem-root ": {
        marginBottom: "0",
        paddingBottom: "0"
      },
      "& .MuiIconButton-edgeEnd:last-child": {
        paddingRight: "0"
      }
    },
    "& .MuiListItem-gutters": {
      width: "100%",
      paddingLeft: "0",
      borderBottom: "1px solid lightgray"
    }
  },

  expandableSummary: {
    "& .MuiListItem-gutters": {
      borderBottom: "none"
    }
  },
  expandableDetails: {
    display: "flex",
    flexDirection: "column"
  },
  cardMe: {
    padding: "15px 0 0",
    border: "1px solid lightgray",
    boxShadow: "0 4px 25px rgba(0,0,0,0.25)"
  }
});

export default styles;
