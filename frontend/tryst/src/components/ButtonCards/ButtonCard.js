/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardMedia, CardContent, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./buttonCardStyle";

const useStyles = makeStyles(styles);

const ButtonCard = props => {
  const classes = useStyles();
  const data = props.data;
  const headerSection = props.data && props.data.headerSection;
  const theme = props.theme;

  const ButtonCardContent = contentProps => {
    return (
      <CardContent className={classes.cardContent} {...contentProps}>
        <Typography className={classes.cardContentTitle} component="h2">
          {data.name}
        </Typography>
        {data.description && <Typography className={classes.cardContentDescription}>{data.description}</Typography>}
      </CardContent>
    );
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} className={classes.root}>
      {data && (
        <Card raised className={classes.card}>
          <CardActionArea component={Link} to={location => `${location.pathname}/${data.identifier}`}>
            {headerSection && headerSection.useImage ? (
              <>
                <CardMedia image={headerSection.background} alt="" className={classes.cardMedia} />
                <ButtonCardContent />
              </>
            ) : (
              <ButtonCardContent
                // use custom backgroundColor when no image
                style={{
                  color: theme.palette.primary.contrastText,
                  backgroundColor: theme.palette.primary.main
                }}
              />
            )}
          </CardActionArea>
        </Card>
      )}
    </Grid>
  );
};
export default ButtonCard;
