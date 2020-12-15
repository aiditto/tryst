import {
  whiteColor,
  primaryColor,
  secondaryColor,
  infoColor
} from "assets/jss/aiditto-pro-style/aidittoColorStyles";


const styles = theme => ({
  root: {
    width: "100%",
    marginTop: "20px",
    paddingLeft: "0 !important"
  },
  details: {
    paddingTop: "0",
    fontSize: "1rem"
  },
  HeaderLeft: {
    flexBasis: "50% !important"
  },
  headerRight: {
    flexBasis: "50% !important",
    textAlign: "right"
  },
  columnLeft: {
    top: 0,
    textAlign: "left !important"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  assetDetailesStyle: {
    backgroundColor: "#f1f1f1",
    padding: "0",
    marginBottom: "15px",
    borderRadius: "8px !important",
    cursor: "pointer",
    boxShadow: "unset",
    "&:hover": {
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)"
    }
  },
  // leftGrid: {
  //   textAlign: "left !important",
  //   paddingBottom: "10px"
  // },
  // rightGrid: {
  //   textAlign: "right"
  // },
  titleStyle: {
    fontWeight: 600,
    fontSize: "1.125rem",
    wordBreak: "break-word"
  },
  dividerStyle: {
    marginBottom: "1.5rem"
  },
  btnColorPrimary: {
    backgroundColor: primaryColor,
    color: whiteColor,
    "&:hover": {
      color: "#000"
    }
  },
  btnColorSecondary: {
    backgroundColor: secondaryColor,
    color: whiteColor,
    "&:hover": {
      color: "#000"
    }
  },
  btnColorInfo: {
    backgroundColor: infoColor[2],
    color: whiteColor,
    "&:hover": {
      color: "#000"
    }
  },
  infoBoxDemander: {
    paddingLeft: "3.3rem"
  },
  orderCreator: {
    paddingTop: "20px"
  },
  chooseAsset: {
    maxHeight: "54px",
    minWidth: "115px",
    padding: "20px 30px",
    lineHeight: "15px",
    backgroundColor: "#e35756",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
    color: "white",
    fontSize: "1.2em",
    fontWeight: "bold",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#ca4343"
    }
  },
  removeAsset: {
    maxHeight: "54px",
    minWidth: "115px",
    padding: "20px 30px",
    lineHeight: "15px",
    backgroundColor: "#828282",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
    color: "white",
    fontSize: "1.2em",
    fontWeight: "bold",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#5d5b5b"
    }
  },
  rightRightGrid: {
    textAlign: "left"
  },
  subheader: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "20px",
    color: "#000",
    wordBreak: "break-word"
  }
});

export default styles;
