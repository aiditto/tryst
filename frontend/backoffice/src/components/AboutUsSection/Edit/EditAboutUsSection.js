import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Grid, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";
import styles from "./editAboutUsSectionStyle";
import { makeStyles } from "@material-ui/core/styles";
// Editable content
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import DeleteIcon from "@material-ui/icons/Delete";
// Quill
import ReactQuill from "react-quill";
import { isEmpty } from "lodash";

// service for getting images from unsplash
import CardHeader from "components/CardHeader/CardHeader";
import ImageUpload from "../../Logo/ImageUpload";

const useStyles = makeStyles(styles);

const EditAboutusSection = props => {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [maxWidth] = useState("md");
  const [description, setDesctiption] = useState("");
  const [logos, setLogos] = useState([]);

  const section = props.section;
  const component = props.component;

  useEffect(() => {
    if (!isEmpty(props.data)) {
      setDesctiption(props.data.description);
      setLogos(props.data.logos ?? []);
    } else {
      setDesctiption("");
      setLogos([]);
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
      ["clean"]
    ]
  };

  const handleDescription = value => {
    setDesctiption(value);
  };

  const handleLogos = value => {
    setLogos(logos => [...logos, value]);
  };

  const handleUpdateLogo = (value, index) => {
    let existingLogos = [...logos];
    existingLogos[index] = value;
    setLogos(existingLogos);
  };

  const handleRemoveLogo = index => {
    let existingLogos = [...logos];
    if (index !== -1) {
      existingLogos.splice(index, 1);
      setLogos(existingLogos);
    }
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
          aria-labelledby="responsive-dialog-title"
        >
          <CardHeader section={section} component={component} showButtons={false} />
          <DialogContent>
            <DialogContentText>
              <Grid
                container
                item
                xs={12}
                sm={12}
                md={12}
                className={classes.quillContainer}
                alignItems="flex-start"
                justify="flex-start"
              >
                <Grid item xs={12} sm={12} md={12}>
                  <ReactQuill
                    className={classes.quill}
                    modules={modules}
                    value={description}
                    onChange={handleDescription}
                  />
                </Grid>
              </Grid>
            </DialogContentText>

            <Grid item xs={12} sm={12} md={12} className={classes.preferredText}>
              <small> {t("preferredSize.text")} 64x64, 72x72, 128x128</small>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                {logos &&
                  logos.map((logo, index) => {
                    return (
                      <ImageUpload
                        key={index}
                        value={logo}
                        handleImage={handleLogos}
                        updateImage={value => handleUpdateLogo(value, index)}
                        removeImage={() => handleRemoveLogo(index)}
                      />
                    );
                  })}
                <ImageUpload handleImage={handleLogos} />
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
              size="large"
              square="true"
              className={classes.saveBtn}
              autoFocus
              onClick={() => {
                const aboutusSection = {
                  description: description,
                  logos: logos
                };
                props.saveContent(aboutusSection, section);
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

export default EditAboutusSection;
