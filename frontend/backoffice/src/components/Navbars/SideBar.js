import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Hidden from "@material-ui/core/Hidden";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import styles from "./sideBarStyle";
import { Link as RouterLink, NavLink, useHistory, Route } from "react-router-dom";
import * as actions from "store/actions/rootAction";
import { CHANNELS_SELECTORS, SITE_CHANNELS_SELECTORS, UI_SELECTORS } from "store/selectors/rootSelector";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import Fingerprint from "@material-ui/icons/Fingerprint";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import authenticationService from "services/auth.service";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CustomDropdown from "components/CustomDropdown/CustomDropdown";
import PreviewSite from "components/PreviewSite/PreviewSite";
import useLanguage from "shared/contexts/useLanguage";
import SettingsIcon from "@material-ui/icons/Settings";
import PeopleIcon from "@material-ui/icons/People";
import { Drawer, Typography } from "@material-ui/core";
import navstyles from "assets/jss/aiditto-pro-style/components/navbarStyle.js";
import DescriptionIcon from "@material-ui/icons/Description";

const useStyles = makeStyles(styles);
const useStylesNav = makeStyles(navstyles);

function ListItemLink(props) {
  const { to, open, items, icon, ...other } = props;
  const name = props.name;
  const loc = window.location.pathname.split("/").filter(x => x);
  const classes = useStyles();
  if (icon) {
    return (
      <ListItem>
        <NavLink to={to}>
          <Button>
            {icon}
            <ListItemText primary={name} />
          </Button>
        </NavLink>
      </ListItem>
    );
  }

  if (loc[2] && items) {
    return (
      <li>
        <ListItem button component={RouterLink} to={to} {...other} className={classes.expandableOption}>
          <ListItemText primary={name} />
          {!loc[2] && open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
        </ListItem>

        <List disablePadding dense>
          {items.map((subItem, index) => {
            return (
              <Typography variant={"body2"}>
                <ListItem key={index} className={classes.childItem}>
                  <NavLink to={subItem.to}>
                    <Button>
                      <DescriptionIcon />
                      <ListItemText
                        primary={subItem.label.length > 12 ? subItem.label.slice(0, 12) + " ..." : subItem.label}
                      />
                    </Button>
                  </NavLink>
                </ListItem>
              </Typography>
              // <ListItem key={index} to={subItem.to} component={RouterLink} button dense>
              //   <DescriptionIcon />
              //   <ListItemText primary={subItem.label}></ListItemText>
              // </ListItem>
            );
          })}
        </List>
      </li>
    );
  } else {
    return (
      <li>
        <ListItem button component={RouterLink} to={to} {...other} className={classes.expandableOption}>
          <ListItemText primary={name} />
        </ListItem>
      </li>
    );
  }
}

const SideBar = props => {
  const classes = useStyles();
  const classesNav = useStylesNav();
  const { t, i18n } = useTranslation();
  const { changeLanguage } = useLanguage();
  const [openPreviewSite, setOpenPreviewSite] = useState(false);

  let sideBarList = [
    {
      label: t("navbar.sites"),
      to: "/sites",
      items: []
    }
  ];

  let sitesRoutes = [
    {
      label: t("navbar.users"),
      to: "/users",
      icon: <PeopleIcon />
    },
    {
      label: t("navbar.settings"),
      to: `/sites/${props.identifier}/update-site`,
      icon: <SettingsIcon />
    }
  ];

  const [sideBar, setSideBar] = useState(sideBarList);
  const history = useHistory();
  const signOut = () => authenticationService.logout(history);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSideBar(sideBarList);
  }, [t]);

  const handleLanguage = lng => {
    changeLanguage(lng);
  };

  useEffect(() => {
    if (Array.isArray(props.children)) {
      let newData = [];
      newData.push({ parent: true, label: props.name, to: `/sites/${props.identifier}` });
      props.children.map(channel => {
        const item = { label: channel.name, to: "/channels/" + channel.identifier };
        newData.push(item);
      });
      const newList = sideBarList.map(item => {
        item.label = t("navbar.sites");
        if (props.section.toLowerCase() === item.label.toLowerCase()) {
          item.items = newData;
          return item;
        } else {
          return item;
        }
      });
      setSideBar(newList);
    }
  }, [props.children, props.name, t]);

  const logoutButton = () => {
    return (
      <Button className={classes.listItemButton} onClick={signOut}>
        <ExitToAppIcon className={classes.listItemIcon} />
        <ListItemText primary={t("navbar.logout")} className={classes.listItemText} />
      </Button>
    );
  };

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

  const previewSite = () => {
    setOpenPreviewSite(true);
    props.toggleDrawer();
  };

  const closePreviewSite = () => {
    setOpenPreviewSite(false);
  };

  const mobileList = () => {
    const loc = window.location.pathname.split("/").filter(x => x);
    return (
      <div>
        <nav className={classes.lists}>
          <List
            onClick={() => {
              props.toggleDrawer();
            }}
          >
            <>
              {authenticationService.isAuthenticated() && loc.length !== 0 && (
                <Typography variant={"button"}>
                  <ListItem>
                    {!props.previewBtn && (
                      <NavLink to={"/create-site"}>
                        <Button className={classes.newSiteButton}> {t("sideBar.buttons.add")}</Button>
                      </NavLink>
                    )}

                    {props.previewBtn && (
                      <Button className={classes.newSiteButton} onClick={previewSite}>
                        {t("sideBar.buttons.preview")}
                      </Button>
                    )}
                  </ListItem>
                </Typography>
              )}

              <div style={{ display: "none" }}>
                <PreviewSite open={openPreviewSite} closeHandler={closePreviewSite} />
              </div>
            </>
            <Typography variant={"body1"}>
              {sideBar &&
                authenticationService.isAuthenticated() &&
                sideBar.map((item, index) => {
                  return <ListItemLink key={index} to={item.to} name={item.label} items={item.items} open={open} />;
                })}
              {loc[2] &&
                sitesRoutes.map((item, index) => {
                  return <ListItemLink key={index} to={item.to} name={item.label} icon={item.icon} />;
                })}
            </Typography>
            <ListItem>{logoutButton()}</ListItem>
          </List>

          <List>
            <ListItem className={classes.langSelect}>
              <CustomDropdown
                id="language"
                languageSelector={true}
                dropdownList={getAvailableLanguages()}
                buttonText={parseBrowserDetectedLanguage(i18n.language)}
                onClick={event => {
                  handleLanguage(event);
                }}
              />
            </ListItem>
          </List>
        </nav>
      </div>
    );
  };
  const loc = window.location.pathname.split("/").filter(x => x);
  return (
    <>
      <Hidden mdUp>
        {props.showDrawer && (
          <Drawer
            variant="temporary"
            anchor={"right"}
            open={props.showDrawer}
            className={classesNav.drawerPaper}
            onClose={() => {
              props.toggleDrawer();
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {mobileList()}
          </Drawer>
        )}
      </Hidden>
      <Hidden smDown>
        <div className={classes.root}>
          <nav className={classes.lists} aria-label="mailbox folders">
            <List>
              <>
                {authenticationService.isAuthenticated() && loc.length !== 0 && (
                  <Typography variant={"button"}>
                    <ListItem>
                      {!props.previewBtn && (
                        <NavLink to={"/create-site"}>
                          <Button className={classes.newSiteButton}> {t("sideBar.buttons.add")}</Button>
                        </NavLink>
                      )}

                      {props.previewBtn && (
                        <Button className={classes.newSiteButton} onClick={previewSite}>
                          {t("sideBar.buttons.preview")}
                        </Button>
                      )}
                    </ListItem>
                  </Typography>
                )}
                <div style={{ display: "none" }}>
                  <PreviewSite open={openPreviewSite} closeHandler={closePreviewSite} />
                </div>
              </>
              <Typography variant={"body1"}>
                {sideBar &&
                  authenticationService.isAuthenticated() &&
                  sideBar.map((item, index) => {
                    return <ListItemLink key={index} to={item.to} name={item.label} items={item.items} open={open} />;
                  })}
                {loc[2] &&
                  sitesRoutes.map((item, index) => {
                    return <ListItemLink key={index} to={item.to} name={item.label} icon={item.icon} />;
                  })}
              </Typography>
              <ListItem>{logoutButton()}</ListItem>
              <ListItem className={classes.langSelect}>
                <CustomDropdown
                  id="language"
                  languageSelector={true}
                  dropdownList={getAvailableLanguages()}
                  buttonText={parseBrowserDetectedLanguage(i18n.language)}
                  onClick={event => {
                    handleLanguage(event);
                  }}
                />
              </ListItem>
            </List>
          </nav>
        </div>
      </Hidden>
    </>
  );
};

const mapStateToProps = state => {
  return {
    error: CHANNELS_SELECTORS.getError(state),
    loading: CHANNELS_SELECTORS.getLoading(state),
    siteChannelsLoading: SITE_CHANNELS_SELECTORS.getLoading(state),
    siteChannels: SITE_CHANNELS_SELECTORS.getChannels(state),
    showDrawer: UI_SELECTORS.getShowDrawer(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSiteChannels: siteId => dispatch(actions.getSiteChannels(siteId)),
    toggleDrawer: () => dispatch(actions.toggleDrawer())
  };
};

SideBar.defaultProps = {
  previewBtn: true
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
