  import {
    successColor,
    dangerColor,
    warningColor
  } from "assets/jss/aiditto-pro-style/aidittoColorStyles";
  

const supplierContactFormStyle = theme => ({
  root: {
    width: "90%"
  },
  iconSuccess: {
    color: successColor[0] + " !important"
  },
  iconFailure: {
    color: dangerColor[0] + " !important"
  },
  iconLoading: {
    color: warningColor[0] + " !important"
  },
  btnColorMobile: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    "&:hover": {
      color: theme.palette.secondary.dark,
      backgroundColor: theme.palette.secondary.main
    }
  },
  disabled: {
    opacity: "0.65",
    color: theme.palette.secondary.contrastText + " !important",
    pointerEvents: "none"
  },
  formInputStyles: {
    marginBottom: "1em"
  },
  btnWrapper: {
    textAlign: "right"
  }
});

export default supplierContactFormStyle;
