/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import styles from "./thankYouDialogStyle";

const ThankYouDialog = props => {
  const { t } = useTranslation();

  const useStyles = makeStyles(styles);
  const classes = useStyles();

  // Dialog
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [maxWidth] = useState("md");

  const demand = props.demand;

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth={true}
      maxWidth={maxWidth}
      disableBackdropClick
      disableEscapeKeyDown
      scroll="body"
      open={props.open}
      onClose={() => {
        props.setClose();
      }}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      className={classes.thankYouDialog}
    >
      <DialogTitle id="dialog-title" disableTypography={true}>
        <h1 className={classes.dialogTitle}>{t("thankyou.modal.header")}</h1>
      </DialogTitle>
      <DialogContent>
        <DialogContentText disableTypography={true} id="dialog-description">
          <p>{t("thankyou.modal.text", { demand: demand && demand.productName })}</p>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          size="large"
          square="true"
          onClick={() => props.setOpenThankYouModal(false)}
          className={classes.dialogCancel}
        >
          {t("thankyou.modal.close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ThankYouDialog;
