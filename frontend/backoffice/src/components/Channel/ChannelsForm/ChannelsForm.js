import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./channelsFormStyle";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import InfoModal from "components/Quill/InfoModal/InfoModal";
import { CHANNELS_SELECTORS } from "store/selectors/rootSelector";
import * as actions from "store/actions/rootAction";

const useStyles = makeStyles(styles);

const ChannelsForm = props => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [title, setTitle] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [status, setStatus] = useState(false);
  const [description, setDescription] = useState("");
  const [disableIdentifier, setDisableIdentifier] = useState(false);
  const [channelId, setChannelId] = useState(null);
  const siteId = props.siteId;

  useEffect(() => {
    if (props.mode) {
      initFormData();
    } else {
      clearFormData();
    }
  }, [props.mode]);

  useEffect(() => {
    if (props.data) {
      setChannelId(props.data.id);
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
    setDisableIdentifier(true);
  };

  const clearFormData = () => {
    setTitle("");
    setIdentifier("");
    setDescription("");
    setStatus(false);
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

  const handleUpdateDescription = desc => {
    setDescription(desc);
  };

  const closeInfoModal = () => {
    setOpenInfoModal(false);
  };

  const handleClose = () => {
    props.setExpandable(false);
    clearFormData();
    props.setMode();
  };

  const handleChannel = e => {
    if (props.mode) {
      updateChannel(e);
    } else {
      e.preventDefault();
      addChannel(e);
    }
  };

  const addChannel = e => {
    let statusString;
    if (status) {
      statusString = "published";
    } else {
      statusString = "drafted";
    }

    const data = {
      title,
      description,
      identifier,
      status: statusString,
      siteId: siteId
    };

    props.createChannel(data, siteId, t, responseStatus => {
      if (responseStatus === "success") {
        handleClose();
      }
    });
  };

  const updateChannel = e => {
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
      identifier,
      status: statusString,
      siteId: siteId
    };

    props.updateChannel(channelId, siteId, data, t, responseStatus => {
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
            label={t("channels.form.labels.title")}
            type="text"
            onChange={e => suggestIdentifier(e.target.value)}
            value={title}
          />
        </Grid>

        <Grid item xs={12} md={10} sm={8} className={classes.formInputStyles}>
          <TextField
            type="text"
            fullWidth
            label={t("channels.form.labels.identifier")}
            value={identifier}
            disabled={disableIdentifier}
            onChange={e => handleChangeIdentifier(e.target.value)}
          />
        </Grid>

        <Grid className={classes.switchWrap}>
          <Grid item onClick={() => setStatus(false)} className={classes.switchText}>
            {t("channels.form.labels.drafted")}
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
            {t("channels.form.labels.published")}
          </Grid>
        </Grid>

        <Grid item md={12} xs={12}>
          <Button
            className={classes.btnColorInfo}
            square="true"
            onClick={() => {
              setOpenInfoModal(true);
            }}
          >
            {t("quill.info")}
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
              handleUpdateDescription(data, text);
            }}
            info={description}
            title={""}
          />

          <Button
            square="true"
            type="submit"
            className={classNames(classes.btnColorPrimary, {
              [classes.disabled]: !title || !identifier
            })}
            disabled={!title || !identifier}
            onClick={e => handleChannel(e)}
          >
            {t("channels.form.submit")}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    error: CHANNELS_SELECTORS.getError(state),
    loading: CHANNELS_SELECTORS.getLoading(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createChannel: (data, siteId, t, callback) => dispatch(actions.createNewChannel(data, siteId, t, callback)),
    updateChannel: (channelId, siteId, data, t, callback) =>
      dispatch(actions.updateChannelById(channelId, siteId, data, t, callback))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelsForm);
