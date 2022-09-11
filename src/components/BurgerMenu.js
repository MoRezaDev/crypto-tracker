import React, { useContext } from "react";
import { GrFormClose } from "react-icons/gr";
import { AiOutlineHome } from "react-icons/ai";
import { FiUserPlus, FiUserCheck } from "react-icons/fi";
import { Link } from "react-router-dom";

import logo from "../images/pie-chart.png";

import styles from "./BurgerMenu.module.css";

import { themeContext } from "../context/ThemeContextProvider";
const BurgerMenu = ({ isExpanded, closeButton }) => {
  const { theme } = useContext(themeContext);

  return (
    <div
      className={
        theme === "dark"
          ? isExpanded
            ? `${styles.burgerMenuMainContainer} ${styles.show} ${styles.burgerMenuDark}`
            : `${styles.burgerMenuMainContainer} ${styles.hide} ${styles.burgerMenuDark}`
          : isExpanded
          ? `${styles.burgerMenuMainContainer} ${styles.show}`
          : `${styles.burgerMenuMainContainer} ${styles.hide}`
      }
    >
      <div className={styles.burgerMenuTitle}>
        <div>
          <img style={{ width: "20px", height: "20px" }} src={logo} alt="logo" />
          <h4>Crypto Tracker</h4>
        </div>
        <div onClick={closeButton}>
          <GrFormClose />
        </div>
      </div>
      <div className={styles.lineSeperator}></div>
      <div className={styles.burgermenuItemsContainer}>
        <div>
          <AiOutlineHome />
          <Link onClick={closeButton} to="/">
            Home
          </Link>
        </div>
        <div>
          <FiUserCheck />
          <Link to="/login" onClick={closeButton}>
            Login
          </Link>
        </div>
        <div>
          <FiUserPlus />
          <Link to="/signup" onClick={closeButton}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
