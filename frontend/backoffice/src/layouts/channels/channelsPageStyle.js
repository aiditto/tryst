import { primaryColor, whiteColor } from "assets/jss/aiditto-pro-style/aidittoColorStyles.js";
const styles = theme => ({
  blur: {
    filter: "blur(3px)",
    height: "90vh",
    padding: "54px 0"
  },
  root: {
    backgroundColor: "#fff !important",
    padding: "54px 0"
  },
  listWrapper: { marginTop: "2rem " },
  switchWrap: {
    display: "flex",
    alignItems: "center"
  },
  statusWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "2rem 0"
  },
  statusHolder: {
    display: "flex",
    border: "1px solid lightgray",
    borderRadius: "9px",
    boxShadow: "4px 4px 4px 0px rgba(140,135,140,0.4)",
    overflow: "hidden"
  },
  switchBtn: {
    fontSize: "1rem",
    padding: "15px",
    cursor: "pointer",
    backgroundColor: "whitesnow"
  },
  switchActive: {
    fontSize: "1rem",
    backgroundColor: "#8BC34A",
    color: "white",
    padding: "15px",
    cursor: "pointer",
    boxShadow: "inset 2px 6px 19px -2px rgba(128,126,128,0.5)"
  },
  switchText: {
    cursor: "pointer",
    fontSize: "1rem"
  },
  backWrapper: {
    margin: "auto !important"
  },
  backButton: {
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
