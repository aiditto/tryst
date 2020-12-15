import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "./cardHeaderStyle";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles(styles);

const CardHeader = props => {
  // styles
  const classes = useStyles();

  const { t } = useTranslation();

  const { section, component, showButtons, editHandler, deleteHandler, title } = props;

  return (
    <div className={classes.root}>
      <Grid container item md={12} sm={12} xs={12}>
        <Grid item md={6} sm={6} xs={12} className={classes.contentStyle}>
          {title ? <p className={classes.headerText}>{title}</p> : <p className={classes.headerText}>{section}</p>}
        </Grid>

        {showButtons && (
          <Grid item md={6} sm={6} lg={6} xs={12} className={classes.btnWrapper}>
            <Button
              onClick={() => deleteHandler(section)}
              variant="contained"
              className={classes.btnColorDanger}
              startIcon={<DeleteIcon />}
            >
              {t("cardHeader.delete")}
            </Button>

            <Button
              onClick={editHandler}
              variant="contained"
              className={classes.btnColorSecondary}
              startIcon={<EditIcon />}
            >
              {t("cardHeader.edit")}
            </Button>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

CardHeader.defaultProps = {
  showButtons: true
};

CardHeader.propTypes = {
  section: PropTypes.string,
  component: PropTypes.string,
  showButtons: PropTypes.bool,
  editHandler: PropTypes.func,
  deleteHandler: PropTypes.func,
  title: PropTypes.string
};

export default CardHeader;
