/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// core components
import React, { useState, useEffect, useRef } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "./createAssetStyle";
import { Grid } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Collapse from "@material-ui/core/Collapse";
import InfoDialog from "components/Info/InfoDialog/InfoDialog";
import { connect } from "react-redux";
import * as actions from "../../store/actions/rootAction";
import { ASSET_SELECTORS, MODEL_SELECTORS } from "../../store/selectors/rootSelector";
import authService from "../../services/auth.service";
import { Redirect } from "react-router-dom";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
const useStyles = makeStyles(styles);
const filterModels = createFilterOptions({
  matchFrom: "start",
  stringify: option => option.name
});

const CreateAsset = props => {
  // styles
  const classes = useStyles();
  const { t } = useTranslation();
  const [company, setCompany] = useState(false);
  const [quantity, setQuantity] = useState(null);
  const [donation, setDonation] = useState(true);
  const [price, setPrice] = useState(null);
  const [available_now, setAvailableNow] = useState(true);
  const [message, setMessage] = useState(null);
  const [available_when, setAvailableWhen] = useState(null);
  const [recurring, setRecurring] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currency, setCurrency] = useState("SEK");
  const [disabled, setDisabled] = useState({ disable: true, helperText: false });
  const [dateError, setDateError] = useState(false);
  const [filteredModels, setFilteredModels] = useState([]);
  const [model, setModel] = useState(null);

  // Dialog
  const [open, setOpen] = useState(false);
  const [, setInfo] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
    setInfo(selectedProduct.info);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const startDate = new Date();

  const user = authService.getSessionToken();

  const currencies = [
    {
      value: "USD",
      label: "US DOLLAR"
    },
    {
      value: "EUR",
      label: "EUR"
    },
    {
      value: "SEK",
      label: "SEK"
    }
  ];

  useEffect(() => {
    const product = JSON.parse(Buffer.from(props.match.params.name, "base64"));
    setSelectedProduct(product);
    window.scrollTo(0, 0);
    props.getModels();
  }, [props.match]);

  useEffect(() => {
    if (props.models && selectedProduct) {
      const matchedModels = props.models.filter(model => {
        return selectedProduct.id === model.productId;
      });
      setFilteredModels(matchedModels);
    }
  }, [props.models]);

  useEffect(() => {
    if (!quantity) {
      setDisabled({ disable: true, helperText: `${t("assets.form.error.quantity")}` });
    } else {
      setDisabled({ disable: false, helperText: false });
    }

    if ((!available_now && !available_when) || dateError) {
      setDisabled({ disable: true, helperText: `${t("assets.form.error.available")}` });
    }

    if (!quantity && !available_now && !available_when) {
      setDisabled({ disable: true, helperText: `${t("assets.form.error.quantityDate")}` });
    }

    if (!donation && !price) {
      setDisabled({ disable: true, helperText: `${t("assets.form.error.price")}` });
    }

    if (!quantity && !available_now && !available_when && !donation && !price) {
      setDisabled({ disable: true, helperText: `${t("assets.form.error.dateQuantityPrice")}` });
    }

    if (!donation && !price && !available_now && !available_when) {
      setDisabled({ disable: true, helperText: `${t("assets.form.error.datePrice")}` });
    }

    if (filteredModels.length > 0 && !model) {
      setDisabled({ disable: true, helperText: `${t("assets.form.error.model")}` });
    }

    if (filteredModels.length > 0 && !model && !quantity) {
      setDisabled({ disable: true, helperText: `${t("assets.form.error.modelQuantity")}` });
    }
  }, [quantity, available_now, available_when, donation, price, model]);

  useEffect(() => {
    if (available_now) {
      setAvailableWhen(null);
    }

    if (donation) {
      setPrice(null);
    }
  }, [available_now, donation]);

  const handleSave = () => {
    let data = {
      productId: selectedProduct.id,
      productName: selectedProduct.productName,
      company,
      quantity,
      donation,
      price,
      modelId: model ? model.id : null,
      modelName: model ? model.name : null,
      currency,
      available_now,
      available_when,
      message,
      recurring,
      user
    };

    props.createAsset(data, t);
  };

  const handleCurrency = e => {
    setCurrency(e.target.value);
  };

  const handleDate = e => {
    if (Date.parse(e.target.value) < Date.parse(startDate)) {
      setDateError(true);
    } else {
      setDateError(false);
      setAvailableWhen(e.target.value);
    }
  };

  return props.isAssetCreated ? (
    <Redirect to="/private-contributor" />
  ) : (
    <Grid item container xs={12} md={12} sm={12} justify="center" alignItems="center" className={classes.outerWrap}>
      <Grid container item md={8} sm={12} alignItems="center" justify="flex-start">
        <Grid item md={8}>
          <h2 className={classes.headTitle}>{t("assets.form.createAsset")} </h2>
          <h5 className={classes.itemTitle}>{selectedProduct && selectedProduct.productName}</h5>
        </Grid>
        {selectedProduct && selectedProduct.info && (
          <Grid item md={4} className={classes.centerItems}>
            <Button className={classes.howItWorksButton} onClick={handleClickOpen}>
              {t("assets.form.howItWorks")}
            </Button>
            <InfoDialog product={selectedProduct} open={open} setClose={handleClose} />
          </Grid>
        )}
        <span className={classes.divider} />
      </Grid>

      <Grid container item md={8} sm={12} xs={12} justify="space-around" alignItems="center">
        <Grid item md={8} sm={10}>
          <p className={classes.boldSmallText}>{t("assets.form.isCompany.label")}</p>
        </Grid>
        <Grid item md={4} xs={12} sm={12} className={classes.centerItems}>
          <ButtonGroup className={classes.switchStyle} aria-label="outlined button group">
            <Button
              onClick={() => {
                setCompany(true);
              }}
              className={cx(classes.switchButton, {
                [classes.activeButton]: company,
                [classes.inactiveButton]: !company
              })}
            >
              {t("assets.form.true")}
            </Button>
            <Button
              onClick={() => {
                setCompany(false);
              }}
              className={cx(classes.switchButton, {
                [classes.activeButton]: !company,
                [classes.inactiveButton]: company
              })}
            >
              {t("assets.form.false")}
            </Button>
          </ButtonGroup>
        </Grid>
        <span className={classes.divider} />
      </Grid>

      <Grid container item md={8} sm={12} justify="space-around" alignItems="flex-start">
        <Grid item md={8}>
          <p className={classes.boldSmallText}>{t("assets.form.isDonation.label")}</p>
        </Grid>
        <Grid item md={4} className={classes.centerItems}>
          <ButtonGroup className={classes.switchStyle} aria-label="outlined button group">
            <Button
              onClick={() => {
                setDonation(true);
              }}
              className={cx(classes.switchButton, {
                [classes.activeButton]: donation,
                [classes.inactiveButton]: !donation
              })}
            >
              {t("assets.form.true")}
            </Button>
            <Button
              onClick={() => {
                setDonation(false);
              }}
              className={cx(classes.switchButton, {
                [classes.activeButton]: !donation,
                [classes.inactiveButton]: donation
              })}
            >
              {t("assets.form.false")}
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid container item md={12} sm={10} xs={10} className={classes.mobileFixInput}>
          <Grid item md={12} sm={6} xs={10} className={classes.inputWrapper}>
            <Collapse in={!donation} className={classes.inputWrapperCost}>
              <Input
                id="price"
                type="number"
                placeholder={t("assets.form.price")}
                className={classes.textFieldStyle}
                value={price ? price : ""}
                onChange={e => {
                  setPrice(e.target.value);
                }}
              />
              <TextField
                id="standard-select-currency"
                select
                label={t("assets.form.isDonation.currency")}
                value={currency}
                onChange={handleCurrency}
              >
                {currencies.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Collapse>
          </Grid>
        </Grid>
        <span className={classes.divider} />
      </Grid>

      <Grid container item md={8} sm={12} xs={12} justify="space-around" alignItems="flex-start">
        <Grid item md={8}>
          <p className={classes.boldSmallText}>{t("assets.form.isAvailable.label")}</p>
        </Grid>
        <Grid item md={4} className={classes.centerItems}>
          <ButtonGroup className={classes.switchStyle} aria-label="outlined button group">
            <Button
              onClick={() => {
                setAvailableNow(true);
              }}
              className={cx(classes.switchButton, {
                [classes.activeButton]: available_now,
                [classes.inactiveButton]: !available_now
              })}
            >
              {t("assets.form.true")}
            </Button>
            <Button
              onClick={() => {
                setAvailableNow(false);
              }}
              className={cx(classes.switchButton, {
                [classes.activeButton]: !available_now,
                [classes.inactiveButton]: available_now
              })}
            >
              {t("assets.form.false")}
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid container item md={12} sm={10} xs={10} className={classes.mobileFixInput}>
          <Grid item md={4} sm={6} xs={10} className={classes.inputWrapper}>
            <Collapse in={!available_now}>
              <TextField
                fullWidth
                type="date"
                error={dateError}
                id="availibledate"
                helperText={dateError && `${t("assets.form.error.dateError")}`}
                value={available_when ? available_when : ""}
                className={classes.textFieldStyle}
                onChange={e => {
                  handleDate(e);
                }}
              />
            </Collapse>
          </Grid>
        </Grid>
        <span className={classes.divider} />
      </Grid>

      <Grid container item md={8} sm={12} xs={12} justify="center" alignItems="flex-start">
        <Grid item md={12} sm={10}>
          <h2 className={classes.headTitle}>{t("assets.form.assistanceInfo")}</h2>
        </Grid>
        <Grid container item md={12} sm={10} xs={10}>
          <Grid item md={4} sm={6} xs={10}>
            {filteredModels.length > 0 && (
              <Grid item xs={12} md={6} sm={12} className={classes.textFieldStyle}>
                <>
                  <Autocomplete
                    noOptionsText={t("products.noOption")}
                    value={model}
                    onChange={(event, newValue) => {
                      setModel(newValue);
                    }}
                    filterOptions={filterModels}
                    id="autocomplete-item"
                    options={filteredModels}
                    getOptionLabel={option => {
                      if (typeof option === "string") {
                        return option;
                      }
                      if (option.inputValue) {
                        return option.inputValue;
                      }
                      return option.name;
                    }}
                    selectOnFocus
                    clearOnBlur
                    renderOption={option => option.name}
                    renderInput={params => (
                      <TextField {...params} required label={t("demands.form.title.selectModel")} />
                    )}
                  />
                </>
              </Grid>
            )}
            <TextField
              fullWidth
              type="number"
              label={t("assets.quantity")}
              id="quantity"
              className={classes.textFieldStyle}
              onChange={e => {
                setQuantity(e.target.value);
              }}
            />

            <TextField
              fullWidth
              label={t("assets.form.message")}
              id="msg"
              className={classes.textFieldStyle}
              onChange={e => {
                setMessage(e.target.value);
              }}
            />
          </Grid>
        </Grid>
        <span className={classes.divider} />
      </Grid>

      <Grid container item md={8} sm={12} xs={12} justify="space-around" alignItems="center">
        <Grid item md={8} sm={10}>
          <p className={classes.boldSmallText}> {t("assets.form.isRecurring.label")}</p>
        </Grid>
        <Grid item md={4} xs={12} sm={12} className={classes.centerItems}>
          <ButtonGroup className={classes.switchStyle} aria-label="outlined button group">
            <Button
              onClick={() => {
                setRecurring(true);
              }}
              className={cx(classes.switchButton, {
                [classes.activeButton]: recurring,
                [classes.inactiveButton]: !recurring
              })}
            >
              {t("assets.form.true")}
            </Button>
            <Button
              onClick={() => {
                setRecurring(false);
              }}
              className={cx(classes.switchButton, {
                [classes.activeButton]: !recurring,
                [classes.inactiveButton]: recurring
              })}
            >
              {t("assets.form.false")}
            </Button>
          </ButtonGroup>
        </Grid>
        <span className={classes.divider} />
      </Grid>
      <Grid container item md={8} justify="flex-end" className={classes.mobileFix} alignItems="center">
        <Button
          size="large"
          square="true"
          className={disabled.disable ? classes.disabledButton : classes.sendHelp}
          onClick={handleSave}
          disabled={disabled.disable}
        >
          {t("assets.form.createAssetButton")}
        </Button>
        {disabled.helperText && <span className={classes.helperText}>{disabled.helperText}</span>}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    error: ASSET_SELECTORS.getError(state),
    loading: ASSET_SELECTORS.getLoading(state),
    isAssetCreated: ASSET_SELECTORS.getAssetCreated(state),
    models: MODEL_SELECTORS.getModels(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createAsset: (data, t) => dispatch(actions.createAssetItem(data, t)),
    getModels: () => dispatch(actions.getModels())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAsset);
