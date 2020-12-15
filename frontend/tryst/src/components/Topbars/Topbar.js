/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, createMuiTheme, Hidden, Drawer, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./topbarStyle";
import { Menu, LocationCity } from "@material-ui/icons";

import { NavLink, useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { FALLBACK_PRIMARY_COLOR, FALLBACK_SECONDARY_COLOR } from "shared/utility";
import { connect } from "react-redux";
import * as actions from "store/actions/rootAction";
import { SITES_SELECTORS } from "store/selectors/rootSelector";

// Translation
import { useTranslation } from "react-i18next";
import useLanguage from "shared/contexts/useLanguage";

const useStyles = makeStyles(styles);

const Topbar = props => {
  const { t, i18n } = useTranslation();
  const { changeLanguage } = useLanguage();

  const param = useParams();
  const classes = useStyles();

  const [primaryColor, setPrimaryColor] = useState(FALLBACK_PRIMARY_COLOR);
  const [secondaryColor, setSecondaryColor] = useState(FALLBACK_SECONDARY_COLOR);
  const [language, setLanguage] = useState("");
  const [otherLanguage, setOtherLanguage] = useState("");

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: `${primaryColor}`
      },
      secondary: {
        main: `${secondaryColor}`
      },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2
    }
  });

  useEffect(() => {
    if (param.identifier) {
      props.getSite(param.identifier);
    }
  }, [param && param.identifier]);

  useEffect(() => {
    if (props.site && !isEmpty(props.site.settings)) {
      setPrimaryColor(props.site.settings.primaryColor);
      setSecondaryColor(props.site.settings.secondaryColor);
    } else {
      setPrimaryColor(FALLBACK_PRIMARY_COLOR);
      setSecondaryColor(FALLBACK_SECONDARY_COLOR);
    }
  }, [props.site && props.site.settings]);

  useEffect(() => {
    if (i18n.language) {
      setLanguage(parseBrowserDetectedLanguage(i18n.language));
      setOtherLanguage(getAvailableLanguages()[0]);
    }
  }, []);

  const handleLanguageSwitch = () => {
    const nextLang = otherLanguage;
    changeLanguage(otherLanguage);
    setOtherLanguage(language);
    setLanguage(nextLang);
  };

  // Checks if menu should be open or in mobil state
  const [open, setOpen] = useState(false);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const parseBrowserDetectedLanguage = lng => {
    const lang = lng.substring(0, 2);
    if (lang === "sv" || lng === "Svenska") {
      return "Svenska";
    } else {
      return "English";
    }
  };

  const getFlagIcon = lang => {
    if (lang === "Svenska") {
      return (
        <img
          alt="Svenska"
          src="https://catamphetamine.gitlab.io/country-flag-icons/3x2/SE.svg"
          className={classes.languageFlag}
        />
      );
    } else if (lang === "English") {
      return (
        <img
          alt="English"
          src="https://catamphetamine.gitlab.io/country-flag-icons/3x2/GB.svg"
          className={classes.languageFlag}
        />
      );
    }
    return "";
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

  var list = (
    <Button className={classes.languageSelectorButton} onClick={handleLanguageSwitch}>
      {getFlagIcon(otherLanguage)} {otherLanguage}
    </Button>
  );

  return (
    <AppBar
      position="static"
      className={classes.appBar}
      style={{ color: theme.palette.primary.main }}
    >
      <Toolbar className={classes.container}>
        <NavLink to={"/"} className={classes.logoWrapper} style={{ color: theme.palette.primary.main }}>
          {props.site && props.site.settings && props.site.settings.icon &&
            <div className={classes.logo}>
              <img src={props.site.settings.icon} className={classes.logoImg} />
            </div>
          }
          <span className={classes.siteName}>
            {props.site && props.site.name ? props.site.name : t("siteName")}
          </span>
        </NavLink>
        <Hidden smDown>{list}</Hidden>

        <Hidden mdUp>
          <Button className={classes.sidebarButton} aria-label="open drawer" onClick={handleDrawerToggle}>
            <Menu />
          </Button>
          <Drawer
            variant="temporary"
            anchor={"right"}
            open={open}
            classes={{
              paper: classes.drawerPaper
            }}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {list}
          </Drawer>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = state => {
  return {
    error: SITES_SELECTORS.getError(state),
    loading: SITES_SELECTORS.getLoading(state),
    site: SITES_SELECTORS.getSite(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSite: siteIdentifier => dispatch(actions.getSiteByIdentifier(siteIdentifier))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Topbar);
