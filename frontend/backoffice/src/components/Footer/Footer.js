/*eslint-disable*/
import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/aiditto-pro-style/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const { fluid, black } = props;
  var container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.blackColor]: black
  });
  var anchor =
    classes.a +
    cx({
      [" " + classes.blackColor]: black
    });
  return (
    <footer className={classes.footer}>
      <div className={container}>
        <p className={classes.right}>
          &copy; {1900 + new Date().getYear()}{" "}
          <a href="https://demo.aidit.to/" className={anchor} target="_blank">
            AIDITTO
          </a>
          <br />
          {t("tagline")}
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  fluid: PropTypes.bool,
  white: PropTypes.bool,
  rtlActive: PropTypes.bool
};
