/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "layouts/demand/demandPageStyle.js";
import { Container, Grid, createMuiTheme } from "@material-ui/core";
// core components
import React, { useEffect, useState } from "react";
// import ButtonCard from "../../components/ButtonCards/ButtonCard";
import TextSection from "components/TextSection/TextSection";
import HeaderSection from "components/HeaderSection/HeaderSection";
import { connect } from "react-redux";
import * as actions from "store/actions/rootAction";
import { SITES_SELECTORS, DEMANDS_SELECTORS } from "store/selectors/rootSelector";
import { useParams } from "react-router-dom";

import ThankYouDialog from "components/ThankYouDialog/ThankYouDialog";
import { FALLBACK_PRIMARY_COLOR, FALLBACK_SECONDARY_COLOR, getSiteIdentifier } from "shared/utility";
import { isEmpty } from "lodash";
import ResponseForm from "components/ResponseForm/ResponseForm";

import LoadingScreen from "components/LoadingScreen/LoadingScreen";

const useStyles = makeStyles(styles);

const DemandPage = props => {
  // styles
  const classes = useStyles();

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
    if (param.identifier) {
      props.getDemand(param.identifier);
    }
  }, [param && param.identifier]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Navigates page to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
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
  const submitForm = val => {
    setFormSubmitted(val);
  };

  return (
    <div className={classes.root}>
      {props.loading && <LoadingScreen />}
      {props.demand && props.demand.headerSection && <HeaderSection data={props.demand.headerSection} theme={theme} />}
      {props.demand && props.demand.textSection && (
        <Container className="containerStyle">
          <TextSection data={props.demand.textSection} theme={theme} />
        </Container>
      )}
      <Container className="containerStyle">
        <Grid container item xs={12} sm={12} md={12} lg={12} className={classes.responseFormSection}>
          <ResponseForm
            listSection={props.demand && props.demand.listSection}
            formSection={props.demand && props.demand.formSection}
            fields={props.demand && props.demand.formSection && props.demand.formSection.fields}
            demandId={props.demand && props.demand.id}
            theme={theme}
            handleSubmit={val => submitForm({ val })}
          />
        </Grid>
        {formSubmitted && props.demand && props.demand.thankyouSection && (
          <ThankYouDialog data={props.demand.thankyouSection} theme={theme} />
        )}
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    error: DEMANDS_SELECTORS.getError(state),
    loading: DEMANDS_SELECTORS.getLoading(state),
    site: SITES_SELECTORS.getSite(state),
    demand: DEMANDS_SELECTORS.getDemand(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSite: siteIdentifier => dispatch(actions.getSiteByIdentifier(siteIdentifier)),
    getDemand: demandIdentifier => dispatch(actions.getDemandByIdentifier(demandIdentifier))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DemandPage);