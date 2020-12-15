  import {
    blackColor
  } from "assets/jss/aiditto-pro-style/aidittoColorStyles";
  

const textSectionStyle = theme => ({
  root: {
    margin: "0",
    lineHeight: "1.5em",
    display: "block",
    wordWrap: "break-word",
    padding: "4em 2em 4em",

    "& h1": {
      marginTop: "0",
      fontSize: "3em",
      fontWeight: 800
    },
    "& h2": {
      marginTop: "0",
      fontSize: "2.5em"
    },
    "& h3": {
      marginTop: "0",
      fontSize: "1.825em"
    },
    "& p": {
      fontSize: "1.4em",
      lineHeight: "1.5em"
    }
  }
});
export default textSectionStyle;
