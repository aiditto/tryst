/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, Divider, Button } from "@material-ui/core";
import classNames from "classnames";
import styles from "./createContactModalStyle";
import { makeStyles } from "@material-ui/core/styles";
// Editable content
import ContentEditable from "react-contenteditable";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { connect } from "react-redux";
import { CONNECTED_ITEMS_SELECTORS } from "../../store/selectors/rootSelector";
import CreateContactCard from "../CreateContactCard/CreateContactCard";
import * as actions from "../../store/actions/rootAction";

const CreateContactModal = props => {
  const { t } = useTranslation();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [maxWidth] = useState("md");
  const [saveData, setSaveData] = useState(false);
  const [count, setCount] = useState(-1);
  const [demandArr, setDemandArr] = useState([]);

  let demands = [];
  let demandCount = 0;
  useEffect(() => {
    if (saveData) {
      setSaveData(false);
    }
  }, [saveData]);

  useEffect(() => {
    if ((count === 0 || count > 0) && count === props.connectedDemands.length - 1) {
      handleData();
    }
  }, [count, props.connectedDemands]);

  const addData = data => {
    demands = [data, ...demands];
    setCount(demandCount++);
    setDemandArr(demands);
  };

  const getUpdatedAssets = () => {
    const updatedAssets = props.connectedAssets.map(asset => {
      asset.status = "not_available";
      asset.demand_id = props.connectedDemands[0].id;
      return asset;
    });
    return updatedAssets;
  };

  const handleData = () => {
    getUpdatedAssets();
    props.updateDemandBatch(demandArr, t);
    props.updateAssetBatch(getUpdatedAssets(), t);
    demands.splice(0, demands.length);
    setCount(-1);
    setDemandArr([]);
    demandCount = 0;
  };

  return (
    <div>
      <Grid item xs={12} sm={12} md={4}>
        <Dialog
          fullScreen={fullScreen}
          fullWidth={true}
          maxWidth={maxWidth}
          disableBackdropClick
          disableEscapeKeyDown
          open={props.open}
          onClose={() => {
            props.setOpenSendModal(false);
          }}
          aria-labelledby="responsive-dialog-title"
          className={classes.createContactDialog}
        >
          <div className={classes.dialogRoot}>
            <DialogTitle id="responsive-dialog-title">
              <span className={classes.createContactHeader}>{t("connectItems.confirm.title")}</span>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <span className={classes.headerTitle}>{t("connectItems.confirm.demander.title")}</span>
                <Divider className={classes.dividerStyle} />
                {props.connectedDemands &&
                  props.connectedDemands.map(connectedDemand => {
                    return (
                      <CreateContactCard
                        key={connectedDemand.id}
                        connectedDemand={connectedDemand}
                        saveData={saveData}
                        addData={data => {
                          addData(data);
                        }}
                      />
                    );
                  })}

                <span className={classes.headerTitle}>{t("connectItems.confirm.receivers.title")}</span>
                <Divider className={classes.dividerStyle} />

                <Grid container spacing={0} alignItems="flex-start" justify="flex-start">
                  {props.connectedAssets &&
                    props.connectedAssets.map(connectedAsset => {
                      return (
                        <Grid item xs={12} sm={12} md={6} key={connectedAsset.id} className={classes.assetsPadding}>
                          <Grid container spacing={0} alignItems="flex-start" justify="flex-start">
                            <Grid item xs={12} sm={4} md={4}>
                              <span className={classes.subheader}>{t("connectItems.confirm.productName")}</span>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                              <ContentEditable html={connectedAsset.productName} disabled={true} tagName="article" />
                            </Grid>
                          </Grid>
                          <Grid container spacing={0} alignItems="flex-start" justify="flex-start">
                            <Grid item xs={12} sm={4} md={4}>
                              <span className={classes.subheader}>{t("connectItems.confirm.quantity")}</span>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                              <span>
                                <ContentEditable
                                  html={connectedAsset.quantity.toString()}
                                  disabled={true}
                                  tagName="article"
                                />
                              </span>
                            </Grid>
                          </Grid>
                          <Grid container spacing={0} alignItems="flex-start" justify="flex-start">
                            <Grid item xs={12} sm={4} md={4}>
                              <span className={classes.subheader}>{t("connectItems.confirm.receivers.contact")}</span>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                              <span>
                                <ContentEditable html={connectedAsset.user} disabled={true} tagName="article" />
                              </span>
                            </Grid>
                          </Grid>
                        </Grid>
                      );
                    })}
                </Grid>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                size="large"
                square="true"
                className={classNames(classes.btnColorSecondary, classes.createContact)}
                autoFocus
                onClick={() => props.setOpenSendModal(false)}
                color="primary"
              >
                {t("connectItems.confirm.cancel")}
              </Button>
              <Button
                size="large"
                square="true"
                className={classNames(classes.btnColorPrimary, classes.createContact)}
                autoFocus
                onClick={() => {
                  props.setOpenSendModal(false);
                  setSaveData(true);
                  props.setOpenThankYouModal(true);
                }}
                color="primary"
              >
                {t("connectItems.confirm.submit")}
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    connectedDemands: CONNECTED_ITEMS_SELECTORS.getSelectedDemands(state),
    connectedAssets: CONNECTED_ITEMS_SELECTORS.getSelectedAssets(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateDemandBatch: (demandBatch, t) => dispatch(actions.updateDemandBatchAction(demandBatch, t)),
    updateAssetBatch: (assetBatch, t) => dispatch(actions.updateAssetBatchAction(assetBatch, t))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateContactModal);
