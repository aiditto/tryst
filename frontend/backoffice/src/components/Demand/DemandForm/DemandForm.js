import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./demandFormStyle";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import RequirementsModal from "components/Quill/RequirementModal/RequirementsModal";
import InfoModal from "components/Quill/InfoModal/InfoModal";
import ThankyouModal from "components/Quill/ThankyouModal/ThankyouModal";
import * as actions from "store/actions/rootAction";
import { DEMANDS_SELECTORS } from "store/selectors/rootSelector";

const useStyles = makeStyles(styles);

const DemandForm = props => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [openRequirementsModal, setOpenRequirementsModal] = useState(false);
  const [openThankyouModal, setOpenThankyouModal] = useState(false);
  const [title, setTitle] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [status, setStatus] = useState(false);
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [thankyouSection, setThankyouSection] = useState(null);
  const [disableIdentifier, setDisableIdentifier] = useState(false);
  const [demandId, setDemandId] = useState(null);
  const channelId = props.channelId;

  useEffect(() => {
    if (props.mode) {
      initFormData();
    } else {
      clearFormData();
    }
  }, [props.mode]);

  useEffect(() => {
    if (props.data) {
      setDemandId(props.data.id);
      initFormData();
    }
  }, [props.data]);

  const initFormData = () => {
    const data = props.data;
    setTitle(data.title);
    setIdentifier(data.identifier);
    setStatus(() => {
      return (data.status || "").toLowerCase() === "published";
    });
    setDescription(data.description);
    setRequirements(data.requirements);
    setThankyouSection(data.thankyouSection);
    setDisableIdentifier(true);
  };

  const clearFormData = () => {
    setTitle("");
    setIdentifier("");
    setDescription("");
    setStatus(false);
    setRequirements("");
    setThankyouSection(null);
    setDisableIdentifier(false);
  };

  const suggestIdentifier = title => {
    let newId;
    if (!props.mode) {
      newId = idSanityCheck(title);
      setIdentifier(newId);
      setTitle(title);
      return newId;
    }
    setTitle(title);
  };

  const idSanityCheck = id => {
    let saneId = "";
    let nextchar;
    if (id.length > 0) {
      id.toLowerCase()
        .split("")
        .map(char => {
          if (char === "å" || char === "ä") {
            nextchar = "a";
          } else if (char === "ö") {
            nextchar = "o";
          } else if (char.match(/^[0-9a-zA-Z]+$/)) {
            nextchar = char;
          } else {
            if (saneId[saneId.length - 1] === "-") {
              nextchar = "";
            } else {
              nextchar = "-";
            }
          }
          saneId = saneId + nextchar;
        });
    } else {
      saneId = "";
    }
    if (saneId[saneId.length - 1] === "-") {
      return saneId.slice(0, -1);
    }
    return saneId;
  };

  const handleChangeIdentifier = id => {
    let saneId = "";
    let nextchar;
    if (id.length > 0) {
      id.toLowerCase()
        .split("")
        .map(char => {
          if (char === "å" || char === "ä") {
            nextchar = "a";
          } else if (char === "ö") {
            nextchar = "o";
          } else if (char.match(/^[0-9a-zA-Z]+$/)) {
            nextchar = char;
          } else {
            if (saneId[saneId.length - 1] === "-") {
              nextchar = "";
            } else {
              nextchar = "-";
            }
          }
          saneId = saneId + nextchar;
        });
    } else {
      saneId = "";
    }
    setIdentifier(saneId);
  };

  const handleUpdateInfo = desc => {
    setDescription(desc);
  };

  const closeInfoModal = () => {
    setOpenInfoModal(false);
  };

  const closeThankyouModal = () => {
    setOpenThankyouModal(false);
  };

  const handleUpdateThankyou = (data, title) => {
    setThankyouSection({ title: title, description: data });
  };

  const handleUpdateRequirements = reqs => {
    setRequirements(reqs);
  };

  const closeRequirementsModal = () => {
    setOpenRequirementsModal(false);
  };

  const handleClose = () => {
    props.setExpandable(false);
    clearFormData();
    props.setMode();
  };

  const saveNewDemand = e => {
    if (props.mode) {
      updateDemand(e);
    } else {
      e.preventDefault();
      let statusString;
      if (status) {
        statusString = "published";
      } else {
        statusString = "drafted";
      }

      const data = {
        title,
        description,
        requirements,
        thankyouSection,
        identifier,
        status: statusString,
        channelId: channelId
      };

      props.createDemand(data, channelId, t, responseStatus => {
        if (responseStatus === "success") {
          handleClose();
        }
      });
    }
  };

  const updateDemand = e => {
    e.preventDefault();
    let statusString;
    if (status) {
      statusString = "published";
    } else {
      statusString = "drafted";
    }

    const data = {
      title,
      description,
      requirements,
      thankyouSection,
      identifier,
      status: statusString,
      channelId: channelId
    };

    props.updateDemand(demandId, channelId, data, t, responseStatus => {
      if (responseStatus === "success") {
        handleClose();
      }
    });
  };

  return (
    <form>
      <Grid container>
        <Grid item xs={12} md={10} sm={8} className={classes.formInputStyles}>
          <TextField
            fullWidth
            label={t("demands.form.labels.title")}
            type="text"
            onChange={e => suggestIdentifier(e.target.value)}
            value={title}
          />
        </Grid>
        <Grid item xs={12} md={10} sm={8} className={classes.formInputStyles}>
          <TextField
            type="text"
            fullWidth
            label={t("demands.form.labels.identifier")}
            value={identifier}
            disabled={disableIdentifier}
            onChange={e => handleChangeIdentifier(e.target.value)}
          />
        </Grid>

        <Grid item md={12} xs={12} className={classes.switchWrap}>
          <Grid item onClick={() => setStatus(false)} className={classes.switchText}>
            {t("demands.form.labels.drafted")}
          </Grid>

          <Switch
            checked={status}
            onChange={() => {
              setStatus(!status);
            }}
            name="Status"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />

          <Grid item onClick={() => setStatus(true)} className={classes.switchText}>
            {t("demands.form.labels.published")}
          </Grid>
        </Grid>

        <Grid item md={12} xs={12}>
          <Button
            className={classes.btnColorInfo}
            square="true"
            onClick={() => {
              setOpenInfoModal(true);
              setOpenRequirementsModal(false);
              setOpenThankyouModal(false);
            }}
          >
            {t("quill.info")}
          </Button>
          <Button
            className={classes.btnColorWarning}
            square="true"
            onClick={() => {
              setOpenInfoModal(false);
              setOpenThankyouModal(false);
              setOpenRequirementsModal(true);
            }}
          >
            {t("quill.reqs")}
          </Button>
          <Button
            className={classes.btnColorWarning}
            square="true"
            onClick={() => {
              setOpenThankyouModal(true);
              setOpenRequirementsModal(false);
              setOpenInfoModal(false);
            }}
          >
            {t("quill.thankyou")}
          </Button>
        </Grid>

        <Grid item md={12} xs={12} className={classes.btnWrapper}>
          <Button square="true" className={classes.btnColorCancel} onClick={handleClose}>
            {t("sites.form.cancel")}
          </Button>

          <InfoModal
            open={openInfoModal}
            setOpenInfoModal={closeInfoModal}
            saveContents={(data, text) => {
              handleUpdateInfo(data, text);
            }}
            info={description}
            title={""}
          />
          <RequirementsModal
            open={openRequirementsModal}
            setOpenRequirementsModal={closeRequirementsModal}
            saveContents={(data, text) => {
              handleUpdateRequirements(data, text);
            }}
            info={requirements}
            title={""}
          />

          <ThankyouModal
            open={openThankyouModal}
            setOpenThankyouModal={closeThankyouModal}
            saveContents={(data, title) => {
              handleUpdateThankyou(data, title);
            }}
            info={thankyouSection}
          />

          <Button
            square="true"
            type="submit"
            className={classNames(classes.btnColorPrimary, {
              [classes.disabled]: !title || !identifier
            })}
            disabled={!title || !identifier}
            onClick={e => saveNewDemand(e)}
          >
            {t("demands.form.submit")}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    error: DEMANDS_SELECTORS.getError(state),
    loading: DEMANDS_SELECTORS.getLoading(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createDemand: (data, channelId, t, callback) => dispatch(actions.createNewDemand(data, channelId, t, callback)),
    updateDemand: (demandId, channelId, data, t, callback) =>
      dispatch(actions.updateDemandById(demandId, channelId, data, t, callback))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DemandForm);
