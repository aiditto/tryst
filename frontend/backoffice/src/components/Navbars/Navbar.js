import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useDispatch } from "react-redux";
import * as actions from "store/actions/rootAction";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { BreadCrumbs } from "./BreadCrumbs";

// @material-ui/icons
import HomeIcon from "@material-ui/icons/Home";
import PublicIcon from "@material-ui/icons/Public";
import Fingerprint from "@material-ui/icons/Fingerprint";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import styles from "./navBarStyles";
import cx from "classnames";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
// Mobile friendliness
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown";
import authenticationService from "services/auth.service";
import Button from "@material-ui/core/Button";

// Translation
import { useTranslation } from "react-i18next";
import useLanguage from "../../shared/contexts/useLanguage";
import { Grid, Typography } from "@material-ui/core";
const useStyles = makeStyles(styles);

const Navbar = props => {
  const { t, i18n } = useTranslation();
  const { changeLanguage } = useLanguage();
  const dispatch = useDispatch();

  const handleLanguage = lng => {
    changeLanguage(lng);
  };

  // Checks if menu should be open or in mobil state
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const signOut = () => authenticationService.logout(history);
  const handleLogin = () => authenticationService.sso();
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const getLoggedstatus = () => {
    if (!authenticationService.isAuthenticated()) {
      return (
        <Button
          className={cx(classes.navLink, {
            [classes.navLinkActive]: history.location.pathname === "/login"
          })}
          onClick={handleLogin}
        >
          <Fingerprint className={classes.listItemIcon} />
          <ListItemText primary={t("navbar.login")} disableTypography={true} className={classes.listItemText} />
        </Button>
      );
      // return (
      //   <NavLink
      //     to={"/login"}
      //     className={cx(classes.navLink, {
      //       [classes.navLinkActive]: history.location.pathname === "/login"
      //     })}
      //   >
      //     <Fingerprint className={classes.listItemIcon} />
      //     <ListItemText primary={t("navbar.login")} disableTypography={true} className={classes.listItemText} />
      //   </NavLink>
      // );
    } else {
      return (
        <div className={cx(classes.navLink, classes.logoutBtn)} onClick={signOut}>
          <PowerSettingsNewIcon className={classes.listItemIcon} />
          <ListItemText primary={t("navbar.logout")} disableTypography={true} className={classes.listItemText} />
        </div>
      );
    }
  };
  const classes = useStyles();
  const { color } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color
  });

  const parseBrowserDetectedLanguage = lng => {
    const lang = lng.substring(0, 2);
    if (lang === "sv" || lng === "Svenska") {
      return "Svenska";
    } else {
      return "English";
    }
  };

  const getAvailableLanguages = () => {
    const lang = i18n.language;
    let newLangs = [...i18n.languages];
    if (lang.length < 6) {
      i18n.changeLanguage(parseBrowserDetectedLanguage(i18n.language));
    }
    // Remove currently selected language from the language list (to prevent switching to the current language)
    const index = i18n.languages.indexOf(i18n.language);
    newLangs.splice(index, 1);
    return newLangs;
  };

  return (
    <AppBar position="static" className={classes.appBar + appBarClasses}>
      <Toolbar style={{ padding: "0 8px" }}>
        <Grid container item sm={12} xs={12} className={classes.name}>
          <Grid item sm={11} xs={11}>
            <BreadCrumbs />
          </Grid>
          <Grid item sm={1} xs={1} className={classes.menuIcon}>
            <Hidden mdUp>
              <MenuIcon
                onClick={() => {
                  dispatch(actions.toggleDrawer());
                }}
              />
            </Hidden>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  brandText: PropTypes.string
};

export default Navbar;
