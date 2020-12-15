import React from "react";
import { Map, TileLayer } from "react-leaflet";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./mapStyle.js";

const useStyles = makeStyles(styles);

export default function App() {
  const classes = useStyles();
  return (
    <Map center={[57.4, 12.7]} zoom={7} className={classes.leafletContainer}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </Map>
  );
}
