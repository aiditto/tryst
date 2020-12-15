import React, { useState, useEffect } from "react";
import { Grid, Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./logoSelectorStyle";
import ImageUpload from "components/Logo/ImageUpload";
import { useTranslation } from "react-i18next";
const useStyles = makeStyles(styles);

export const LogoSelector = props => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [useLogo, setUseLogo] = useState(false);
  const [logo, setLogo] = useState("");

  useEffect(() => {
    if (props.getData) sendData();
  }, [props.getData]);

  useEffect(() => {
    if (props.data) {
      let data = props.data;
      if (data.settings) {
        setUseLogo(data.settings.useIcon);
        setLogo(data.settings.icon);
      }
    }
  }, [props]);

  const handleLogos = value => {
    setLogo(value);
  };

  const handleUpdateLogo = (value, index) => {
    setLogo(value);
  };

  const handleRemoveLogo = index => {
    setLogo("");
  };

  const sendData = () => {
    props.sendData(logo);
  };

  return (
    <>
      <Grid item md={12} className={classes.root}>
        <p>{t("sites.styling.useLogoLabel")}</p>
        <Switch
          checked={useLogo}
          onChange={() => {
            setUseLogo(!useLogo);
          }}
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
      </Grid>

      {useLogo && (
        <Grid container item md={12} className={classes.logoSection}>
          <Grid item md={3}>
            <small> {t("preferredSize.text")} 64x64, 72x72, 128x128</small>

            <ImageUpload
              value={logo}
              handleImage={handleLogos}
              updateImage={value => handleUpdateLogo(value)}
              removeImage={handleRemoveLogo}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};
