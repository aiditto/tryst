// eslint-disable-next-line no-unused-vars
import { primaryColor, secondaryColor, whiteColor } from "assets/jss/aiditto-pro-style/aidittoColorStyles.js";

const styles = () => ({
  dialogTitle: {
    fontWeight: 600,
    color: "#000000b5",
    margin: "0! important"
  },
  dialogProceed: {
    padding: "12px 28px",
    borderRadius: "8px",
    fontSize: "1.2em",
    fontWeight: "bold",
    textTransform: "none",
    backgroundColor: primaryColor,
    color: whiteColor,
    "&:hover": {
      backgroundColor: "#ca4343"
    }
  },
  dialogCancel: {
    padding: "12px 28px",
    borderRadius: "8px",
    fontSize: "1.2em",
    fontWeight: "bold",
    textTransform: "none",
    backgroundColor: secondaryColor,
    color: whiteColor,
    "&:hover": {
      backgroundColor: "#5d5b5b"
    }
  },
  infoDialog: {
    "& .MuiTypography-root": {
      marginBottom: "4rem !important"
    }
  }
});
export default styles;
