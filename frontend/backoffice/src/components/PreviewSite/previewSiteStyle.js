import { blackColor, primaryColor, whiteColor } from "assets/jss/aiditto-pro-style/aidittoColorStyles.js";

const previewSiteStyle = theme => ({
  root: {
    margin: "0",
    lineHeight: "4.5em",
    marginTop: "1.5em"
  },
  closeBtn: {
    margin: "8px",
    padding: "12px 28px",
    borderRadius: "8px",
    fontSize: "1.2em",
    fontWeight: "bold",
    textTransform: "none",
    border: "solid",
    borderColor: primaryColor,
    backgroundColor: whiteColor,
    color: primaryColor,
    "&:hover": {
      backgroundColor: "#ded9da !important"
    }
  },
  btnPosition: {
    flexBasis: "0% !important"
  },
  iframeContainer: {
    width: "100%",
    height: "100vh"
  },
  btnWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    marginTop: "1em"
  }
});

export default previewSiteStyle;
