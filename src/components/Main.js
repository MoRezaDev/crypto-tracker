import React, { useContext, useState } from "react";

import styles from "./Main.module.css";
import CoinsCart from "./shared/CoinsCart";
import ResponsiveCoinsCart from "./shared/ResponsiveCoinsCart";

import { themeContext } from "../context/ThemeContextProvider";

const Main = ({ data }) => {
  const [query, setQuery] = useState("");
  const { theme } = useContext(themeContext);

  const filteredData = data.filter((coin) =>
    coin.name.toLowerCase().includes(query.toLowerCase())
  );

  const changeHandler = (event) => {
    setQuery(event.target.value);
  };
  return (
    <div
      className={
        theme === "dark"
          ? `${styles.mainContainer} ${styles.mainDark}`
          : styles.mainContainer
      }
    >
      <div className={styles.mainContents}>
        <div className={styles.mainSearch}>
          <input
            value={query}
            onChange={changeHandler}
            type="text"
            placeholder="Search your coin"
          />
        </div>
        <div className={styles.cryptoListContainer}>
          <div className={styles.cryptoListTitle}>
            <h5>#</h5>
            <h5>Coin</h5>
            <h5>Price</h5>
            <h5>1h</h5>
            <h5>24h</h5>
            <h5>7d</h5>
            <h5>Total Volume</h5>
            <h5>Mkt Cap</h5>
          </div>
          <div>
            {filteredData.map((coin) => (
              <CoinsCart key={coin.id} data={coin} />
            ))}
          </div>
        </div>
      </div>
      <ResponsiveCoinsCart
        data={filteredData}
        query={query}
        setQuery={setQuery}
        changeHandler={changeHandler}
      />
    </div>
  );
};

export default Main;
