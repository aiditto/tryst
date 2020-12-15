import {
  whiteColor
} from "assets/jss/aiditto-pro-style/aidittoColorStyles";


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
  }
});

export default styles;
