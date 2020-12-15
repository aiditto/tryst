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
  DialogContentText
} from "@material-ui/core";
import styles from "./editFormSectionStyle";
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
import { DEMAND_FIELDS } from "shared/utility";

const useStyles = makeStyles(styles);

const EditFormSection = props => {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [maxWidth] = useState("md");
  const [description, setDescription] = useState("");
  const [orgNrChecked, setOrgNrChecked] = useState(true);
  const [addressChecked, setAddressChecked] = useState(true);
  const [firstNameChecked, setFirstNameChecked] = useState(true);
  const [lastNameChecked, setLastNameChecked] = useState(true);
  const [emailChecked, setEmailChecked] = useState(true);
  const [phoneChecked, setPhoneChecked] = useState(true);
  const [addInfoChecked, setAddInfoChecked] = useState(true);

  const section = props.section;
  const component = props.component;

  const [] = useState([]);

  const [] = useState(false);

  useEffect(() => {
    if (!isEmpty(props.data)) {
      setDescription(props.data.description);
      props.data.fields &&
        props.data.fields.map(formSectionField => {
          switch (formSectionField.name) {
            case DEMAND_FIELDS.ORGANIZATION_NUMBER:
              setOrgNrChecked(formSectionField.isNeeded);
              break;
            case DEMAND_FIELDS.EMAIL:
              setEmailChecked(formSectionField.isNeeded);
              break;
            case DEMAND_FIELDS.FIRST_NAME:
              setFirstNameChecked(formSectionField.isNeeded);
              break;
            case DEMAND_FIELDS.LAST_NAME:
              setLastNameChecked(formSectionField.isNeeded);
              break;
            case DEMAND_FIELDS.ADDITIONAL_INFORMATION:
              setAddInfoChecked(formSectionField.isNeeded);
              break;
            case DEMAND_FIELDS.PHONE_NUMBER:
              setPhoneChecked(formSectionField.isNeeded);
              break;
            case DEMAND_FIELDS.ADDRESS:
              setAddressChecked(formSectionField.isNeeded);
              break;
            default:
          }
        });
      setOrgNrChecked(props.data.fields);
    } else {
      setDescription("");
      setOrgNrChecked(true);
      setEmailChecked(true);
      setAddressChecked(true);
      setPhoneChecked(true);
      setFirstNameChecked(true);
      setLastNameChecked(true);
      setAddInfoChecked(true);
    }
  }, [props && props.data]);

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
    setDescription(value);
  };

  const handleOrgNrChange = event => {
    setOrgNrChecked(event.target.checked);
  };

  const handleAddressChange = event => {
    setAddressChecked(event.target.checked);
  };

  const handleFirstNameChange = event => {
    setFirstNameChecked(event.target.checked);
  };

  const handleLastNameChange = event => {
    setLastNameChecked(event.target.checked);
  };

  const handleEmailChange = event => {
    setEmailChecked(event.target.checked);
  };

  const handlePhoneChange = event => {
    setPhoneChecked(event.target.checked);
  };

  const handleAddInfoChange = event => {
    setAddInfoChecked(event.target.checked);
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
              <Grid container className={classes.formItem}>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField fullWidth label={DEMAND_FIELDS.ORGANIZATION_NUMBER} variant="outlined" size="small" />
                </Grid>
                <Grid xs={6} sm={6} md={6} lg={6}>
                  <Checkbox
                    checked={orgNrChecked}
                    onChange={handleOrgNrChange}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </Grid>
              </Grid>
              <Grid container className={classes.formItem}>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField fullWidth label={DEMAND_FIELDS.ADDRESS} variant="outlined" size="small" />
                </Grid>
                <Grid xs={6} sm={6} md={6} lg={6}>
                  <Checkbox
                    checked={addressChecked}
                    onChange={handleAddressChange}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </Grid>
              </Grid>
              <Grid container className={classes.formItem}>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField fullWidth label={DEMAND_FIELDS.FIRST_NAME} variant="outlined" size="small" />
                </Grid>
                <Grid xs={6} sm={6} md={6} lg={6}>
                  <Checkbox
                    checked={firstNameChecked}
                    onChange={handleFirstNameChange}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </Grid>
              </Grid>
              <Grid container className={classes.formItem}>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField fullWidth label={DEMAND_FIELDS.LAST_NAME} variant="outlined" size="small" />
                </Grid>
                <Grid xs={6} sm={6} md={6} lg={6}>
                  <Checkbox
                    checked={lastNameChecked}
                    onChange={handleLastNameChange}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </Grid>
              </Grid>
              <Grid container className={classes.formItem}>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField fullWidth label={DEMAND_FIELDS.EMAIL} variant="outlined" size="small" />
                </Grid>
                <Grid xs={6} sm={6} md={6} lg={6}>
                  <Checkbox
                    checked={emailChecked}
                    onChange={handleEmailChange}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </Grid>
              </Grid>
              <Grid container className={classes.formItem}>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField fullWidth label={DEMAND_FIELDS.PHONE_NUMBER} variant="outlined" size="small" />
                </Grid>
                <Grid xs={6} sm={6} md={6} lg={6}>
                  <Checkbox
                    checked={phoneChecked}
                    onChange={handlePhoneChange}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </Grid>
              </Grid>
              <Grid container className={classes.formItem}>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label={DEMAND_FIELDS.ADDITIONAL_INFORMATION}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid xs={6} sm={6} md={6} lg={6}>
                  <Checkbox
                    checked={addInfoChecked}
                    onChange={handleAddInfoChange}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </Grid>
              </Grid>
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
                const formSection = {
                  description: description,
                  fields: [
                    { name: DEMAND_FIELDS.ORGANIZATION_NUMBER, isNeeded: orgNrChecked },
                    { name: DEMAND_FIELDS.ADDRESS, isNeeded: addressChecked },
                    { name: DEMAND_FIELDS.FIRST_NAME, isNeeded: firstNameChecked },
                    { name: DEMAND_FIELDS.LAST_NAME, isNeeded: lastNameChecked },
                    { name: DEMAND_FIELDS.EMAIL, isNeeded: emailChecked },
                    { name: DEMAND_FIELDS.PHONE_NUMBER, isNeeded: phoneChecked },
                    { name: DEMAND_FIELDS.ADDITIONAL_INFORMATION, isNeeded: addInfoChecked }
                  ]
                };
                props.saveContent(formSection, section);
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

export default EditFormSection;
