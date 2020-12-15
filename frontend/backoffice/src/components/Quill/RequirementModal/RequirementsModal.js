/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Grid, Button } from "@material-ui/core";
import styles from "./requirementsModalStyle";
import { makeStyles } from "@material-ui/core/styles";
// Editable content
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// Quill
import ReactQuill from "react-quill";

const useStyles = makeStyles(styles);

const RequirementsModal = props => {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [maxWidth] = useState("md");
  const [text, setText] = useState("");

  useEffect(() => {
    if (props) setText(props.info);
  }, [props]);

  const modules = {
    clipboard: {
      matchVisual: false
    },
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
      []
    ]
  };

  const handleChange = value => {
    setText(value);
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
            props.setOpenRequirementsModal();
          }}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <DialogContentText>
              <Grid item xs={12} sm={12} md={12} className={classes.orderCreator}>
                <Grid container spacing={0} alignItems="flex-start" justify="flex-start">
                  <Grid item xs={12} sm={12} md={12}>
                    <ReactQuill className={classes.quill} modules={modules} value={text} onChange={handleChange} />
                  </Grid>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              size="large"
              square="true"
              onClick={() => props.setOpenRequirementsModal()}
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
                props.saveContents(text);
                props.setOpenRequirementsModal();
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

export default RequirementsModal;
