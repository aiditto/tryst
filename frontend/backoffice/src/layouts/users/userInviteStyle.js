import { blackColor, primaryColor, whiteColor } from "assets/jss/aiditto-pro-style/aidittoColorStyles.js";

const userInviteStyle = theme => ({
  root: {
    backgroundColor: "#fff !important",
    padding: "5rem 0",
    margin: "0 auto"
  },
  card: {
    width: "450px",
    height: "290px",
    [theme.breakpoints.down("xs")]: {
      width: "270px"
    }
  },
  header: {
    backgroundColor: primaryColor,
    color: whiteColor
  },
  disabled: {
    opacity: "0.65",
    pointerEvents: "none",
    color: whiteColor + " !important"
  },
  btnPrimary: {
    color: whiteColor,
    backgroundColor: primaryColor,
    "&:hover": {
      fontSize: "1.2em",
      backgroundColor: primaryColor
    }
  },
  backWrapper: {
    margin: "auto !important"
  },
  btnWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    marginTop: "1em"
  },
  btnAdmin: {
    maxHeight: "54px",
    minWidth: "115px",
    padding: "20px 30px",
    marginTop: "30px",
    lineHeight: "15px",
    backgroundColor: primaryColor,
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
    color: whiteColor,
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
export default userInviteStyle;
