/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from "react";
import { Snackbar, Icon, IconButton } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { connect } from "react-redux";
import * as actions from "../../store/actions/rootAction";
import { UI_SELECTORS } from "../../store/selectors/rootSelector";

const NotificationContainer = props => {
  const handleClose = () => {
    props.closeSnackbar();
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      open={props.show}
      autoHideDuration={3000}
      onClose={handleClose}
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
          <Icon>close</Icon>
        </IconButton>
      ]}
    >
      <Alert onClose={handleClose} severity={props.alertType} variant="filled">
        {props.message}
      </Alert>
    </Snackbar>
  );
};

const mapStateToProps = state => {
  return {
    show: UI_SELECTORS.getShow(state),
    message: UI_SELECTORS.getMessage(state),
    alertType: UI_SELECTORS.getAlertType(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeSnackbar: () => dispatch(actions.hideNotification())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationContainer);
