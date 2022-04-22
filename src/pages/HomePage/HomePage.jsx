import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./homepage.module.scss";

const initialValues = {
  perKm: 0.56,
  startPosition: "",
  endPosition: "",
};

const HomePage = () => {
  const navigation = useNavigate();

  const [formValues, setFormValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSearchClick = () => {
    const start = encodeURI(formValues.startPosition);
    const end = encodeURI(formValues.endPosition);
    const price = encodeURI(formValues.perKm);

    if (start.length === 0 || end.length === 0) {
      alert("Wypełnij wszystkie pola.");
      return;
    }
    navigation(`/map?start=${start}&end=${end}&price=${price}`);
  };

  return (
    <main className={styles["homepage"]}>
      <div className={styles["homepage__column"]}>
        <h1 className={styles["homepage__title"]}>React Maps</h1>
        <label className={styles["homepage__subtitle"]}>Koszt za km</label>
        <div>
          <input
            type="text"
            name="perKm"
            value={formValues.perKm}
            onChange={handleInputChange}
            autoComplete="off"
            autoCorrect="false"
            className={
              styles["homepage__input"] + " " + styles["homepage__input--price"]
            }
          />
          <span>zł</span>
        </div>
        <label className={styles["homepage__subtitle"]}>
          Lokacja początkowa
        </label>
        <input
          type="text"
          name="startPosition"
          value={formValues.startPosition}
          onChange={handleInputChange}
          autoComplete="off"
          autoCorrect="false"
          className={styles["homepage__input"]}
        />
        <label className={styles["homepage__subtitle"]}>Lokacja końcowa</label>
        <input
          type="text"
          name="endPosition"
          value={formValues.endPosition}
          onChange={handleInputChange}
          autoComplete="off"
          autoCorrect="false"
          className={styles["homepage__input"]}
        />
        <span
          className={styles["homepage__button"]}
          onClick={handleSearchClick}
        >
          Wyszukaj trasę
        </span>
      </div>
      <div className={styles["homepage__column"]}>
        <h1 className={styles["homepage__title"]}>Historia</h1>
      </div>
    </main>
  );
};

export default HomePage;
