import React, { useState, createRef } from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

// core components
import { Grid, Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import styles from "./imageUploadStyle";
import { makeStyles } from "@material-ui/core/styles";
import PublishIcon from "@material-ui/icons/Publish";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import { isEmpty } from "lodash";

import defaultImage from "assets/img/no-image.png";

const useStyles = makeStyles(styles);

const ImageUpload = props => {
  const classes = useStyles();
  const { t } = useTranslation();

  const value = props.value;

  let fileInput = createRef();

  const handleImageChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
     if (file && file.size > 1024 * 50) { // 1024 Bytes = 1 KB
       alert(t("fileSize.text"));
       return;
     }
    reader.onloadend = () => {
      handleSubmit(reader.result);
    };
    reader.readAsDataURL(file);
  };
  // eslint-disable-next-line
  const handleSubmit = imageValue => {
    if (value) {
      props.updateImage(imageValue);
    } else {
      props.handleImage(imageValue);
    }
    // file is the file/image uploaded
    // in this function you can save the image (file) on form submit
    // you have to call it yourself
  };
  const handleClick = () => {
    fileInput.current.click();
  };
  const handleRemove = () => {
    fileInput.current.value = null;
    props.removeImage();
  };
  return (
    <Grid className="fileinput text-center">
      <input type="file" onChange={handleImageChange} ref={fileInput} accept=".jpg,.png,.jpeg,.svg,.gif"/>
      {value ? (
        <Grid className={"thumbnail"}>
          <img src={value} alt="..." />
        </Grid>
      ) : (
        <Grid className={"thumbnail"}>
          <img src={defaultImage} alt="..." />
        </Grid>
      )}
      <Grid>
        {isEmpty(value) ? (
          <Button onClick={() => handleClick()} className={classes.uploadBtn} startIcon={<PublishIcon />}>
            {t("image.add")}
          </Button>
        ) : (
          <span>
            <Button onClick={() => handleClick()} className={classes.changeBtn} startIcon={<EditIcon />}>
              {t("image.change")}
            </Button>
            <Button onClick={() => handleRemove()} className={classes.removeBtn} startIcon={<ClearIcon />}>
              <i /> {t("image.remove")}
            </Button>
          </span>
        )}
      </Grid>
    </Grid>
  );
};

export default ImageUpload;
