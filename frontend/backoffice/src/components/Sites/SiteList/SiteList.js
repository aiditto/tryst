/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SiteCard from "components/Sites/SiteCard/SiteCard";
import { connect } from "react-redux";
import * as actions from "store/actions/rootAction";
import { SITES_SELECTORS } from "store/selectors/rootSelector";

// styles
import styles from "./siteListStyle";
import cx from "classnames";
import { useTranslation } from "react-i18next";
const useStyles = makeStyles(styles);

const SiteList = props => {
  const { t } = useTranslation();
  const classes = useStyles();

  useEffect(() => {
    props.getSites();
  }, []);

  return (
    <Grid container item>
      <Grid item>
        <h1>{t("sites.listTitle")}</h1>
      </Grid>
      {props.sites && (
        <Grid item container justify="center" className={cx(classes.itemList)}>
          {props.sites.map(site => (
            <SiteCard site={site} key={site.id} />
          ))}
        </Grid>
      )}
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    error: SITES_SELECTORS.getError(state),
    loading: SITES_SELECTORS.getLoading(state),
    sites: SITES_SELECTORS.getSites(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSites: () => dispatch(actions.getSites())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteList);
