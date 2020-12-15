/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
// import clsx from "clsx";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid } from "@material-ui/core";
import { parseDate } from "shared/utility";

// Styles
import styles from "./demandDetailsStyle.js";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import * as actions from "../../../store/actions/rootAction";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { DEMAND_SELECTORS, CONNECTED_ITEMS_SELECTORS, PRODUCT_SELECTORS } from "../../../store/selectors/rootSelector";
import ConfirmDialog from "components/ConfirmDialog/ConfirmDialog";

const useStyles = makeStyles(styles);

const DemandDetails = props => {
  const { t } = useTranslation();
  const classes = useStyles();
  const demand = props.data;
  const [selected, setSelected] = useState(false);
  const [expandable, setExpandable] = useState(false);
  const dispatch = useDispatch();
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleDemand = demand => {
    if (!selected) {
      dispatch(actions.addDemandItem(demand));
    } else {
      dispatch(actions.removeDemandItem(demand));
    }
  };

  useEffect(() => {
    if (props.connectedItems.length > 0) {
      props.connectedItems.map(item => {
        if (item.id === demand.id) {
          setSelected(true);
        }
      });
    }
  }, [props.connectedItems]);

  const toggleExpansionPanel = () => {
    setExpandable(!expandable);
  };

  const handleDelete = val => {
    if (val) props.deleteDemand(demand.id, t);
    setOpenConfirm(false);
  };

  const handleUpdate = () => {
    props.updateInfo(true, demand);
    setExpandable(!expandable);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0} alignItems="flex-start" justify="flex-start">
        <Grid item xs={12} sm={12} md={8} className={classes.rightLeftGrid}>
          <ExpansionPanel expanded={expandable} className={classes.demandDetailesStyle}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1c-content"
              id="panel1c-header"
              onClick={toggleExpansionPanel}
              className={classes.edgeEnd}
            >
              <Grid container item md={12} sm={12} xs={12}>
                <Grid item md={8} xs={8} sm={8}>
                  <p>{t("products.name")}</p>
                  <p className={classes.titleStyle}>{demand.productName}</p>
                  <small>{demand.modelName}</small>
                </Grid>
                <Grid container item md={4} sm={4} xs={4} alignItems="flex-end" direction="column">
                  <p>{t("demands.quantity")}</p>
                  <p className={classes.titleStyle}>{demand.quantity}</p>
                </Grid>
                <Divider className={classes.dividerStyle} />
              </Grid>
            </ExpansionPanelSummary>
            <Divider className={classes.dividerStyle} />
            <ExpansionPanelDetails className={classes.details}>
              <Grid container direction="column" justify="space-around" alignItems="center">
                <Grid
                  container
                  spacing={2}
                  justify="space-around"
                  alignItems="flex-start"
                  className={classes.orderCreator}
                >
                  <Grid item xs={12} sm={4} md={4}>
                    <span className={classes.subheader}>{t("demands.description")}</span>
                  </Grid>
                  <Grid item xs={12} sm={8} md={8}>
                    {demand.description}
                  </Grid>
                </Grid>

                <Grid
                  container
                  spacing={2}
                  justify="space-around"
                  alignItems="flex-start"
                  className={classes.orderCreator}
                >
                  <Grid item xs={12} sm={4} md={4}>
                    <span className={classes.subheader}>{t("demands.demander.name")}</span>
                  </Grid>
                  <Grid container item xs={12} sm={8} md={8} justify="flex-start">
                    {demand.demander}
                    <br />
                    {demand.address}
                    <br />
                    {demand.postcode} {demand.city}
                    <br />
                    {demand.telephone}
                    <br />
                    {demand.email}
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <span className={classes.subheader}>{t("demands.createdAt")}</span>
                  </Grid>
                  <Grid container item xs={12} sm={8} md={8} justify="flex-start">
                    {parseDate(demand.creation_date)}
                  </Grid>
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
            <Divider />
            <ExpansionPanelActions>
              <Button size="small" square="true" className={classes.btnColorSecondary} onClick={handleUpdate}>
                {t("demands.edit")}
              </Button>
              <Button
                size="small"
                square="true"
                className={classes.btnColorPrimary}
                onClick={() => {
                  setOpenConfirm(true);
                }}
              >
                {t("demands.delete")}
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        </Grid>
        <Grid container item xs={12} sm={12} md={4} className={classes.rightRightGrid} justify="center">
          <Button
            size="large"
            square="true"
            disabled={props.connectedItems.length > 0 && !selected ? true : undefined}
            className={selected ? classes.removeAsset : classes.chooseAsset}
            onClick={() => {
              setSelected(!selected);
              handleDemand(demand);
              props.resetFormInfo();
            }}
          >
            {t(`connectItems.${selected ? "deselect" : "select"}`)}
          </Button>
        </Grid>
      </Grid>
      <ConfirmDialog
        open={openConfirm}
        handleClose={() => {
          setOpenConfirm(false);
        }}
        deleteMsg={t("demands.deleteConfirm", { demand: demand.productName })}
        handleDelete={val => {
          handleDelete(val);
        }}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    error: DEMAND_SELECTORS.getError(state),
    loading: DEMAND_SELECTORS.getLoading(state),
    demands: DEMAND_SELECTORS.getDemands(state),
    connectedItems: CONNECTED_ITEMS_SELECTORS.getSelectedDemands(state),
    product: PRODUCT_SELECTORS.getProduct(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteDemand: (demandId, t) => dispatch(actions.deleteDemandItem(demandId, t)),
    getDemand: demandId => dispatch(actions.getDemandItem(demandId)),
    updateDemand: (demandId, demandInfo, page, t) => dispatch(actions.updateDemandItem(demandId, demandInfo, page, t)),
    getProductName: id => dispatch(actions.getProductById(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DemandDetails);
