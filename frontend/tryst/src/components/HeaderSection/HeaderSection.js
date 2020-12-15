/*eslint-disable*/
import React from "react";
import { Grid, Container, Typography } from "@material-ui/core";
import styles from "./headerSectionStyle";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

const HeaderSection = props => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const data = props.data;
  const theme = props.theme;

  return data && (
    <div
      className={classNames(classes.root, {
        [classes.rootWithImage]: data.useImage
      })}
      style={data.useImage ? {
        backgroundImage: `url(${data.background})`
      } : {
        backgroundColor: data.background
      }}
    >
      <Container className={"containerStyle"}>
        <div
          className={classNames(classes.textWrap, { [classes.textWrapWithImage]: data.useImage })}
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      </Container>
    </div>
  );
};

export default HeaderSection;
