// eslint-disable-next-line no-unused-vars
import {
  primaryColor,
  secondaryColor,
  whiteColor,
  infoColor
} from "assets/jss/aiditto-pro-style/aidittoColorStyles.js";

const styles = theme => ({
  listStyle: {
    backgroundColor: theme.palette.primary.main,
    padding: "15px 20px",
    margin: "5px 0",
    minHeight: "80px",
    display: "flex",
    flexWrap: "wrap",
    color: theme.palette.primary.contrastText,
    borderRadius: "9px"
    // [theme.breakpoints.down("xs")]: {
    //   flexDirection: "column !important",
    //   justifyContent: "center !important"
    // }
  },
  listInfoButton: {
    borderRadius: "8px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark
    }
  },

  listVisitButton: {
    borderRadius: "8px",
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark
    }
  },
  mobileFix: {
    marginTop: "1em"
  }
});

export default styles;
