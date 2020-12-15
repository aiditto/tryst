/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "./createSitePageStyle";
import { Grid, Button, Fade } from "@material-ui/core";

// React and Redux
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import * as actions from "store/actions/rootAction";
import { USERSITES_SELECTORS, AUTH_SELECTORS } from "store/selectors/rootSelector";
import CreateSiteForm from "components/CreateSite/CreateSiteForm/CreateSiteForm.js";

import SideBar from "components/Navbars/SideBar";
import { ThemeSelector } from "components/ThemeSelector/ThemeSelector";
import CardHeader from "components/CardHeader/CardHeader";
import { LogoSelector } from "components/LogoSelector/LogoSelector";
import classNames from "classnames";
import LoadingScreen from "components/LoadingScreen/LoadingScreen";

const useStyles = makeStyles(styles);

const NewSitesPage = props => {
  const { t } = useTranslation();
  const [getCompData, setGetCompData] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [selectedSite, setSelectedSite] = useState(null);

  let data = {};
  // styles
  const classes = useStyles();

  useEffect(() => {
    if (props.user !== null) {
      props.getUserSites(props.user.userId);
    }
  }, [props.user]);

  useEffect(() => {
    props.getUserId();
  }, []);

  useEffect(() => {
    if (props.userSites.length > 0) {
      const loc = window.location.pathname.split("/").filter(x => x);
      const site = props.userSites.filter(site => {
        // FIXME Can the site be loaded from a URL param instead of explicit path finding? .andreas
        return site.identifier === loc[2];
      });
      setSelectedSite(site[0]);
    }
  }, [props]);

  useEffect(() => {
    if (Object.keys(data).length) {
      if (!selectedSite) {
        props.createNewSite(data, t);
      } else {
        const mode = "update-site";
        props.patchSiteById(selectedSite.id, data, t, mode);
      }
    }
    setGetCompData(false);
  }, [data]);

  const handleResetForm = () => {
    props.resetFormInfo();
  };

  const getFormData = val => {
    data.identifier = val.identifier;
    data.name = val.name;
    data.status = val.status;
    data.userId = val.userId;
  };

  const getThemeData = val => {
    data.settings = {
      secondaryColor: val.secondary,
      primaryColor: val.primary
    };
  };

  const getLogoData = val => {
    data.settings = {
      ...data.settings,
      useIcon: val ? true : false,
      icon: val
    };
  };

  return (
    <>
      <SideBar identifier={selectedSite && selectedSite.identifier} previewBtn={true} />
      {props.loading && <LoadingScreen />}
      <div className={classes.root}>
        <CardHeader
          title={selectedSite ? t("sites.form.title.update") : t("sites.form.title.create")}
          showButtons={false}
        />
        <CreateSiteForm
          loading={props.loading}
          editMode={selectedSite && true}
          data={selectedSite}
          resetForm={handleResetForm}
          getData={getCompData}
          sendData={val => {
            getFormData(val);
          }}
          setDisabled={bool => setDisabled(bool)}
        />

        <CardHeader title={t("sites.styling.title.colors")} showButtons={false} />
        <ThemeSelector
          editMode={selectedSite && true}
          data={selectedSite}
          getData={getCompData}
          sendData={val => {
            getThemeData(val);
          }}
        />
        <CardHeader title={t("sites.styling.title.logo")} showButtons={false} />
        <LogoSelector
          editMode={selectedSite && true}
          data={selectedSite}
          getData={getCompData}
          sendData={val => {
            getLogoData(val);
          }}
        />

        <Grid item md={12} xs={12} className={classes.btnWrapper}>
          <Button square="true" className={classes.btnColorCancel}>
            {t("sites.form.cancel")}
          </Button>
          <div className={classes.saveWrapper}>
            <Button
              square="true"
              type="submit"
              onClick={() => {
                setGetCompData(true);
              }}
              className={classNames(classes.btnColorPrimary, {
                [classes.disabled]: disabled
              })}
              disabled={disabled}
            >
              {t("sites.form.submit")}
            </Button>
            <Fade in={disabled}>
              <small>Sitename is required</small>
            </Fade>
          </div>
        </Grid>
      </div>
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
    patchSiteById: (siteId, data, t, mode) => dispatch(actions.patchSiteById(siteId, data, t, mode)),
    getUserId: () => dispatch(actions.getUserId()),
    getUserSites: userId => dispatch(actions.getUserSites(userId)),
    createNewSite: (data, t) => dispatch(actions.createNewSite(data, t))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewSitesPage);
