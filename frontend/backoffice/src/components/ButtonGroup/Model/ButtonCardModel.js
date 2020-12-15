import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Radio,
  Typography,
  ClickAwayListener
} from "@material-ui/core";
import styles from "./buttonCardModelStyle";
import { makeStyles } from "@material-ui/core/styles";

import CardHeader from "components/CardHeader/CardHeader";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DeleteIcon from "@material-ui/icons/Delete";
import classNames from "classnames";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";

import PublishIcon from "@material-ui/icons/Publish";
import defaultImage from "assets/img/no-image.png";
import UploadImageDialog from "components/Images/UploadImageDialog";
import { TwitterPicker } from "react-color";

const useStyles = makeStyles(styles);

const ButtonCardModel = props => {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [maxWidth] = useState("md");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [disableIdentifier, setDisableIdentifier] = useState(false);
  const [useExternal, setUseExternal] = useState(false);
  const [url, setUrl] = useState("");

  const [useImage, setUseImage] = useState(false);
  const [background, setBackground] = useState("");

  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#272f41");
  const colors = ["#272f41", "#70ce95", "#e45756", "#0393e3", "#02d083", "#fcb900", "#C0C0C0"];

  const section = props.section;
  const component = props.component;

  const customStyles = makeStyles({
    selectedColor: {
      height: "50px",
      width: "50px",
      background: selectedColor,
      cursor: "pointer",
      border: "1px solid lightgray",
      borderRadius: "9px"
    }
  });

  const customClasses = customStyles();

  useEffect(() => {
    if (props.modeUpdate) {
      initFormData();
    } else {
      clearFormData();
    }
  }, [props.modeUpdate]);

  useEffect(() => {
    if (!isEmpty(props.info)) {
      initFormData();
    } else {
      clearFormData();
    }
  }, [props && props.info]);

  const initFormData = () => {
    const data = props.info;
    setName(data.name);
    setDescription(data.description);
    setIdentifier(data.identifier);
    setDisableIdentifier(true);
    setUseImage((data.headerSection && data.headerSection.useImage) ?? false);
    setBackground((data.headerSection && data.headerSection.background) ?? "");
    setSelectedColor(data.headerSection && data.headerSection.useImage ? "#272f41" : data.headerSection.background);
    setUseExternal((data.externalSetting && data.externalSetting.useExternal) ?? false);
    setUrl((data.externalSetting && data.externalSetting.url) ?? "");
  };

  const clearFormData = () => {
    setName("");
    setIdentifier("");
    setDescription("");
    setUseImage(false);
    setBackground(selectedColor);
    setSelectedColor("#272f41");
    setDisableIdentifier(false);
    setUseExternal(false);
    setUrl("");
  };

  const suggestIdentifier = name => {
    let newId;
    if (!props.mode) {
      newId = idSanityCheck(name);
      setIdentifier(newId);
      setName(name);
      return newId;
    }
    setName(name);
  };

  const idSanityCheck = id => {
    let saneId = "";
    let nextchar;
    if (id.length > 0) {
      id.toLowerCase()
        .split("")
        .map(char => {
          if (char === "å" || char === "ä") {
            nextchar = "a";
          } else if (char === "ö") {
            nextchar = "o";
          } else if (char.match(/^[0-9a-zA-Z]+$/)) {
            nextchar = char;
          } else {
            if (saneId[saneId.length - 1] === "-") {
              nextchar = "";
            } else {
              nextchar = "-";
            }
          }
          saneId = saneId + nextchar;
        });
    } else {
      saneId = "";
    }
    if (saneId[saneId.length - 1] === "-") {
      return saneId.slice(0, -1);
    }
    return saneId;
  };

  const handleChangeIdentifier = id => {
    let saneId = "";
    let nextchar;
    if (id.length > 0) {
      id.toLowerCase()
        .split("")
        .map(char => {
          if (char === "å" || char === "ä") {
            nextchar = "a";
          } else if (char === "ö") {
            nextchar = "o";
          } else if (char.match(/^[0-9a-zA-Z]+$/)) {
            nextchar = char;
          } else {
            if (saneId[saneId.length - 1] === "-") {
              nextchar = "";
            } else {
              nextchar = "-";
            }
          }
          saneId = saneId + nextchar;
        });
    } else {
      saneId = "";
    }
    setIdentifier(saneId);
  };

  const handleDescriptionChange = value => {
    setDescription(value);
  };

  const handleExternalLinkChange = event => {
    setUseExternal(event.target.checked);
  };

  const handleUrlChange = value => {
    setUrl(value);
  };

  const handleClickAway = () => {
    setShowPicker(false);
  };

  const handleColorChange = color => {
    setSelectedColor(color.hex);
    setBackground(color.hex);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={12} md={4} lg={3}>
        <Dialog
          fullScreen={fullScreen}
          fullWidth={true}
          maxWidth={maxWidth}
          disableBackdropClick
          open={props.open}
          onClose={() => {
            props.closeHandler();
          }}
        >
          <CardHeader section={section} component={component} showButtons={false} />
          <DialogContent>
            <DialogContentText>
              {!name && <small className={classes.warning}>{t("quill.buttonCardWarning")}</small>}
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  label={t("quill.form.name")}
                  value={name}
                  type="text"
                  fullWidth
                  required
                  onChange={e => suggestIdentifier(e.target.value)}
                />
                <TextField
                  type="text"
                  fullWidth
                  label={t("quill.form.identifier")}
                  value={identifier}
                  disabled={disableIdentifier}
                  onChange={e => handleChangeIdentifier(e.target.value)}
                />
                <TextField
                  label={t("quill.form.description")}
                  value={description}
                  type="text"
                  fullWidth
                  onChange={e => handleDescriptionChange(e.target.value)}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={useExternal}
                      onChange={handleExternalLinkChange}
                      label={t("quill.form.externalLink")}
                    />
                  }
                  label={t("quill.form.externalLink")}
                />

                {useExternal && (
                  <TextField
                    label={t("quill.form.url")}
                    value={url}
                    type="text"
                    fullWidth
                    required
                    onChange={e => handleUrlChange(e.target.value)}
                  />
                )}
              </Grid>
              <Grid xs={12} sm={12} md={12} lg={12}></Grid>
            </DialogContentText>
            <Grid item md={12}>
              <Typography variant="h4" style={{ paddingTop: "2rem" }}>
                {t("uploadImage.styleHeading")}
              </Typography>

              {isEmpty(background) && useImage && (
                <Typography style={{ color: "red" }} variant="p">
                  {t("uploadImage.warning")}
                </Typography>
              )}

              {useImage && background && background.startsWith("#") && (
                <Typography style={{ color: "red" }} variant="p">
                  {t("uploadImage.warning")}
                </Typography>
              )}
            </Grid>
            <Grid container item md={12}>
              <Grid container item md={6} direction="column">
                <FormControlLabel
                  control={<Radio checked={useImage} onChange={() => setUseImage(true)} />}
                  label={t("uploadImage.image")}
                />

                <div className="fileinput">
                  <UploadImageDialog
                    open={openImageDialog}
                    closeHandler={() => setOpenImageDialog(false)}
                    selectedImage={image => {
                      setBackground(image);
                      setOpenImageDialog(false);
                    }}
                  />
                  {useImage ? (
                    <Grid className={"thumbnail"}>
                      <img
                        className={classes.selectedImage}
                        src={background}
                        alt="No Image"
                        onError={event => (event.target.src = defaultImage)}
                      />
                      <Button
                        onClick={() => setOpenImageDialog(true)}
                        className={classes.upploadBtn}
                        startIcon={<PublishIcon />}
                        size="small"
                      >
                        {t("uploadImage.upload")}
                      </Button>
                    </Grid>
                  ) : (
                    <Grid className={"thumbnail"}>
                      <img src={defaultImage} alt="..." />
                    </Grid>
                  )}
                </div>
              </Grid>
              <Grid item md={6}>
                <FormControlLabel
                  control={<Radio checked={!useImage} onChange={() => setUseImage(false)} />}
                  label={t("uploadImage.background")}
                />
                {!useImage && (
                  <Grid container item xs={12} md={12} sm={12} className={classes.singleRow}>
                    <Grid container item md={2} xs={4} justify="center">
                      <div
                        className={customClasses.selectedColor}
                        onClick={() => {
                          setShowPicker(!showPicker);
                        }}
                      />
                    </Grid>

                    {showPicker && (
                      <Grid item md={4} sm={12} xs={12}>
                        <ClickAwayListener onClickAway={handleClickAway}>
                          <TwitterPicker color={selectedColor} colors={colors} onChange={handleColorChange} />
                        </ClickAwayListener>
                      </Grid>
                    )}
                  </Grid>
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            {props.modeUpdate && (
              <Grid item md={12} sm={12} xs={12}>
                <Button
                  size="large"
                  variant="contained"
                  square="true"
                  className={classes.deleteBtn}
                  autoFocus
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    props.deleteHandler(section);
                  }}
                  color="primary"
                >
                  {t("quill.delete")}
                </Button>
              </Grid>
            )}
            <Button size="large" square="true" onClick={() => props.closeHandler()} className={classes.closeBtn}>
              {t("quill.cancel")}
            </Button>
            <Button
              size="large"
              square="true"
              className={classNames(classes.saveBtn, {
                [classes.disabled]:
                  !name || ((isEmpty(background) && useImage) || (background && background.startsWith("#") && useImage))
              })}
              autoFocus
              onClick={() => {
                let backgroundValue = background;
                if (!useImage && !background.startsWith("#")) {
                  backgroundValue = selectedColor;
                }
                const dataToSave = {
                  name: name,
                  identifier: identifier,
                  description: description,
                  status: "drafted",
                  externalSetting: { useExternal, url },
                  headerSection: !props.modeUpdate
                    ? { description: "", useImage: useImage, background: background }
                    : {
                        description:
                          (props.info && props.info.headerSections && props.info.headerSections.description) ?? "",
                        useImage: useImage,
                        background: backgroundValue
                      }
                };
                props.saveContent(dataToSave, section);
              }}
              disabled={
                !name || ((isEmpty(background) && useImage) || (background && background.startsWith("#") && useImage))
              }
            >
              {t("quill.submit")}
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

ButtonCardModel.defaultProps = {
  modeUpdate: true
};

export default ButtonCardModel;
