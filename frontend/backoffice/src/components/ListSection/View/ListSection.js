import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "./listSectionStyle";
import Grid from "@material-ui/core/Grid";
import { Divider, Checkbox } from "@material-ui/core";

const useStyles = makeStyles(styles);

const ListSection = props => {
  const { t } = useTranslation();
  const classes = useStyles();

  const { data } = props;

  return (
    <div className={classes.root}>
      {data && (
        <Grid container>
          {data && (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <span dangerouslySetInnerHTML={{ __html: data.description }} />
            </Grid>
          )}
          {data.requirements && data.requirements.length > 0 && (
            <div className={classes.listItemContainer}>
              <h3>{t("demands.listSection.reqTitle")}</h3>
              <Divider className={classes.topDivider} />
              {data.requirements.map((item, index) => {
                return (
                  <div key={index} className={classes.innerItemContainer}>
                    <Grid container className={classes.formItem}>
                      <Grid item xs={1} sm={1} md={1} lg={1} className={classes.mandatoryCheckBox}>
                        <Checkbox checked={false} disabled inputProps={{ "aria-label": "primary checkbox" }} />{" "}
                      </Grid>
                      <Grid item xs={9} sm={9} md={9} lg={9}>
                        <span dangerouslySetInnerHTML={{ __html: item.description }} />
                      </Grid>
                      <Grid item xs={2} sm={2} md={2} lg={2} className={classes.mandatoryAsterisk}>
                        {item.isMandatory && "*"}
                      </Grid>
                    </Grid>
                    <Divider className={classes.itemDivider} />
                  </div>
                );
              })}
            </div>
          )}
          {data.models && data.models.length > 0 && (
            <div className={classes.listItemContainer}>
              <h3>{t("demands.listSection.modelTitle")}</h3>
              <Divider className={classes.topDivider} />
              {data.models.map((item, index) => {
                return (
                  <div key={index} className={classes.innerItemContainer}>
                    <Grid container className={classes.formItem}>
                      <Grid item xs={1} sm={1} md={1} lg={1} className={classes.mandatoryCheckBox}>
                        <Checkbox checked={false} disabled inputProps={{ "aria-label": "primary checkbox" }} />{" "}
                      </Grid>
                      <Grid item xs={9} sm={9} md={9} lg={9}>
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                      </Grid>
                    </Grid>
                    <Divider className={classes.itemDivider} />
                  </div>
                );
              })}
            </div>
          )}
        </Grid>
      )}
    </div>
  );
};

ListSection.propTypes = {
  data: PropTypes.object.isRequired
};

export default ListSection;
