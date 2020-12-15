import {
  cardTitle,
  primaryColor,
  dangerColor,
  whiteColor,
  grayColor,
  infoColor
} from "assets/jss/aiditto-pro-style/aidittoColorStyles.js";

const SiteFormStyle = theme => ({
  root: {
    width: "90%"
  },
  btnWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    marginTop: "1em"
  },
  disabled: {
    opacity: "0.65",
    pointerEvents: "none"
  },
  btnColorPrimary: {
    backgroundColor: primaryColor + " !important",
    color: whiteColor + "!important"
  },
  btnColorInfo: {
    backgroundColor: infoColor[1],
    color: whiteColor,
    "&:hover": {
      backgroundColor: infoColor[2]
    }
  },
  btnColorCancel: {
    backgroundColor: grayColor[0],
    color: whiteColor,
    marginRight: "10px",
    "&:hover": {
      backgroundColor: grayColor[1]
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
  sectionTitle: {
    marginTop: "0",
    lineHeight: "34px",
    fontSize: "30px",
    fontWeight: "800",
    color: "#4F4F4F",
    textAlign: "center"
  },
  formInputStyles: {
    marginBottom: "10px"
  }
});

export default SiteFormStyle;
