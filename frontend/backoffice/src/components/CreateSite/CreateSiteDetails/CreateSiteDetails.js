/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
// import clsx from "clsx";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

// Styles
import styles from "./createSiteDetailsStyle.js";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import * as actions from "../../../store/actions/rootAction";
import { connect } from "react-redux";
import { getSiteUrl } from "shared/utility";
import { SITES_SELECTORS } from "../../../store/selectors/rootSelector";
import ConfirmDialog from "components/ConfirmDialog/ConfirmDialog";
import { Link } from "react-router-dom";

const useStyles = makeStyles(styles);

const SiteDetails = props => {
  const { t } = useTranslation();
  const classes = useStyles();
  const site = props.data;
  const [expandable, setExpandable] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleSite = site => {
    const link = getSiteUrl(site.identifier);
    window.open(link, "_blank");
  };

  const toggleExpansionPanel = () => {
    setExpandable(!expandable);
  };

  const handleDelete = val => {
    if (val) props.deleteSite(site.id, t);
    setOpenConfirm(false);
  };

  const handleUpdate = () => {
    // props.resetFormInfo();
    // props.updateInfo(true, site);
    //setExpandable(!expandable);
    toggleExpansionPanel();
    props.updateInfo(true, true, site);
    window.scrollTo(0, 0); // TODO: make scrolling to top smooth
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0} alignItems="flex-start" justify="flex-start">
        <Grid item xs={12} sm={12} md={8} className={classes.rightLeftGrid}>
          <Accordion expanded={expandable} className={classes.siteDetailesStyle}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1c-content"
              id="panel1c-header"
              onClick={toggleExpansionPanel}
              className={classes.edgeEnd}
            >
              <Grid container item md={12} sm={12} xs={12}>
                <Grid item md={10} xs={8} sm={8}>
                  <p>{t("sites.name")}</p>
                  <p className={classes.titleStyle}>{site.name}</p>
                </Grid>
                <Grid item md={2} sm={4} xs={4}>
                  <p className={classes.titleStyle}>{t("sites.status.name")}</p>
                  {site.status && site.status.toLowerCase() === "published" ? (
                    <>
                      <CheckCircleIcon className={classes.publishIcon} />
                      <p>{t("demands.form.labels.published")}</p>
                    </>
                  ) : (
                    <>
                      <CreateIcon className={classes.draftIcon} />
                      <p>{t("demands.form.labels.drafted")}</p>
                    </>
                  )}
                </Grid>
                <Divider className={classes.dividerStyle} />
              </Grid>
            </AccordionSummary>
            <Divider className={classes.dividerStyle} />
            <AccordionDetails className={classes.details}>
              <Grid container direction="column" justify="space-around" alignItems="center">
                {!site.textSection ? (
                  <p>{t("sites.info")}</p>
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: site.textSection.description }} />
                )}
              </Grid>
            </AccordionDetails>
            <Divider />
            <AccordionActions>
              <Button size="small" square="true" className={classes.btnColorSecondary} onClick={handleUpdate}>
                {t("sites.edit")}
              </Button>
              <Button
                size="small"
                square="true"
                className={classes.btnColorPrimary}
                onClick={() => {
                  setOpenConfirm(true);
                }}
              >
                {t("sites.delete")}
              </Button>
            </AccordionActions>
          </Accordion>
        </Grid>
        <Grid container item xs={12} sm={12} md={4} className={classes.rightRightGrid} justify="center">
          <Link to={{ pathname: `/channels-page`, state: { siteId: site.id, siteIdentifier: site.identifier } }}>
            <Button
              size="large"
              square="true"
              className={classes.chooseAsset}
              // onClick={() => {
              //   handleSite(site);
              //   // props.resetFormInfo();
              // }}
            >
              {t("sites.manage")}
            </Button>
          </Link>
        </Grid>
      </Grid>
      <ConfirmDialog
        open={openConfirm}
        handleClose={() => {
          setOpenConfirm(false);
        }}
        deleteMsg={t("sites.deleteConfirm", { site: site.name })}
        handleDelete={val => {
          handleDelete(val);
        }}
      />
    </div>
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
    updateSite: (siteId, data, t) => dispatch(actions.updateSiteById(siteId, data, t))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteDetails);
