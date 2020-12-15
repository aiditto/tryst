/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Radio,
  FormControlLabel,
  Typography,
  ClickAwayListener
} from "@material-ui/core";
import styles from "./editHeaderSectionStyle";
import { makeStyles } from "@material-ui/core/styles";
// Editable content
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import DeleteIcon from "@material-ui/icons/Delete";
import PublishIcon from "@material-ui/icons/Publish";
import { TwitterPicker } from "react-color";
// Quill
import ReactQuill from "react-quill";
import { isEmpty } from "lodash";
import CardHeader from "components/CardHeader/CardHeader";
import UploadImageDialog from "components/Images/UploadImageDialog";

import defaultImage from "assets/img/no-image.png";

const useStyles = makeStyles(styles);

const EditHeaderSection = props => {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [maxWidth] = useState("md");
  const [description, setDescription] = useState("");
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
    if (!isEmpty(props.data)) {
      setDescription(props.data.description);
      setUseImage(props.data.useImage);
      setBackground(props.data.background);
      setSelectedColor(props.data && props.data.useImage ? "#272f41" : props.data.background);
    } else {
      setDescription("");
      setUseImage(false);
      setBackground(selectedColor);
      setSelectedColor("#272f41");
    }
  }, [props && props.data]);

  const modules = {
    clipboard: {
      matchVisual: false
    },
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link"],
      ["clean"],
      [{ color: [] }]
    ]
  };

  const handleDescription = value => {
    setDescription(value);
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
        >
          <CardHeader section={component + " " + section} component={component} showButtons={false} />
          <DialogContent>
            <DialogContentText>
              <Grid item xs={12} sm={12} md={12} lg={12} className={classes.quillContainer}>
                <ReactQuill
                  className={classes.quill}
                  modules={modules}
                  value={description}
                  onChange={handleDescription}
                />
              </Grid>
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
            <Button size="large" square="true" onClick={() => props.closeHandler()} className={classes.closeBtn}>
              {t("quill.cancel")}
            </Button>
            <Button
              disabled={(isEmpty(background) && useImage) || (background && background.startsWith("#") && useImage)}
              size="large"
              square="true"
              className={classes.saveBtn}
              autoFocus
              onClick={() => {
                let backgroundValue = background;
                if (!useImage && !background.startsWith("#")) {
                  backgroundValue = selectedColor;
                }
                const headerSection = {
                  description: description,
                  useImage: useImage,
                  background: backgroundValue
                };
                props.saveContent(headerSection, section);
              }}
              color="primary"
            >
              {t("quill.submit")}
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default EditHeaderSection;
