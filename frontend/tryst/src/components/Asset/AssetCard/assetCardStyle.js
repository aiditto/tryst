import {
  whiteColor,
  primaryColor,
  secondaryColor
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
  // HeaderLeft: {
  //   flexBasis: "50% !important"
  // },
  // headerRight: {
  //   flexBasis: "50% !important",
  //   textAlign: "right"
  // },
  assetsStyle: {
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
  chipStyle: {
    borderRadius: "0.5rem",
    marginRight: "0.5rem",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0.5rem"
    }
  },
  dividerStyle: {
    marginBottom: "1.5rem"
  },
  bold: {
    fontWeight: 900
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
  rightLeftGrid: {
    textAlign: "left"
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
  },
  orderCreator: {
    paddingTop: "20px",
    wordBreak: "break-word"
  },
  chipWrapper: {
    paddingTop: "5px"
  }
});

export default styles;
