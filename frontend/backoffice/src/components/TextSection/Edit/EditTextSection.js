import React, { useState, useEffect } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import styles from "./editTextSectionStyle";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CardHeader from "components/CardHeader/CardHeader";
// Editable content
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DeleteIcon from "@material-ui/icons/Delete";
import { isEmpty } from "lodash";
// Quill
import ReactQuill from "react-quill";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(styles);

const EditTextSection = props => {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [maxWidth] = useState("md");
  const [description, setDescription] = useState("");

  const section = props.section;
  const component = props.component;

  useEffect(() => {
    if (!isEmpty(props.info)) {
      setDescription(props.info.description);
    } else {
      setDescription("");
    }
  }, [props && props.info]);

  const modules = {
    clipboard: {
      matchVisual: false
    },
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link"],
      ["clean"]
    ]
  };

  const handleDescriptionChange = value => {
    setDescription(value);
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
          <DialogContent style={{ overflow: "hidden" }}>
            <DialogContentText>
              <Grid item xs={12} sm={12} md={12} lg={12} className={classes.quillContainer}>
                <ReactQuill
                  className={classes.quill}
                  modules={modules}
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </Grid>
            </DialogContentText>
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
              size="large"
              square="true"
              className={classes.saveBtn}
              autoFocus
              onClick={() => {
                const textSection = { description: description };
                props.saveContent(textSection, section);
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

export default EditTextSection;
