/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import clsx from "clsx";

import { Grid, Slide, Typography } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// Styles
import styles from "./siteDetailsStyle.js";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import * as actions from "../../../store/actions/rootAction";
import { connect } from "react-redux";
import { getSiteUrl } from "shared/utility";
import { SITES_SELECTORS, USERSITES_SELECTORS, UI_SELECTORS } from "../../../store/selectors/rootSelector";
import ConfirmDialog from "components/ConfirmDialog/ConfirmDialog";
import { Link, Redirect } from "react-router-dom";

const useStyles = makeStyles(styles);

const SiteDetails = props => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [site, setSite] = useState(null);
  const [status, setStatus] = useState("");
  const [selectOpen, setSelectOpen] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (props.data) {
      setSite(props.data);
      setStatus(props.data.status);
    }
  }, [props.data]);

  const handleSite = site => {
    const link = getSiteUrl(site.identifier);
    window.open(link, "_blank");
  };

  const handleStatusChange = e => {
    setStatus(e.target.value);
  };

  const handleSave = () => {
    let data = {
      status
    };
    props.patchSite(site.id, data, t);
    setSelectOpen(false);
  };

  return (
    <>
      {props.redirectTo && <Redirect to={props.redirectTo} />}
      {site && (
        <Grid item md={3} xs={6} sm={4} className={classes.detailsWrap}>
          <Grid item className={classes.titlesWrap}>
            <Typography variant={"h4"}>
              {site.name.length > 14 ? site.name.slice(0, 15) + " ..." : site.name}
            </Typography>

            <div className={classes.statusStyle}>
              <FormControl variant="standard" className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
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
                    <Typography variant={"h5"}> {t("sites.status.published")}</Typography>
                  </MenuItem>
                  <MenuItem value={"drafted"}>
                    <div className={classes.draftedIcon}></div>
                    <Typography variant={"h5"}>{t("sites.status.drafted")}</Typography>
                  </MenuItem>
                  <MenuItem value={"archived"}>
                    <div className={classes.archivedIcon}></div>
                    <Typography variant={"h5"}> {t("sites.status.archived")}</Typography>
                  </MenuItem>
                </Select>
              </FormControl>

              {status !== site.status && (
                <Slide direction="left" in={status !== site.status}>
                  <Button className={classes.saveBtn} onClick={handleSave}>
                    {t("quill.submit")}
                  </Button>
                </Slide>
              )}
            </div>
          </Grid>
          <Link
            className={classes.linkStyle}
            to={{
              pathname: `/sites/${site.identifier}`,
              state: { site: site }
            }}
          >
            <Grid item md={12}>
              {site.headerSection && site.headerSection.useImage ? (
                <img className={classes.sitesImage} src={site.headerSection.background} />
              ) : (
                <div
                  style={{
                    background: site.headerSection ? site.headerSection.background : theme.palette.primary.main
                  }}
                  className={classes.papperBg}
                ></div>
              )}
            </Grid>
          </Link>
        </Grid>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    error: SITES_SELECTORS.getError(state),
    loading: SITES_SELECTORS.getLoading(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteSite: (siteId, t) => dispatch(actions.deleteSiteById(siteId, t)),
    patchSite: (siteId, data, t) => dispatch(actions.patchSiteById(siteId, data, t))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteDetails);
