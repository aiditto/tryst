import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "./aboutUsSectionStyle";
import { Grid, ButtonBase } from "@material-ui/core";

const useStyles = makeStyles(styles);

const AboutusSection = props => {
  const classes = useStyles();
  const { data } = props;

  return (
    <Grid container className={classes.root}>
      {data && (
        <Grid item xs={12} sm={12} md={12}>
          <span dangerouslySetInnerHTML={{ __html: data.description }} />
        </Grid>
      )}
      {data &&
        data.logos &&
        data.logos.map((logo, index) => (
          <Grid item xs={6} sm={3} md={3} lg={3} className={classes.logo}>
            <ButtonBase focusRipple key={index} focusVisibleClassName={classes.focusVisible}>
              <img src={logo} />
            </ButtonBase>
          </Grid>
        ))}
    </Grid>
  );
};

AboutusSection.propTypes = {
  data: PropTypes.object.isRequired
};

export default AboutusSection;
