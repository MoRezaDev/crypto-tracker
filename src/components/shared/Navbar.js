import React, { useContext, useEffect, useState } from "react";
import { useClickOutside } from "react-click-outside-hook";
import axios from "axios";

import { IoSearchOutline } from "react-icons/io5";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { MoonLoader } from "react-spinners";

//call hook
import useDebounce from "../../hooks/useDebounce";

import styles from "./Navbar.module.css";
import logo from "../../images/pie-chart.png";

import { themeContext } from "../../context/ThemeContextProvider";
import BurgerMenu from "../BurgerMenu";
import { Link, useLocation } from "react-router-dom";
import Login from "../Login";
import SignupModal from "../SignupModal";

const Navbar = () => {
  const { theme, changeTheme } = useContext(themeContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [ref, isClickedOutSide] = useClickOutside();
  const [refSearchText, isClickedOutsideSearchText] = useClickOutside();
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [coinResults, setCoinResults] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [isSignuoModal, setIsSignupModal] = useState(false);

  const location = useLocation();

  const searchChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const searchCoin = async () => {
    if (!searchText && searchText.trim() === "") return;
    setIsLoading(true);
    const result = await axios.get(
      `https://api.coingecko.com/api/v3/search?query=${searchText}`
    );
    if (result) {
      setCoinResults(result.data);
    }
    setIsLoading(false);
  };

  const clickHandlerLink = () => {
    setCoinResults([]);
    setSearchText("");
  };

  useDebounce(searchText, 600, searchCoin);

  useEffect(() => {
    if (isClickedOutsideSearchText) {
      setCoinResults([]);
      setSearchText("");
    }
    if (searchText === "") {
      setCoinResults([]);
    }
    if (isClickedOutSide) setIsExpanded(false);
  }, [isClickedOutSide, searchText, isClickedOutsideSearchText]);

  const clickLoginHandler = () => {
    if (location.pathname === "/login") return;
    ExpandModal();
  };

  const clickSignupModalHandler = () => {
    if (location.pathname === "/signup") return;
    ExpandSingupModal();
  };

  const ExpandModal = () => {
    setIsModal(true);
  };

  const ExpandSingupModal = () => {
    setIsSignupModal(true);
  };

  const collapseModal = () => {
    setIsModal(false);
  };

  const collapseSignupModal = () => {
    setIsSignupModal(false);
  };

  
  return (
    <div
      className={
        theme === "dark"
          ? `${styles.navbarContainer} ${styles.navDark}`
          : styles.navbarContainer
      }
    >
      <div
        ref={refSearchText}
        className={
          coinResults.coins
            ? `${styles.searchBarContainer} ${styles.activeWidth}`
            : styles.searchBarContainer
        }
      >
        <div className={styles.searchInputContainer}>
          <IoSearchOutline size={20} />
          <input
            onChange={searchChangeHandler}
            value={searchText}
            placeholder="didn't find your coin? Search here"
            type="text"
          />
          {isLoading && (
            <div className={styles.moonLoaderContainer}>
              <MoonLoader size={13} />
            </div>
          )}
        </div>
        {coinResults.coins && <div className={styles.lineSeperator}></div>}
        <div className={styles.inputResultsContainer}>
          {coinResults.coins &&
            coinResults.coins.map((coin) => {
              return (
                <div key={coin.id} className={styles.resultItems}>
                  <Link onClick={clickHandlerLink} to={`/coin/${coin.id}`}>
                    <div>
                      <img src={coin.thumb} alt="thumb" />
                      <h5>{coin.name}</h5>
                    </div>
                  </Link>
                  <div>
                    <span>
                      #{coin.market_cap_rank ? coin.market_cap_rank : "N/A"}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className={styles.navbarMain}>
        <div className={styles.logoContainer}>
          <Link to="/">
            <img src={logo} alt="logo" />
            <h2>Crypto Tracker</h2>
          </Link>
        </div>
        <div className={styles.navContents}>
          <div onClick={changeTheme} className={styles.themeContainer}>
            {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
          </div>
          <span onClick={clickLoginHandler}>Login</span>
          <span onClick={clickSignupModalHandler}>Sign Up</span>
        </div>
        <div ref={ref} className={styles.burgerMenuContainer}>
          <GiHamburgerMenu size={20} onClick={() => setIsExpanded(true)} />
          {
            <BurgerMenu
              isExpanded={isExpanded}
              closeButton={() => setIsExpanded(false)}
            />
          }
        </div>
      </div>
      {isModal && (
        <Login
          isModal={isModal}
          ExpandModal={ExpandModal}
          collapseModal={collapseModal}
        />
      )}
      {isSignuoModal && (
        <SignupModal
          isSignuoModal={isSignuoModal}
          ExpandSingupModal={ExpandSingupModal}
          collapseSignupModal={collapseSignupModal}
        />
      )}
    </div>
  );
};

export default Navbar;
