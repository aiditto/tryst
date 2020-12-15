import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "./formSectionStyle";
import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core";
import { DEMAND_FIELDS } from "shared/utility";

const useStyles = makeStyles(styles);

const FormSection = props => {
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
          {data && (
            <Grid container className={classes.selectedFormFieldContainer}>
              {data.fields &&
                data.fields.map(
                  field =>
                    field.isNeeded && (
                      <Grid container className={classes.formFieldButton}>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                          <TextField
                            label={field.name}
                            type="text"
                            fullWidth
                            disabled
                            variant="outlined"
                            size="small"
                            multiline={field.name === DEMAND_FIELDS.ADDITIONAL_INFORMATION}
                            rows={field.name === DEMAND_FIELDS.ADDITIONAL_INFORMATION ? 3 : 1}
                          />
                        </Grid>
                      </Grid>
                    )
                )}
            </Grid>
          )}
        </Grid>
      )}
    </div>
  );
};

FormSection.propTypes = {
  data: PropTypes.object.isRequired
};

export default FormSection;
