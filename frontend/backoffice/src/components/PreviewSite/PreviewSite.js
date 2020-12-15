import React, { useState } from "react";
import { connect } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "./previewSiteStyle";
import { Grid, Button, Dialog, DialogContent, DialogActions } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTranslation } from "react-i18next";
import { SITES_SELECTORS } from "store/selectors/rootSelector";
import { getSiteUrl } from "shared/utility";

const useStyles = makeStyles(styles);

const PreviewSite = props => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [maxWidth] = useState("md");
  const { t } = useTranslation();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={12} md={4}>
        <Dialog
          fullScreen={fullScreen}
          fullWidth={true}
          maxWidth={maxWidth}
          disableBackdropClick
          open={props.open}
          onClose={() => {
            props.closeHandler();
          }}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <Grid item xs={12} sm={12} md={12}>
              {props.site && props.site.identifier && (
                <iframe src={getSiteUrl(props.site.identifier)} className={classes.iframeContainer}></iframe>
              )}
            </Grid>
          </DialogContent>
          <DialogActions className={classes.btnWrapper}>
            <Grid item md={12} sm={12} xs={12} className={classes.btnPosition}>
              <Button size="large" square="true" onClick={() => props.closeHandler()} className={classes.closeBtn}>
                {t("quill.cancel")}
              </Button>
            </Grid>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    error: SITES_SELECTORS.getError(state),
    loading: SITES_SELECTORS.getLoading(state),
    site: SITES_SELECTORS.getSite(state)
  };
};

export default connect(mapStateToProps)(PreviewSite);
