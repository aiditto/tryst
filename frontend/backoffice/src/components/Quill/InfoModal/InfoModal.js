/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Grid, Button, TextField } from "@material-ui/core";
import styles from "./infoModalStyle";
import { makeStyles } from "@material-ui/core/styles";
// Editable content
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// Quill
import ReactQuill, { Quill } from "react-quill";

var Link = Quill.import("formats/link");

class NoTargetLink extends Link {
  static create(value) {
    let node = super.create(value);
    value = this.sanitize(value);
    node.setAttribute("href", value);
    // If link destination target should be set sometimes, add a conditional here
    node.removeAttribute("target");
    return node;
  }
}

Quill.register(NoTargetLink);

const useStyles = makeStyles(styles);

const InfoModal = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [maxWidth] = useState("md");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (props.info) {
      setDescription(props.info.description);
      setTitle(props.info.title);
    }
  }, [props && props.info]);

  const modules = {
    clipboard: {
      matchVisual: false,
    },
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
      ["clean"],
      [],
    ],
  };

  const handleChange = (value) => {
    setDescription(value);
  };

  const handleTitle = (value) => {
    setTitle(value);
  };

  return (
    <div className={classes.root}>
      <Grid item xs={12} sm={12} md={4}>
        <Dialog
          fullScreen={fullScreen}
          fullWidth={true}
          maxWidth={maxWidth}
          open={props.open}
          onClose={() => {
            props.setOpenInfoModal();
          }}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <DialogContentText>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  label={t("quill.form.title")}
                  value={title}
                  type="text"
                  fullWidth
                  onChange={(e) => handleTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} className={classes.orderCreator}>
                <Grid container spacing={0} alignItems="flex-start" justify="flex-start">
                  <Grid item xs={12} sm={12} md={12}>
                    <ReactQuill
                      className={classes.quill}
                      modules={modules}
                      value={description}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              size="large"
              square="true"
              onClick={() => props.setOpenInfoModal()}
              className={classes.dialogCancel}
            >
              {t("quill.cancel")}
            </Button>
            <Button
              size="large"
              square="true"
              className={classes.info}
              autoFocus
              onClick={() => {
                props.saveContents(description, title);
                props.setOpenInfoModal();
              }}
              color="primary"
            >
              {t("quill.submit")}
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </div>
  );
};

export default InfoModal;
