import { whiteColor, primaryColor, dangerColor } from "assets/jss/aiditto-pro-style/aidittoColorStyles.js";
const styles = () => ({
  root: {
    "& .MuiDialogContent-root ": {
      marginBottom: "20px !important"
    }
  },
  quill: {
    height: "300px"
  },
  reqQuill: {
    height: "100px"
  },
  quillContainer: {
    paddingTop: "20px",
    marginBottom: "45px"
  },
  formItem: {
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "20px",
    height: "10em"
  },
  saveBtn: {
    padding: "12px 28px",
    fontSize: "1.2em",
    marginLeft: "53px",
    backgroundColor: primaryColor,
    color: whiteColor,
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#e34756 !important"
    }
  },
  deleteBtn: {
    padding: "12px 28px",
    fontSize: "1.2em",
    backgroundColor: whiteColor,
    color: dangerColor[0],
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#ded9da !important"
    }
  },
  closeBtn: {
    padding: "12px 28px",
    borderRadius: "8px",
    fontSize: "1.2em",
    fontWeight: "bold",
    textTransform: "none",
    border: "solid",
    borderColor: primaryColor,
    backgroundColor: whiteColor,
    color: primaryColor,
    "&:hover": {
      backgroundColor: "#ded9da !important"
    }
  },
  topDivider: {
    marginTop: "0.5em"
  },
  itemDivider: {
    marginTop: "0.5em",
    marginBottom: "0.5em"
  },
  deletSingleItemBtn: {
    marginTop: "2em",
    padding: "6px 14px",
    borderRadius: "4px",
    fontSize: "0.8em",
    fontWeight: "bold",
    textTransform: "none",
    border: "solid",
    borderColor: primaryColor,
    backgroundColor: whiteColor,
    color: primaryColor,
    "&:hover": {
      backgroundColor: "#ded9da !important"
    }
  },
  listItemContainer: {
    paddingTop: "0.5em",
    paddingBottom: "0.5em"
  },
  innerItemContainer: {
    paddingTop: "0.5em"
  },
  mandatoryCheckBox: {
    textAlign: "center",
    marginTop: "2em"
  },
  deleteSingleItemGrid: {
    textAlign: "center",
    marginTop: "2em"
  },
  addNewItemBtn: {
    padding: "12px 28px",
    borderRadius: "8px",
    fontSize: "1.2em",
    fontWeight: "bold",
    textTransform: "none",
    border: "solid",
    borderColor: primaryColor,
    backgroundColor: whiteColor,
    color: primaryColor,
    "&:hover": {
      backgroundColor: "#ded9da !important"
    }
  },
  addNewItemContainer: {
    textAlign: "center"
  }
});

export default styles;
