import React from "react";
import styles from "./priceresult.module.scss";

const PriceResult = ({ price }) => {
  return (
    <div className={styles["price-result"]}>
      Koszt podróży: {price.toFixed(2)}zł
    </div>
  );
};

export default PriceResult;
