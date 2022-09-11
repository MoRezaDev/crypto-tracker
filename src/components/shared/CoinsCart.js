import React from "react";
import { Link } from "react-router-dom";

import styles from "./CoinsCart.module.css";

const colorCalculator = (price) => {
  const result = price > 0 ? "#4eaf0a" : "#e15241";
  return result;
};

const CoinsCart = ({ data }) => {
  const {
    id,
    symbol,
    name,
    image,
    current_price,
    market_cap,
    market_cap_rank,
    total_volume,
    price_change_percentage_1h_in_currency,
    price_change_percentage_24h_in_currency,
    price_change_percentage_7d_in_currency,
  } = data;
  return (
    <div className={styles.coinCartContainer}>
      <span>{market_cap_rank}</span>
      <Link to={`/coin/${id}`}>
        <div className={styles.coinImageNameSymbol}>
          <img src={image} alt="img" />
          <span>{name}</span>
          <span>{symbol}</span>
        </div>
      </Link>
      <span>${current_price}</span>
      <span
        style={{
          color: colorCalculator(price_change_percentage_1h_in_currency),
        }}
      >
        {price_change_percentage_1h_in_currency &&
          price_change_percentage_1h_in_currency.toFixed(2)}
        %
      </span>
      <span
        style={{
          color: colorCalculator(price_change_percentage_24h_in_currency),
        }}
      >
        {price_change_percentage_24h_in_currency &&
          price_change_percentage_24h_in_currency.toFixed(2)}
        %
      </span>
      <span
        style={{
          color: colorCalculator(price_change_percentage_7d_in_currency),
        }}
      >
        {price_change_percentage_7d_in_currency &&
          price_change_percentage_7d_in_currency.toFixed(2)}
        %
      </span>
      <span>${total_volume.toLocaleString()}</span>
      <span>${market_cap.toLocaleString()}</span>
    </div>
  );
};

export default CoinsCart;
