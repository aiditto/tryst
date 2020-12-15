/* eslint-disable react/prop-types */
import { Grid } from "@material-ui/core";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
// styles
import styles from "./landingPageStyle";
import SiteList from "components/Sites/SiteList/SiteList";

const useStyles = makeStyles(styles);

const RightHomePage = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={10}>
      <SiteList />
    </Grid>
  );
};

export default RightHomePage;
