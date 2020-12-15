/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Grid, TextField } from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown";
import { categories, getCategory } from "../../variables/categoriesData.js";

import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import * as actions from "../../store/actions/rootAction";
import { PRODUCT_SELECTORS, MODEL_SELECTORS } from "../../store/selectors/rootSelector";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

//DIALOG
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import styles from "./adminStyles";
import ConfirmDialog from "components/ConfirmDialog/ConfirmDialog.js";

const useStyles = makeStyles(styles);

const filterProducts = createFilterOptions({
  matchFrom: "start",
  stringify: option => option.productName
});

const Admin = props => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [productName, setProductName] = useState("");
  const [model, setModel] = useState(null);
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [itemFail, setItemFail] = useState(false);
  const [product, setProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editModeModel, setEditModeModel] = useState(false);
  const [dialogConfirm, setDialogConfirm] = useState(false);
  const [modelName, setModelName] = useState("");

  const [modelsPerProduct, setModelsPerProduct] = useState({});

  useEffect(() => {
    props.getProducts();
    props.getModelsList();
  }, []);

  useEffect(() => {
    if (props.product) {
      setProduct(props.product);
    }
  }, [props.product]);

  useEffect(() => {
    if (props.models && props.products.length > 0) {
      const modelMap = {};
      props.products.map(product => {
        modelMap[product.id] = props.models.filter(model => {
          return model.productId === product.id;
        });
      });

      setModelsPerProduct(modelMap);
    }
  }, [props.models, props.products]);

  const handleClose = () => {
    setOpen(false);
    if (editMode) {
      clearForm();
      setEditMode(false);
    }
  };

  const handleEdit = product => {
    const formatedCategory = formatCategory(getCategory(product.category));
    setEditMode(true);
    setProduct(product);
    setProductName(product.productName);
    setCategory(formatedCategory);
    setOpen(true);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const data = {
      productName,
      category: Number(category.split(".")[0])
    };

    if (editMode) {
      props.updateProduct(product.id, data, t);
      clearForm();
    } else {
      props.createProduct(data, t);
      setCategory(null);
    }

    setOpen(false);
  };

  const handleModelSubmit = () => {
    const data = {
      name: modelName,
      productId: product.id,
      productName: product.productName
    };

    if (editModeModel) {
      const editData = {
        name: modelName,
        productId: product.id,
        productName: product.productName
      };
      props.updateModel(model.id, editData, t);
      clearForm();
    } else {
      props.createModel(data, t);
    }

    clearForm();
  };

  const clearForm = () => {
    setProductName("");
    setProduct(null);
    setModel(null);
    setModelName("");
    setCategory(null);
    setEditModeModel(false);
  };

  const formatCategory = category => {
    return category.id + ". " + t("categories." + category.id);
  };

  const productNameCheck = val => {
    if (val) {
      for (let i = 0; i < props.products.length; i++) {
        if (props.products[i].productName.toLowerCase() === val.toLowerCase()) {
          setItemFail(true);
          break;
        } else {
          setItemFail(false);
        }
      }
    }
    setProductName(val);
  };

  const handleModelEdit = (product, model) => {
    setProduct(product);
    setProductName(product.productName);
    setModel(model);
    setModelName(model.name);
    setEditModeModel(true);
  };

  const handleModelDelete = model => {
    props.deleteModel(model.id, t);
    setDialogConfirm(false);
    setModel(null);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item container md={6} justify="center" className={classes.leftAdminWrapper}>
        <Grid item md={12}>
          <Grid item md={8} xl={6} className={classes.inputWrapper}>
            <form className={classes.formStyle}>
              <h2>{t("adminPage.form.title")}</h2>
              <TextField
                autoFocus
                id="name"
                required
                value={modelName}
                onChange={event => {
                  setModelName(event.target.value);
                }}
                label={t("adminPage.form.placeholderModel")}
                type="text"
              />

              <Autocomplete
                noOptionsText={t("products.noOption")}
                value={product}
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    setTimeout(() => {
                      setOpen(true);
                      setProductName(newValue);
                    });
                    return;
                  }

                  if (newValue && newValue.inputValue) {
                    setOpen(true);
                    setProductName(newValue.inputValue);
                    return;
                  }

                  setProduct(newValue);
                }}
                filterOptions={(options, params) => {
                  const filtered = filterProducts(options, params);

                  if (params.inputValue !== "") {
                    filtered.push({
                      inputValue: params.inputValue,
                      productName: `"${t("adminPage.form.addNewProduct")}  ${params.inputValue}"`
                    });
                  }
                  return filtered;
                }}
                id="autocomplete-item"
                options={props.products}
                getOptionLabel={option => {
                  if (typeof option === "string") {
                    return option;
                  }
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  return option.productName;
                }}
                selectOnFocus
                clearOnBlur
                renderOption={option => option.productName}
                renderInput={params => (
                  <TextField {...params} required label={t("adminPage.form.placeholderProduct")} />
                )}
              />

              <Button
                className={classes.saveButton}
                color="primary"
                onClick={handleModelSubmit}
                disabled={!modelName || !product}
              >
                {t("products.infoForm.submit")}
              </Button>
            </form>
          </Grid>
        </Grid>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.itemDialog}>
          <form onSubmit={handleSubmit}>
            <DialogTitle id="form-dialog-title">
              {editMode ? t("adminPage.dialogs.editProductTitle") : t("products.addForm.title")}
            </DialogTitle>
            <DialogContent>
              <div>
                <TextField
                  autoFocus
                  fullWidth
                  margin="dense"
                  id="name"
                  value={productName}
                  onChange={event => {
                    setProductName(event.target.value);
                    productNameCheck(event.target.value);
                  }}
                  label={t("products.addForm.name")}
                  type="text"
                  error={itemFail}
                  helperText={itemFail && "Item exist"}
                />
                <CustomDropdown
                  className={classes.dropDownStyle}
                  id="category"
                  itemDialog={true}
                  dropdownList={categories.map(category => {
                    return formatCategory(category);
                  })}
                  buttonText={category ? category : t("products.addForm.category")}
                  onClick={event => {
                    setCategory(event);
                  }}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>{t("products.infoForm.cancel")}</Button>
              <Button
                type="submit"
                className={classes.saveButtonModal}
                color="primary"
                disabled={!category || itemFail}
              >
                {t("products.infoForm.submit")}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Grid>
      <Grid
        item
        container
        md={6}
        sm={6}
        justify="center"
        alignItems="center"
        direction="column"
        className={classes.cardMe}
      >
        <h2>{t("adminPage.products.title")}</h2>
        {props.products && props.models && (
          <List className={classes.list}>
            {props.products.map(product => {
              return props.models && modelsPerProduct[product.id] && modelsPerProduct[product.id].length ? (
                <ExpansionPanel key={product.id} className={classes.expandableWrapper}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.expandableSummary}
                  >
                    <ListItem className={classes.listItem}>
                      <ListItemText primary={product.productName} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => {
                            handleEdit(product);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        {/* <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton> */}
                      </ListItemSecondaryAction>
                    </ListItem>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.expandableDetails}>
                    <small>Models</small>
                    {props.models.map(model => {
                      if (product.id === model.productId) {
                        return (
                          <ListItem key={model.id} className={classes.listItem}>
                            <ListItemText primary={model.name} />
                            <ListItemSecondaryAction>
                              <IconButton
                                edge="end"
                                aria-label="edit"
                                onClick={() => {
                                  handleModelEdit(product, model);
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                              {/* <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => {
                                  setModel(model);
                                  setDialogConfirm(true);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton> */}
                            </ListItemSecondaryAction>
                          </ListItem>
                        );
                      }
                    })}
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ) : (
                <ListItem className={classes.listItem} key={product.id}>
                  <ListItemText primary={product.productName} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => {
                        handleEdit(product);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    {/* <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton> */}
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        )}
      </Grid>
      <ConfirmDialog
        open={dialogConfirm}
        deleteMsg={t("adminPage.dialogs.deleteConfirm", { model: model ? model.name : "" })}
        handleDelete={() => handleModelDelete(model)}
        handleClose={() => {
          setModel(null);
          setDialogConfirm(false);
        }}
      />
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    products: PRODUCT_SELECTORS.getProducts(state),
    product: PRODUCT_SELECTORS.getProduct(state),
    models: MODEL_SELECTORS.getModels(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProduct: (productId, data, t) => dispatch(actions.updateExistingProduct(productId, data, t)),
    createProduct: (data, t) => dispatch(actions.createNewProduct(data, t)),
    getProducts: () => dispatch(actions.getProducts()),
    getDemands: () => dispatch(actions.getDemands()),
    getProduct: id => dispatch(actions.getProductById(id)),
    resetProduct: () => dispatch(actions.resetProduct()),
    createModel: (data, t) => dispatch(actions.createNewModel(data, t)),
    getModelsList: () => dispatch(actions.getModels()),
    updateModel: (id, data, t) => dispatch(actions.updateExistingModel(id, data, t)),
    deleteModel: (id, t) => dispatch(actions.deleteModelById(id, t))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
