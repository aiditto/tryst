import { whiteColor, dangerColor, primaryColor } from "assets/jss/aiditto-pro-style/aidittoColorStyles.js";
const styles = () => ({
  root: {
    "& .MuiDialogContent-root ": {
      display: "inline-block",
      marginBottom: "20px !important",
      marginTop: "30px !important",
      marginLeft: "50px !important"
    }
  },
  removeBtn: {
    padding: "8px 12px",
    borderRadius: "15px",
    fontSize: "1.0em",
    fontWeight: "bold",
    textTransform: "none",
    border: "solid",
    borderColor: primaryColor,
    backgroundColor: primaryColor,
    color: whiteColor,
    "&:hover": {
      backgroundColor: "#e34756 !important",
      borderColor: "#e34756 !important"
    }
  },
  changeBtn: {
    marginRight: "30px",
    padding: "8px 12px",
    borderRadius: "15px",
    fontSize: "1.0em",
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
  uploadBtn: {
    marginTop: "10px",
    marginBottom: "10px",
    padding: "12px 28px",
    borderRadius: "8px",
    fontWeight: "bold",
    textTransform: "none",
    border: "solid",
    borderColor: primaryColor,
    backgroundColor: whiteColor,
    color: primaryColor,
    "&:hover": {
      backgroundColor: "#ded9da !important"
    }
  }
});

export default styles;
