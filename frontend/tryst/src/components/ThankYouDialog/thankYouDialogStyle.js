// eslint-disable-next-line no-unused-vars
  import {
    whiteColor
  } from "assets/jss/aiditto-pro-style/aidittoColorStyles";
  

const styles = theme => ({
  root: {
    lineHeight: "1.5em",
    fontSize: "1.5em",
    wordWrap: "break-word",
    backgroundColor: whiteColor
  },
  title: {
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "15px",
    paddingRight: "15px"
  },
  description: {
    paddingRight: "15px",
    paddingLeft: "15px",
    paddingBottom: "15px"
  },
  btnWrapper: {
    textAlign: "right",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "15px",
    paddingRight: "15px"
  },
  btnColorMobile: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    "&:hover": {
      color: theme.palette.secondary.dark,
      backgroundColor: theme.palette.secondary.main
    }
  }
});
export default styles;
