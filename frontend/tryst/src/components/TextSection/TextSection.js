/*eslint-disable*/
import React from "react";
import { Grid, Typography } from "@material-ui/core";
import styles from "./textSectionStyle";
import { makeStyles } from "@material-ui/core/styles";

const TextSection = props => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const data = props.data;
  const theme = props.theme;

  return (
    <div className={classes.root}>
      {data && (<span dangerouslySetInnerHTML={{ __html: data.description }} />)}
    </div>
  );
};

export default TextSection;
