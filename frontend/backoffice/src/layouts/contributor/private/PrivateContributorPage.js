/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// core components
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import cx from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/aiditto-pro-style/layouts/producerPageStyle.js";
import ProductList from "components/Product/ProductList/ProductList";
import { Grid } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/rootAction";
import { ASSET_SELECTORS } from "../../../store/selectors/rootSelector";
import AssetDetails from "components/Asset/AssetDetails/AssetDetails";
import authenticationService from "services/auth.service";

const useStyles = makeStyles(styles);

const PrivateContributorPage = props => {
  const { t } = useTranslation();

  // styles
  const classes = useStyles();

  useEffect(() => {
    props.getAssetsByUser();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={0} alignItems="flex-start" justify="flex-end" className={classes.containerBody}>
        <Grid item xs={12} sm={12} md={5}>
          <Grid container spacing={0} justify="center" className={classes.left}>
            <Grid item xs={12} sm={12} md={10}>
              <h2 className={cx(classes.title, classes.whiteColor)}>{t("contributor.profile.title")}</h2>
              <h3 className={cx(classes.profileName, classes.whiteColor)}>Namn Efternamn*</h3>
            </Grid>
            <Grid item xs={12} sm={12} md={10}>
              <Divider className={classes.dividerStyle} />
            </Grid>
            <Grid item xs={12} sm={12} md={10}>
              <h4 className={cx(classes.profilInformationTitle, classes.whiteColor)}>
                {t("contributor.profile.informationTitle")}
              </h4>
              <h5 className={cx(classes.profilInformation, classes.whiteColor)}>Namn Efternamn*</h5>
              <h5 className={cx(classes.profilInformation, classes.whiteColor, classes.lightFont)}>Adress 56*</h5>
              <h5 className={cx(classes.profilInformation, classes.whiteColor, classes.lightFont)}>
                128 56 Stockholm*
              </h5>
              <h5 className={cx(classes.profilInformation, classes.whiteColor, classes.lightFont)}>+46 93 303*</h5>
              <h5 className={cx(classes.profilInformation, classes.whiteColor, classes.lightFont)}>
                namn.efternamn@gmail.com*
              </h5>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={7} className={classes.right}>
          {authenticationService.isAuthenticated() && <ProductList />}
          <Grid item md={10}>
            <h2 className={cx(classes.title, classes.darkColor)}>{t("contributor.profile.assetsTitle")}</h2>
          </Grid>

          {props.loading && <CircularProgress />}
          <div className={classes.assetList}>
            {props.assets.map(asset => {
              return <AssetDetails data={asset} key={asset.id} />;
            })}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    error: ASSET_SELECTORS.getError(state),
    loading: ASSET_SELECTORS.getLoading(state),
    assets: ASSET_SELECTORS.getAssetsByUser(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAssetsByUser: () => dispatch(actions.getAssetsByUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateContributorPage);
