import {
  containerFluid,
  drawerWidth,
  transition,
  hexToRgb
  } from "assets/jss/aiditto-pro-style/aidittoQuestionableStyles";
  
  import {
    blackColor,
    primaryColorMobileAlternate,
    primarySecondaryFocus,
    grayColor
  } from "assets/jss/aiditto-pro-style/aidittoColorStyles";
  

const mobilePagesHeaderStyle = theme => ({
  appBar: {
    boxShadow: "none",
    marginBottom: "0",
    width: "100%",
    zIndex: "1029",
    border: "0",
    borderRadius: "0",
    transition: "all 150ms ease 0s",
    display: "block",
    background: "white",
    borderBottom: "1px solid #dcdcdc"
  },
  container: {
    paddingRight: "23px",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "16px",
      paddingRight: "6px"
    }
  },
  appResponsive: {
    top: "8px"
  },
  list: {
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
  listItemText: {
    flex: "none",
    padding: "0",
    minWidth: "0",
    margin: 0,
    display: "inline-block",
    position: "relative",
    whiteSpace: "nowrap"
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
    right: "0",
    left: "auto",
    visibility: "visible",
    overflowY: "visible",
    borderTop: "none",
    textAlign: "left",
    paddingRight: "0px",
    paddingLeft: "0",
    ...transition,
    "&:before,&:after": {
      position: "absolute",
      zIndex: "3",
      width: "100%",
      height: "100%",
      content: '""',
      display: "block",
      top: "0"
    },
    "&:after": {
      background: theme.palette.primary.main,
      opacity: "0.9"
    }
  },
  sidebarButton: {
    "&,&:hover,&:focus": {
      color: blackColor
    }
  },
  logoWrapper: {
    display: "flex",
    alignItems: "center"
  },
  logo: {
    padding: "6px",
    height: "55px"
  },
  logoImg: {
    maxHeight: "100%"
  },
  siteName: {
    marginLeft: "0.4em",
    fontSize: "2em",
    fontWeight: 800,
    [theme.breakpoints.down("sm")]: {
      marginLeft: ".5em"
    }
  },
  logoutBtn: {
    cursor: "pointer"
  },
  languageSelectorStyle: {
    transform: "translate3d(7px, 48px, 0px) !important"
  },
  languageFlag: {
    width: "25px",
    height: "25px",
    paddingRight: "5px"
  },
  languageSelectorButton: {
    color: blackColor,
    background: "transparent",
    margin: "10px 2px 10px",
    display: "block",
    padding: "10px 15px",
    position: "relative",
    fontFamily: "Montserrat",
    fontSize: "12px",
    fontWeight: "600",
    lineHeight: "20px",
    paddingTop: "6px",
    paddingLeft: "20px",
    borderRadius: "20px",
    paddingBottom: "6px",
    textTransform: "lowercase",
    textDecoration: "none",
    zIndex: "999",
    border: "unset !important",
    boxShadow: "unset !important",
    "&:hover,&:focus": {
      color: primarySecondaryFocus + " !important",
      background: "rgba(" + hexToRgb(grayColor[17]) + ", 0.2) !important",
      boxShadow: "unset !important",
      cursor: "pointer"
    }
  },
});

export default mobilePagesHeaderStyle;
