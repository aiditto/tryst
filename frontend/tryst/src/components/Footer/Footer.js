/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { Grid, createMuiTheme } from "@material-ui/core";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import cx from "classnames";
import { useTranslation } from "react-i18next";

import { isEmpty } from "lodash";
import { FALLBACK_PRIMARY_COLOR, FALLBACK_SECONDARY_COLOR } from "shared/utility";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "./footerStyle";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const param = useParams();
  const { t } = useTranslation();
  const { fluid, black } = props;
  var container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.blackColor]: black
  });

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
    if (props.site && !isEmpty(props.site.settings)) {
      setPrimaryColor(props.site.settings.primaryColor);
      setSecondaryColor(props.site.settings.secondaryColor);
    } else {
      setPrimaryColor(FALLBACK_PRIMARY_COLOR);
      setSecondaryColor(FALLBACK_SECONDARY_COLOR);
    }
  }, [props.site && props.site.settings]);

  return (
    <Grid className={classes.footer} style={{ backgroundColor: theme.palette.primary.main }}>
      <Grid className={container}>
        <p className={classes.center} style={{ color: theme.palette.primary.contrastText }}>
          {t("footerText")}&nbsp;
          <a href="https://www.aiditto.org/" style={{ color: theme.palette.primary.light }} target="_blank">
            AIDITTO
          </a>
        </p>
      </Grid>
    </Grid>
  );
}

Footer.propTypes = {
  fluid: PropTypes.bool,
  white: PropTypes.bool,
  rtlActive: PropTypes.bool
};
