import React from "react";
import styles from "./mappage.module.scss";
import Map from "../../components/Map/Map";
import Header from "../../components/Header/Header";

const MapPage = () => {
  return (
    <main className={styles["map-page"]}>
      <Header />
      <Map />
    </main>
  );
};

export default MapPage;
