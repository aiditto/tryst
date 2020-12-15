/*eslint-disable*/
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// material ui icons
// style for this view
import styles from "./supplierContactStyle";
// core components
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import WarningIcon from "@material-ui/icons/Warning";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import { verifyOrgNumber, checkSessionData, updateSessionData, getSessionData } from "shared/utility";

import { DEMAND_FIELDS, verifyEmail, verifyTelephone } from "shared/utility";
const useStyles = makeStyles(styles);

const SupplierContactForm = props => {
  const classes = useStyles();
  const { t } = useTranslation();

  // type validation
  const [organizationNumber, setOrganizationNumber] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [info, setInfo] = useState("");
  const [, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [orgCheckComplete, setOrgCheckComplete] = useState(false);
  const [orgCheckOk, setOrgCheckOk] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailState, setEmailState] = useState("");
  const [phoneState, setPhoneState] = useState("");
  const demandId = props.demandId;
  const fields = props.fields;
  const theme = props.theme;

  useEffect(() => {
    if ((emailState === "error" && email !== "") || (phoneState === "error" && phoneNumber !== "")) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [emailState, email, phoneState, phoneNumber]);

  const OrgNumberOk = () => {
    return (
      <Tooltip title="Organization found!" placement="right">
        <VerifiedUserIcon className={classes.iconSuccess} />
      </Tooltip>
    );
  };
  const OrgNumberFail = () => {
    return (
      <Tooltip title="Invalid organization number" placement="right">
        <WarningIcon className={classes.iconFailure} />
      </Tooltip>
    );
  };
  const OrgNumberLoading = () => {
    return (
      <Tooltip title="Loading" placement="right">
        <HourglassEmptyIcon className={classes.iconLoading} />
      </Tooltip>
    );
  };

  function findCompanyName(data) {
    // The name is found as ..."name":"COMPANY_NAME"...
    // So we look for the string starting at "name":" and ending at "
    return data
      .substring(data.indexOf('"name":"') + 8)
      .substring(0, data.substring(data.indexOf('"name":"') + 8).indexOf('"'));
  }

  useEffect(() => {
    if (checkSessionData()) {
      const session_data = getSessionData();
      setOrganizationNumber(session_data.organizationNumber);
      setAddress(session_data.address && session_data.address);
      setInfo(session_data.information && session_data.information);
      setFirstname(session_data.firstname && session_data.information);
      setLastname(session_data.lastname && session_data.lastname);
      setEmail(session_data.email && session_data.email);
      setPhoneNumber(session_data.phoneNumber && session_data.phoneNumber);
    }
  }, []);

  useEffect(() => {
    setLoading(false);
    setOrgCheckComplete(false);
    setOrgCheckOk(false);
    setOrgName("");

    if (organizationNumber) {
      const regex1 = /^(\d){6}-(\d){4}$/gim; // Org number should be in format 123456-1234 or 12345671234
      const regex2 = /^(\d){10}$/gim;
      if (organizationNumber.match(regex1) || organizationNumber.match(regex2)) {
        setLoading(true);
        verifyOrgNumber(organizationNumber, (err, res) => {
          setLoading(false);
          setOrgCheckComplete(true);
          if (err) {
            setOrgCheckOk(false);
          } else {
            setOrgCheckOk(true);
            setOrgName(findCompanyName(res.data));
          }
        });
      } else {
        setLoading(false);
      }
    }
  }, [organizationNumber]);

  useEffect(() => {
    if (props.getData) sendData();
  }, [props.getData]);

  useEffect(() => {
    props.handleLoading(orgCheckOk)
  }, [orgCheckOk]);

  const sendData = () => {
    const new_data = {
      organizationNumber: organizationNumber,
      address: address,
      information: info,
      firstname: firstname,
      lastname: lastname,
      email: email,
      phoneNumber: phoneNumber
    };

    updateSessionData(new_data);

    props.sendData(new_data);
  };


  return (
    <Grid container direction="column" className={classes.root} style={{ color: theme.palette.secondary.main }}>
      {fields &&
        fields.map(
          (field, index) =>
            field.isNeeded && (
              <Grid container item key={index} className={classes.formInputStyles}>
                {field.name === DEMAND_FIELDS.ORGANIZATION_NUMBER && (
                  <>
                    <Grid item>
                      {!loading && !orgCheckComplete && (
                        <TextField
                          id="organizationNumber"
                          fullWidth
                          required
                          label={t("demands.orgNumber")}
                          type="text"
                          rows={1}
                          variant="outlined"
                          size="small"
                          value={organizationNumber}
                          onChange={event => {
                            setOrganizationNumber(event.target.value);
                          }}
                        />
                      )}
                      {loading && !orgCheckComplete && (
                        <TextField
                          id="organizationNumber"
                          fullWidth
                          required
                          label={t("demands.orgNumber")}
                          type="text"
                          rows={1}
                          variant="outlined"
                          size="small"
                          value={organizationNumber}
                          onChange={event => {
                            setOrganizationNumber(event.target.value);
                          }}
                          InputProps={{
                            endAdornment: <OrgNumberLoading />
                          }}
                        />
                      )}
                      {orgCheckComplete && !orgCheckOk && (
                        <TextField
                          id="organizationNumber"
                          fullWidth
                          required
                          label={t("demands.orgNumber")}
                          type="text"
                          rows={1}
                          variant="outlined"
                          size="small"
                          value={organizationNumber}
                          onChange={event => {
                            setOrganizationNumber(event.target.value);
                          }}
                          InputProps={{
                            endAdornment: <OrgNumberFail />
                          }}
                        />
                      )}
                      {orgCheckComplete && orgCheckOk && (
                        <TextField
                          id="organizationNumber"
                          fullWidth
                          required
                          label={t("demands.orgNumber")}
                          type="text"
                          rows={1}
                          variant="outlined"
                          size="small"
                          value={organizationNumber}
                          onChange={event => {
                            setOrganizationNumber(event.target.value);
                          }}
                          InputProps={{
                            endAdornment: <OrgNumberOk />
                          }}
                        />
                      )}
                    </Grid>
                    {orgName && (
                      <Grid item className={classes.formInputStyles}>
                        <TextField
                          id="orgName"
                          fullWidth
                          label={"Organization Name"}
                          type="text"
                          rows={1}
                          size="small"
                          value={orgName}
                          disabled
                        />
                      </Grid>
                    )}
                  </>
                )}
                {field.name === DEMAND_FIELDS.FIRST_NAME && (
                  <Grid item className={classes.formInputStyles}>
                    <TextField
                      id="firstname"
                      fullWidth
                      required
                      label={t("demands.firstname")}
                      type="text"
                      rows={1}
                      variant="outlined"
                      size="small"
                      value={firstname}
                      onChange={event => {
                        setFirstname(event.target.value);
                      }}
                    />
                  </Grid>
                )}

                {field.name === DEMAND_FIELDS.LAST_NAME && (
                  <Grid item className={classes.formInputStyles}>
                    <TextField
                      id="lastname"
                      fullWidth
                      required
                      label={t("demands.lastname")}
                      type="text"
                      rows={1}
                      variant="outlined"
                      size="small"
                      value={lastname}
                      onChange={event => {
                        setLastname(event.target.value);
                      }}
                    />
                  </Grid>
                )}

                {field.name === DEMAND_FIELDS.PHONE_NUMBER && (
                  <Grid item className={classes.formInputStyles}>
                    <TextField
                      error={phoneNumber !== "" && phoneState === "error"}
                      id="phonenumber"
                      fullWidth
                      required
                      label={t("demands.phonenumber")}
                      type="text"
                      rows={1}
                      variant="outlined"
                      size="small"
                      value={phoneNumber}
                      onChange={event => {
                        if (verifyTelephone(event.target.value)) {
                          setPhoneState("success");
                        } else {
                          setPhoneState("error");
                        }
                        setPhoneNumber(event.target.value);
                      }}
                      helperText={phoneNumber !== "" && phoneState === "error" && t("demands.warnings.phone")}
                    />
                  </Grid>
                )}

                {field.name === DEMAND_FIELDS.EMAIL && (
                  <Grid item className={classes.formInputStyles}>
                    <TextField
                      error={email !== "" && emailState === "error"}
                      id="email"
                      fullWidth
                      required
                      label={t("demands.email")}
                      type="text"
                      rows={1}
                      variant="outlined"
                      size="small"
                      value={email}
                      onChange={event => {
                        if (verifyEmail(event.target.value)) {
                          setEmailState("success");
                        } else {
                          setEmailState("error");
                        }
                        setEmail(event.target.value);
                      }}
                      helperText={email !== "" && emailState === "error" && t("demands.warnings.email")}
                    />
                  </Grid>
                )}

                {field.name === DEMAND_FIELDS.ADDRESS && (
                  <Grid item className={classes.formInputStyles}>
                    <TextField
                      id="address"
                      fullWidth
                      required
                      label={t("demands.address")}
                      type="text"
                      rows={1}
                      variant="outlined"
                      size="small"
                      value={address}
                      onChange={event => {
                        setAddress(event.target.value);
                      }}
                    />
                  </Grid>
                )}

                {field.name === DEMAND_FIELDS.ADDITIONAL_INFORMATION && (
                  <Grid item className={classes.formInputStyles}>
                    <TextField
                      id="info"
                      fullWidth
                      label={t("demands.moreInfo")}
                      type="text"
                      multiline
                      rows={3}
                      variant="outlined"
                      size="small"
                      value={info}
                      onChange={event => {
                        setInfo(event.target.value);
                      }}
                    />
                  </Grid>
                )}
              </Grid>
            )
        )}
    </Grid>
  );
};

export default SupplierContactForm;
