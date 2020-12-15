/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import EditIcon from "@material-ui/icons/Edit";
import styles from "../CreateContactModal/createContactModalStyle";
import { makeStyles } from "@material-ui/core/styles";
import ContentEditable from "react-contenteditable";
import { Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const CreateContactCard = props => {
  const { t } = useTranslation();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [demander, setDemander] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(0);
  const saveData = props.saveData;
  const connectedDemand = props.connectedDemand;

  useEffect(() => {
    if (connectedDemand) {
      setDemander(connectedDemand.demander);
      setAddress(connectedDemand.address);
      setEmail(connectedDemand.email);
      setTelephone(connectedDemand.telephone);
      setQuantity(connectedDemand.quantity);
    }
  }, [connectedDemand]);

  useEffect(() => {
    if (saveData) {
      const data = {
        id: connectedDemand.id,
        demander,
        address,
        telephone,
        email,
        quantity: Number(quantity),
        status: "not_available"
      };

      props.addData(data);
    }
  }, [saveData]);

  return (
    <Grid item xs={12} sm={12} md={6} key={connectedDemand.id} className={classes.orderCreator}>
      <Grid container spacing={0} alignItems="flex-start" justify="flex-start">
        <Grid item xs={12} sm={4} md={4}>
          <span className={classes.subheader}>{t("connectItems.confirm.productName")}</span>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <ContentEditable html={connectedDemand.productName} disabled={true} tagName="article" />
        </Grid>
      </Grid>
      <Grid container spacing={0} alignItems="flex-start" justify="flex-start">
        <Grid item xs={12} sm={4} md={4}>
          <span className={classes.subheader}>{t("connectItems.confirm.demander.contact")}</span>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <span>
            <EditIcon className={classes.editIcon} />
            <ContentEditable
              id="demander"
              html={demander}
              onChange={e => {
                setDemander(e.currentTarget.innerText.trim());
              }}
              className={classes.editMe}
              tagName="article"
            />
            <EditIcon className={classes.editIcon} />
            <ContentEditable
              html={telephone}
              onChange={e => setTelephone(e.currentTarget.innerText.trim())}
              className={classes.editMe}
              tagName="article"
            />
            <EditIcon className={classes.editIcon} />
            <ContentEditable
              html={email}
              onChange={e => setEmail(e.currentTarget.innerText.trim())}
              className={classes.editMe}
              tagName="article"
            />
          </span>
        </Grid>
      </Grid>
      <Grid container spacing={0} alignItems="flex-start" justify="flex-start">
        <Grid item xs={12} sm={4} md={4}>
          <span className={classes.subheader}>{t("connectItems.confirm.demander.address")}</span>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <span>
            <EditIcon className={classes.editIcon} />
            <ContentEditable
              html={address}
              onChange={e => setAddress(e.currentTarget.innerText.trim())}
              className={classes.editMe}
              tagName="article"
            />
          </span>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateContactCard;
