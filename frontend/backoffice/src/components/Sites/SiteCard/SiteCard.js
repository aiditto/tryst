/* eslint-disable react/prop-types */
import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./siteCardStyle";
import Link from "@material-ui/core/Link";
import "./siteCard.scss";
import PublicIcon from "@material-ui/icons/Public";
import { getSiteUrl } from "shared/utility";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Dialog
import React from "react";
import { useTranslation } from "react-i18next";

const SiteCard = props => {
  const { t } = useTranslation();
  const site = props.site;
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const url = getSiteUrl(site.identifier);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container item md={12} xs={12} className={classes.listStyle} alignItems="center" justify="space-between">
      <Grid item md={10} xs={12}>
        <Typography variant={"h2"}>{site.name}</Typography>
        <Typography variant={"h3"}>{url}</Typography>
      </Grid>
      <Grid
        container
        item
        md={2}
        xs={12}
        justify={fullScreen ? "flex-end" : "center"}
        className={fullScreen && classes.mobileFix}
      >
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
