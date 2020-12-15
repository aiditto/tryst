/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { Grid, TextField, Button, Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./siteFormStyle";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import * as actions from "store/actions/rootAction";
import { AUTH_SELECTORS, SITES_SELECTORS } from "store/selectors/rootSelector";
import { getSiteUrl } from "shared/utility";
// InfoModal
import InfoModal from "components/Quill/InfoModal/InfoModal";

const useStyles = makeStyles(styles);

const SiteForm = props => {
  const classes = useStyles();
  const { t } = useTranslation();
  // type validation
  const [siteName, setSiteName] = useState("");
  const [siteIdentifier, setSiteIdentifier] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [status, setStatus] = useState(false);
  const [siteInfo, setSiteInfo] = useState("");
  const [siteTextSection, setSiteTextSection] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [disableIdentifier, setDisableIdentifier] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);

  useEffect(() => {
    if (siteName && siteUrl && siteIdentifier) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [siteName, siteUrl, siteIdentifier]);

  useEffect(() => {
    if (props.mode) {
      initializeFormData();
    } else {
      clearFormData();
    }
  }, [props.mode]);

  useEffect(() => {
    if (props.data) {
      initializeFormData();
    }
  }, [props.data]);

  const initializeFormData = () => {
    if (props.data && props.data !== undefined) {
      const data = props.data;
      setSiteUrl(getSiteUrl(data.identifier));
      setSiteName(data.name);
      setSiteIdentifier(data.identifier);
      setStatus(() => {
        return (data.status || "").toLowerCase() === "published";
      });
      setSiteTextSection(data.textSection);
      setDisableIdentifier(true);
    }
  };

  const clearFormData = () => {
    setSiteUrl("");
    setSiteName("");
    setSiteIdentifier("");
    setSiteTextSection(null);
    setStatus(false);
    setDisableIdentifier(false);
  };

  const handleUpdateInfo = (info, title) => {
    setSiteTextSection({ title: title, description: info });
  };

  const closeInfoModal = () => {
    setOpenInfoModal(false);
  };

  const handleCancel = () => {
    clearFormData();
    props.resetMode();
    props.toggleExpansion();
  };

  const handleSiteSubmit = () => {
    event.preventDefault();
    let statusString;
    if (status) {
      statusString = "published";
    } else {
      statusString = "drafted";
    }
    const data = {
      textSection: siteTextSection,
      identifier: siteIdentifier,
      name: siteName,
      status: statusString,
      userId: props.user.userId
    };
    if (props.mode) {
      props.updateSite(props.data.id, data, t);
    } else {
      props.createSite(data, t);
    }
    if (!props.error) {
      clearFormData();
      setTimeout(() => {
        props.toggleExpansion();
      }, 1000);
    }
  };

  const suggestIdentifier = name => {
    let newId;
    if (!props.mode) {
      newId = idSanityCheck(name);
      setSiteIdentifier(newId);
      setSiteName(name);
      return newId;
    }
    setSiteName(name);
  };

  const identifierToURL = identifier => {
    if (identifier === "" || identifier === null) {
      setSiteUrl("");
    } else {
      setSiteUrl(getSiteUrl(identifier));
    }
  };

  const idSanityCheck = id => {
    let saneId = "";
    let nextchar;
    if (id.length > 0) {
      id.toLowerCase()
        .split("")
        .map(char => {
          if (char === "å" || char === "ä") {
            nextchar = "a";
          } else if (char === "ö") {
            nextchar = "o";
          } else if (char.match(/^[0-9a-zA-Z]+$/)) {
            nextchar = char;
          } else {
            if (saneId[saneId.length - 1] === "-") {
              nextchar = "";
            } else {
              nextchar = "-";
            }
          }
          saneId = saneId + nextchar;
        });
    } else {
      saneId = "";
    }
    if (saneId[saneId.length - 1] === "-") {
      return saneId.slice(0, -1);
    }
    return saneId;
  };

  return (
    <form onSubmit={handleSiteSubmit}>
      <Grid container>
        <Grid item xs={12} md={10} sm={8} className={classes.formInputStyles}>
          <TextField
            id="name"
            fullWidth
            required
            label={t("sites.name")}
            type="text"
            rows={1}
            value={siteName}
            onChange={event => {
              setSiteName(event.target.value);
              suggestIdentifier(event.target.value);
              identifierToURL(suggestIdentifier(event.target.value));
            }}
          />
        </Grid>
        <Grid item xs={12} md={10} sm={8} className={classes.formInputStyles}>
          <TextField
            id="identifier"
            fullWidth
            required
            label={t("sites.identifier")}
            type="text"
            rows={1}
            disabled={disableIdentifier}
            value={siteIdentifier}
            onChange={event => {
              setSiteIdentifier(event.target.value);
              identifierToURL(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={10} sm={8} className={classes.formInputStyles}>
          <TextField
            id="url"
            fullWidth
            label={t("sites.url")}
            type="text"
            rows={1}
            value={siteUrl}
            disabled
            onChange={event => {
              setSiteUrl(event.target.value);
            }}
          />
        </Grid>
        <Grid item md={12} xs={12} className={classes.switchWrap}>
          <Grid item onClick={() => setStatus(false)} className={classes.switchText}>
            {t("demands.form.labels.drafted")}
          </Grid>

          <Switch
            checked={status}
            onChange={() => {
              setStatus(!status);
            }}
            name="Status"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />

          <Grid item onClick={() => setStatus(true)} className={classes.switchText}>
            {t("demands.form.labels.published")}
          </Grid>
        </Grid>

        <Grid item xs={12} md={12}>
          <Button
            square="true"
            className={classes.btnColorInfo}
            onClick={() => {
              setOpenInfoModal(true);
            }}
          >
            {t("quill.info")}
          </Button>
        </Grid>

        <Grid item md={12} xs={12} className={classes.btnWrapper}>
          <Button square="true" className={classes.btnColorCancel} onClick={handleCancel}>
            {t("sites.form.cancel")}
          </Button>

          <InfoModal
            open={openInfoModal}
            info={props.data && props.data.textSection}
            setOpenInfoModal={closeInfoModal}
            saveContents={(data, title) => {
              handleUpdateInfo(data, title);
            }}
          />
          <Button
            square="true"
            type="submit"
            className={classNames(classes.btnColorPrimary, {
              [classes.disabled]: disabled
            })}
            disabled={disabled}
          >
            {t("sites.form.submit")}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    site: SITES_SELECTORS.getSite(state),
    error: SITES_SELECTORS.getError(state),
    loading: SITES_SELECTORS.getLoading(state),
    user: AUTH_SELECTORS.getUser(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createSite: (data, t) => dispatch(actions.createNewSite(data, t)),
    updateSite: (siteId, data, t) => dispatch(actions.updateSiteById(siteId, data, t))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteForm);
