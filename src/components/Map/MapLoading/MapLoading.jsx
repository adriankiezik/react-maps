import React from "react";
import styles from "./maploading.module.scss";
import { FaSpinner } from "react-icons/fa";

const MapLoading = () => {
  return (
    <div className={styles["map__loading"]}>
      <div>Ładowanie trasy</div>
      <div className={styles["icon-spin"]}>
        <FaSpinner />
      </div>
    </div>
  );
};

export default MapLoading;
