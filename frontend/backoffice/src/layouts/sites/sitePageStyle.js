import { dangerColor, warningColor } from "assets/jss/aiditto-pro-style/aidittoColorStyles.js";

const styles = theme => ({
  root: {
    backgroundColor: "#fff !important",
    boxShadow: "0px 0px 18px 0px rgba(166,171,189,1);",
    margin: "0 auto",
    marginTop: "1rem",
    overflow: "hidden",
    display: "block",
    height: "auto",
    borderRadius: "9px",
    "& h1": {
      fontSize: "2em",
      margin: 0,
      marginBottom: "0.5rem"
    },
    "& h2": {
      fontSize: "1.5em"
    },
    "& h3": {
      fontSize: "1.17em"
    },
    "& p": {
      fontSize: "0.9rem",
      margin: 0
    },
    "& img": {
      maxWidth: "100px"
    }
  },
  emptySection: {
    height: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& h2": {
      fontStyle: "italic",
      color: "gray",
      fontSize: "1.5em"
    }
  },
  topHeading: {
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& h2": {
      margin: 0,
      textTransform: "capitalize",
      fontSize: "1.5rem",
      fontWeight: 600
    },
    "& p": {
      fontWeight: 400,
      textTransform: "capitalize"
    }
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
  statusBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  sitesDetailWrapper: {
    padding: "2rem !important"
  }
});

export default styles;
