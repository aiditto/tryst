import {
  stickyFooter
  } from "assets/jss/aiditto-pro-style/aidittoQuestionableStyles";
  
  import {
    whiteColor,
    blackColor
  } from "assets/jss/aiditto-pro-style/aidittoColorStyles";
  

const pagesStyle = () => ({
  root: {
    ...stickyFooter,
    backgroundColor: whiteColor,
    "&:before,&:after": {
      content: "''",
      display: "table"
    },
    "&:after": {
      clear: "both"
    },
    display: "flex",
    alignItems: "center"
  },

  responseFormSection: {
    fontSize: "1.5em",
    wordWrap: "break-word",
    backgroundColor: whiteColor,
    paddingBottom: "10px",
    paddingRight: "15px",
    paddingLeft: "15px"
  }
});

export default pagesStyle;
