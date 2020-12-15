import {
  primaryColor,
  secondaryColor,
  whiteColor,
  grayColor,
  blackColor
} from "assets/jss/aiditto-pro-style/aidittoColorStyles.js";

const styles = () => ({
  root: {
    backgroundColor: grayColor[5],
    paddingTop: "10px",
    paddingBottom: "10px"
  },
  contentStyle: {
    fontSize: "1rem",
    paddingLeft: "2.5rem",
    paddingRight: "2.5rem"
  },
  btnColorPrimary: {
    backgroundColor: primaryColor,
    color: whiteColor,
    "&:hover": {
      backgroundColor: primaryColor
    }
  },
  btnColorDanger: {
    marginLeft: "10px",
    marginRight: "10px",
    backgroundColor: whiteColor,
    opacity: 0.8,
    transition: "0.3s",
    color: blackColor + "!important",
    "&:hover": {
      opacity: 1.0
    }
  },
  btnColorSecondary: {
    marginLeft: "10px",
    marginRight: "10px",
    opacity: 0.8,
    transition: "0.3s",
    backgroundColor: secondaryColor,
    color: blackColor,
    "&:hover": {
      backgroundColor: secondaryColor,
      opacity: 1.0
    }
  },
  btnWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    paddingLeft: "2.5rem",
    paddingRight: "2.5rem"
  },
  cardHeaderBackground: {
    backgroundColor: "#e97877",
    paddingTop: "10px",
    paddingBottom: "10px",
    boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);"
  },
  headerText: {
    fontSize: "1.5rem",
    fontWeight: "700",
    paddingTop: "5px",
    color: blackColor,
    textTransform: "capitalize"
  }
});

export default styles;
