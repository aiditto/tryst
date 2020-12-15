import {
  container,
  containerFluid
} from "assets/jss/aiditto-pro-style/aidittoQuestionableStyles";


const footerStyle = theme => ({
  block: {},
  center: {
    margin: "0",
    fontSize: "14px",
    textAlign: "center",
    padding: "15px"
  },
  footer: {
    position: "static",
    bottom: "0",
    right: "0",
    left: "0",
    width: "100%",
    padding: "15px 0",
    zIndex: 4
  },
  container: {
    zIndex: 3,
    ...container
  },
  containerFluid: {
    zIndex: 3,
    ...containerFluid
  }
});
export default footerStyle;
