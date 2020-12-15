import { whiteColor, dangerColor, primaryColor } from "assets/jss/aiditto-pro-style/aidittoColorStyles.js";
const styles = () => ({
  root: {
    "& .MuiDialogContent-root ": {
      marginBottom: "20px !important"
    }
  },
  quillContainer: {
    paddingTop: "20px",
    marginBottom: "45px"
  },
  quill: {
    height: "300px"
  },
  paper: {
    height: 240,
    width: 200,
    backgroundColor: "lightblue",
    paddingLeft: "100px"
  },
  imageSize: {
    width: "150px",
    height: "150px"
  }
});

export default styles;
