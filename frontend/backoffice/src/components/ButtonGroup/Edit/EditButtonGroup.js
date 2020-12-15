import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Grid, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";
import styles from "./editButtonGroupStyle";
import { makeStyles } from "@material-ui/core/styles";
// Editable content
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
// Quill
import ReactQuill from "react-quill";
import { isEmpty } from "lodash";

import CardHeader from "components/CardHeader/CardHeader";
import ButtonCard from "../View/ButtonCard";
import ButtonCardModel from "../Model/ButtonCardModel";
import { connect } from "react-redux";
import { CHANNELS_SELECTORS, DEMANDS_SELECTORS } from "store/selectors/rootSelector";
import * as actions from "store/actions/rootAction";
import LoadingScreen from "components/LoadingScreen/LoadingScreen";

const useStyles = makeStyles(styles);

const EditButtonGroup = props => {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [maxWidth] = useState("md");
  const [description, setDesctiption] = useState("");
  const [openButtonCardModel, setOpenButtonCardModel] = useState(false);

  const section = props.section;
  const component = props.component;
  const card = props.card;
  const id = props.id;

  useEffect(() => {
    if (!isEmpty(props.info)) {
      setDesctiption(props.info.description);
    } else {
      setDesctiption("");
    }
  }, [props && props.info]);

  const modules = {
    clipboard: {
      matchVisual: false
    },
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link"],
      ["clean"]
    ]
  };

  const handleDescription = value => {
    setDesctiption(value);
  };

  const createPageHandler = (data, section) => {
    switch (card) {
      case "channel":
        data["siteId"] = id;

        props.createChannel(data, id, t, responseStatus => {
          if (responseStatus === "success") {
            setOpenButtonCardModel(false);
          }
        });
        break;
      case "demand":
        data["channelId"] = id;
        props.createDemand(data, id, t, responseStatus => {
          if (responseStatus === "success") {
            setOpenButtonCardModel(false);
          }
        });
        break;
      default:
    }
  };

  return (
    <Grid container className={classes.root}>
      {(props.channelsLoading || props.demandsLoading) && <LoadingScreen />}
      <Grid item xs={12} sm={12} md={4}>
        <Dialog
          fullScreen={fullScreen}
          fullWidth={true}
          maxWidth={maxWidth}
          disableBackdropClick
          open={props.open}
          onClose={() => {
            props.closeHandler();
          }}
        >
          <CardHeader section={section} component={component} showButtons={false} />
          <DialogContent>
            <DialogContentText>
              <Grid
                container
                item
                xs={12}
                sm={12}
                md={12}
                className={classes.quillContainer}
                alignItems="flex-start"
                justify="flex-start"
              >
                <Grid item xs={12} sm={12} md={12}>
                  <ReactQuill
                    className={classes.quill}
                    modules={modules}
                    value={description}
                    onChange={handleDescription}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
            <Grid container item className={classes.itemList}>
              {props.items &&
                props.items.map(item => {
                  return (
                    <ButtonCard
                      key={item.id}
                      data={item}
                      edit={true}
                      card={card}
                      section={section}
                      component={component}
                      styling={props.styling && props.styling}
                    />
                  );
                })}
              <Button
                size="large"
                square="true"
                onClick={() => setOpenButtonCardModel(true)}
                className={classes.addBtn}
                startIcon={<AddIcon />}
              >
                {t("buttonCard.create")}
              </Button>
              <ButtonCardModel
                open={openButtonCardModel}
                component={component}
                section={section}
                settings={props.styling && props.styling}
                modeUpdate={false}
                saveContent={(data, section) => {
                  createPageHandler(data, section);
                }}
                closeHandler={() => {
                  setOpenButtonCardModel(false);
                }}
              />
            </Grid>
          </DialogContent>

          <DialogActions>
            <Grid item md={12} sm={12} xs={12}>
              <Button
                size="large"
                variant="contained"
                square="true"
                className={classes.deleteBtn}
                autoFocus
                startIcon={<DeleteIcon />}
                onClick={() => {
                  props.deleteHandler(section);
                }}
                color="primary"
              >
                {t("quill.delete")}
              </Button>
            </Grid>
            <Button size="large" square="true" onClick={() => props.closeHandler()} className={classes.closeBtn}>
              {t("quill.cancel")}
            </Button>
            <Button
              size="large"
              square="true"
              className={classes.saveBtn}
              autoFocus
              onClick={() => {
                const buttonGroup = {
                  description: description
                };
                props.saveContent(buttonGroup, section);
              }}
              color="primary"
            >
              {t("quill.submit")}
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    channelsError: CHANNELS_SELECTORS.getError(state),
    channelsLoading: CHANNELS_SELECTORS.getLoading(state),
    demandsError: DEMANDS_SELECTORS.getError(state),
    demandsLoading: DEMANDS_SELECTORS.getLoading(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createChannel: (data, siteId, t, callback) => dispatch(actions.createNewChannel(data, siteId, t, callback)),
    createDemand: (data, channelId, t, callback) => dispatch(actions.createNewDemand(data, channelId, t, callback))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditButtonGroup);
