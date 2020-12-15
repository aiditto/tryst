import {
  blackColor
} from "assets/jss/aiditto-pro-style/aidittoColorStyles";


const headerSectionStyle = theme => ({
  root: {
    margin: "0",
    lineHeight: "1.5em",
    textAlign: "center",
    width: "100%",
    background: "#f7f7f7 no-repeat right center",
    backgroundSize: "50% auto",

    [theme.breakpoints.down("sm")]: {
      backgroundPosition: "center center",
      backgroundSize: "cover",
      textAlign: "left"
    },

    "& h1": {
      marginTop: "0",
      fontSize: "4em",
      fontWeight: 800
    },
    "& p": {
      fontSize: "2em",
      lineHeight: "1.2em"
    }
  },
  rootWithImage: {
    textAlign: "left",
    backgroundColor: "transparent"
  },

  textWrap: {
    width: "100%",
    padding: "6em 2em",

    [theme.breakpoints.down("sm")]: {
      padding: "4em 2em"
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: "2em",
      paddingBottom: "2em"
    }
  },

  textWrapWithImage: {
    width: "50%",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.5)"
    }
  }
});
export default headerSectionStyle;
