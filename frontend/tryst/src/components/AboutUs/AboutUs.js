/* eslint-disable no-sparse-arrays */
/* eslint-disable react/prop-types */
import { Grid, Typography } from "@material-ui/core";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
// styles
import styles from "./aboutUsStyle";
import ButtonBase from "@material-ui/core/ButtonBase";

const AboutUs = props => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const data = props.data;
  const theme = props.theme;

  return (
    <div className={classes.root}>
      {data && (
        <div dangerouslySetInnerHTML={{ __html: data.description }} />
      )}
      {data && data.logos && (
        <div className={classes.logoSection}>
          {data.logos.map((logo, index) => (
            <ButtonBase className={classes.logo} focusRipple key={index}>
              <img src={logo} className={classes.logoImg} />
            </ButtonBase>
          ))}
        </div>
      )}
    </div>
  );
};

export default AboutUs;
