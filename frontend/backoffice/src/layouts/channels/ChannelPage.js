/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./channelPageStyle";
import { useTranslation } from "react-i18next";
import LoadingScreen from "components/LoadingScreen/LoadingScreen";
import * as actions from "store/actions/rootAction";
import { CHANNELS_SELECTORS, CHANNEL_DEMANDS_SELECTORS } from "store/selectors/rootSelector";
import SideBar from "components/Navbars/SideBar";
import CardHeader from "components/CardHeader/CardHeader";
import HeaderSection from "components/HeaderSection/View/HeaderSection";
import EditHeaderSection from "components/HeaderSection/Edit/EditHeaderSection";
import ConfirmDialog from "components/ConfirmDialog/ConfirmDialog";
import TextSection from "components/TextSection/View/TextSection";
import EditTextSection from "components/TextSection/Edit/EditTextSection";
import { SECTION_KEYS } from "shared/utility";
import { useParams } from "react-router-dom";
import ButtonCard from "components/ButtonGroup/View/ButtonCard";
import EditButtonGroup from "components/ButtonGroup/Edit/EditButtonGroup";

const useStyles = makeStyles(styles);

const ChannelPage = props => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [demandList, setDemandList] = useState([]);
  const [channelId, setChannelId] = useState(null);
  const [channelIdentifier, setChannelIdentifier] = useState("");
  const [channelName, setChannelName] = useState("");
  const [sectionName, setSectionName] = useState("");

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openEditHeader, setOpenEditHeader] = useState(false);
  const [openEditTextSection, setOpenEditTextSection] = useState(false);
  const [openEditButtonGroup, setOpenEditButtonGroup] = useState(false);

  const param = useParams();

  useEffect(() => {
    if (param.identifier) {
      setChannelIdentifier(param.identifier);
      props.getChannelByIdentifier(param.identifier);
    }
  }, [param && param.identifier]);

  useLayoutEffect(() => {
    if (props.channel && props.channel.id) {
      setChannelId(props.channel.id);
      setChannelName(props.channel.name);
      props.getChannelDemands(props.channel.id);
    }
  }, [props.channel && props.channel.id]);

  useEffect(() => {
    if (props.channelDemands) {
      setDemandList(props.channelDemands);
    }
  }, [props.channelDemands]);

  const editHeaderSectionHandler = () => {
    setOpenEditHeader(true);
  };

  const editTextSectionHandler = () => {
    setOpenEditTextSection(true);
  };

  const editButtonGroupHandler = () => {
    setOpenEditButtonGroup(true);
  };

  const deleteChannelSectionHandler = () => {
    let dataToDelete;
    switch (sectionName) {
      case SECTION_KEYS.HEADER:
        dataToDelete = {
          headerSection: {}
        };
        props.patchChannel(channelId, dataToDelete, t, "channel", responseStatus => {
          if (responseStatus === "success") {
            closeHeaderSection();
            setOpenConfirm(false);
          }
        });
        break;
      case SECTION_KEYS.TEXT_SECTION:
        dataToDelete = {
          textSection: {}
        };
        props.patchChannel(channelId, dataToDelete, t, "channel", responseStatus => {
          if (responseStatus === "success") {
            closeEditTextSection();
            setOpenConfirm(false);
          }
        });
        break;
      case SECTION_KEYS.BUTTON_GROUP:
        dataToDelete = {
          buttonSection: {}
        };
        const dataForChannelDemandsPatch = {
          status: "archived"
        };
        props.patchChannel(channelId, dataToDelete, t, "channel", responseStatus => {
          if (responseStatus === "success") {
            props.patchChannelDemands(channelId, dataForChannelDemandsPatch);
            closeEditButtonGroup();
            setOpenConfirm(false);
          }
        });
        break;

      default:
    }
  };

  const saveChannelSectionHandler = (data, section) => {
    let dataToSave;
    switch (section) {
      case SECTION_KEYS.HEADER:
        dataToSave = { headerSection: data };
        props.patchChannel(channelId, dataToSave, t, "channel", responseStatus => {
          if (responseStatus === "success") {
            closeHeaderSection();
          }
        });
        break;
      case SECTION_KEYS.TEXT_SECTION:
        dataToSave = { textSection: data };
        props.patchChannel(channelId, dataToSave, t, "channel", responseStatus => {
          if (responseStatus === "success") {
            closeEditTextSection();
          }
        });
        break;
      case SECTION_KEYS.BUTTON_GROUP:
        dataToSave = { buttonSection: data };
        props.patchChannel(channelId, dataToSave, t, "channel", responseStatus => {
          if (responseStatus === "success") {
            closeEditTextSection();
          }
        });
        closeEditButtonGroup();
        break;
      default:
    }
  };

  const closeHeaderSection = () => {
    setOpenEditHeader(false);
  };

  const openDeleteDialog = section => {
    setOpenConfirm(true);
    setSectionName(section);
  };

  const closeEditTextSection = () => {
    setOpenEditTextSection(false);
  };

  const closeEditButtonGroup = () => {
    setOpenEditButtonGroup(false);
  };

  const closeEditButtonGroupHanlder = () => {
    setOpenEditButtonGroup(false);
  };

  return (
    <>
      {demandList && (
        <SideBar children={demandList} section={"demands"} name={channelName} identifier={channelIdentifier} />
      )}

      {(props.loading || props.channelDemandsLoading) && <LoadingScreen />}
      <ConfirmDialog
        open={openConfirm}
        handleClose={() => {
          setOpenConfirm(false);
        }}
        deleteMsg={t("channels.deleteSectionConfirm", { channel: props.channel && props.channel.identifier })}
        handleDelete={deleteChannelSectionHandler}
      />
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={12} md={12}>
          {channelName && (
            <CardHeader
              section={SECTION_KEYS.HEADER}
              component={channelName}
              editHandler={editHeaderSectionHandler}
              deleteHandler={openDeleteDialog}
            />
          )}
          {props.channel && props.channel.headerSection ? (
            <HeaderSection data={props.channel.headerSection} />
          ) : (
            <Grid item md={12} className={classes.emptySection}>
              <h2>{t("emptyText")}</h2>
            </Grid>
          )}
          <EditHeaderSection
            component={channelName}
            section={SECTION_KEYS.HEADER}
            data={props.channel && props.channel.headerSection}
            open={openEditHeader}
            saveContent={saveChannelSectionHandler}
            closeHandler={closeHeaderSection}
            deleteHandler={openDeleteDialog}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {channelName && (
            <CardHeader
              section={SECTION_KEYS.TEXT_SECTION}
              component={channelName}
              deleteHandler={openDeleteDialog}
              editHandler={editTextSectionHandler}
            />
          )}
          {props.channel && props.channel.textSection ? (
            <TextSection info={props.channel.textSection} />
          ) : (
            <Grid item md={12} className={classes.emptySection}>
              <h2>{t("emptyText")}</h2>
            </Grid>
          )}
          <EditTextSection
            section={SECTION_KEYS.TEXT_SECTION}
            component={channelName}
            open={openEditTextSection}
            closeHandler={closeEditTextSection}
            saveContent={saveChannelSectionHandler}
            info={props.channel && props.channel.textSection}
            deleteHandler={openDeleteDialog}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {channelName && (
            <CardHeader
              section={SECTION_KEYS.BUTTON_GROUP}
              component={channelName}
              deleteHandler={openDeleteDialog}
              editHandler={editButtonGroupHandler}
            />
          )}
          {props.channel && props.channel.buttonSection ? (
            <TextSection info={props.channel.buttonSection} />
          ) : (
            <Grid item md={12} className={classes.emptySection}>
              <h2>{t("emptyText")}</h2>
            </Grid>
          )}
          <Grid container item>
            {demandList &&
              demandList.map(demand => {
                return <ButtonCard key={demand.id} data={demand} basePath="demands" />;
              })}
          </Grid>
          <EditButtonGroup
            section={SECTION_KEYS.BUTTON_GROUP}
            component={channelName}
            open={openEditButtonGroup}
            card={"demand"}
            info={props.channel && props.channel.buttonSection}
            styling={props.site && props.site.settings}
            id={props.channel && props.channel.id}
            items={demandList}
            closeHandler={closeEditButtonGroupHanlder}
            saveContent={saveChannelSectionHandler}
            deleteHandler={openDeleteDialog}
          />
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = state => {
  return {
    error: CHANNELS_SELECTORS.getError(state),
    loading: CHANNELS_SELECTORS.getLoading(state),
    channel: CHANNELS_SELECTORS.getChannel(state),
    channelDemandsLoading: CHANNEL_DEMANDS_SELECTORS.getLoading(state),
    channelDemands: CHANNEL_DEMANDS_SELECTORS.getDemands(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getChannelByIdentifier: channelIdentifier => dispatch(actions.getChannelByIdentifier(channelIdentifier)),
    getChannelDemands: channelId => dispatch(actions.getChannelDemands(channelId)),
    patchChannelDemands: (channelId, data) => dispatch(actions.patchChannelDemands(channelId, data)),
    patchChannel: (channelId, data, t, page, callback) =>
      dispatch(actions.patchChannelById(channelId, data, t, page, callback))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelPage);
