/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Switch,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  InputLabel
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./createSiteFormStyle";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import * as actions from "store/actions/rootAction";
import { AUTH_SELECTORS, SITES_SELECTORS, UI_SELECTORS } from "store/selectors/rootSelector";
import { getSiteUrl, getStaticUrl } from "shared/utility";
// InfoModal
import InfoModal from "components/Quill/InfoModal/InfoModal";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(styles);

const SiteForm = props => {
  const classes = useStyles();
  const { t } = useTranslation();
  // type validation
  const [siteName, setSiteName] = useState("");
  const [siteIdentifier, setSiteIdentifier] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [status, setStatus] = useState(props.data ? props.data.status : "drafted");
  const [, setSelectOpen] = useState(false);
  const [disableIdentifier, setDisableIdentifier] = useState(false);

  useEffect(() => {
    if (siteName && siteUrl && siteIdentifier) {
      props.setDisabled(false);
    } else {
      props.setDisabled(true);
    }
  }, [siteName, siteUrl, siteIdentifier]);

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
      setStatus(data.status);
      setDisableIdentifier(true);
    }
  };

  const clearFormData = () => {
    setSiteUrl("");
    setSiteName("");
    setSiteIdentifier("");
    setStatus(false);
    setDisableIdentifier(false);
  };

  const suggestIdentifier = name => {
    let newId;
    if (!props.editMode) {
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

  useEffect(() => {
    if (props.getData) sendData();
  }, [props.getData]);

  const sendData = () => {
    const data = {
      identifier: siteIdentifier,
      name: siteName,
      status: status,
      userId: props.user.userId
    };

    props.sendData(data);
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

  const handleStatusChange = e => {
    setStatus(e.target.value);
  };

  return (
    <>
      {props.redirectTo && <Redirect to={props.redirectTo} />}

      <form>
        <Grid container direction="column" className={classes.root}>
          <Grid container item xs={12} md={12} sm={8} className={classes.formInputStyles}>
            <Grid item md={2}>
              <p className={classes.heading}>{t("sites.name")} </p>
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                id="name"
                fullWidth
                required
                label={t("sites.name")}
                type="text"
                rows={1}
                value={siteName ? siteName : ""}
                onChange={event => {
                  setSiteName(event.target.value);
                  suggestIdentifier(event.target.value);
                  identifierToURL(suggestIdentifier(event.target.value));
                }}
              />
            </Grid>
          </Grid>

          <Grid container item xs={12} md={12} sm={12} className={classes.formInputStyles}>
            <Grid item md={2}>
              <p className={classes.heading}>URL</p>
            </Grid>

            <Grid item md={6} xs={12} sm={12}>
              <TextField
                id="identifier"
                fullWidth
                required
                label={t("sites.url")}
                type="text"
                rows={1}
                InputProps={{
                  startAdornment: <InputAdornment position="start">{getStaticUrl()}</InputAdornment>
                }}
                disabled={disableIdentifier}
                value={siteIdentifier ? siteIdentifier : ""}
                onChange={event => {
                  setSiteIdentifier(event.target.value);
                  identifierToURL(event.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} md={12} sm={12} className={classes.formInputStyles}>
            <Grid item md={2}>
              <p className={classes.heading}>Status</p>
            </Grid>
            <Grid item md={3} xs={12} className={classes.switchWrap}>
              <FormControl variant="standard" className={classes.formControl}>
                <InputLabel>Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="select-status"
                  value={status}
                  label="Status"
                  onChange={handleStatusChange}
                  onOpen={() => {
                    setSelectOpen(true);
                  }}
                  onClose={() => {
                    setSelectOpen(false);
                  }}
                >
                  <MenuItem value={"published"}>
                    <div className={classes.publishedIcon}></div>
                    {t("sites.status.published")}
                  </MenuItem>
                  <MenuItem value={"drafted"}>
                    <div className={classes.draftedIcon}></div>
                    {t("sites.status.drafted")}
                  </MenuItem>
                  {props.data && (
                    <MenuItem value={"archived"}>
                      <div className={classes.archivedIcon}></div>
                      {t("sites.status.archived")}
                    </MenuItem>
                  )}
                </Select>
              </FormControl>

              {/* <Grid item onClick={() => setStatus(false)} className={classes.switchText}>
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
            </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

const mapStateToProps = state => {
  return {
    site: SITES_SELECTORS.getSite(state),
    error: SITES_SELECTORS.getError(state),
    loading: SITES_SELECTORS.getLoading(state),
    user: AUTH_SELECTORS.getUser(state),
    redirectTo: UI_SELECTORS.getRedirectTo(state)
  };
};

export default connect(mapStateToProps)(SiteForm);
