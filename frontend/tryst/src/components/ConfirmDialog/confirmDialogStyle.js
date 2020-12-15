const styles = theme => ({
  deleteButton: {
    padding: "10px",
    lineHeight: "15px",
    backgroundColor: "#e35756",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
    color: "white",
    fontSize: "1.2em",
    fontWeight: "bold",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#ca4343"
    }
  },
  cancelButton: {
    padding: "10px",
    lineHeight: "15px",
    backgroundColor: "#828282",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
    color: "white",
    fontSize: "1.2em",
    fontWeight: "bold",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#5d5b5b"
    }
  }
});

export default styles;
