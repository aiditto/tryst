/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "./channelPageStyle.js";
import { Container, Grid, createMuiTheme } from "@material-ui/core";
// core components
import ButtonCard from "components/ButtonCards/ButtonCard";
import TextSection from "components/TextSection/TextSection";
import HeaderSection from "components/HeaderSection/HeaderSection";
import { connect } from "react-redux";
import * as actions from "store/actions/rootAction";
import { SITES_SELECTORS, CHANNELS_SELECTORS, CHANNEL_DEMANDS_SELECTORS } from "store/selectors/rootSelector";
import { useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { FALLBACK_PRIMARY_COLOR, FALLBACK_SECONDARY_COLOR, getSiteIdentifier } from "shared/utility";

const useStyles = makeStyles(styles);

const ChannelPage = props => {
  const param = useParams();

  const [primaryColor, setPrimaryColor] = useState(FALLBACK_PRIMARY_COLOR);
  const [secondaryColor, setSecondaryColor] = useState(FALLBACK_SECONDARY_COLOR);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: `${primaryColor}`
      },
      secondary: {
        main: `${secondaryColor}`
      },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2
    }
  });

  useEffect(() => {
    const url = window.location.href;
    if (url) {
      props.getSite(getSiteIdentifier(url));
    }
  }, []);

  useEffect(() => {
    if (props.site && !isEmpty(props.site.settings)) {
      setPrimaryColor(props.site.settings.primaryColor);
      setSecondaryColor(props.site.settings.secondaryColor);
    } else {
      setPrimaryColor(FALLBACK_PRIMARY_COLOR);
      setSecondaryColor(FALLBACK_SECONDARY_COLOR);
    }
  }, [props.site && props.site.settings]);

  useEffect(() => {
    if (param.identifier) {
      props.getChannel(param.identifier);
    }
  }, [param && param.identifier]);

  // Navigates page to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (props.channel && props.channel.id) {
      props.getChannelDemands(props.channel.id);
    }
  }, [props.channel && props.channel.id]);

  const classes = useStyles(); // styles

  return (
    <div className={classes.root}>
      {props.channel && props.channel.headerSection && (
        <HeaderSection data={props.channel.headerSection} theme={theme} />
      )}
      {props.channel && props.channel.textSection && (
        <Container className="containerStyle">
          <TextSection data={props.channel.textSection} theme={theme} />
        </Container>
      )}

      <Container className="containerStyle">
        {props.channel && props.channel.buttonGroup && <TextSection data={props.channel.buttonGroup} theme={theme} />}
        <Grid container>
          {props.channelDemands &&
            props.channelDemands.map(demand => {
              return <ButtonCard key={demand.id} data={demand} theme={theme} />;
            })}
        </Grid>
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    error: CHANNELS_SELECTORS.getError(state),
    loading: CHANNELS_SELECTORS.getLoading(state),
    site: SITES_SELECTORS.getSite(state),
    channel: CHANNELS_SELECTORS.getChannel(state),
    channelDemandsLoading: CHANNEL_DEMANDS_SELECTORS.getLoading(state),
    channelDemands: CHANNEL_DEMANDS_SELECTORS.getDemands(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSite: siteIdentifier => dispatch(actions.getSiteByIdentifier(siteIdentifier)),
    getChannel: channelIdentifier => dispatch(actions.getChannelByIdentifier(channelIdentifier)),
    getChannelDemands: channelId => dispatch(actions.getChannelDemands(channelId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelPage);
