/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./sitePageStyle";
import { useTranslation } from "react-i18next";
import LoadingScreen from "components/LoadingScreen/LoadingScreen";
import * as actions from "store/actions/rootAction";
import { SITES_SELECTORS, SITE_CHANNELS_SELECTORS } from "store/selectors/rootSelector";
import SideBar from "components/Navbars/SideBar";
import CardHeader from "components/CardHeader/CardHeader";
import HeaderSection from "components/HeaderSection/View/HeaderSection";
import EditHeaderSection from "components/HeaderSection/Edit/EditHeaderSection";
import AboutUsSection from "components/AboutUsSection/View/AboutUsSection";
import EditAboutUsSection from "components/AboutUsSection/Edit/EditAboutUsSection";
import ConfirmDialog from "components/ConfirmDialog/ConfirmDialog";
import TextSection from "components/TextSection/View/TextSection";
import EditTextSection from "components/TextSection/Edit/EditTextSection";
import { SECTION_KEYS } from "shared/utility";
import { useParams } from "react-router-dom";
import ButtonCard from "components/ButtonGroup/View/ButtonCard";
import EditButtonGroup from "components/ButtonGroup/Edit/EditButtonGroup";

const useStyles = makeStyles(styles);

const SitePage = props => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [channelList, setChannelList] = useState([]);
  const stateProps = props.location.state;
  const [siteId, setSiteId] = useState(null);
  const [siteIdentifier, setSiteIdentifier] = useState("");
  const [siteName, setSiteName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [siteSettings, setSiteSettings] = useState("");
  const [siteStatus, setSiteStatus] = useState("");
  const [openEditHeader, setOpenEditHeader] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openEditTextSection, setOpenEditTextSection] = useState(false);
  const [openEditAboutusSection, setOpenEditAboutusSection] = useState(false);
  const [openEditButtonGroup, setOpenEditButtonGroup] = useState(false);

  const param = useParams();
  const stateParams = props.location.state;

  useEffect(() => {
    props.getUserId();
  }, []);

  useEffect(() => {
    if (param.identifier) {
      setSiteIdentifier(param.identifier);
      props.getSiteByIdentifier(param.identifier);
    }
  }, [param && param.identifier]);

  useLayoutEffect(() => {
    if (props.site && props.site.id) {
      setSiteId(props.site.id);
      setSiteName(props.site.name);
      setSiteSettings(props.site.settings);
      setSiteStatus(props.site.status);
      props.getSiteChannels(props.site.id);
    }
  }, [props.site && props.site.id]);

  useEffect(() => {
    if (stateParams) {
      setSiteId(stateParams.site.id);
      setSiteName(stateParams.site.name);
    }
  }, [stateParams]);

  useEffect(() => {
    if (props.siteChannels) {
      setChannelList(props.siteChannels);
    }
  }, [props.siteChannels]);

  const editHeaderSectionHandler = () => {
    setOpenEditHeader(true);
  };

  const editTextSectionHandler = () => {
    setOpenEditTextSection(true);
  };

  const editAboutusSectionHandler = () => {
    setOpenEditAboutusSection(true);
  };

  const editButtonGroupHandler = () => {
    setOpenEditButtonGroup(true);
  };

  const deleteSiteSectionHandler = () => {
    let dataToDelete;
    switch (sectionName) {
      case SECTION_KEYS.HEADER:
        dataToDelete = {
          headerSection: {}
        };
        closeHeaderSection();
        break;
      case SECTION_KEYS.TEXT_SECTION:
        dataToDelete = {
          textSection: {}
        };
        closeEditTextSection();
        break;
      case SECTION_KEYS.BUTTON_GROUP:
        dataToDelete = {
          buttonSection: {}
        };
        const dataForSiteChannelsPatch = {
          status: "archived"
        };
        props.patchSiteChannels(siteId, dataForSiteChannelsPatch);
        closeEditButtonGroup();
        break;
      case SECTION_KEYS.ABOUT_US:
        dataToDelete = {
          aboutusSection: {}
        };
        closeEditAboutusSection();
        break;

      default:
    }

    props.patchSite(siteId, dataToDelete, t);
    setOpenConfirm(false);
  };

  const saveSiteSectionHandler = (data, section) => {
    let dataToSave;
    switch (section) {
      case SECTION_KEYS.HEADER:
        dataToSave = { headerSection: data };
        closeHeaderSection();
        break;
      case SECTION_KEYS.TEXT_SECTION:
        dataToSave = { textSection: data };
        closeEditTextSection();
        break;
      case SECTION_KEYS.ABOUT_US:
        dataToSave = { aboutusSection: data };
        closeEditAboutusSection();
        break;
      case SECTION_KEYS.BUTTON_GROUP:
        dataToSave = { buttonSection: data };
        closeEditButtonGroup();
        break;

      default:
    }

    props.patchSite(siteId, dataToSave, t);
  };

  const openDeleteDialog = section => {
    setOpenConfirm(true);
    setSectionName(section);
  };

  const closeHeaderSection = () => {
    setOpenEditHeader(false);
  };

  const closeEditTextSection = () => {
    setOpenEditTextSection(false);
  };

  const closeEditButtonGroup = () => {
    setOpenEditButtonGroup(false);
  };

  const closeEditAboutusSection = () => {
    setOpenEditAboutusSection(false);
  };

  const closeEditButtonGroupHanlder = () => {
    setOpenEditButtonGroup(false);
  };

  return (
    <>
      {channelList && (
        <SideBar
          children={channelList}
          section={t("navbar.sites")}
          name={siteName}
          identifier={siteIdentifier}
          siteId={siteId}
          previewBtn={true}
        />
      )}
      {(props.loading || props.siteChannelsLoading) && <LoadingScreen />}
      <ConfirmDialog
        open={openConfirm}
        handleClose={() => {
          setOpenConfirm(false);
        }}
        deleteMsg={t("sites.deleteSectionConfirm", { site: props.site && props.site.identifier })}
        handleDelete={deleteSiteSectionHandler}
      />

      <Grid container item md={8} justify="center" className={classes.root}>
        <Grid item md={12} className={classes.topHeading}>
          {siteName && <h2>{siteName}</h2>}
          {siteStatus.toLowerCase() === "published" && (
            <div className={classes.statusBox}>
              <div className={classes.publishedIcon}> </div>
              <p className={classes.statusTitleStyle}>{t("sites.status.published")}</p>
            </div>
          )}

          {siteStatus.toLowerCase() === "drafted" && (
            <div className={classes.statusBox}>
              <div className={classes.draftedIcon}></div>
              <p className={classes.statusTitleStyle}>{t("sites.status.drafted")}</p>
            </div>
          )}
          {siteStatus.toLowerCase() === "archived" && (
            <div className={classes.statusBox}>
              <div className={classes.archivedIcon}></div>{" "}
              <p className={classes.statusTitleStyle}>{t("sites.status.archived")}</p>
            </div>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {siteName && (
            <CardHeader
              section={SECTION_KEYS.HEADER}
              component={siteName}
              editHandler={editHeaderSectionHandler}
              deleteHandler={openDeleteDialog}
            />
          )}
          {props.site && props.site.headerSection ? (
            <HeaderSection data={props.site.headerSection} />
          ) : (
            <Grid item md={12} className={classes.emptySection}>
              <h2>{t("emptyText")}</h2>
            </Grid>
          )}
          <EditHeaderSection
            component={siteName}
            section={SECTION_KEYS.HEADER}
            data={props.site && props.site.headerSection}
            settings={props.site && props.site.settings}
            open={openEditHeader}
            saveContent={saveSiteSectionHandler}
            closeHandler={closeHeaderSection}
            deleteHandler={openDeleteDialog}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {siteName && (
            <CardHeader
              section={SECTION_KEYS.TEXT_SECTION}
              component={siteName}
              deleteHandler={openDeleteDialog}
              editHandler={editTextSectionHandler}
            />
          )}
          {props.site && props.site.textSection ? (
            <TextSection info={props.site.textSection} />
          ) : (
            <Grid item md={12} className={classes.emptySection}>
              <h2>{t("emptyText")}</h2>
            </Grid>
          )}
          <EditTextSection
            section={SECTION_KEYS.TEXT_SECTION}
            component={siteName}
            open={openEditTextSection}
            closeHandler={closeEditTextSection}
            saveContent={saveSiteSectionHandler}
            info={props.site && props.site.textSection}
            deleteHandler={openDeleteDialog}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {siteName && (
            <CardHeader
              section={SECTION_KEYS.BUTTON_GROUP}
              component={siteName}
              deleteHandler={openDeleteDialog}
              editHandler={editButtonGroupHandler}
            />
          )}
          {props.site && props.site.buttonSection ? (
            <TextSection info={props.site.buttonSection} />
          ) : (
            <Grid item md={12} className={classes.emptySection}>
              <h2>{t("emptyText")}</h2>
            </Grid>
          )}
          <Grid container item>
            {channelList &&
              channelList.map(channel => {
                return <ButtonCard key={channel.id} data={channel} basePath="channels" />;
              })}
          </Grid>
          <EditButtonGroup
            section={SECTION_KEYS.BUTTON_GROUP}
            component={siteName}
            open={openEditButtonGroup}
            card={"channel"}
            info={props.site && props.site.buttonSection}
            styling={props.site && props.site.settings}
            id={props.site && props.site.id}
            items={channelList}
            closeHandler={closeEditButtonGroupHanlder}
            saveContent={saveSiteSectionHandler}
            deleteHandler={openDeleteDialog}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {siteName && (
            <CardHeader
              section={SECTION_KEYS.ABOUT_US}
              component={siteName}
              deleteHandler={openDeleteDialog}
              editHandler={editAboutusSectionHandler}
            />
          )}
          {props.site && props.site.aboutusSection ? (
            <AboutUsSection data={props.site.aboutusSection} />
          ) : (
            <Grid item md={12} className={classes.emptySection}>
              <h2>{t("emptyText")}</h2>
            </Grid>
          )}
          <EditAboutUsSection
            component={siteName}
            section={SECTION_KEYS.ABOUT_US}
            data={props.site && props.site.aboutusSection}
            open={openEditAboutusSection}
            closeHandler={closeEditAboutusSection}
            saveContent={saveSiteSectionHandler}
            deleteHandler={openDeleteDialog}
          />
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = state => {
  return {
    error: SITES_SELECTORS.getError(state),
    loading: SITES_SELECTORS.getLoading(state),
    site: SITES_SELECTORS.getSite(state),
    siteChannelsLoading: SITE_CHANNELS_SELECTORS.getLoading(state),
    siteChannels: SITE_CHANNELS_SELECTORS.getChannels(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSiteChannels: siteId => dispatch(actions.getSiteChannels(siteId)),
    patchSiteChannels: (siteId, data) => dispatch(actions.patchSiteChannels(siteId, data)),
    getSiteByIdentifier: siteIdentifier => dispatch(actions.getSiteByIdentifier(siteIdentifier)),
    getUserId: () => dispatch(actions.getUserId()),
    patchSite: (siteId, data, t) => dispatch(actions.patchSiteById(siteId, data, t))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SitePage);
