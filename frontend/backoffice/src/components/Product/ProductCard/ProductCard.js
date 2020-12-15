/* eslint-disable react/prop-types */
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./productCardStyle";
import "./productCard.scss";
import { Link } from "react-router-dom";

// Dialog
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import InfoDialog from "components/Quill/InfoDialog/InfoDialog";

const ProductCard = props => {
  const { t } = useTranslation();
  const product = props.product;
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  // Dialog
  const [open, setOpen] = useState(false);
  const [, setInfo] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
    setInfo(product.info);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const itemToBuffer = product => {
    return Buffer.from(JSON.stringify(product)).toString("base64");
  };

  return (
    <Grid container item md={12} xs={12} className={classes.listStyle} alignItems="center" justify="space-between">
      <Grid item xs={8} md={8} lg={8}>
        <h2>{product.productName}</h2>
      </Grid>
      {product && product.info && (
        <Grid item xs={6} md={2} lg={2}>
          <Button size="large" square="true" className={classes.listInfoButton} onClick={handleClickOpen}>
            {t("products.showInfo")}
          </Button>
        </Grid>
      )}
      <Grid item xs={6} md={2} lg={2}>
        <Link to={{ pathname: `/createasset/${itemToBuffer(product)}`, query: { product } }}>
          <Button size="large" square="true" className={classes.listHelpButton}>
            {t("products.createAsset")}
          </Button>
        </Link>
      </Grid>
      <InfoDialog product={product} open={open} setClose={handleClose} />
    </Grid>
  );
};
export default ProductCard;
