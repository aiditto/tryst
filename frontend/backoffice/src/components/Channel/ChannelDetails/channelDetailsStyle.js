import {
  primaryColor,
  secondaryColor,
  whiteColor,
  warningColor,
  successColor
} from "assets/jss/aiditto-pro-style/aidittoColorStyles.js";

const styles = theme => ({
  root: {
    marginBottom: "20px"
  },
  channelWrapper: {
    border: "1px solid black",
    margin: "10px",
    padding: "10px"
  },
  details: {
    paddingTop: "0",
    fontSize: "1rem"
  },
  channelDetails: {
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
  },
  rightRightGrid: {
    textAlign: "left"
  },
  manageBtn: {
    maxHeight: "54px",
    minWidth: "115px",
    padding: "20px 30px",
    marginTop: "30px",
    lineHeight: "15px",
    backgroundColor: "#e35756",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
    color: "white",
    fontSize: "1.2em",
    fontWeight: "bold",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#ca4343"
    },
    "&:disabled": {
      backgroundColor: "#f1a3a2",
      color: whiteColor
    }
  }
});

export default styles;
