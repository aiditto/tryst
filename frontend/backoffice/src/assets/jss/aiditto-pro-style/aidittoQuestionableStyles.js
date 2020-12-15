import { grayColor, blackColor, dangerColor, infoColor,
primaryColor, roseColor, successColor, warningColor } from "./aidittoColorStyles";

const hexToRgb = input => {
  input = input + "";
  input = input.replace("#", "");
  let hexRegex = /[0-9A-Fa-f]/g;
  if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
    throw new Error("input is not a valid hex color.");
  }
  if (input.length === 3) {
    let first = input[0];
    let second = input[1];
    let last = input[2];
    input = first + first + second + second + last + last;
  }
  input = input.toUpperCase(input);
  let first = input[0] + input[1];
  let second = input[2] + input[3];
  let last = input[4] + input[5];
  return parseInt(first, 16) + ", " + parseInt(second, 16) + ", " + parseInt(last, 16);
};

const container = {
  paddingRight: "32px",
  paddingLeft: "32px",
  marginRight: "auto",
  marginLeft: "auto",
  "@media (min-width: 768px)": {
    width: "750px"
  },
  "@media (min-width: 992px)": {
    width: "970px"
  },
  "@media (min-width: 1200px)": {
    width: "1170px"
  },
  "&:before,&:after": {
    display: "table",
    content: '" "'
  },
  "&:after": {
    clear: "both"
  }
};

const cardTitle = {
  ...title,
  marginTop: "0",
  marginBottom: "3px",
  minHeight: "auto",
  "& a": {
    ...title,
    marginTop: ".625rem",
    marginBottom: "0.75rem",
    minHeight: "auto"
  }
};

const title = {
  color: grayColor[2],
  textDecoration: "none",
  fontWeight: "300",
  marginTop: "30px",
  marginBottom: "25px",
  minHeight: "32px",
  fontFamily: "'Montserrat', 'Arial', sans-serif",
  "& small": {
    color: grayColor[1],
    fontSize: "65%",
    fontWeight: "400",
    lineHeight: "1"
  }
};

const stickyFooter = {
  display: "flex",
  flexDirection: "column",
  flex: "1"
};

const drawerWidth = 260;

const transition = {
  transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
};

const containerFluid = {
  paddingRight: "32px",
  paddingLeft: "32px",
  marginRight: "auto",
  marginLeft: "auto",
  "&:before,&:after": {
    display: "table",
    content: '" "'
  },
  "&:after": {
    clear: "both"
  }
};

const dangerBoxShadow = {
  boxShadow:
    "0 4px 20px 0 rgba(" + hexToRgb(blackColor) + ",.14), 0 7px 10px -5px rgba(" + hexToRgb(dangerColor[0]) + ",.4)"
};

const defaultFont = {
    fontFamily: '"Montserrat", "Arial", sans-serif',
    fontWeight: "300",
    lineHeight: "1.5em"
  };

  const infoBoxShadow = {
    boxShadow:
      "0 4px 20px 0 rgba(" + hexToRgb(blackColor) + ",.14), 0 7px 10px -5px rgba(" + hexToRgb(infoColor[0]) + ",.4)"
  };

  const primaryBoxShadow = {
    boxShadow:
      "0 4px 20px 0 rgba(" + hexToRgb(blackColor) + ",.14), 0 7px 10px -5px rgba(" + hexToRgb(primaryColor[0]) + ",.4)"
  };

  const roseBoxShadow = {
    boxShadow:
      "0 4px 20px 0 rgba(" + hexToRgb(blackColor) + ",.14), 0 7px 10px -5px rgba(" + hexToRgb(roseColor[0]) + ",.4)"
  };
  const successBoxShadow = {
    boxShadow:
      "0 4px 20px 0 rgba(" + hexToRgb(blackColor) + ",.14), 0 7px 10px -5px rgba(" + hexToRgb(successColor[0]) + ",.4)"
  };

  const warningBoxShadow = {
    boxShadow:
      "0 4px 20px 0 rgba(" + hexToRgb(blackColor) + ",.14), 0 7px 10px -5px rgba(" + hexToRgb(warningColor[0]) + ",.4)"
  };

export {
  hexToRgb,
  container,
  cardTitle,
  title,
  stickyFooter,
  drawerWidth,
  transition,
  containerFluid,
  dangerBoxShadow,
  defaultFont,
  infoBoxShadow,
  primaryBoxShadow,
  roseBoxShadow,
  successBoxShadow,
  warningBoxShadow
  
};
