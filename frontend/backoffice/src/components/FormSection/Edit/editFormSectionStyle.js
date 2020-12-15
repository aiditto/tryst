import { whiteColor, primaryColor, dangerColor } from "assets/jss/aiditto-pro-style/aidittoColorStyles.js";
const styles = () => ({
  root: {
    "& .MuiDialogContent-root ": {
      marginBottom: "20px !important"
    }
  },
  dividerStyle: {
    marginBottom: "1.5rem"
  },
  infoHeader: {
    fontFamily: "Montserrat",
    fontSize: "40px",
    fontWeight: "800",
    lineHeight: "49px"
  },
  subheader: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "20px",
    color: "#000"
  },
  orderCreator: {
    paddingTop: "20px",
    marginBottom: "45px"
  },
  info: {
    padding: "12px 28px",
    fontSize: "1.2em",
    marginLeft: "53px",
    backgroundColor: "#e35756",
    color: whiteColor,
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#ca4343"
    }
  },
  editMe: {
    color: "#000",
    "&:hover": {
      color: "#e35756"
    }
  },
  dialogCancel: {
    padding: "12px 28px",
    borderRadius: "8px",
    fontSize: "1.2em",
    fontWeight: "bold",
    textTransform: "none",
    backgroundColor: "#828282",
    color: whiteColor,
    "&:hover": {
      backgroundColor: "#5d5b5b"
    }
  },
  quill: {
    height: "300px"
  },
  quillContainer: {
    paddingTop: "20px",
    marginBottom: "45px"
  },
  editIcon: {
    float: "left",
    top: "0px",
    position: "relative",
    marginRight: "3px",
    width: "20px",
    height: "20px",
    verticalAlign: "middle",
    color: "inherit",
    display: "inline-block"
  },
  paper: {
    height: 240,
    width: 200,
    backgroundColor: "lightblue",
    paddingLeft: "100px"
  },
  formItem: {
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "20px"
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
  }
});

export default styles;
