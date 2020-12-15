import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "./textSectionStyle";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(styles);

const TextSection = props => {
  const classes = useStyles();
  const data = props.info;

  return (
    data && (
      <Grid container className={classes.root}>
        {data.description && (
          <Grid item xs={12} sm={12} md={12}>
            <span dangerouslySetInnerHTML={{ __html: data.description }} />
          </Grid>
        )}
      </Grid>
    )
  );
};

TextSection.propTypes = {
  info: PropTypes.object.isRequired
};

export default TextSection;
