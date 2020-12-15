import { primaryColor, whiteColor } from "assets/jss/aiditto-pro-style/aidittoColorStyles.js";

const navBarStyles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minWidth: 250,
    borderRight: "2px solid lightgray",
    minHeight: "100vh",
    overflow: "hidden"
  },
  lists: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1),
    "& svg": {
      marginRight: "10px"
    },
    "& button": {
      width: "100%",
      display: "flex",
      justifyContent: "flex-start"
    },
    "& a": {
      width: "100%"
    },
    "& div": {
      flex: "none"
    },
    "& li": {
      "& a>div>span": {
        color: "black",
        paddingLeft: "12px"
      }
    }
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  newSiteButton: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    textAlign: "center !important",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "& span": {
      display: "flex",
      justifyContent: "center"
    },

    "&:hover": {
      backgroundColor: theme.palette.primary.dark // just temporary solution, Future we will always have array for all colors
    },
    "& svg": {
      marginRight: "10px"
    },
    "& span": {
      display: "flex",
      justifyContent: "center"
    }
  },
  listItemText: {
    flex: "none"
  },
  listItemLink: {
    width: "100%"
  },
  breadCrumbsStyle: {
    color: theme.palette.primary.contrastText,
    "& .MuiBreadcrumbs-li": {
      color: theme.palette.primary.contrastText + " !important"
    },
    "& a": {
      color: theme.palette.primary.contrastText + " !important"
    }
  },
  menuIcon: {
    position: "absolute",
    fontSize: "3rem",
    zIndex: 11,
    padding: "0.2rem",
    background: "#e55656",
    color: whiteColor,
    cursor: "pointer"
  },
  expandableOption: {
    fontSize: "1em",
    fontWeight: 600,
    textTransform: "uppercase"
  },
  langSelect: {
    paddingLeft: "6px",
    "& ul": {
      width: "150px"
    }
  },
  childItem: {
    marginLeft: "15px"
  }

  // listItemButton: {
  //   width: "100%",
  //   display: "flex",
  //   justifyContent: "flex-start",
  //   "& svg": {
  //     marginRight: "10px"
  //   }
  // },
  // listItemText: {
  //   flex: "none"
  // },
  // listItemLink: {
  //   width: "100%"
  // }
});

export default navBarStyles;
