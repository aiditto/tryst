import {
  cardTitle,
  dangerColor,
  whiteColor,
  grayColor,
  infoColor,
  warningColor
} from "assets/jss/aiditto-pro-style/aidittoColorStyles.js";
import customCheckboxRadioSwitch from "assets/jss/aiditto-pro-style/customCheckboxRadioSwitch.js";

const channelsFormsStyle = theme => ({
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
    backgroundColor: "#e35756 !important",
    color: whiteColor + "!important"
  },
  btnColorInfo: {
    backgroundColor: infoColor[1],
    color: whiteColor,
    "&:hover": {
      backgroundColor: infoColor[2]
    }
  },
  btnColorWarning: {
    marginLeft: "10px",
    backgroundColor: warningColor[0]
  },
  formInputStyles: {
    marginBottom: "10px"
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
  btnColorCancel: {
    backgroundColor: grayColor[0],
    color: whiteColor,
    marginRight: "10px",
    "&:hover": {
      backgroundColor: grayColor[1]
    }
  }
});

export default channelsFormsStyle;
