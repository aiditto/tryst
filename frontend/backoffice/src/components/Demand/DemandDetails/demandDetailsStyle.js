import {
  primaryColor,
  secondaryColor,
  whiteColor,
  infoColor,
  warningColor,
  successColor
} from "assets/jss/aiditto-pro-style/aidittoColorStyles.js";

const styles = theme => ({
  root: {
    marginBottom: "20px"
  },
  demandWrapper: {
    border: "1px solid black",
    margin: "10px",
    padding: "10px"
  },
  details: {
    paddingTop: "0",
    fontSize: "1rem"
  },
  demandDetails: {
    backgroundColor: "#f1f1f1",
    padding: "0",
    marginBottom: "15px",
    borderRadius: "8px !important",
    cursor: "pointer",
    boxShadow: "unset",
    "&:hover": {
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)"
    }
  },

  titleStyle: {
    fontWeight: 600,
    fontSize: "1rem",
    wordBreak: "break-word"
  },
  contentStyle: {
    fontSize: "1rem"
  },
  dividerStyle: {
    marginBottom: "1.5rem"
  },
  btnColorPrimary: {
    backgroundColor: primaryColor,
    color: whiteColor,
    "&:hover": {
      backgroundColor: "#ca4343"
    }
  },
  btnColorSecondary: {
    backgroundColor: secondaryColor,
    color: whiteColor,
    "&:hover": {
      backgroundColor: "#5d5b5b"
    }
  },
  publishIcon: {
    color: successColor[0]
  },
  draftIcon: {
    color: warningColor[0]
  }
});

export default styles;
