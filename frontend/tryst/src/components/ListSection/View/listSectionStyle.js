import { blackColor, dangerColor } from "assets/jss/aiditto-pro-style/aidittoColorStyles";

const headerSectionStyle = {
  root: {
    margin: "0",
    lineHeight: "1.5em",
    display: "block"
  },
  description: {
    color: blackColor,
    fontSize: "1.0em",
    wordWrap: "break-word"
  },
  selectedFormFieldContainer: {
    color: blackColor,
    fontSize: "1.5em"
  },
  formFieldButton: {
    marginBottom: "0.7em"
  },
  innerItemContainer: {
    paddingTop: "0.5em"
  },
  formItem: {
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "20px",
    alignItems: "center"
  },
  mandatoryCheckBox: {
    textAlign: "center"
  },
  topDivider: {
    paddingTop: "0.05em",
    paddingBottom: "0.05em",
    marginTop: "0.5em"
  },
  itemDivider: {
    paddingTop: "0.05em",
    paddingBottom: "0.05em",
    marginTop: "0.5em",
    marginBottom: "0.5em"
  },
  listItemContainer: {
    paddingTop: "0.5em",
    paddingBottom: "0.5em",
    width: "100%"
  },
  mandatoryAsterisk: {
    fontSize: "2em",
    color: dangerColor[0]
  }
};
export default headerSectionStyle;
