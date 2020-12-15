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
  saveBtn: {
    padding: "12px 28px",
    fontSize: "1.2em",
    marginLeft: "53px",
    backgroundColor: primaryColor,
    color: whiteColor,
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#e34756 !important"
    }
  },
  deleteBtn: {
    padding: "12px 28px",
    fontSize: "1.2em",
    backgroundColor: whiteColor,
    color: dangerColor[0],
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#ded9da !important"
    }
  },
  closeBtn: {
    padding: "12px 28px",
    borderRadius: "8px",
    fontSize: "1.2em",
    fontWeight: "bold",
    textTransform: "none",
    border: "solid",
    borderColor: primaryColor,
    backgroundColor: whiteColor,
    color: primaryColor,
    "&:hover": {
      backgroundColor: "#ded9da !important"
    }
  },
  addBtn: {
    padding: "12px 28px",
    borderRadius: "8px",
    fontSize: "1.2em",
    fontWeight: "bold",
    textTransform: "none",
    border: "solid",
    borderColor: primaryColor,
    backgroundColor: whiteColor,
    color: primaryColor,
    "&:hover": {
      backgroundColor: "#ded9da !important"
    }
  },

  preferredText: {
    paddingTop: "27px"
  }
});

export default styles;
