import React from "react";
import { CircularProgress } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import styles from "./loadingScreenStyle";
const useStyles = makeStyles(styles);

const LoadingScreen = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </div>
  );
};

export default LoadingScreen;
