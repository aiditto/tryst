import React, { useEffect, useState } from "react";

// styles
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DeleteIcon from "@material-ui/icons/Delete";
import { Grid, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";

import styles from "./imageStyle";

import imageLoaderService from "services/image.loader.service";
import ImageList from "components/Images/ImageList";

const useStyles = makeStyles(styles);

const UploadImageDialog = props => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [maxWidth] = useState("md");

  const [, setSelectedImage] = useState("");
  const [] = useState("");

  useEffect(() => {
    const search = async searchTerm => {
      await imageLoaderService.searchImage(searchTerm, response => {
        if (response.status === 200) {
          setResults(response.data.results);
        } else {
          console.log("Error!");
        }
      });
    };

    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        search(searchTerm);
      } else {
        setResults([]);
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  const mobileStyle = {
    minWidth: "35%",
    maxWidth: "90%",
    minHeight: "25%",
    maxHeight: "60%"
  };

  const desktopStyle = {
    minWidth: "35%",
    maxWidth: "50%",
    minHeight: "25%",
    maxHeight: "50%"
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={12} md={4}>
        <Dialog
          PaperProps={{
            style: fullScreen ? mobileStyle : desktopStyle
          }}
          fullScreen={fullScreen}
          maxWidth={maxWidth}
          disableBackdropClick
          open={props.open}
          onClose={() => {
            props.closeHandler();
          }}
        >
          <DialogContent>
            <DialogContentText>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  style={{ marginBottom: "1rem" }}
                  placeholder="Search for image..."
                  fullWidth
                  type="search"
                  onChange={event => setSearchTerm(event.target.value)}
                />
              </Grid>
              <ImageList
                images={props && results}
                selectedImage={image => {
                  setSelectedImage(image);
                  props.selectedImage(image);
                }}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button size="large" square="true" onClick={() => props.closeHandler()}>
              {t("quill.cancel")}
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default UploadImageDialog;
