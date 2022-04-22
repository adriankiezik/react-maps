import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./homepage.module.scss";
import getHistory from "../../util/history/getHistory";
import { AiOutlineArrowDown } from "react-icons/ai";

const initialValues = {
  startPosition: "",
  endPosition: "",
};

const HomePage = () => {
  const navigation = useNavigate();
  const history = getHistory();

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

    if (start.length === 0 || end.length === 0) {
      alert("Wypełnij wszystkie pola.");
      return;
    }
    navigation(`/map?start=${start}&end=${end}`);
  };

  return (
    <main className={styles["homepage"]}>
      <div className={styles["homepage__column"]}>
        <h1 className={styles["homepage__title"]}>React Maps</h1>
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
        {history == null ? (
          <div className={styles["homepage__history"]}>Historia jest pusta</div>
        ) : (
          history.slice(0, 3).map((historyElem, key) => {
            return (
              <div key={key} className={styles["homepage__history"]}>
                {historyElem.start}
                <AiOutlineArrowDown />
                {historyElem.end}
              </div>
            );
          })
        )}
      </div>
    </main>
  );
};

export default HomePage;
