/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
/* eslint-disable react/prop-types */
import { Grid } from "@material-ui/core";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ProductCard from "components/Product/ProductCard/ProductCard";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/rootAction";
import { PRODUCT_SELECTORS } from "../../../store/selectors/rootSelector";

import { categories } from "../../../variables/categoriesData.js";
import { useTranslation } from "react-i18next";
// styles
import styles from "./productListStyle";
import cx from "classnames";
const useStyles = makeStyles(styles);

const ProductList = props => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    props.getPublicProductList();
  }, []);

  const handleClick = selectedCategory => {
    props.updateSelectedCategory(selectedCategory);
  };

  return (
    <Grid container item>
      <Grid item container direction="row" justify="space-around" alignContent="flex-start" md={12}>
        {categories.map(category => {
          return (
            <Grid
              item
              xs={2}
              id={category.id}
              key={category.id}
              className={props.selectedCategory === category.id ? classes.activeCategory : classes.category}
              onMouseEnter={() => {
                setFadeIn(false);
              }}
              onClick={() => {
                handleClick(category.id);
                setFadeIn(true);
              }}
            >
              <h2 className={classes.categoryText}>{t("categories." + category.id)}</h2>
            </Grid>
          );
        })}
      </Grid>

      {props.filterProducts && (
        <Grid
          item
          container
          justify="center"
          className={cx(classes.itemList, {
            [classes.animatedItem]: fadeIn
          })}
        >
          {props.filterProducts.map(product => (
            <ProductCard product={product} key={product.id} />
          ))}
        </Grid>
      )}
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    error: PRODUCT_SELECTORS.getError(state),
    loading: PRODUCT_SELECTORS.getLoading(state),
    publicProducts: PRODUCT_SELECTORS.getPublicProducts(state),
    filterProducts: PRODUCT_SELECTORS.getFilterProducts(state),
    selectedCategory: PRODUCT_SELECTORS.getSelectedCategory(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPublicProductList: () => dispatch(actions.getPublicProducts()),
    updateSelectedCategory: category => dispatch(actions.updateSelectedCategory(category))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);
