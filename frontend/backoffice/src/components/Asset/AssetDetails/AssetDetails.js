/* eslint-disable react/prop-types */
import React, { useState } from "react";
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
import styles from "./assetDetailsStyle.js";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import * as actions from "../../../store/actions/rootAction";
import { connect } from "react-redux";
import { ASSET_SELECTORS } from "../../../store/selectors/rootSelector";
import ConfirmDialog from "components/ConfirmDialog/ConfirmDialog";

const useStyles = makeStyles(styles);

const AssetDetails = props => {
  const { t } = useTranslation();
  const classes = useStyles();
  const asset = props.data;
  const [expandable, setExpandable] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const toggleExpansionPanel = () => {
    setExpandable(!expandable);
  };

  const handleDelete = val => {
    if (val) props.deleteAsset(asset.id, t);
  };

  const handleUpdate = () => {
    //Open the form for edit mode with asset data
    props.getAsset(asset.id);
    setExpandable(!expandable);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0} alignItems="flex-start" justify="flex-start">
        <Grid item xs={12} sm={12} md={10} xl={8} className={classes.rightLeftGrid}>
          <ExpansionPanel expanded={expandable} className={classes.assetDetailesStyle}>
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
                  <p className={classes.titleStyle}>{asset.productName}</p>
                </Grid>
                <Grid container item md={4} sm={4} xs={4} alignItems="flex-end" direction="column">
                  <p> {t("assets.quantity")}</p>
                  <p className={classes.titleStyle}>{asset.quantity}</p>
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
                    <span className={classes.subheader}>{t("assets.producer")}</span>
                  </Grid>
                  <Grid container item xs={12} sm={8} md={8} justify="flex-start">
                    {asset.user}
                  </Grid>
                  {!asset.donation && (
                    <>
                      <Grid item xs={12} sm={4} md={4}>
                        <span className={classes.subheader}>{t("assets.cost")}</span>
                      </Grid>
                      <Grid item xs={12} sm={8} md={8}>
                        {asset.price}
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12} sm={4} md={4}>
                    <span className={classes.subheader}>{t("assets.description")}</span>
                  </Grid>
                  <Grid item xs={12} sm={8} md={8}>
                    {asset.message}
                  </Grid>
                  {!asset.available_now && (
                    <>
                      <Grid item xs={12} sm={4} md={4}>
                        <span className={classes.subheader}>{t("assets.availableDate")}</span>
                      </Grid>
                      <Grid container item xs={12} sm={8} md={8} justify="flex-start">
                        {parseDate(asset.available_when)}
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
            <Divider />
            <ExpansionPanelActions>
              <Button size="small" square="true" className={classes.btnColorSecondary} onClick={handleUpdate}>
                {t("assets.edit")}
              </Button>
              <Button
                size="small"
                square="true"
                className={classes.btnColorPrimary}
                onClick={() => {
                  setOpenConfirm(true);
                }}
              >
                {t("assets.delete")}
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        </Grid>
      </Grid>
      <ConfirmDialog
        open={openConfirm}
        handleClose={() => {
          setOpenConfirm(false);
        }}
        deleteMsg={t("assets.deleteConfirm", { asset: asset.productName })}
        handleDelete={val => {
          handleDelete(val);
        }}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    error: ASSET_SELECTORS.getError(state),
    loading: ASSET_SELECTORS.getLoading(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteAsset: (assetId, t) => dispatch(actions.deleteAssetItem(assetId, t)),
    getAsset: assetId => dispatch(actions.getAssetItem(assetId)),
    updateAsset: (assetId, assetInfo, t) => dispatch(actions.updateAssetItem(assetId, assetInfo, t))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssetDetails);
