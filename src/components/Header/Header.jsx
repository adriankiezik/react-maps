import React from "react";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";

import { ImMap2 } from "react-icons/im";
import { MdArrowBack } from "react-icons/md";

const Header = () => {
  return (
    <div className={styles["header"]}>
      <span>React Maps</span>
      <ImMap2 />
      <div className={styles["header__button"]}>
        <Link to="/">
          <MdArrowBack />
        </Link>
      </div>
    </div>
  );
};

export default Header;
