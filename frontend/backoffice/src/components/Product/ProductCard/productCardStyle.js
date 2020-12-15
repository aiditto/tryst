// eslint-disable-next-line no-unused-vars
import {
  primaryColor,
  secondaryColor,
  whiteColor,
  infoColor
} from "assets/jss/aiditto-pro-style/aidittoColorStyles.js";

const styles = () => ({
  listStyle: {
    backgroundColor: "#f1f1f1",
    padding: "15px 20px",
    margin: "5px 0",
    minHeight: "80px",
    fontSize: "0.5rem",
    display: "flex",
    flexWrap: "wrap"
    // [theme.breakpoints.down("xs")]: {
    //   flexDirection: "column !important",
    //   justifyContent: "center !important"
    // }
  },
  listInfoButton: {
    borderRadius: "8px",
    backgroundColor: secondaryColor,
    color: whiteColor,
    "&:hover": {
      backgroundColor: "#5d5b5b"
    }
  },

  listHelpButton: {
    borderRadius: "8px",
    backgroundColor: primaryColor,
    color: whiteColor,
    "&:hover": {
      backgroundColor: "#ca4343"
    }
  },

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
  quill: {
    "& .MuiTypography-root": {
      marginBottom: "4rem !important"
    }
  }
});

export default styles;
