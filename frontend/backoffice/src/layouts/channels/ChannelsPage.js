/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Button, AccordionSummary, Accordion, AccordionDetails } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./channelsPageStyle";
import { useTranslation } from "react-i18next";
import ChannelsForm from "../../components/Channel/ChannelsForm/ChannelsForm";
import LoadingScreen from "components/LoadingScreen/LoadingScreen";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ChannelDetails from "components/Channel/ChannelDetails/ChannelDetails";
import * as actions from "store/actions/rootAction";
import { CHANNELS_SELECTORS, SITE_CHANNELS_SELECTORS } from "store/selectors/rootSelector";
import SideBar from "components/Navbars/SideBar";

const useStyles = makeStyles(styles);

const ChannelPage = props => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [expandable, setExpandable] = useState(false);
  const [mode, setMode] = useState(false);
  const [formData, setFormData] = useState(null);
  const [channelList, setChannelList] = useState([]);
  const stateProps = props.location.state;
  const [siteId, setSiteId] = useState(null);
  const [siteIdentifier, setSiteIdentifier] = useState(null);
  const [siteName, setSiteName] = useState(null);

  useLayoutEffect(() => {
    if (stateProps) {
      setSiteId(stateProps.siteId);
      setSiteName(stateProps.name);
      setSiteIdentifier(stateProps.siteIdentifier);
      props.getSiteChannels(stateProps.siteId);
    }
  }, [stateProps && stateProps.siteId]);

  useEffect(() => {
    if (props.siteChannels) {
      setChannelList(props.siteChannels);
    }
  }, [props.siteChannels]);

  const handleEdit = (val, mode, data) => {
    setExpandable(val);
    setMode(mode);
    setFormData(data);
  };

  return (
    <>
      {channelList && <SideBar children={channelList} section={"sites"} name={siteName} identifier={siteIdentifier} />}

      {(props.loading || props.siteChannelsLoading) && <LoadingScreen />}
      <div className={!props.loading ? classes.root : classes.blur}>
        <Grid container item xs={6} sm={6} md={10} className={classes.backWrapper}>
          <Link to={{ pathname: `/sites-page` }}>
            <Button size="large" square="true" className={classes.backButton}>
              {t("back.sites")}
            </Button>
          </Link>
        </Grid>
        <Grid container alignItems="center" justify="center" direction="column">
          <Grid item xs={12} sm={12} md={8}>
            <h2 className={classes.sectionTitle}>{t("channels.channelsTitle")}</h2>
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
                  {mode ? t(`channels.form.title.update`) : t(`channels.form.title.create`)}
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              {siteId && (
                <ChannelsForm
                  setExpandable={val => setExpandable(val)}
                  data={formData}
                  mode={mode}
                  siteId={siteId}
                  setMode={() => setMode(false)}
                />
              )}
            </AccordionDetails>
          </Accordion>

          <Grid container direction="column" className={classes.listWrapper}>
            <Grid container justify="center">
              {channelList.map((channel, index) => {
                return (
                  <ChannelDetails
                    data={channel}
                    key={index}
                    siteId={siteId}
                    siteIdentifier={siteIdentifier}
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
    error: CHANNELS_SELECTORS.getError(state),
    loading: CHANNELS_SELECTORS.getLoading(state),
    siteChannelsLoading: SITE_CHANNELS_SELECTORS.getLoading(state),
    siteChannels: SITE_CHANNELS_SELECTORS.getChannels(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSiteChannels: siteId => dispatch(actions.getSiteChannels(siteId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelPage);
