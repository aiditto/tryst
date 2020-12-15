import { title } from "assets/jss/aiditto-pro-style/aidittoQuestionableStyles";

import { whiteColor } from "assets/jss/aiditto-pro-style/aidittoColorStyles";

const errorPageStyles = () => ({
  contentCenter: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: "3",
    transform: "translate(-50%,-50%)",
    textAlign: "center",
    color: whiteColor,
    padding: "0 15px",
    width: "100%",
    maxWidth: "880px"
  },
  title: {
    ...title,
    fontSize: "13.7em",
    color: "#000",
    letterSpacing: "14px",
    fontWeight: "700"
  },
  subTitle: {
    fontSize: "2.25rem",
    marginTop: "0",
    color: "#000",
    marginBottom: "8px"
  },
  description: {
    fontSize: "1.125rem",
    marginTop: "0",
    color: "#000",
    marginBottom: "8px"
  }
});

export default errorPageStyles;
