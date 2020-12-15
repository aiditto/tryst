/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Grid,
  Button,
  TextField,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider
} from "@material-ui/core";
import styles from "./editListSectionStyle";
import { makeStyles } from "@material-ui/core/styles";
// Editable content
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import DeleteIcon from "@material-ui/icons/Delete";
// Quill
import ReactQuill from "react-quill";
import { isEmpty } from "lodash";

// service for getting images from unsplash
import CardHeader from "components/CardHeader/CardHeader";

const useStyles = makeStyles(styles);

const EditListSection = props => {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [maxWidth] = useState("md");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState([]);
  const [models, setModels] = useState([]);

  const section = props.section;
  const component = props.component;
  // const showCheckbox = props.showCheckbox;

  const [] = useState([]);

  const [] = useState(false);

  useEffect(() => {
    if (!isEmpty(props.data)) {
      setDescription(props.data.description);
      setRequirements(props.data.requirements);
      setModels(props.data.models);
    } else {
      setDescription("");
      setRequirements([]);
      setModels([]);
    }
  }, [props && props.data]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link"],
      ["clean"]
    ]
  };

  const requirementModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link"],
      ["clean"]
    ]
  };

  const handleDescription = value => {
    setDescription(value);
  };

  // Requirement handlers
  const handleRequirements = (value, index) => {
    if (requirements[index].isFocused) {
      const newReqItems = [...requirements]; // Copy full list of requirements
      newReqItems[index].description = value;
      setRequirements(newReqItems);
    }
  };

  const handleRequirementsChecked = (value, index) => {
    const newReqItems = [...requirements]; // Copy full list of requirements
    newReqItems[index].isMandatory = value.target.checked; // replace requirements mandatory with latest value
    setRequirements(newReqItems); // Update requirement list
  };

  const handleAddNewReqItem = () => {
    setRequirements([...requirements, { description: "", isFocused: "false", isMandatory: false }]);
  };

  const handleDeleteReqItemById = index => {
    const newReqItems = [...requirements].filter((item, ind) => ind !== index);
    setRequirements(newReqItems);
  };

  const setReqFocus = index => {
    const newReqList = [...requirements];
    newReqList[index].isFocused = true;
    setRequirements(newReqList);
  };

  const removeReqFocus = index => {
    const newReqList = [...requirements];
    newReqList[index].isFocused = false;
    setRequirements(newReqList);
  };

  // Model handlers
  const handleModels = (value, index) => {
    const newModels = [...models]; // Copy full list of models
    newModels[index] = value;
    setModels(newModels);
  };

  const handleAddNewModel = () => {
    setModels([...models, ""]);
  };

  const handleDeleteModelById = index => {
    const newModels = [...models].filter((item, ind) => ind !== index);
    setModels(newModels);
  };

  return (
    <Grid container className={classes.root}>
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
              <Grid item xs={12} sm={12} md={12} lg={12} className={classes.quillContainer}>
                <ReactQuill
                  className={classes.quill}
                  modules={modules}
                  value={description}
                  onChange={handleDescription}
                />
              </Grid>
              {requirements && requirements.length > 0 && (
                <div className={classes.listItemContainer}>
                  <h3>{t("demands.listSection.reqTitle")}</h3>
                  <Divider className={classes.topDivider} />
                  {requirements.map((item, index) => {
                    return (
                      <div key={index} className={classes.innerItemContainer}>
                        <Grid container className={classes.formItem}>
                          <Grid item xs={7} sm={7} md={7} lg={7}>
                            <ReactQuill
                              className={classes.reqQuill}
                              modules={requirementModules}
                              value={item.description}
                              onChange={e => handleRequirements(e, index)}
                              onFocus={() => setReqFocus(index)}
                              onBlur={() => removeReqFocus(index)}
                            />
                          </Grid>
                          <Grid item xs={2} sm={2} md={2} lg={2} className={classes.mandatoryCheckBox}>
                            {t("demands.listSection.mandatory")}
                            <br />
                            <Checkbox
                              checked={item.isMandatory}
                              onChange={e => handleRequirementsChecked(e, index)}
                              inputProps={{ "aria-label": "primary checkbox" }}
                            />
                          </Grid>

                          <Grid item xs={3} sm={3} md={3} lg={3} className={classes.deleteSingleItemGrid}>
                            <Button
                              size="large"
                              square="true"
                              onClick={() => handleDeleteReqItemById(index)}
                              className={classes.deletSingleItemBtn}
                            >
                              {t("demands.listSection.deleteReq")}
                            </Button>
                          </Grid>
                        </Grid>
                        <Divider className={classes.itemDivider} />
                      </div>
                    );
                  })}
                </div>
              )}
              <div className={classes.addNewItemContainer}>
                <Button
                  size="large"
                  square="true"
                  onClick={e => handleAddNewReqItem(e)}
                  className={classes.addNewItemBtn}
                >
                  {t("demands.listSection.addReq")}
                </Button>
              </div>
              {models && models.length > 0 && (
                <div className={classes.listItemContainer}>
                  <h3>{t("demands.listSection.modelTitle")}</h3>
                  <Divider className={classes.topDivider} />
                  {models.map((item, index) => {
                    return (
                      <div key={index} className={classes.innerItemContainer}>
                        <Grid container className={classes.formItem}>
                          <Grid item xs={7} sm={7} md={7} lg={7}>
                            <TextField
                              label={t("quill.form.title")}
                              value={item}
                              type="text"
                              multiline
                              rows={3}
                              fullWidth
                              variant="outlined"
                              onChange={e => handleModels(e.target.value, index)}
                            />
                          </Grid>

                          <Grid item xs={3} sm={3} md={3} lg={3} className={classes.deleteSingleItemGrid}>
                            <Button
                              size="large"
                              square="true"
                              onClick={() => handleDeleteModelById(index)}
                              className={classes.deletSingleItemBtn}
                            >
                              {t("demands.listSection.deleteModel")}
                            </Button>
                          </Grid>
                        </Grid>
                        <Divider className={classes.itemDivider} />
                      </div>
                    );
                  })}
                </div>
              )}
              <div className={classes.addNewItemContainer}>
                <Button
                  size="large"
                  square="true"
                  onClick={e => handleAddNewModel(e)}
                  className={classes.addNewItemBtn}
                >
                  {t("demands.listSection.addModel")}
                </Button>
              </div>
            </DialogContentText>
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
                const listSection = {
                  description: description,
                  requirements: requirements.map(req => {
                    return { isMandatory: req.isMandatory, description: req.description };
                  }),
                  models: models
                };
                props.saveContent(listSection, section);
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

export default EditListSection;
