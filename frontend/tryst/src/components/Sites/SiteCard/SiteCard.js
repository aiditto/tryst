/* eslint-disable react/prop-types */
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./siteCardStyle";
import Link from "@material-ui/core/Link";
import "./siteCard.scss";
import PublicIcon from "@material-ui/icons/Public";
import { getSiteUrl } from "shared/utility";

// Dialog
import React from "react";
import { useTranslation } from "react-i18next";

const SiteCard = props => {
  const { t } = useTranslation();
  const site = props.site;
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const url = getSiteUrl(site.identifier);

  return (
    <Grid container item className={classes.listStyle} alignItems="center" justify="space-between">
      <Grid item xs={8} md={8} lg={8}>
        <h2 className={classes.siteName}>{site.name}</h2>
      </Grid>
      <Grid item xs={6} md={2} lg={2}>
        <Link href={url} underline="none" target="_blank">
          <Button variant="contained" className={classes.listVisitButton} startIcon={<PublicIcon />}>
            {t("sites.visit")}
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};
export default SiteCard;
