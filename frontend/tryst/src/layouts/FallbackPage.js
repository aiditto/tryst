/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import {
  stickyFooter
} from "assets/jss/aiditto-pro-style/aidittoQuestionableStyles";
import SiteList from "components/Sites/SiteList/SiteList";

const styles = theme => ({
  rightWrapper: {
    ...stickyFooter,
    backgroundColor: "white",
    minWidth: "50%",
    padding: "30px 50px",
    borderRadius: "6px 0 0 6px",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "3em",
    marginBottom: "3em",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
    [theme.breakpoints.down("sm")]: {
      padding: "32px",
      margin: "0 0 2em",
      borderRadius: 0
    }
  }
});

const useStyles = makeStyles(styles);

const FallbackPage = () => {
  const classes = useStyles();

  return (
    <Grid container item xs={12} md={8} className={classes.rightWrapper}>
      <SiteList />
    </Grid>
  );
};

export default FallbackPage;
