/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, AccordionSummary, Accordion, AccordionDetails, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./demandsPageStyle";
import { useTranslation } from "react-i18next";
import DemandForm from "components/Demand/DemandForm/DemandForm";
import LoadingScreen from "components/LoadingScreen/LoadingScreen";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import DemandDetails from "components/Demand/DemandDetails/DemandDetails";
import * as actions from "store/actions/rootAction";
import { DEMANDS_SELECTORS, CHANNEL_DEMANDS_SELECTORS } from "store/selectors/rootSelector";
import { Link } from "react-router-dom";
import { getSiteUrl } from "shared/utility";

const useStyles = makeStyles(styles);

const DemandsPage = props => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [expandable, setExpandable] = useState(false);
  const [mode, setMode] = useState(false);
  const [formData, setFormData] = useState(null);
  const [demandList, setDemandList] = useState([]);
  const stateProps = props.location.state;
  const [channelId, setChannelId] = useState(null);
  const [siteId, setSiteId] = useState(null);
  const [siteIdentifier, setSiteIdentifier] = useState(null);

  useEffect(() => {
    if (stateProps) {
      setChannelId(stateProps.channelId);
      setSiteId(stateProps.siteId);
      setSiteIdentifier(stateProps.siteIdentifier);
      props.getChannelDemands(stateProps.channelId);
    }
  }, [stateProps && stateProps.channelId]);

  useEffect(() => {
    if (props.channelDemands) {
      setDemandList(props.channelDemands);
    }
  }, [props.channelDemands]);

  const visitSite = siteIdentifier => {
    const link = getSiteUrl(siteIdentifier);
    window.open(link, "_blank");
  };

  const handleEdit = (val, mode, data) => {
    setExpandable(val);
    setMode(mode);
    setFormData(data);
  };

  return (
    <>
      {(props.loading || props.channelDemandsLoading) && <LoadingScreen />}
      <div className={!props.loading ? classes.root : classes.blur}>
        <Grid container item xs={6} sm={6} md={10} className={classes.backWrapper}>
          {siteId && siteIdentifier && (
            <>
              <Link to={{ pathname: `/channels-page`, state: { siteId: siteId, siteIdentifier: siteIdentifier } }}>
                <Button size="large" square="true" className={classes.backButton}>
                  {t("back.channels")}
                </Button>
              </Link>
              <Button
                size="large"
                square="true"
                className={classes.backButton}
                onClick={() => {
                  visitSite(siteIdentifier);
                }}
              >
                {t("sites.visit")}
              </Button>
            </>
          )}
        </Grid>
        <Grid container alignItems="center" justify="center" direction="column">
          <Grid item xs={12} sm={12} md={8}>
            <h2 className={classes.sectionTitle}>{t("demands.demandsTitle")}</h2>
          </Grid>
          <Accordion expanded={expandable} className={classes.expandBorder}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              onClick={() => {
                setExpandable(!expandable);
              }}
              aria-controls="panel1c-content"
              id="panel1c-header"
            >
              <div className={classes.column}>
                <Typography className={classes.heading}>
                  {mode ? t(`demands.form.title.update`) : t(`demands.form.title.create`)}
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              {channelId && (
                <DemandForm
                  setExpandable={val => setExpandable(val)}
                  data={formData}
                  mode={mode}
                  channelId={channelId}
                  setMode={() => setMode(false)}
                />
              )}
            </AccordionDetails>
          </Accordion>

          <Grid container direction="column" className={classes.listWrapper}>
            <Grid container justify="center">
              {demandList.map((demand, index) => {
                return (
                  <DemandDetails
                    data={demand}
                    channelId={channelId}
                    key={index}
                    setExpandable={(val, mode, data) => handleEdit(val, mode, data)}
                  />
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    error: DEMANDS_SELECTORS.getError(state),
    loading: DEMANDS_SELECTORS.getLoading(state),
    channelDemandsLoading: CHANNEL_DEMANDS_SELECTORS.getLoading(state),
    channelDemands: CHANNEL_DEMANDS_SELECTORS.getDemands(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getChannelDemands: channelId => dispatch(actions.getChannelDemands(channelId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DemandsPage);
