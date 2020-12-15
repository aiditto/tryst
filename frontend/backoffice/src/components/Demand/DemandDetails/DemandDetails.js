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
import styles from "./demandDetailsStyle";

import { connect } from "react-redux";
import * as actions from "store/actions/rootAction";
import { DEMANDS_SELECTORS } from "store/selectors/rootSelector";
import ConfirmDialog from "components/ConfirmDialog/ConfirmDialog";

const useStyles = makeStyles(styles);

const DemandDetails = props => {
  const demand = props.data;
  const classes = useStyles();
  const { t } = useTranslation();
  const [expandable, setExpandable] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const channelId = props.channelId;

  const handleDelete = demand => {
    props.deleteDemand(demand.id, channelId, t);
    setOpenConfirm(false);
    setExpandable(false);
  };

  return (
    <>
      <Grid item xs={12} sm={12} md={8} className={classes.root}>
        <Accordion expanded={expandable} className={classes.demandDetails}>
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
                <p className={classes.titleStyle}>{t("demands.details.title")}</p>
                <p className={classes.contentStyle}>{demand.title}</p>
              </Grid>
              <Grid item md={2} sm={2} xs={2} alignItems="center" justify="flex-end" direction="column">
                <p className={classes.titleStyle}>{t("demands.details.status")}</p>
                {demand.status.toLowerCase() === "published" ? (
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
              {demand.description && <span dangerouslySetInnerHTML={{ __html: demand.description }} />}
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
                props.setExpandable(true, true, demand);
              }}
            >
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

      <ConfirmDialog
        open={openConfirm}
        handleClose={() => {
          setOpenConfirm(false);
        }}
        deleteMsg={t("demands.deleteConfirm", { demand: demand.identifier })}
        handleDelete={() => {
          handleDelete(demand);
        }}
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    error: DEMANDS_SELECTORS.getError(state),
    loading: DEMANDS_SELECTORS.getLoading(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteDemand: (demandId, channelId, t) => dispatch(actions.deleteDemandById(demandId, channelId, t)),
    getDemands: () => dispatch(actions.getDemands())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DemandDetails);
