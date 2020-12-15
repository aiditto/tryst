import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { makeStyles } from "@material-ui/core/styles";
import styles from "./responseFormStyle";
import { connect } from "react-redux";
import classNames from "classnames";
import ListSection from "components/ListSection/View/ListSection";
import TextSection from "components/TextSection/TextSection";
import SupplierContact from "components/SupplierContact/SupplierContact";
import * as actions from "store/actions/rootAction";
import { RESPONSES_SELECTORS } from "store/selectors/rootSelector";

const useStyles = makeStyles(styles);

const ResponseForm = props => {
  const classes = useStyles();
  const { t } = useTranslation();
  const listSection = props.listSection;
  const formSection = props.formSection;
  const fields = props.fields;
  const data = props.data;
  const demandId = props.demandId;
  const theme = props.theme;

 
  const [getCompData, setGetCompData] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [listSectionResponse, setListSectionResponse] = useState(null);
  const [formResponse, setFormResponse] = useState(null);
  const [isOrgNumberCorrect, setIsOrgNumberCorrect] = useState(false);

  useEffect(() => {
    if (readyToSubmit) {
      props.createResponse(responseData, t, responseStatus => {
        if (responseStatus === "success") {
          setFormSubmitted(!formSubmitted);
          props.handleSubmit(!formSubmitted);
        }
      });
    }
    setGetCompData(false);
    setReadyToSubmit(false);
  }, [responseData, readyToSubmit]);

  const getListSection = val => {
    const newListSection = {
      requirements: val.requirements.map(req => req.description),
      models: val.models.map(model => model.item)
    };
    setListSectionResponse(newListSection);
  };

  const getSupplierContactData = val => {
    setFormResponse({ details: val });
  };

  const handleResponseForm = event => {
    event.preventDefault();
    setResponseData({
      ...responseData,
      requirements: listSectionResponse.requirements,
      models: listSectionResponse.models,
      details: formResponse.details,
      demandId: demandId
    });
    setReadyToSubmit(true);
  };

  return (
    <form onSubmit={handleResponseForm}>
      <Grid container className={classes.root}>
        {listSection && (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <ListSection
              data={listSection}
              theme={theme}
              getData={getCompData}
              sendData={val => {
                getListSection(val);
              }}
            />
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TextSection data={formSection} theme={theme} />
          <SupplierContact
            updateSubmittedStatus={val => props.handleSubmit({ val })}
            demandId={demandId}
            fields={fields}
            theme={theme}
            getData={getCompData}
            sendData={val => {
              getSupplierContactData(val);
            }}
            handleLoading={isOrgNumberCorrect => {
              setIsOrgNumberCorrect(isOrgNumberCorrect);
            }}
          />
        </Grid>
      </Grid>

      <div className={classes.btnWrapper}>
        <Button
             style={{
              color: theme.palette.primary.contrastText,
              backgroundColor: theme.palette.primary.main
            }}
            className={classNames({[classes.disabled]: !isOrgNumberCorrect})}
          square="true"
          type="submit"
          onClick={() => {
            setGetCompData(true);
          }}
          disabled={!isOrgNumberCorrect}
        >
          {t("demands.submitReq")}
        </Button>
      </div>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    error: RESPONSES_SELECTORS.getError(state),
    loading: RESPONSES_SELECTORS.getLoading(state),
    response: RESPONSES_SELECTORS.getResponse(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createResponse: (data, t, callback) => dispatch(actions.createNewResponse(data, t, callback))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResponseForm);
