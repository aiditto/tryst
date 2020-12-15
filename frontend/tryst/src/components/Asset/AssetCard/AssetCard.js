/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
// import clsx from "clsx";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid, Chip } from "@material-ui/core";
import { useDispatch } from "react-redux";
import * as actions from "../../../store/actions/rootAction";
import { connect } from "react-redux";
import { DEMAND_SELECTORS, CONNECTED_ITEMS_SELECTORS } from "../../../store/selectors/rootSelector";
import CircularProgress from "@material-ui/core/CircularProgress";
import { parseDate } from "shared/utility";
// Styles
import styles from "./assetCardStyle.js";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(styles);

const AssetCard = props => {
  const { t } = useTranslation();
  const assetItem = props.asset;
  const classes = useStyles();
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();

  const handleAsset = asset => {
    if (!selected) {
      dispatch(actions.addAssetItem(asset));
    } else {
      dispatch(actions.removeAssetItem(asset));
    }
  };

  useEffect(() => {
    if (props.connectedAssets.length > 0) {
      props.connectedAssets.map(asset => {
        if (asset.id === assetItem.id) {
          setSelected(true);
        }
      });
    } else {
      setSelected(false);
    }
  }, [props.connectedAssets]);

  const RenderChipDonation = props => {
    return props.isDonation ? (
      <Chip
        className={classes.chipStyle}
        style={{ backgroundColor: "#71a0ff", color: "white" }}
        size="small"
        label={t("assets.tags.donating")}
      />
    ) : (
      <Chip
        className={classes.chipStyle}
        style={{ backgroundColor: "#fda725", color: "white" }}
        size="small"
        label={t("assets.tags.selling")}
      />
    );
  };

  const RenderChipAvailable = props => {
    return props.isAvailable ? (
      <Chip
        className={classes.chipStyle}
        style={{ backgroundColor: "#6ecf96", color: "white" }}
        size="small"
        label={t("assets.tags.available")}
      />
    ) : (
      <Chip
        className={classes.chipStyle}
        style={{ backgroundColor: "#fc6f67", color: "white" }}
        size="small"
        label={t("assets.tags.notavailable")}
      />
    );
  };

  return assetItem ? (
    <div className={classes.root}>
      <Grid container item md={12} xs={12} sm={12}>
        <Grid item xs={12} sm={12} md={8}>
          <ExpansionPanel className={classes.assetsStyle}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1c-content"
              id="panel1c-header"
              className={classes.edgeEnd}
            >
              <Grid container item md={12} sm={12} xs={12}>
                <Grid item md={8} xs={8} sm={8}>
                  <p>{t("products.name")}</p>
                  <p className={classes.titleStyle}>{assetItem.productName}</p>
                  <small>{assetItem.modelName}</small>
                </Grid>
                <Grid container item md={4} sm={4} xs={4} alignItems="flex-end" direction="column">
                  <p>{t("assets.quantity")}</p>
                  <p className={classes.titleStyle}>{assetItem.quantity}</p>
                </Grid>
                <Divider className={classes.dividerStyle} />
                <Grid container item md={12} xs={12} sm={12} className={classes.chipWrapper}>
                  <RenderChipDonation isDonation={assetItem.donation} />
                  <RenderChipAvailable isAvailable={assetItem.available_now} />
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <Divider className={classes.dividerStyle} />
            <ExpansionPanelDetails className={classes.details}>
              <Grid container direction="column" justify="space-around" alignItems="center">
                <Grid container justify="space-around">
                  <Grid item xs={12} sm={6} md={4}>
                    <span className={classes.subheader}>{t("assets.form.isCompany.label")}</span>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <span>{t(`assets.form.isCompany.${assetItem.company}`)}</span>
                  </Grid>
                </Grid>

                <Grid container justify="space-around" alignItems="flex-start" className={classes.orderCreator}>
                  <Grid item xs={12} sm={6} md={4}>
                    <span className={classes.subheader}>{t("assets.form.contact")}</span>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    {assetItem.donatorname}
                    <br />
                    {assetItem.adress}
                    <br />
                    {assetItem.postcode} {assetItem.city}
                    <br />
                    {assetItem.telephone}
                  </Grid>
                </Grid>

                <Grid container justify="space-around" alignItems="flex-start" className={classes.orderCreator}>
                  <Grid item xs={12} sm={6} md={4}>
                    <span className={classes.subheader}>{t("assets.form.isDonation.label")}</span>
                  </Grid>
                  <Grid container item xs={12} sm={6} md={6} alignItems="flex-end">
                    <span>{t(`assets.form.isDonation.${assetItem.donation}`)}</span>
                  </Grid>
                </Grid>
                {!assetItem.donation && (
                  <Grid container justify="space-around" alignItems="flex-start" className={classes.orderCreator}>
                    <Grid item xs={12} sm={6} md={4}>
                      <span className={classes.subheader}>{t("assets.form.price")}</span>
                    </Grid>
                    <Grid container item xs={12} sm={6} md={6} alignItems="flex-end">
                      {assetItem.price} {assetItem.currency}
                    </Grid>
                  </Grid>
                )}
                <Grid container justify="space-around" alignItems="flex-start" className={classes.orderCreator}>
                  <Grid item xs={12} sm={6} md={4}>
                    <span className={classes.subheader}>{t("assets.form.isAvailable.label")}</span>
                  </Grid>
                  <Grid container item xs={12} sm={6} md={6} alignItems="flex-end">
                    <span>{t(`assets.form.isDonation.${assetItem.available_now}`)}</span>
                  </Grid>
                </Grid>
                {!assetItem.available_now && (
                  <Grid container justify="space-around" alignItems="flex-start" className={classes.orderCreator}>
                    <Grid item xs={12} sm={6} md={4}>
                      <span className={classes.subheader}>{t("assets.form.availableDate")}</span>
                    </Grid>
                    <Grid container item xs={12} sm={6} md={6} alignItems="flex-end">
                      {parseDate(assetItem.available_when)}
                    </Grid>
                  </Grid>
                )}

                <Grid container justify="space-around" alignItems="flex-start" className={classes.orderCreator}>
                  <Grid item xs={12} sm={6} md={4}>
                    <span className={classes.subheader}>{t("assets.form.message")}</span>
                  </Grid>
                  <Grid container item xs={12} sm={6} md={6} alignItems="flex-end">
                    {assetItem.message}
                  </Grid>
                </Grid>

                <Grid container justify="space-around" alignItems="flex-start" className={classes.orderCreator}>
                  <Grid item xs={12} sm={6} md={4}>
                    <span className={classes.subheader}>{t("assets.form.isRecurring.label")}</span>
                  </Grid>
                  <Grid container item xs={12} sm={6} md={6} alignItems="flex-end">
                    <span>{t(`assets.form.isDonation.${assetItem.recurring}`)}</span>
                  </Grid>
                </Grid>

                <Grid container justify="space-around" alignItems="flex-start" className={classes.orderCreator}>
                  <Grid item xs={12} sm={6} md={4}>
                    <span className={classes.subheader}>{t("assets.createdAt")}</span>
                  </Grid>
                  <Grid container item xs={12} sm={6} md={6} alignItems="flex-end">
                    {parseDate(assetItem.creation_date)}
                  </Grid>
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
        <Grid container item xs={12} sm={12} md={4} className={classes.rightRightGrid} justify="center">
          {props.connectedItems.connectedDemands.length > 0 && (
            <Button
              size="large"
              square="true"
              className={selected ? classes.removeAsset : classes.chooseAsset}
              onClick={() => {
                setSelected(!selected);
                handleAsset(assetItem);
              }}
            >
              {t(`connectItems.${selected ? "deselect" : "select"}`)}
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  ) : (
    <>
      <CircularProgress />
    </>
  );
};

const mapStateToProps = state => {
  return {
    demand: DEMAND_SELECTORS.getDemand(state),
    connectedAssets: CONNECTED_ITEMS_SELECTORS.getSelectedAssets(state),
    connectedItems: CONNECTED_ITEMS_SELECTORS.getConnectedItems(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDemand: demandId => dispatch(actions.getDemandItem(demandId)),
    updateAsset: (assetId, assetInfo, t) => dispatch(actions.updateAssetItem(assetId, assetInfo, t))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssetCard);
