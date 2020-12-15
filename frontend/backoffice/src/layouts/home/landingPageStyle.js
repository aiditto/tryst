import { blackColor, grayColor, hexToRgb, primaryColor } from "assets/jss/aiditto-pro-style/aidittoColorStyles.js";

const styles = theme => ({
  root: {
    margin: "0 auto",
    padding: "2em 1em 6em"
  },

  humansImage: {
    width: "100%",
    padding: "1rem"
  },

  loginWrapper: {
    textAlign: "center"
  },

  ssoButton: {
    textTransform: "none",
    borderRadius: "9px",
    width: "100%",
    "&:hover, &:focus": {
      color: theme.palette.primary.contrastText
    }
  },

  buttonSeparator: {
    display: "block",
    margin: "4px 0 16px"
  },

  contactButton: {
    textTransform: "none",
    borderRadius: "9px",
    boxShadow: "none",
    width: "100%"
  }
});

export default styles;
