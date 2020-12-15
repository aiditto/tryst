import React, { useState } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { Link as RouterLink, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import styles from "./sideBarStyle";
import { useTranslation } from "react-i18next";
const useStyles = makeStyles(styles);

export const BreadCrumbs = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const LinkRouter = props => <Link {...props} component={RouterLink} />;

  const displayCrumbs = {
    "/settings": t("navbar.settings"),
    "/create-site": t("navbar.create-site"),
    "/users": t("navbar.users")
  };

  return (
    <>
      <Route>
        {({ location }) => {
          const pathnames = location.pathname
            .split("/")
            .filter(x => x)
            .slice(0);
          return (
            <Breadcrumbs className={classes.breadCrumbsStyle}>
              <Typography variant="h2">
                <LinkRouter color="inherit" to="/sites">
                  AIDITTO
                </LinkRouter>
              </Typography>

              {pathnames.map((value, index) => {
                if (value !== "sites") {
                  const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                  return (
                    <Typography variant="h2" key={to}>
                      <LinkRouter to={to}>{displayCrumbs[to] ? displayCrumbs[to] : value}</LinkRouter>
                    </Typography>
                  );
                }
              })}
            </Breadcrumbs>
          );
        }}
      </Route>
    </>
  );
};
