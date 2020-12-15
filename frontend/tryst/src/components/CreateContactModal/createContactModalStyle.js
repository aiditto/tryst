import {
  whiteColor,
  primaryColor,
  secondaryColor
} from "assets/jss/aiditto-pro-style/aidittoColorStyles";


const styles = () => ({
  dividerStyle: {
    marginBottom: "1.5rem"
  },
  createContactHeader: {
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
  headerTitle: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "26px",
    lineHeight: "20px",
    color: "#333"
  },

  orderCreator: {
    paddingTop: "20px",
    marginBottom: "45px"
  },
  btnColorSecondary: {
    backgroundColor: secondaryColor,
    color: whiteColor,
    "&:hover": {
      backgroundColor: "#5d5b5b"
    }
  },
  btnColorPrimary: {
    backgroundColor: primaryColor,
    color: whiteColor,
    "&:hover": {
      backgroundColor: "#ca4343"
    }
  },
  createContact: {
    padding: "16px 40px",
    fontSize: "0.9375rem",
    marginLeft: "53px"
  },
  editMe: {
    color: "#000",
    "&:hover": {
      color: "#e35756"
    }
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
