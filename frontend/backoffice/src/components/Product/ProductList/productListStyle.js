import { blackColor, grayColor, hexToRgb } from "assets/jss/aiditto-pro-style/aidittoColorStyles.js";

const styles = theme => ({
  rightWrapper: {
    backgroundColor: "white",
    float: "right",
    minWidth: "53%",
    padding: "100px 70px",
    margin: "-52px 0 2em 4em",
    borderRadius: "6px 0 0 6px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
    [theme.breakpoints.down("sm")]: {
      padding: "32px",
      margin: "0 0 2em",
      borderRadius: 0
    }
  },
  textWrapper: {
    marginBottom: "1rem"
  },
  rightBoldTitle: {
    marginTop: "0",
    lineHeight: "34px",
    fontSize: "30px",
    fontWeight: "800",
    color: "#4F4F4F"
  },
  rightParagraph: {
    marginTop: "22px",
    lineHeight: "26px",
    color: "#4F4F4F",
    fontSize: "22px",
    "& strong": {
      fontWeight: 600
    }
  },
  category: {
    display: "flex",
    padding: "16px 0",
    cursor: "pointer",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
    width: "50%",
    maxWidth: "100%",
    borderRadius: "9%",
    [theme.breakpoints.down("sm")]: {
      width: "50%"
    },
    textAlign: "center",
    "&:hover,&:focus": {
      color: "#353535",
      background: "rgba(" + hexToRgb(grayColor[17]) + ", 0.2)"
    }
  },
  activeCategory: {
    display: "flex",
    padding: "16px 10px",
    cursor: "pointer",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
    width: "50%",
    maxWidth: "100%",
    background: "rgba(" + hexToRgb(grayColor[17]) + ", 0.4)",
    borderRadius: "9%",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      width: "50%"
    }
  },

  categoryImg: {
    height: "80px",
    width: "100%"
  },
  categoryText: {
    width: "100%",
    padding: "0 10px",
    margin: "16px 0 0",
    fontSize: "16px",
    fontWeight: "bold",
    lineHeight: "20px",
    textAlign: "center",
    color: blackColor
  },
  animatedItem: {
    animation: `$myEffect 800ms ${theme.transitions.easing.easeInOut}`
  },

  "@keyframes myEffect": {
    "0%": {
      opacity: 0
    },
    "100%": {
      opacity: 1
    }
  },
  itemList: {
    maxHeight: "40vh",
    overflow: "auto"
  }
});

export default styles;
