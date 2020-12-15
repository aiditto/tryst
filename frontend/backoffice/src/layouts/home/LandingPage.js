/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "./landingPageStyle";
// core components
import React, { useEffect, useState, useRef } from "react";
import { useTranslation, Trans } from "react-i18next";
import { connect, useDispatch } from "react-redux";
import * as actions from "../../store/actions/rootAction";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import authenticationService from "services/auth.service";

//Images
import humanImage from "../../assets/img/humans-illustration.svg";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import RightHomePage from "./RightLandingPage";

import { SITES_SELECTORS } from "../../store/selectors/rootSelector";
import { useHistory } from "react-router-dom";
import { Typography, Grid, Button } from "@material-ui/core";
import LoadingScreen from "components/LoadingScreen/LoadingScreen";

const useStyles = makeStyles(styles);

const NewHomePage = props => {
  const [] = useState("");
  const [] = useState("");
  const [] = useState([]);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // ref for the wrapper div
  const history = useHistory();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const stateProps = props.location.state;

  useEffect(() => {
    if (stateProps && stateProps.error) {
      dispatch(actions.showNotification(t("notification.login_failed"), "error"));
      history.replace("/", null);
    } else if (stateProps && stateProps.logout) {
      dispatch(actions.showNotification(t("notification.auth_logout"), "success"));
      history.replace("/", null);
    } else if (stateProps && stateProps.sessionExpired) {
      dispatch(actions.showNotification(t("notification.session_timeout"), "warning"));
      history.replace("/", null);
    }
  }, [stateProps]);

  // styles
  const classes = useStyles();
  React.useEffect(() => {
    document.body.style.overflow = "unset";
    // Specify how to clean up after this effect:
    return function cleanup() {};
  });

  const handleLogin = () => {
    authenticationService.sso();
  };

  return (
    <>
      {props.loading && <LoadingScreen />}
      <Grid container item xs={12} md={8} lg={8} alignItems="center" className={classes.root}>
        <Typography variant="h1" paragraph>
          {t("home.tagline")}
        </Typography>
        <Typography paragraph>{t("home.heading")}</Typography>
        <Typography paragraph>{t("home.text")}</Typography>

        <Grid container item alignItems="center">
          <Grid item xs={6} sm={6} md={6}>
            <img className={classes.humansImage} src={humanImage} alt="humans" />
          </Grid>

          <Grid item xs={12} sm={6} md={6} className={classes.loginWrapper}>
            <Trans i18nKey="home.login">
              <Button
                onClick={handleLogin}
                variant="contained"
                color="primary"
                size="large"
                startIcon={<AccountCircleIcon />}
                className={classes.ssoButton}
              ></Button>
              <Typography variant="caption" className={classes.buttonSeparator}></Typography>
              <Button
                href="mailto:contact@aiditto.org"
                variant="outlined"
                size="small"
                className={classes.contactButton}
              ></Button>
            </Trans>
          </Grid>
        </Grid>
      </Grid>
    </>
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
)(NewHomePage);
