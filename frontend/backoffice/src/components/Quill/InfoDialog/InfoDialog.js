/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import styles from "./infoDialogStyle";

const InfoDialog = props => {
  const { t } = useTranslation();
  const product = props.product;
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  // Dialog
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [maxWidth] = useState("md");

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth={true}
      maxWidth={maxWidth}
      scroll="body"
      open={props.open}
      onClose={() => {
        props.setClose();
      }}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      className={classes.infoDialog}
    >
      <DialogTitle id="dialog-title" disableTypography={true}>
        <h1 className={classes.dialogTitle}>{product.productName}</h1>
      </DialogTitle>
      <DialogContent>
        <DialogContentText disableTypography={true} id="dialog-description">
          <span dangerouslySetInnerHTML={{ __html: product.info }} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button size="large" square="true" onClick={() => props.setClose()} className={classes.dialogCancel}>
          {t("products.hideInfo")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoDialog;
