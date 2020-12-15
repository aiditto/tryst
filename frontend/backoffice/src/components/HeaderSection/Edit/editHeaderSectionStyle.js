import { whiteColor, dangerColor, primaryColor } from "assets/jss/aiditto-pro-style/aidittoColorStyles.js";
const styles = () => ({
  root: {
    "& .MuiDialogContent-root ": {
      marginBottom: "20px !important"
    }
  },
  singleRow: {
    margin: "2rem 0",
    paddingLeft: "2rem",
    display: "flex",
    alignItems: "center",
    "& p": {
      margin: "0 !important"
    }
  },
  quillContainer: {
    paddingTop: "20px",
    marginBottom: "45px"
  },
  quill: {
    height: "300px"
  },
  paper: {
    height: 150,
    width: 150,
    backgroundColor: "lightblue",
    paddingLeft: "100px"
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
  upploadBtn: {
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
  },
  switchText: {
    cursor: "pointer",
    fontSize: "1rem"
  },
  switchWrap: {
    display: "flex",
    alignItems: "center"
  },
  imageStyles: {
    display: "flex",
    flexDirection: "column"
  },
  selectedImage: {
    width: "150px !important",
    height: "150px !important"
  }
});

export default styles;
