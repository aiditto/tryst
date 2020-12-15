import { successColor, dangerColor, warningColor } from "assets/jss/aiditto-pro-style/aidittoColorStyles";

const responseFormStyle = theme => ({
  root: {
    margin: "0",
    lineHeight: "1.5em",
    display: "block"
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
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.main
    }
  },
  disabled: {
    opacity: "0.65",
    pointerEvents: "none"
  },
  formInputStyles: {
    marginBottom: "1em"
  },
  btnWrapper: {
    textAlign: "right"
  }
});

export default responseFormStyle;
