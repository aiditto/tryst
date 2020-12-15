import {
  containerFluid,
  defaultFont,
  primaryColor,
  defaultBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  boxShadow,
  drawerWidth,
  transition,
  whiteColor,
  grayColor,
  blackColor,
  hexToRgb
} from "assets/jss/aiditto-pro-style/aidittoColorStyles.js";

const navBarStyles = theme => ({
  root: {
    minWidth: "20%",
    backgroundColor: "#fff !important",
    border: "2px solid black",
    display: "flex",
    flexDirection: "column !important",
    minHeight: "100vh",
    padding: "30px",
    alignItems: "flex-start",
    boxShadow: "inset -1px 0 0 rgba(0, 0, 0, .1)",

    "& button": {
      width: "200px",
      backgroundColor: "#e35756 !important",
      color: "white"
    }
  },

  navLink: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px 0 ",
    textDecoration: "none",
    color: "black",
    fontWeight: 600,
    "& svg": {
      marginRight: "5px"
    },
    "&:hover": {
      color: "gray !important"
    },
    "&:visited": {
      color: "black !important"
    }
  },
  linkWrap: {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column"
  },
  underWrap: {
    display: "flex",
    flexDirection: "column"
  },
  appBar: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: "none",
    marginBottom: "0",
    width: "100%",
    zIndex: "1029",
    color: theme.palette.primary.contrastText,
    border: "0",
    transition: "all 150ms ease 0s",
    display: "block",
    transform: "translateZ(0)"
  },
  container: {
    ...containerFluid,
    paddingTop: "6px",
    paddingBottom: "6px",
    paddingRight: "23px",
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "16px",
      paddingRight: "6px"
    }
  },
  menuIcon: {
    display: "flex",
    justifyContent: "center"
  },
  name: {
    alignItems: "center",

    "& svg": {
      cursor: "pointer",
      fontSize: "2rem",
      color: whiteColor
    }
  },
  appResponsive: {
    top: "8px"
  },
  primary: {
    backgroundColor: primaryColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  info: {
    backgroundColor: infoColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  success: {
    backgroundColor: successColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  warning: {
    backgroundColor: warningColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  danger: {
    backgroundColor: dangerColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  list: {
    ...defaultFont,
    fontSize: "14px",
    margin: 0,
    marginRight: "-15px",
    paddingLeft: "0",
    listStyle: "none",
    color: blackColor,
    paddingTop: "0",
    paddingBottom: "0"
  },
  listItem: {
    float: "left",
    position: "relative",
    display: "block",
    width: "auto",
    margin: "0",
    padding: "0",
    [theme.breakpoints.down("sm")]: {
      zIndex: "999",
      width: "100%",
      paddingRight: "15px"
    }
  },
  navLink: {
    color: whiteColor,
    margin: "10px 2px 10px",
    paddingTop: "6px",
    paddingBottom: "6px",
    fontWeight: "600",
    fontSize: "12px",
    textTransform: "lowercase",
    borderRadius: "20px",
    lineHeight: "20px",
    position: "relative",
    display: "block",
    padding: "15px 15px",
    textDecoration: "none",
    "&:hover,&:focus": {
      color: "#353535",
      background: "rgba(" + hexToRgb(grayColor[17]) + ", 0.2)"
    }
  },
  listItemIcon: {
    marginTop: "-3px",
    top: "0px",
    position: "relative",
    marginRight: "3px",
    width: "20px",
    height: "20px",
    verticalAlign: "middle",
    color: "inherit",
    display: "inline-block"
  },
  listItemText: {
    flex: "none",
    padding: "0",
    minWidth: "0",
    margin: 0,
    display: "inline-block",
    position: "relative",
    whiteSpace: "nowrap"
  },
  navLinkActive: {
    backgroundColor: "rgba(" + hexToRgb(blackColor) + ", 0.15)"
  },
  drawerPaper: {
    border: "none",
    bottom: "0",
    transitionProperty: "top, bottom, width",
    transitionDuration: ".2s, .2s, .35s",
    transitionTimingFunction: "linear, linear, ease",
    width: drawerWidth,
    position: "fixed",
    display: "block",
    top: "0",
    height: "100vh",
    right: "auto",
    visibility: "visible",
    overflowY: "visible",
    borderTop: "none",
    textAlign: "left",
    paddingRight: "0px",
    paddingLeft: "0",
    ...transition,

    "& nav": {
      width: "250px"
    }
  },
  sidebarButton: {
    "&,&:hover,&:focus": {
      color: whiteColor
    }
  },
  aidLogo: {
    display: "flex",
    "&,&:hover,&:focus": {
      color: theme.palette.primary.contrastText
    }
  },
  cityName: {
    marginLeft: "1em",
    fontSize: ".6em",
    fontWeight: "570",
    [theme.breakpoints.down("sm")]: {
      marginLeft: ".5em"
    }
  },
  logoutBtn: {
    cursor: "pointer"
  },
  adminNavWrap: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center"
  },
  adminDropDown: {
    color: "white",
    position: "fixed",
    backgroundColor: primaryColor[0],
    zIndex: 1,
    borderRadius: "0 0 5px 5px"
  },
  adminDropDownLinks: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: " bold",
    fontSize: "14px",
    color: "#FFFFFF",
    "&:hover": {
      color: blackColor
    },
    "&:visited": {
      color: whiteColor
    }
  },
  navDropdownItem: {
    "&:hover": {
      backgroundColor: "rgba(" + hexToRgb(blackColor) + ", 0.1)"
    }
  },
  adminMobileDropDown: {
    color: "black",
    "&:hover": {
      color: "gray"
    },
    "&:visited": {
      color: "black"
    }
  }
});

export default navBarStyles;
