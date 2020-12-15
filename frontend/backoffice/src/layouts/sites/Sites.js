/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "./sitesStyle";
import { Grid } from "@material-ui/core";

// React and Redux
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import * as actions from "store/actions/rootAction";
import { USERSITES_SELECTORS, AUTH_SELECTORS } from "store/selectors/rootSelector";
import SiteDetails from "components/Sites/SiteDetails/SiteDetails";
import SideBar from "components/Navbars/SideBar";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import LoadingScreen from "components/LoadingScreen/LoadingScreen";

const useStyles = makeStyles(styles);

const Sites = props => {
  const { t } = useTranslation();
  const [, setFormInfo] = useState({ mode: false, data: null });
  const [, setMode] = useState(false);
  const [, setResetLocalItem] = useState(false);
  const [, setExpandable] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  // styles
  const classes = useStyles();

  useEffect(() => {
    if (props.user !== null) {
      props.getUserSites(props.user.userId);
    }
  }, [props.user]);

  useEffect(() => {
    props.getUserId();
    props.clearRedirect();
  }, []);

  const handleResetInfo = () => {
    setFormInfo({ mode: false, data: null });
    setResetLocalItem(true);
  };

  const handleEdit = (val, mode, data) => {
    setExpandable(val);
    setMode(mode);
    setFormInfo({ mode: mode, data: data });
  };

  return (
    <>
      {props.loading && <LoadingScreen />}
      <SideBar sites={props.userSites} section={t("navbar.sites")} previewBtn={false} />
      <Grid className={!props.loading ? classes.root : classes.blur}>
        <Grid
          container
          item
          md={12}
          spacing={2}
          justify={matches ? "center" : "flex-start"}
          className={classes.sitesDetailWrapper}
        >
          {props.userSites &&
            props.userSites.map(site => {
              return (
                <SiteDetails
                  data={site}
                  key={site.id}
                  updateInfo={(val, mode, data) => {
                    handleEdit(val, mode, data);
                  }}
                  resetFormInfo={handleResetInfo}
                  setResetLocalItem={setResetLocalItem}
                />
              );
            })}
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: AUTH_SELECTORS.getUser(state),
    userSites: USERSITES_SELECTORS.getSites(state),
    loading: USERSITES_SELECTORS.getLoading(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearRedirect: () => dispatch(actions.removeRedirect()),
    getUserId: () => dispatch(actions.getUserId()),
    getUserSites: userId => dispatch(actions.getUserSites(userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sites);
