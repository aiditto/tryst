const styles = theme => ({
  root: {
    position: "absolute",
    height: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8884845e",
    zIndex: "2",
    left: 0,
    top: 0
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    width: "100px !important",
    height: "auto  !important"
  },
  top: {
    color: "#1a90ff",
    animationDuration: "550ms",
    position: "absolute",
    width: "100px !important",
    height: "auto  !important"
  },
  circle: {
    strokeLinecap: "round"
  }
});

export default styles;
