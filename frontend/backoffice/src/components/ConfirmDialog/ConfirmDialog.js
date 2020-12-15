/* eslint-disable react/prop-types */
import React from "react";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

import styles from "./confirmDialogStyle";

const useStyles = makeStyles(styles);

const ConfirmDialog = props => {
  const { t } = useTranslation();
  const classes = useStyles();
  const handleClose = () => {
    props.handleClose(false);
  };

  const handleDelete = () => {
    props.handleDelete(true);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        disableBackdropClick
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t("confirmDelete.title")}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{props.deleteMsg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" className={classes.cancelButton}>
            {t("confirmDelete.cancel")}
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus className={classes.deleteButton}>
            {t("confirmDelete.confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
