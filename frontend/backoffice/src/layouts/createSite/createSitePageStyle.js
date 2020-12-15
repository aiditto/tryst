import { primaryColor, whiteColor, infoColor, grayColor } from "assets/jss/aiditto-pro-style/aidittoColorStyles.js";

const createSitePageStyle = theme => ({
  root: {
    backgroundColor: "#fff !important",
    flex: 1
  },
  btnWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    padding: "2rem"
  },
  disabled: {
    opacity: "0.65",
    pointerEvents: "none"
  },
  btnColorPrimary: {
    backgroundColor: primaryColor + " !important",
    color: whiteColor + "!important",
    maxHeight: "36px"
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
    maxHeight: "36px",
    "&:hover": {
      backgroundColor: grayColor[1]
    }
  },
  saveWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "red"
  }
});

export default createSitePageStyle;
