import {
  cardTitle,
  primaryColor,
  dangerColor,
  whiteColor,
  grayColor,
  infoColor,
  warningColor
} from "assets/jss/aiditto-pro-style/aidittoColorStyles.js";

const NewSiteFormStyle = theme => ({
  root: {
    padding: "2rem",
    "& div:nth-child(2)": {
      marginTop: "1rem"
    }
  },
  btnWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    flexWrap: "wrap"
  },
  disabled: {
    opacity: "0.65",
    pointerEvents: "none"
  },
  btnColorPrimary: {
    backgroundColor: primaryColor + " !important",
    color: whiteColor + "!important"
  },
  btnColorInfo: {
    backgroundColor: infoColor[1],
    color: whiteColor,
    "&:hover": {
      backgroundColor: infoColor[2]
    }
  },
  btnColorCancel: {
    backgroundColor: grayColor[0],
    color: whiteColor,
    marginRight: "10px",
    "&:hover": {
      backgroundColor: grayColor[1]
    }
  },

  switchWrap: {
    "& .MuiFormControl-root": {
      width: "100%"
    },
    "& #select-status": {
      display: "flex"
    }
  },
  sectionTitle: {
    marginTop: "0",
    lineHeight: "34px",
    fontSize: "30px",
    fontWeight: "800",
    color: "#4F4F4F",
    textAlign: "center"
  },
  formInputStyles: {
    display: "flex",
    alignItems: "flex-end",
    "& p": {
      margin: "0 !important"
    },
    paddingBottom: "0.5rem"
  },
  heading: {
    fontSize: "1rem",
    fontWeight: 600
  },
  publishedIcon: {
    width: "15px",
    height: "15px",
    borderRadius: "50%",
    backgroundColor: "#00ffd2",
    marginRight: "5px"
  },
  draftedIcon: {
    width: "15px",
    height: "15px",
    borderRadius: "50%",
    backgroundColor: warningColor[0],
    marginRight: "5px"
  },
  archivedIcon: {
    width: "15px",
    height: "15px",
    borderRadius: "50%",
    backgroundColor: dangerColor[0],
    marginRight: "5px"
  },
  statusStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1
  }
});

export default NewSiteFormStyle;
