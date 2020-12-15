const styles = theme => ({
  outerWrap: {
    padding: "80px 0",
    backgroundColor: "#fff"
  },
  howItWorksButton: {
    padding: "24px",
    border: "1px solid #828282",
    borderRadius: "8px",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "29px",
    color: "#828282"
  },
  headTitle: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 800,
    fontSize: "2rem",
    color: "#000"
  },
  itemTitle: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "30px"
  },
  divider: {
    backgroundColor: "black",
    width: "100%",
    height: "1px",
    margin: "60px 0"
  },
  boldSmallText: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "29px",
    color: "#000000"
  },
  switchStyle: {
    height: "54px"
  },
  switchButton: {
    minWidth: "84px"
  },
  centerItems: {
    display: "flex",
    justifyContent: "center"
  },
  inactiveButton: {
    background: "#D8D8D8",
    "&:hover": {
      backgroundColor: "#D8D8D8"
    }
  },
  activeButton: {
    background: "#E25757",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#E25757"
    }
  },
  formStyle: {
    display: "flex",
    flexDirection: "column"
  },
  textFieldStyle: {
    marginBottom: "5px"
  },
  sendHelp: {
    padding: "16px 40px",
    fontSize: "0.9375rem",
    backgroundColor: "#e35756",
    color: "#fff",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#ca4343"
    }
  },
  mobileFix: {
    flexDirection: "column",
    justifyContent: "center",
    "& Button": {
      maxWidth: "50%"
    },
    [theme.breakpoints.down("md")]: {
      justifyContent: "center !important",
      "& Button": {
        maxWidth: "50%"
      }
    }
  },
  inputWrapper: {
    paddingTop: "30px"
  },
  inputWrapperCost: {
    "& .MuiCollapse-wrapperInner": {
      display: "flex",
      alignItems: "flex-end"
    },
    "& .MuiInputBase-root": {
      marginBottom: "0 !important"
    }
  },

  disabledButton: {
    backgroundColor: "#D8D8D8",
    color: "#000",
    maxWidth: "50%",
    padding: "16px 40px"
  },
  helperText: {
    color: "red",
    fontStyle: "italic"
  }
});

export default styles;
