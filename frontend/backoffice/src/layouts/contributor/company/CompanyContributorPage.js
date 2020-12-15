/* eslint-disable no-unused-vars */
// core components
import React from "react";
import cx from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/aiditto-pro-style/layouts/producerPageStyle.js";
import { Grid } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import CompanyRegisterForm from "components/RegisterForms/CompanyRegisterForm";

const useStyles = makeStyles(styles);

const CompanyContributorPage = props => {
  // styles
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={0} alignItems="flex-start" justify="flex-end">
        <Grid item xs={12} sm={12} md={6} className={classes.left}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={12}>
              <h2 className={cx(classes.title, classes.whiteColor)}>Profil</h2>
              <h3 className={cx(classes.profileName, classes.whiteColor)}>Företagsnamn</h3>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Divider className={classes.dividerStyle} />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <h4 className={cx(classes.profilInformationTitle, classes.whiteColor)}>Företagsinformation</h4>
              <h5 className={cx(classes.profilInformation, classes.whiteColor)}>Företagsnamn</h5>
              <h5 className={cx(classes.profilInformation, classes.whiteColor, classes.lightFont)}>Org.nummer</h5>
              <h5 className={cx(classes.profilInformation, classes.whiteColor, classes.lightFont)}>Gatuadress</h5>
              <h5 className={cx(classes.profilInformation, classes.whiteColor, classes.lightFont)}>128 56 Stockholm</h5>
              <h5 className={cx(classes.profilInformation, classes.whiteColor, classes.lightFont)}>+46 93 303</h5>
              <h5 className={cx(classes.profilInformation, classes.whiteColor, classes.lightFont)}>
                namn.efternamn@företag.se
              </h5>
            </Grid>
            <Grid item xs={12} sm={12} md={12} className={classes.margTop60}>
              <h4 className={cx(classes.profilInformationTitle, classes.whiteColor, classes.paddingBottom10)}>
                Vill ni visa upp er logga på vår hemsida?
              </h4>
              <h5 className={cx(classes.profilInformation, classes.whiteColor, classes.lightFont)}>
                Efter er första donation kommer ni kunna ladda upp er logga
              </h5>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} className={classes.right}>
          <h2 className={cx(classes.title, classes.darkColor)}>Våra bidrag</h2>
        </Grid>
      </Grid>
    </div>
  );
};

export default CompanyContributorPage;
