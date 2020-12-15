// eslint-disable-next-line no-unused-vars

const styles = theme => ({
  listStyle: {
    backgroundColor: "#f1f1f1",
    padding: "15px 20px",
    margin: "5px 0",
    minHeight: "80px",
    fontSize: "0.5rem",
    display: "flex",
    flexWrap: "wrap"
    // [theme.breakpoints.down("xs")]: {
    //   flexDirection: "column !important",
    //   justifyContent: "center !important"
    // }
  },
  siteName: {
    marginTop: "15px"
  },

  listVisitButton: {
    borderRadius: "8px",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    "&:hover": {
      color: theme.palette.secondary.dark,
      backgroundColor: theme.palette.secondary.main
    }
  }
});

export default styles;
