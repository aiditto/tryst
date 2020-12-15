/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// @material-ui/core components
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2)
    }
  }
}));

const PaginationContainer = props => {
  const handleOnChange = p => {
    props.changePage(p);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Pagination count={props.totalPages} page={props.page} onChange={(e, p) => handleOnChange(p)} color="primary" />
    </div>
  );
};

export default PaginationContainer;
