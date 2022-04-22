import React, { useState, useEffect } from "react";
import styles from "./priceinput.module.scss";

const defaultPrice = 0.55;

const PriceInput = ({ setKmPrice }) => {
  const [price, setPrice] = useState(defaultPrice);

  useEffect(() => {
    setKmPrice(price);
  }, [price]);

  return (
    <div className={styles["price-input"]}>
      <label>Koszt kilometra:</label>
      <input
        type="number"
        className={styles["price-input__form"]}
        step="0.05"
        value={price}
        onChange={(e) => setPrice(+e.target.value)}
      />
      <label>zł</label>
    </div>
  );
};

export default PriceInput;
