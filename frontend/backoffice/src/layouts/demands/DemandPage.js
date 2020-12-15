/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./demandPageStyle";
import { useTranslation } from "react-i18next";
import LoadingScreen from "components/LoadingScreen/LoadingScreen";
import * as actions from "store/actions/rootAction";
import { DEMANDS_SELECTORS } from "store/selectors/rootSelector";
import SideBar from "components/Navbars/SideBar";
import CardHeader from "components/CardHeader/CardHeader";
import HeaderSection from "components/HeaderSection/View/HeaderSection";
import EditHeaderSection from "components/HeaderSection/Edit/EditHeaderSection";
import ConfirmDialog from "components/ConfirmDialog/ConfirmDialog";
import TextSection from "components/TextSection/View/TextSection";
import EditTextSection from "components/TextSection/Edit/EditTextSection";
import FormSection from "components/FormSection/View/FormSection";
import EditFormSection from "components/FormSection/Edit/EditFormSection";
import ListSection from "components/ListSection/View/ListSection";
import EditListSection from "components/ListSection/Edit/EditListSection";
import { SECTION_KEYS } from "shared/utility";
import { useParams } from "react-router-dom";

const useStyles = makeStyles(styles);

const DemandPage = props => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [channelList, setChannelList] = useState([]);
  const [demandId, setDemandId] = useState(null);
  const [demandIdentifier, setDemandIdentifier] = useState("");
  const [demandName, setDemandName] = useState("");
  const [sectionName, setSectionName] = useState("");

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openEditHeader, setOpenEditHeader] = useState(false);
  const [openEditTextSection, setOpenEditTextSection] = useState(false);
  const [openEditFormSection, setOpenEditFormSection] = useState(false);
  const [openEditListSection, setOpenEditListSection] = useState(false);

  const param = useParams();

  useEffect(() => {
    if (param.identifier) {
      setDemandIdentifier(param.identifier);
      props.getDemandByIdentifier(param.identifier);
    }
  }, [param && param.identifier]);

  useLayoutEffect(() => {
    if (props.demand && props.demand.id) {
      setDemandId(props.demand.id);
      setDemandName(props.demand.name);
    }
  }, [props.demand && props.demand.id]);

  const editHeaderSectionHandler = () => {
    setOpenEditHeader(true);
  };

  const editTextSectionHandler = () => {
    setOpenEditTextSection(true);
  };

  const editFormSectionHandler = () => {
    setOpenEditFormSection(true);
  };

  const editListSectionHandler = () => {
    setOpenEditListSection(true);
  };

  const deleteDemandSectionHandler = () => {
    let dataToDelete;
    switch (sectionName) {
      case SECTION_KEYS.HEADER:
        dataToDelete = {
          headerSection: {}
        };
        props.patchDemand(demandId, dataToDelete, t, "demand", responseStatus => {
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
        props.patchDemand(demandId, dataToDelete, t, "demand", responseStatus => {
          if (responseStatus === "success") {
            closeEditTextSection();
            setOpenConfirm(false);
          }
        });
        break;
      case SECTION_KEYS.FORM_SECTION:
        dataToDelete = {
          formSection: {}
        };
        props.patchDemand(demandId, dataToDelete, t, "demand", responseStatus => {
          if (responseStatus === "success") {
            closeEditFormSection();
            setOpenConfirm(false);
          }
        });
        break;
      case SECTION_KEYS.LIST_SECTION:
        dataToDelete = {
          listSection: {}
        };
        props.patchDemand(demandId, dataToDelete, t, "demand", responseStatus => {
          if (responseStatus === "success") {
            closeEditListSection();
            setOpenConfirm(false);
          }
        });
        break;
      default:
    }
  };

  const saveDemandSectionHandler = (data, section) => {
    let dataToSave;
    switch (section) {
      case SECTION_KEYS.HEADER:
        dataToSave = { headerSection: data };
        props.patchDemand(demandId, dataToSave, t, "demand", responseStatus => {
          if (responseStatus === "success") {
            closeHeaderSection();
          }
        });
        break;
      case SECTION_KEYS.TEXT_SECTION:
        dataToSave = { textSection: data };
        props.patchDemand(demandId, dataToSave, t, "demand", responseStatus => {
          if (responseStatus === "success") {
            closeEditTextSection();
          }
        });
        break;
      case SECTION_KEYS.FORM_SECTION:
        dataToSave = { formSection: data };
        props.patchDemand(demandId, dataToSave, t, "demand", responseStatus => {
          if (responseStatus === "success") {
            closeEditFormSection();
          }
        });
        break;
      case SECTION_KEYS.LIST_SECTION:
        dataToSave = { listSection: data };
        props.patchDemand(demandId, dataToSave, t, "demand", responseStatus => {
          if (responseStatus === "success") {
            closeEditListSection();
          }
        });
        break;
      default:
    }
  };
  /* 
  const saveListItemsHandler = listItems => {
    let dataToSave;
    dataToSave = {
      listSection: {
        listItems: listItems
      }
    };
    console.log("Data to save:", dataToSave);
    props.patchDemand(demandId, dataToSave, t);
  };
 */
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

  const closeEditFormSection = () => {
    setOpenEditFormSection(false);
  };

  const closeEditListSection = () => {
    setOpenEditListSection(false);
  };

  return (
    <>
      {channelList && (
        <SideBar children={channelList} section={"demands"} name={demandName} identifier={demandIdentifier} />
      )}
      {props.loading && <LoadingScreen />}
      <ConfirmDialog
        open={openConfirm}
        handleClose={() => {
          setOpenConfirm(false);
        }}
        deleteMsg={t("demands.deleteSectionConfirm", { demand: props.demand && props.demand.identifier })}
        handleDelete={deleteDemandSectionHandler}
      />
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={12} md={12}>
          {demandName && (
            <CardHeader
              section={SECTION_KEYS.HEADER}
              component={demandName}
              editHandler={editHeaderSectionHandler}
              deleteHandler={openDeleteDialog}
            />
          )}
          {props.demand && props.demand.headerSection && <HeaderSection data={props.demand.headerSection} />}
          <EditHeaderSection
            component={demandName}
            section={SECTION_KEYS.HEADER}
            data={props.demand && props.demand.headerSection}
            open={openEditHeader}
            saveContent={saveDemandSectionHandler}
            closeHandler={closeHeaderSection}
            deleteHandler={openDeleteDialog}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {demandName && (
            <CardHeader
              section={SECTION_KEYS.TEXT_SECTION}
              component={demandName}
              deleteHandler={openDeleteDialog}
              editHandler={editTextSectionHandler}
            />
          )}
          {props.demand && props.demand.textSection && <TextSection info={props.demand.textSection} />}
          <EditTextSection
            section={SECTION_KEYS.TEXT_SECTION}
            component={demandName}
            open={openEditTextSection}
            closeHandler={closeEditTextSection}
            saveContent={saveDemandSectionHandler}
            info={props.demand && props.demand.textSection}
            deleteHandler={openDeleteDialog}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {demandName && (
            <CardHeader
              section={SECTION_KEYS.LIST_SECTION}
              component={demandName}
              editHandler={editListSectionHandler}
              deleteHandler={openDeleteDialog}
            />
          )}
          {props.demand && props.demand.listSection && <ListSection data={props.demand.listSection} />}
          <EditListSection
            component={demandName}
            section={SECTION_KEYS.LIST_SECTION}
            data={props.demand && props.demand.listSection}
            open={openEditListSection}
            showCheckbox={false}
            saveContent={saveDemandSectionHandler}
            closeHandler={closeEditListSection}
            deleteHandler={openDeleteDialog}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {demandName && (
            <CardHeader
              section={SECTION_KEYS.FORM_SECTION}
              component={demandName}
              editHandler={editFormSectionHandler}
              deleteHandler={openDeleteDialog}
            />
          )}
          {props.demand && props.demand.formSection && <FormSection data={props.demand.formSection} />}
          <EditFormSection
            component={demandName}
            section={SECTION_KEYS.FORM_SECTION}
            data={props.demand && props.demand.formSection}
            open={openEditFormSection}
            saveContent={saveDemandSectionHandler}
            closeHandler={closeEditFormSection}
            deleteHandler={openDeleteDialog}
          />
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = state => {
  return {
    error: DEMANDS_SELECTORS.getError(state),
    loading: DEMANDS_SELECTORS.getLoading(state),
    demand: DEMANDS_SELECTORS.getDemand(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDemandByIdentifier: demandIdentifier => dispatch(actions.getDemandByIdentifier(demandIdentifier)),
    patchDemand: (demandId, data, t, page, callback) =>
      dispatch(actions.patchDemandById(demandId, data, t, page, callback))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DemandPage);
