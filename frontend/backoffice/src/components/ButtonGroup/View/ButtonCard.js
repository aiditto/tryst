/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  CardActions,
  Button,
  FormControl,
  MenuItem,
  Slide,
  Select
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./buttonCardStyle";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import EditIcon from "@material-ui/icons/Edit";

import ButtonCardModel from "../Model/ButtonCardModel";

import { connect } from "react-redux";
import { CHANNELS_SELECTORS, DEMANDS_SELECTORS } from "store/selectors/rootSelector";
import * as actions from "store/actions/rootAction";
import ConfirmDialog from "components/ConfirmDialog/ConfirmDialog";
import LoadingScreen from "components/LoadingScreen/LoadingScreen";

const ButtonCard = props => {
  const useStyles = makeStyles(styles);
  const { t } = useTranslation();
  const classes = useStyles();
  const [openButtonCardModel, setOpenButtonCardModel] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const [status, setStatus] = useState(props.data && props.data.status);
  const data = props.data;
  const baseUrl = props.basePath;
  const section = props.section;
  const component = props.component;
  const card = props.card;

  const handleStatusChange = e => {
    setStatus(e.target.value);
  };

  const handleSave = () => {
    let data = {
      status
    };
    switch (card) {
      case "channel":
        const channelId = props.data.id;
        props.patchChannel(channelId, data, t, "button-card", responseStatus => {
          if (responseStatus === "success") {
            setOpenButtonCardModel(false);
            setSelectOpen(false);
          }
        });
        break;
      case "demand":
        const demandId = props.data.id;
        props.patchDemand(demandId, data, t, "button-card", responseStatus => {
          if (responseStatus === "success") {
            setOpenButtonCardModel(false);
            setSelectOpen(false);
          }
        });
        break;
      default:
    }
  };

  const patchPageHandler = (data, section) => {
    switch (card) {
      case "channel":
        const channelId = props.data.id;
        props.patchChannel(channelId, data, t, "button-card", responseStatus => {
          if (responseStatus === "success") {
            setOpenButtonCardModel(false);
          }
        });
        break;
      case "demand":
        const demandId = props.data.id;
        props.patchDemand(demandId, data, t, "button-card", responseStatus => {
          if (responseStatus === "success") {
            setOpenButtonCardModel(false);
          }
        });
        break;
      default:
    }
  };

  const deletePageHandler = () => {
    const dataToPatch = {
      status: "archived"
    };
    switch (card) {
      case "channel":
        const channelId = props.data.id;
        props.patchChannel(channelId, dataToPatch, t, "button-card", responseStatus => {
          if (responseStatus === "success") {
            setOpenButtonCardModel(false);
            setOpenConfirm(false);
          }
        });
        break;
      case "demand":
        const demandId = props.data.id;
        props.patchDemand(demandId, dataToPatch, t, "button-card", responseStatus => {
          if (responseStatus === "success") {
            setOpenButtonCardModel(false);
            setOpenConfirm(false);
          }
        });
        break;
      default:
    }
  };

  const openDeleteDialog = section => {
    setOpenConfirm(true);
  };

  const ButtonCardContent = contentProps => {
    return (
      <CardContent className={classes.cardHeading} {...contentProps}>
        <Typography className={classes.cardHeadingTypography} variant="h5">
          {data.name}
        </Typography>
        <Typography variant="caption">{data.description}</Typography>
      </CardContent>
    );
  };

  return (
    <Grid container item xs={12} md={4} sm={6} lg={4}>
      {(props.channelsLoading || props.demandsLoading) && <LoadingScreen />}
      {data && (
        <Card className={classes.root}>
          {props.edit && (
            <div className={classes.statusStyle}>
              <FormControl variant="standard" className={classes.formControl}>
                <Select
                  value={status}
                  label="Status"
                  className={classes.statusMenu}
                  onChange={handleStatusChange}
                  onOpen={() => {
                    setSelectOpen(true);
                  }}
                  onClose={() => {
                    setSelectOpen(false);
                  }}
                >
                  <MenuItem value={"published"}>
                    <div className={classes.publishedIcon}></div>
                    {t("sites.status.published")}
                  </MenuItem>
                  <MenuItem value={"drafted"}>
                    <div className={classes.draftedIcon}></div>
                    {t("sites.status.drafted")}
                  </MenuItem>
                  <MenuItem value={"archived"}>
                    <div className={classes.archivedIcon}></div>
                    {t("sites.status.archived")}
                  </MenuItem>
                </Select>
              </FormControl>
              {status !== props.data && props.data.status && (
                <Slide direction="left" in={status !== props.data.status}>
                  <Button className={classes.actionBtn} onClick={handleSave}>
                    {t("quill.submit")}
                  </Button>
                </Slide>
              )}
            </div>
          )}
          {!props.edit ? (
            data.externalSetting && data.externalSetting.useExternal ? (
              <CardActionArea
                className={classes.link}
                component={Link}
                onClick={() => {
                  window.open(`${data.externalSetting.url}`, "_blank");
                }}
              >
                {data.headerSection && data.headerSection.useImage ? (
                  <>
                    <CardMedia image={data.headerSection.background} alt="" className={classes.cardMedia} />
                    <ButtonCardContent />
                  </>
                ) : (
                  <ButtonCardContent
                    // use custom backgroundColor when no image
                    className={classes.cardContent}
                  />
                )}
              </CardActionArea>
            ) : (
              <CardActionArea className={classes.link} component={Link} to={`/${baseUrl}/${data.identifier}`}>
                {data.headerSection && data.headerSection.useImage ? (
                  <>
                    <CardMedia image={data.headerSection.background} alt="" className={classes.cardMedia} />
                    <ButtonCardContent />
                  </>
                ) : (
                  <ButtonCardContent
                    // use custom backgroundColor when no image
                    className={classes.cardContent}
                  />
                )}
              </CardActionArea>
            )
          ) : (
            <CardActionArea
              className={classes.link}
              onClick={() => {
                setOpenButtonCardModel(true);
              }}
            >
              {data.headerSection && data.headerSection.useImage ? (
                <>
                  <CardMedia image={data.headerSection.background} alt="" className={classes.cardMedia} />
                  <ButtonCardContent />
                </>
              ) : (
                <ButtonCardContent
                  // use custom backgroundColor when no image
                  className={classes.cardContent}
                />
              )}
            </CardActionArea>
          )}
          <CardActions>
            {props.edit && (
              <>
                <Button
                  size="small"
                  className={classes.actionBtn}
                  startIcon={<EditIcon />}
                  onClick={() => {
                    setOpenButtonCardModel(true);
                  }}
                >
                  {t("buttonCard.edit")}
                </Button>
                <ConfirmDialog
                  open={openConfirm}
                  handleClose={() => {
                    setOpenConfirm(false);
                  }}
                  deleteMsg={t("channels.deleteSectionConfirm", { channel: props.data && props.data.identifier })}
                  handleDelete={deletePageHandler}
                />
                <ButtonCardModel
                  open={openButtonCardModel}
                  component={component}
                  section={section}
                  info={data}
                  settings={props.styling}
                  saveContent={(data, section) => {
                    patchPageHandler(data, section);
                  }}
                  closeHandler={() => {
                    setOpenButtonCardModel(false);
                  }}
                  deleteHandler={openDeleteDialog}
                />
              </>
            )}
          </CardActions>
        </Card>
      )}
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
    patchChannel: (channelId, data, t, page, callback) =>
      dispatch(actions.patchChannelById(channelId, data, t, page, callback)),
    patchDemand: (demandId, data, t, page, callback) =>
      dispatch(actions.patchDemandById(demandId, data, t, page, callback))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonCard);
