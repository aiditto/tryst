import React, { useState, useEffect } from "react";
import { Grid, Fade, Button, ClickAwayListener } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./themeSelectorStyle";
import { TwitterPicker } from "react-color";
import { useTranslation } from "react-i18next";
import CardHeader from "components/Card/CardHeader";

export const ThemeSelector = props => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { t } = useTranslation();

  const [showPicker, setShowPicker] = useState({ primary: false, secondary: false });
  const [selectedPrimary, setSelectedPrimary] = useState("#272f41");
  const [selectedSecondary, setSelectedSecondary] = useState("#70ce95");
  const colors = ["#272f41", "#70ce95", "#e45756", "#0393e3", "#02d083", "#fcb900", "#C0C0C0"];

  const customStyles = makeStyles({
    selectedPrimary: {
      height: "50px",
      width: "50px",
      background: selectedPrimary,
      cursor: "pointer",
      border: "1px solid lightgray",
      borderRadius: "9px"
    },
    selectedSecondary: {
      height: "50px",
      width: "50px",
      background: selectedSecondary,
      cursor: "pointer",
      border: "1px solid lightgray",
      borderRadius: "9px"
    }
  });

  const customClasses = customStyles();

  useEffect(() => {
    if (props.getData) sendData();
  }, [props.getData]);

  useEffect(() => {
    if (props.data) {
      let data = props.data;
      if (data.settings) {
        setSelectedPrimary(data.settings.primaryColor);
        setSelectedSecondary(data.settings.secondaryColor);
      }
    }
  }, [props]);

  const handlePrimaryChange = color => {
    setSelectedPrimary(color.hex);
  };

  const handleSecondaryChange = color => {
    setSelectedSecondary(color.hex);
  };

  const handleClickAway = () => {
    setShowPicker({ primary: false, secondary: false });
  };

  const sendData = () => {
    const data = {
      primary: selectedPrimary,
      secondary: selectedSecondary
    };

    props.sendData(data);
  };

  return (
    <>
      <Grid container item xs={12} md={12} sm={12} className={classes.singleRow}>
        <Grid item md={2} xs={4}>
          <p className={classes.heading}>{t("sites.styling.primaryColor")}</p>
        </Grid>

        <Grid container item md={2} xs={4} justify="center">
          <div
            className={customClasses.selectedPrimary}
            onClick={() => {
              setShowPicker({ secondary: false, primary: !showPicker.primary });
            }}
          />
        </Grid>

        {showPicker.primary && (
          <Grid item md={4} sm={12} xs={12}>
            <ClickAwayListener onClickAway={handleClickAway}>
              <TwitterPicker color={selectedPrimary} colors={colors} onChange={handlePrimaryChange} />
            </ClickAwayListener>
          </Grid>
        )}
      </Grid>

      <Grid container item xs={12} md={12} sm={12} className={classes.singleRow}>
        <Grid item md={2} xs={4}>
          <p className={classes.heading}>{t("sites.styling.secondaryColor")}</p>
        </Grid>

        <Grid container item md={2} xs={4} justify="center">
          <div
            className={customClasses.selectedSecondary}
            onClick={() => {
              setShowPicker({ primary: false, secondary: !showPicker.secondary });
            }}
          />
        </Grid>

        {showPicker.secondary && (
          <Grid item md={4} sm={12} xs={12}>
            <ClickAwayListener onClickAway={handleClickAway}>
              <TwitterPicker color={selectedSecondary} colors={colors} onChange={handleSecondaryChange} />
            </ClickAwayListener>
          </Grid>
        )}
      </Grid>
    </>
  );
};
