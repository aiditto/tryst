/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
// import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Grid,
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
// Styles
import styles from "./channelDetailsStyle.js";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { CHANNELS_SELECTORS } from "store/selectors/rootSelector";
import * as actions from "store/actions/rootAction";
import ConfirmDialog from "components/ConfirmDialog/ConfirmDialog";

const useStyles = makeStyles(styles);

const ChannelDetails = props => {
  let channel = props.data;
  const classes = useStyles();
  const { t } = useTranslation();
  const [expandable, setExpandable] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const siteId = props.siteId;
  const siteIdentifier = props.siteIdentifier;

  const handleDelete = channel => {
    props.deleteChanel(channel.id, siteId, t);
    setOpenConfirm(false);
    setExpandable(false);
  };

  return (
    <>
      <Grid item xs={12} sm={12} md={8} className={classes.root}>
        <Accordion expanded={expandable} className={classes.channelDetails}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header"
            onClick={() => {
              setExpandable(!expandable);
            }}
            className={classes.edgeEnd}
          >
            <Grid container item md={12} sm={12} xs={12}>
              <Grid item md={10} xs={10} sm={10}>
                <p className={classes.titleStyle}>{t("channels.details.title")}</p>
                <p className={classes.contentStyle}>{channel.name}</p>
              </Grid>
              <Grid container item md={2} sm={2} xs={2} alignItems="center" justify="flex-end" direction="column">
                <p className={classes.titleStyle}>{t("channels.details.status")}</p>
                {channel.status.toLowerCase() === "published" ? (
                  <>
                    <CheckCircleIcon className={classes.publishIcon} />
                    <p>{t("channels.form.labels.published")}</p>
                  </>
                ) : (
                  <>
                    <CreateIcon className={classes.draftIcon} />
                    <p>{t("channels.form.labels.drafted")}</p>
                  </>
                )}
              </Grid>
              <Divider className={classes.dividerStyle} />
            </Grid>
          </AccordionSummary>
          <Divider className={classes.dividerStyle} />
          <AccordionDetails className={classes.details}>
            <Grid container direction="column" justify="space-around" alignItems="center">
              {channel.description && <span dangerouslySetInnerHTML={{ __html: channel.description }} />}
            </Grid>
          </AccordionDetails>
          <Divider />
          <AccordionActions>
            <Button
              size="small"
              square="true"
              className={classes.btnColorSecondary}
              onClick={() => {
                setExpandable(false);
                props.setExpandable(true, true, channel);
              }}
            >
              {t("channels.edit")}
            </Button>
            <Button
              size="small"
              square="true"
              className={classes.btnColorPrimary}
              onClick={() => {
                setOpenConfirm(true);
              }}
            >
              {t("channels.delete")}
            </Button>
          </AccordionActions>
        </Accordion>
      </Grid>

      <Grid container item xs={12} sm={12} md={2} className={classes.rightRightGrid} justify="center">
        <Link
          to={{
            pathname: `/demands-page`,
            state: { channelId: channel.id, siteId: siteId, siteIdentifier: siteIdentifier }
          }}
        >
          <Button size="large" square="true" className={classes.manageBtn}>
            {t("channels.manage")}
          </Button>
        </Link>
      </Grid>

      <ConfirmDialog
        open={openConfirm}
        handleClose={() => {
          setOpenConfirm(false);
        }}
        deleteMsg={t("channels.deleteConfirm", { channel: channel.identifier })}
        handleDelete={() => {
          handleDelete(channel);
        }}
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    error: CHANNELS_SELECTORS.getError(state),
    loading: CHANNELS_SELECTORS.getLoading(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteChanel: (channelId, siteId, t) => dispatch(actions.deleteChannelById(channelId, siteId, t)),
    getChannels: () => dispatch(actions.getChannels())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelDetails);
