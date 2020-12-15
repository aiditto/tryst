import {
stickyFooter
} from "assets/jss/aiditto-pro-style/aidittoQuestionableStyles";

import {
  whiteColor
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
  }
});

export default pagesStyle;
