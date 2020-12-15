import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "./headerSectionStyle";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(styles);

const HeaderSection = props => {
  const classes = useStyles();

  //const imguri = require("../../../assets/img/headerPic.jpg");
  const { data } = props;

  //const imguri = data.background;
  const customStyles = makeStyles({
    imgStyle: {
      width: "auto",
      minHeight: "400px",
      backgroundImage: `url(${data.background})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem"
    }
  });

  const customClasses = customStyles();

  return (
    <Grid item md={12}>
      {data && data.useImage && (
        <div className={customClasses.imgStyle}>
          {data && <span dangerouslySetInnerHTML={{ __html: data.description }} />}
        </div>
      )}
      {data && !data.useImage && (
        <div style={{ backgroundColor: `${data.background}`, padding: "2rem" }}>
          {data && (
            <Grid item className={classes.descriptionTextWithoutImage} xs={12} sm={12} md={12} lg={12}>
              <span dangerouslySetInnerHTML={{ __html: data.description }} />
            </Grid>
          )}
        </div>
      )}
    </Grid>
  );
};

HeaderSection.propTypes = {
  data: PropTypes.object.isRequired
};

export default HeaderSection;
