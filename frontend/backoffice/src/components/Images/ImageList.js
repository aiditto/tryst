import React, { useState } from "react";

import { Grid, Card, CardContent } from "@material-ui/core";

// styles
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import styles from "./imageStyle";

const useStyles = makeStyles(styles);

const ImageList = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [maxWidth] = useState("md");

  // const renderedImage = props.images.map((image) => {
  //     return (
  //         <div key={image.key}>
  //             <img src={image.urls.thumb} alt={image.alt_description} />
  //         </div>
  //     );
  // });
  return (
    <Grid container item md={12} spacing={2}>
      {props.images &&
        props.images.map((image) => {
          return (
            <Grid item md={4} xs={6} sm={4} lg={4}>
              <img
                onClick={() => {
                  props.selectedImage(image.urls.regular);
                }}
                className={classes.imageSize}
                src={image.urls.thumb}
                alt={image.alt_description}
              />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default ImageList;
