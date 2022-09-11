import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./Markets.module.css";

const Markets = ({ data }) => {
  const { tickers } = data;
  return (
    <div>
      <div style={{ marginBottom: "40px" }}>
        <h1>{data.name} Markets</h1>
      </div>
      <div className={styles.marketTitleContainer}>
        <h5>#</h5>
        <h5>Exchange</h5>
        <h5>Pair</h5>
        <h5>Price</h5>
        <h5>Spread</h5>
        <h5>+2%Depth</h5>
        <h5>-2%Depth</h5>
        <h5>24h Volume</h5>
        <h5>Trust Score</h5>
      </div>

      {tickers &&
        tickers.map((market, idx) => (
          <div key={idx} className={styles.marketsDetailsContainer}>
            <div>
              <span>{idx + 1}</span>
            </div>
            <div>
              <img src={market.market.logo} />
              <span>{market.market.name}</span>
            </div>
            <div>
              <div style={{ width: "133px", overflow: "auto" }}>
                <span>{market.base}/</span>
                <span>{market.target}</span>
              </div>
            </div>
            <div>
              <span>${market.last && market.last.toFixed(2)}</span>
            </div>
            <div>
              <span>
                {market.bid_ask_spread_percentage &&
                  market.bid_ask_spread_percentage.toFixed(2)}
                %
              </span>
            </div>
            <div>
              <span>
                $
                {market.cost_to_move_up_usd &&
                  Math.round(market.cost_to_move_up_usd).toLocaleString()}
              </span>
            </div>
            <div>
              <span>
                $
                {market.cost_to_move_down_usd &&
                  Math.round(market.cost_to_move_down_usd).toLocaleString()}
              </span>
            </div>
            <div>
              <span>
                $
                {market.converted_volume.usd &&
                  market.converted_volume.usd.toLocaleString()}
              </span>
            </div>
            <div>
              <div
                style={{
                  width: "15px",
                  height: "15px",
                  backgroundColor: `${market.trust_score}`,
                  borderRadius: "50%",
                }}
              ></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Markets;
