/* eslint-disable react/prop-types */
import React from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import styles from "components/ThankYouDialog/thankYouDialogStyle";
import { useHistory } from "react-router-dom";

const ThankYouDialog = props => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const history = useHistory();
  const data = props.data;
  const { t } = useTranslation();
  const theme = props.theme;

  const upperUrlLevel = event => {
    event.preventDefault();
    const currentUrl = history.location.pathname;
    const newUrl = currentUrl
      .split("/")
      .slice(0, currentUrl.split("/").length - 1)
      .join("/");
    return newUrl;
  };

  return (
    <Grid container className={classes.root}>
      {data && theme && (
        <Grid item xs={12} sm={12} md={12} className={classes.title} style={{ color: theme.palette.secondary.main }}>
          <Typography variant="h2">
            <span dangerouslySetInnerHTML={{ __html: data.title || "Thank you so much for your suuport!" }} />
          </Typography>
        </Grid>
      )}
      {data && theme && (
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          className={classes.description}
        >
          <span
            dangerouslySetInnerHTML={{
              __html: data.description || " We will contact you and will inform you with next steps ahead"
            }}
          />
        </Grid>
      )}
      <div className={classes.btnWrapper}>
        <Button
          square="true"
          type="submit"
          className={classes.btnColorMobile}
          onClick={event => {
            window.location = upperUrlLevel(event);
          }}
        >
          {t("demands.returnBtn")}
        </Button>
      </div>
    </Grid>
  );
};

export default ThankYouDialog;
