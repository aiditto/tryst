import {
  primaryColor,
  secondaryColor,
  whiteColor,
  infoColor,
  warningColor,
  dangerColor
} from "assets/jss/aiditto-pro-style/aidittoColorStyles.js";
import { red } from "@material-ui/core/colors";
import { Hidden } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: "20px",
    paddingLeft: "0 !important"
  },
  detailsWrap: {
    maxHeight: "500px !important",
    overflow: "hidden"
  },

  titlesWrap: {
    marginBottom: "5px",
    "& h4": {
      flex: 1,
      wordBreak: "break-word",
      marginBottom: "5px"
    }
  },
  statusTitleStyle: {
    fontWeight: 400,
    fontSize: "1rem",
    wordBreak: "break-word",
    margin: "0"
  },

  titleStyle: {
    fontWeight: 600,
    fontSize: "1rem",
    wordBreak: "break-word",
    margin: "0"
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
  statusStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1
  },
  sitesImage: {
    width: "100%",
    height: "200px",
    borderRadius: "12px",
    maxHeight: "200px !important"
  },
  papperBg: {
    width: "100%",
    height: "200px",
    maxHeight: "200px !important",
    borderRadius: "12px"
  },
  linkStyle: {
    textDecoration: "none",
    color: "black",
    "&:hover": {
      color: "gray"
    },
    maxHeight: "400px"
  },
  formControl: {
    flex: 1,
    "& .MuiSelect-selectMenu": {
      display: "flex",
      alignItems: "center"
    }
  },
  saveBtn: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      transform: "scale(0.9) !important",
      background: theme.palette.primary.dark + "!important"
    }
  }
});

export default styles;
