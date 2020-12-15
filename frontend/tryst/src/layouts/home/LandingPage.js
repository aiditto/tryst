/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "layouts/home/landingPageStyle.js";
import { Grid, Container, createMuiTheme } from "@material-ui/core";
// core components
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ButtonCard from "components/ButtonCards/ButtonCard";
import AboutUs from "components/AboutUs/AboutUs";
import { connect } from "react-redux";
import * as actions from "store/actions/rootAction";
import { SITES_SELECTORS, SITE_CHANNELS_SELECTORS } from "store/selectors/rootSelector";
import { useParams } from "react-router-dom";
import TextSection from "components/TextSection/TextSection";
import HeaderSection from "components/HeaderSection/HeaderSection";
import { isEmpty } from "lodash";
import { FALLBACK_PRIMARY_COLOR, FALLBACK_SECONDARY_COLOR } from "shared/utility";
import LoadingScreen from "components/LoadingScreen/LoadingScreen";


const useStyles = makeStyles(styles);

const LandingPage = props => {
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
    if (param.identifier) {
      props.getSite(param.identifier);
    }
  }, [param && param.identifier]);

  useEffect(() => {
    if (props.site && props.site.id) {
      props.getSiteChannels(props.site.id);
    }
  }, [props.site && props.site.id]);

  useEffect(() => {
    if (props.site && !isEmpty(props.site.settings)) {
      setPrimaryColor(props.site.settings.primaryColor);
      setSecondaryColor(props.site.settings.secondaryColor);
    } else {
      setPrimaryColor(FALLBACK_PRIMARY_COLOR);
      setSecondaryColor(FALLBACK_SECONDARY_COLOR);
    }
  }, [props.site && props.site.settings]);

  // Navigates page to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const classes = useStyles(); // styles

  return (
    <div className={classes.root}>
      {props.loading && <LoadingScreen /> }
      {props.site && props.site.headerSection && <HeaderSection data={props.site.headerSection} theme={theme} />}
      {props.site && props.site.textSection && (
        <Container className="containerStyle">
          <TextSection data={props.site.textSection} theme={theme} />
        </Container>
      )}

      <Container className="containerStyle">
        {props.site && props.site.buttonGroup && <TextSection data={props.site.buttonGroup} theme={theme} />}
        <Grid container>
          {props.siteChannels &&
            props.siteChannels.map(channel => {
              return <ButtonCard key={channel.id} data={channel} theme={theme} />;
            })}
        </Grid>
        {props.site && props.site.aboutusSection && <AboutUs data={props.site.aboutusSection} theme={theme} />}
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    error: SITES_SELECTORS.getError(state),
    loading: SITES_SELECTORS.getLoading(state),
    site: SITES_SELECTORS.getSite(state),
    siteChannelsLoading: SITE_CHANNELS_SELECTORS.getLoading(state),
    siteChannels: SITE_CHANNELS_SELECTORS.getChannels(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSite: siteIdentifier => dispatch(actions.getSiteByIdentifier(siteIdentifier)),
    getSiteChannels: siteId => dispatch(actions.getSiteChannels(siteId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
