// eslint-disable-next-line no-unused-vars
import {
  primaryColor,
  whiteColor,
  warningColor,
  dangerColor
} from "assets/jss/aiditto-pro-style/aidittoColorStyles.js";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    margin: "1em",
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  },
  link: {
    color: whiteColor,
    "&:hover": {
      color: primaryColor + " !important"
    }
  },
  cardHeading: {
    fontSize: "1.5em",
    textAlign: "center",
    padding: "1.8em 1em"
  },
  cardHeadingTypography: {
    fontWeight: 600
  },
  cardActionTypography: {
    color: whiteColor,
    fontWeight: 600
  },
  statusStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1
  },
  publishedIcon: {
    width: "15px",
    height: "15px",
    borderRadius: "50%",
    backgroundColor: "#00ffd2",
    marginRight: "5px"
  },
  draftedIcon: {
    width: "15px",
    height: "15px",
    borderRadius: "50%",
    backgroundColor: warningColor[0],
    marginRight: "5px"
  },
  archivedIcon: {
    width: "15px",
    height: "15px",
    borderRadius: "50%",
    backgroundColor: dangerColor[0],
    marginRight: "5px"
  },
  cardMedia: {
    height: "15em"
  },
  formControl: {
    "& .MuiSelect-selectMenu": {
      display: "flex",
      alignItems: "center"
    }
  },
  cardContent: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  },
  actionBtn: {
    color: theme.palette.primary.contrastText
  },
  statusMenu: {
    margin: "1em",
    color: theme.palette.primary.contrastText
  }
});

export default styles;
