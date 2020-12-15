import {
  blackColor
} from "assets/jss/aiditto-pro-style/aidittoColorStyles";


const aboutUsStyle = theme => ({
  root: {
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
  },
  logoSection: {
    margin: "5em 0"
  },
  logo: {
    maxWidth: "200px",
    maxHeight: "200px",
    marginRight: "7em",
    marginBottom: "7em",

    [theme.breakpoints.down("xs")]: {
      maxWidth: "115px",
      maxHeight: "115px",
      marginRight: "1em",
      marginBottom: "1em"
    }
  },
  logoImg: {
    width: "100%",
    height: "100%"
  }
});

export default aboutUsStyle;
