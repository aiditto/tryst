/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/aiditto-pro-style/layouts/coordinatorPageStyle.js";
import { Grid, Chip, CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ConnectedItems from "../../components/ConnectedItems/ConnectedItems";

// React and Redux
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import * as actions from "../../store/actions/rootAction";
import { DEMAND_SELECTORS, ASSET_SELECTORS, CONNECTED_ITEMS_SELECTORS } from "../../store/selectors/rootSelector";

import CreateNewDemand from "components/Demand/CreateNewDemand/CreateNewDemand.js";
import DemandDetails from "components/Demand/DemandDetails/DemandDetails";
import PaginationContainer from "shared/PaginationContainer";
import AssetCard from "components/Asset/AssetCard/AssetCard";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import LoadingScreen from "components/LoadingScreen/LoadingScreen";

const useStyles = makeStyles(styles);

const CoordinatorPage = props => {
  const { ...rest } = props;
  const { t } = useTranslation();
  const [assetList, setAssetList] = useState(null);
  const [formInfo, setFormInfo] = useState({ mode: false, data: null });
  const [showingFilterText, setShowingFilterText] = useState("Alla tillgångar*");
  const [resetLocalItem, setResetLocalItem] = useState(false);

  // styles
  const classes = useStyles();

  useEffect(() => {
    props.getTotalCount();
    props.getAssets();
    props.getPageList(props.demandPagination.page, props.demandPagination.items);
  }, [props.connectedDemands]);

  useEffect(() => {
    if (props.connectedDemands.length === 0) {
      setAssetList(props.filteredAssets);
    } else {
      props.filterAssetsByDemand(props.assetsByDemand);
      setAssetList(
        props.filteredData && props.connectedDemands.length !== 0 ? props.filteredData : props.assetsByDemand
      );
    }
  }, [props.connectedDemands, props.filteredAssets]);

  const handleChangePage = page => {
    props.getPageList(page, props.demandPagination.items);
    props.updatePageNumber(page);
  };

  const handleResetInfo = () => {
    setFormInfo({ mode: false, data: null });
    setResetLocalItem(true);
  };

  const handleChipFilter = e => {
    const filterValue = e.currentTarget.getAttribute("value");
    props.updateAssetFilter(Number(filterValue));
    if (props.connectedDemands.length > 0) {
      props.filterAssetsByDemand(props.assetsByDemand);
    }
  };

  return (
    <>
      {props.loading && <LoadingScreen />}
      <div className={!props.loading ? classes.root : classes.blur}>
        <Grid container spacing={0} alignItems="flex-start" justify="flex-end">
          <Grid item xs={12} sm={12} md={6} className={classes.outerColumn}>
            <Grid container justify="flex-end">
              <Grid item xs={12} sm={12} md={10}>
                <Grid item xs={12} sm={12} md={12}>
                  <Grid container justify="center">
                    <Grid item xs={12} sm={12} md={8}>
                      <h2 className={classes.sectionTitle}>{t("connectItems.demandsTitle")}</h2>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}></Grid>
                  </Grid>
                  <Grid container justify="center">
                    <Grid item xs={12} sm={12} md={8}></Grid>
                    <Grid item xs={12} sm={12} md={4}></Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <CreateNewDemand
                        mode={formInfo.mode}
                        data={formInfo.data}
                        resetFormInfo={handleResetInfo}
                        resetLocalItem={resetLocalItem}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}></Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <PaginationContainer
                        totalPages={Math.ceil(props.demandPagination.count / props.demandPagination.items) || 1}
                        page={props.demandPagination.page}
                        changePage={handleChangePage}
                      />

                      {props.count !== 0 &&
                        props.demands.map(demand => {
                          return (
                            <DemandDetails
                              data={demand}
                              key={demand.id}
                              updateInfo={(mode, data) => setFormInfo({ mode, data })}
                              resetFormInfo={handleResetInfo}
                              setResetLocalItem={setResetLocalItem}
                            />
                          );
                        })}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.outerColumn}>
            <Grid container justify="center">
              <Grid item xs={12} sm={10}>
                <Grid item xs={12} sm={12} md={12}>
                  <Grid container justify="center">
                    <Grid item xs={12} sm={12} md={8}>
                      <h2 className={classes.sectionTitle}>{t("connectItems.assetsTitle")}</h2>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}></Grid>
                  </Grid>

                  <Grid container justify="center" alignItems="flex-start" spacing={2}>
                    <Grid item xs={12} sm={12} md={8}>
                      <Grid container item md={12} xs={12} sm={12} justify="center" className={classes.chipFilter}>
                        <div className="oke">
                          <Chip
                            icon={
                              props.selectedFilter === 1 ? (
                                <CheckCircleOutlineOutlinedIcon className={classes.filterIcon} />
                              ) : (
                                <RadioButtonUncheckedOutlinedIcon className={classes.filterIcon} />
                              )
                            }
                            label={t("assets.tags.donating")}
                            className={classes.chipStyle}
                            style={{ backgroundColor: "#71a0ff", color: "white" }}
                            size="small"
                            value={1}
                            onClick={e => {
                              handleChipFilter(e);
                            }}
                            clickable
                          />
                        </div>
                        <Chip
                          icon={
                            props.selectedFilter === 2 ? (
                              <CheckCircleOutlineOutlinedIcon className={classes.filterIcon} />
                            ) : (
                              <RadioButtonUncheckedOutlinedIcon className={classes.filterIcon} />
                            )
                          }
                          label={t("assets.tags.available")}
                          className={classes.chipStyle}
                          style={{ backgroundColor: "#6ecf96", color: "white" }}
                          size="small"
                          value={2}
                          onClick={e => {
                            handleChipFilter(e);
                          }}
                          clickable
                        />
                        <Chip
                          icon={
                            props.selectedFilter === 3 ? (
                              <CheckCircleOutlineOutlinedIcon className={classes.filterIcon} />
                            ) : (
                              <RadioButtonUncheckedOutlinedIcon className={classes.filterIcon} />
                            )
                          }
                          label={t("assets.tags.selling")}
                          className={classes.chipStyle}
                          style={{ backgroundColor: "#fda725", color: "white" }}
                          value={3}
                          size="small"
                          onClick={e => {
                            handleChipFilter(e);
                          }}
                          clickable
                        />
                        <Chip
                          icon={
                            props.selectedFilter === 4 ? (
                              <CheckCircleOutlineOutlinedIcon className={classes.filterIcon} />
                            ) : (
                              <RadioButtonUncheckedOutlinedIcon className={classes.filterIcon} />
                            )
                          }
                          label={t("assets.tags.notavailable")}
                          className={classes.chipStyle}
                          style={{ backgroundColor: "#fc6f67", color: "white" }}
                          size="small"
                          value={4}
                          onClick={e => {
                            handleChipFilter(e);
                          }}
                          clickable
                        />
                      </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={12} md={4} justify="center">
                      <Button
                        size="medium"
                        square="true"
                        className={classes.visaAllaBtn}
                        value={5}
                        onClick={e => {
                          handleChipFilter(e);
                        }}
                        startIcon={
                          props.selectedFilter === 5 ? (
                            <CheckCircleOutlineOutlinedIcon />
                          ) : (
                            <RadioButtonUncheckedOutlinedIcon />
                          )
                        }
                      >
                        {t("connectItems.resetFilter")}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={12} className={classes.assetsWrapper}>
                  <Grid container justify="center">
                    <Grid item xs={12} sm={12} md={8}></Grid>
                    <Grid item xs={12} sm={12} md={4}></Grid>
                  </Grid>
                  {!assetList && <CircularProgress />}
                  {assetList &&
                    assetList.map(asset => {
                      return <AssetCard asset={asset} key={asset.id} />;
                    })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <ConnectedItems />
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    error: DEMAND_SELECTORS.getError(state),
    loading: DEMAND_SELECTORS.getLoading(state),
    demands: DEMAND_SELECTORS.getDemands(state),
    count: DEMAND_SELECTORS.getCount(state),
    demandPagination: DEMAND_SELECTORS.getDemandsPagination(state),
    filteredAssets: ASSET_SELECTORS.getFilteredAssets(state),
    selectedFilter: ASSET_SELECTORS.getSelectedFilter(state),
    assets: ASSET_SELECTORS.getAssets(state),
    connectedDemands: CONNECTED_ITEMS_SELECTORS.getSelectedDemands(state),
    assetsByDemand: CONNECTED_ITEMS_SELECTORS.getAssetsByDemand(state),
    filteredData: CONNECTED_ITEMS_SELECTORS.getFilteredData(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDemands: () => dispatch(actions.getDemands()),
    getAssets: () => dispatch(actions.getAssets()),
    getTotalCount: () => dispatch(actions.getCount()),
    getPageList: (page, items) => dispatch(actions.getDemandsPage(page, items)),
    updatePageNumber: page => dispatch(actions.updateCurrentPage(page)),
    resetProduct: () => dispatch(actions.resetProduct()),
    updateAssetFilter: filter => dispatch(actions.updateAssetFilter(filter)),
    filterAssetsByDemand: data => dispatch(actions.fiterAssetsByDemand(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoordinatorPage);
