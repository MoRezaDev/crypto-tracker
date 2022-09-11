import React from "react";
import { Link } from "react-router-dom";
import styles from "./ResponsiveCoinsCart.module.css";

const colorCalculator = (price) => {
  const result = price > 0 ? "#4eaf0a" : "#e15241";
  return result;
};

const ResponsiveCoinsCart = ({ data, query, setQuery, changeHandler }) => {
  return (
    <div className={styles.responsiveMainContainer}>
      <div className={styles.mainSearch}>
        <input
          value={query}
          onChange={changeHandler}
          type="text"
          placeholder="Search your coin"
        />
      </div>
      <div className={styles.cryptoTitleContainer}>
        <div className={styles.cryptoListTitle}>
          <div className={styles.cryptoTitle}>
            <h5>#</h5>
            <h5>Coin</h5>
          </div>
          <div>
            {data.map((coin) => {
              return (
                <div key={coin.id} className={styles.cryptoContentFirst}>
                  <span>{coin.market_cap_rank}</span>
                  <Link to={`/coin/${coin.id}`}>
                    <div className={styles.coinImageNameSymbol}>
                      <img alt="img coin" src={coin.image} />
                      <span>{coin.name}</span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <div id={styles.cryptoSecondTitle} className={styles.cryptoListTitle}>
          <div className={`${styles.cryptoTitle} ${styles.cryptoTitle2}`}>
            <h5>Price</h5>
            <h5>1h</h5>
            <h5>24h</h5>
            <h5>7d</h5>
            <h5>Total Volume</h5>
            <h5>Mkt Cap</h5>
          </div>
          <div>
            {data.map((coin) => {
              return (
                <div key={coin.id} className={styles.cryptoContentSecond}>
                  <span>${coin.current_price}</span>
                  <span
                    style={{
                      color: colorCalculator(
                        coin.price_change_percentage_1h_in_currency
                      ),
                    }}
                  >
                    {coin.price_change_percentage_1h_in_currency &&
                      coin.price_change_percentage_1h_in_currency.toFixed(2)}
                    %
                  </span>
                  <span
                    style={{
                      color: colorCalculator(
                        coin.price_change_percentage_24h_in_currency
                      ),
                    }}
                  >
                    {coin.price_change_percentage_24h_in_currency &&
                      coin.price_change_percentage_24h_in_currency.toFixed(2)}
                    %
                  </span>
                  <span
                    style={{
                      color: colorCalculator(
                        coin.price_change_percentage_7d_in_currency
                      ),
                    }}
                  >
                    {coin.price_change_percentage_7d_in_currency &&
                      coin.price_change_percentage_7d_in_currency.toFixed(2)}
                    %
                  </span>
                  <span>${coin.total_volume.toLocaleString()}</span>
                  <span>${coin.market_cap.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveCoinsCart;
