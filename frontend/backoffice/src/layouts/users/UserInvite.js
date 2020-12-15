/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "./userInviteStyle";
import { Grid, Card, CardHeader, CardActions, CardContent, Button, TextField } from "@material-ui/core";
import classNames from "classnames";

// React and Redux
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import * as actions from "store/actions/rootAction";
import { AUTH_SELECTORS, SITES_SELECTORS, UI_SELECTORS } from "store/selectors/rootSelector";

import SideBar from "components/Navbars/SideBar";
import authenticationService from "services/auth.service";
import { isAdminSessionValid, isAdminAuthorized } from "shared/utility";
import { Redirect } from "react-router-dom";
import LoadingScreen from "components/LoadingScreen/LoadingScreen";

import { verifyEmail } from "shared/utility";

const useStyles = makeStyles(styles);

const UserInvite = props => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState("");
  const [name, setName] = useState("");
  const [siteId, setSiteId] = useState(null);
  const [disabled, setDisabled] = useState(false);
  //   console.log(props);
  //   useEffect(() => {
  //     return () => {
  //       if (props.site) setSiteId(props.site.id);
  //     };
  //   }, [props && props.site]);

  useEffect(() => {
    if (email && name) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, name]);

  const handleAuthorize = () => {
    authenticationService.authorizeAdmin();
  };

  const handleSubmit = event => {
    event.preventDefault();
    const data = {
      email: email,
      name: name
    };
    props.inviteUser(data, siteId, t);
  };

  if (props.redirectTo) {
    return <Redirect to={props.redirectTo} />;
  }

  return (
    <>
      <SideBar currentSite="createSite" />
      {props.loading && <LoadingScreen />}
      <div className={classes.root}>
        <Grid container justify="center">
          {!isAdminAuthorized() && !isAdminSessionValid() && (
            <Grid container item md={12} lg={12} className={classes.backWrapper}>
              <Button size="large" square="true" className={classes.btnAdmin} onClick={handleAuthorize}>
                {t("invite.admin")}
              </Button>
            </Grid>
          )}
          {(isAdminAuthorized() || isAdminSessionValid()) && (
            <Grid container item md={12} lg={12}>
              <form>
                <Card className={classes.card}>
                  <CardHeader title={t("invite.title")} className={classes.header}></CardHeader>
                  <CardContent className={classes.cardHeading}>
                    <Grid item className={classes.formInputStyles}>
                      <TextField
                        error={email !== "" && emailState === "error"}
                        id="email"
                        fullWidth
                        required
                        label={t("invite.email")}
                        type="text"
                        rows={1}
                        onChange={event => {
                          setEmail(event.target.value);
                        }}
                        onChange={event => {
                          if (verifyEmail(event.target.value)) {
                            setEmailState("success");
                          } else {
                            setEmailState("error");
                          }
                          setEmail(event.target.value);
                        }}
                        value={email}
                        helperText={email !== "" && emailState === "error" && t("invite.helperText")}
                      />
                    </Grid>
                    <Grid item className={classes.formInputStyles}>
                      <TextField
                        id="name"
                        fullWidth
                        required
                        label={t("invite.name")}
                        type="text"
                        rows={1}
                        onChange={event => {
                          setName(event.target.value);
                        }}
                        value={name}
                      />
                    </Grid>
                  </CardContent>
                  <CardActions className={classes.btnWrapper}>
                    <Grid item>
                      <Button
                        className={classNames(classes.btnPrimary, {
                          [classes.disabled]: disabled
                        })}
                        onClick={handleSubmit}
                        disabled={disabled}
                      >
                        {t("invite.submit")}
                      </Button>
                    </Grid>
                  </CardActions>
                </Card>
              </form>
            </Grid>
          )}
        </Grid>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    loading: AUTH_SELECTORS.getLoading(state),
    error: AUTH_SELECTORS.getError(state),
    site: SITES_SELECTORS.getSite(state),
    redirectTo: UI_SELECTORS.getRedirectTo(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    inviteUser: (data, siteId, t) => dispatch(actions.inviteUserbyEmail(data, siteId, t))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInvite);
