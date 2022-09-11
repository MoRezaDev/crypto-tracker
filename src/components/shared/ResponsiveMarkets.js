import React from "react";

import styles from "./ResponsiveMarkets.module.css";

const ResponsiveMarkets = ({ data }) => {
  const { tickers } = data;

  return (
    <div className={styles.responsiveMarketContainer}>
      <div className={styles.responsiveLeftContainer}>
        <div>
          <h5>#</h5>
          <h5>Exchange</h5>
          <h5>Pair</h5>
        </div>
        {tickers &&
          tickers.map((market, idx) => (
            <div key={idx} className={styles.marketsDetailsContainer}>
              <div>
                <span>{idx + 1}</span>
              </div>
              <div>
                <img src={market.market.logo} />
                <span style={{ overflow: "auto" }}>{market.market.name}</span>
              </div>
              <div className={styles.res} style={{ overflow: "auto" }}>
                <div style={{ width: "133px", overflow: "auto" }}>
                  <span>{market.base}/</span>
                  <span>{market.target}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className={styles.responsiveRightContainer}>
        <div>
          <h5>Price</h5>
          <h5>Spread</h5>
          <h5>+2%Depth</h5>
          <h5>-2%Depth</h5>
          <h5>24h Volume</h5>
          <h5>Trust Score</h5>
        </div>
        {tickers &&
          tickers.map((market, idx) => (
            <div key={idx} className={styles.marketsDetailsContainer2}>
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
                  {market.converted_volume.usd.toLocaleString &&
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
    </div>
  );
};

export default ResponsiveMarkets;
