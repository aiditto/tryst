import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "./listSectionStyle";
import { Divider, Checkbox, Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles(styles);

const ListSection = props => {
  const { t } = useTranslation();
  const classes = useStyles();

  const data = props.data;

  const [requirements, setRequirements] = useState([]);
  const [models, setModels] = useState([]);

  const listSection = props.data;
  const theme = props.theme;

  const handleRequirementsChecked = (event, index, item) => {
    if (event.target.checked) {
      setRequirements(requirements.concat({ id: index, description: item.description }));
    } else {
      setRequirements(requirements.filter((item, _ind) => item.id !== index));
    }
  };

  const handleModelChecked = (event, index, item) => {
    if (event.target.checked) {
      setModels(models.concat({ id: index, item: item }));
    } else {
      setModels(models.filter((item, _ind) => item.id !== index));
    }
  };

  useEffect(() => {
    if (props.getData) sendData();
  }, [props.getData]);

  const sendData = () => {
    const data = {
      requirements: requirements,
      models: models
    };

    props.sendData(data);
  };

  return (
    <Grid container className={classes.root}>
      {data && theme && (
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="h2" style={{ color: theme.palette.primary.main }}>
            <span dangerouslySetInnerHTML={{ __html: data.title }} />
          </Typography>
        </Grid>
      )}

      {data && (
        <Grid item className={classes.description} xs={12} sm={12} md={12} lg={12}>
          <span dangerouslySetInnerHTML={{ __html: data.description }} />
        </Grid>
      )}
      {listSection.requirements && listSection.requirements.length > 0 && (
        <div className={classes.listItemContainer}>
          <Typography variant="h2">{t("demands.listSection.reqTitle")}</Typography>

          <Divider className={classes.topDivider} />
          {listSection.requirements.map((item, index) => {
            return (
              <Grid container key={index} className={classes.innerItemContainer}>
                <Grid item xs={1} sm={1} md={1} lg={1} className={classes.mandatoryAsterisk}>
                  {item.isMandatory && "*"}
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} className={classes.mandatoryCheckBox}>
                  <Checkbox checked={item.checked} required onChange={event => handleRequirementsChecked(event, index, item)} />{" "}
                </Grid>
                <Grid item xs={9} sm={9} md={9} lg={9}>
                  <span dangerouslySetInnerHTML={{ __html: item.description }} />
                </Grid>
              </Grid>
            );
          })}
        </div>
      )}
      {listSection.models && listSection.models.length > 0 && (
        <div className={classes.listItemContainer}>
          <Typography variant="h2">{t("demands.listSection.modelTitle")}</Typography>
          <Divider className={classes.topDivider} />
          {listSection.models.map((item, index) => {
            return (
              <Grid container key={index} className={classes.innerItemContainer}>
                <Grid item xs={1} sm={1} md={1} lg={1} className={classes.mandatoryAsterisk}>
                  {item.isMandatory && "*"}
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} className={classes.mandatoryCheckBox}>
                  <Checkbox checked={item.checked} onChange={event => handleModelChecked(event, index, item)} />{" "}
                </Grid>
                <Grid item xs={9} sm={9} md={9} lg={9}>
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </Grid>
              </Grid>
            );
          })}
        </div>
      )}
    </Grid>
  );
};

ListSection.propTypes = {
  data: PropTypes.object.isRequired
};

export default ListSection;
