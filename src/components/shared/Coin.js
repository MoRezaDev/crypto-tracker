import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaReddit } from "react-icons/fa";

import styles from "./Coin.module.css";

import loading from "../../images/loading.svg";
import CoinChart from "./CoinChart";
import Markets from "./Markets";
import ResponsiveMarkets from "./ResponsiveMarkets";
import { themeContext } from "../../context/ThemeContextProvider";

const twitterURL = "https://twitter.com";

const Coin = () => {
  const location = useLocation();
  const { theme } = useContext(themeContext);
  const [isAnimated, setIsAnimated] = useState(true);
  const [isActived, setIsActived] = useState({
    overview: true,
    markets: false,
  });
  const [coin, setCoin] = useState([]);
  const [tickersData, setTickersData] = useState([]);

  const id = useParams();
  const {
    market_cap_rank,
    image,
    name,
    symbol,
    market_data,
    community_data,
    links,
  } = coin;

  const changeIsActivated = (event) => {
    console.log(event.target);
    event.target.id === "overview"
      ? setIsActived({ overview: true, markets: false })
      : setIsActived({ overview: false, markets: true });
    setIsAnimated(true);
  };
  useEffect(() => {
    const fetchApi = async () => {
      const result2 = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id.id}/tickers?include_exchange_logo=true&depth=true`
      );
      const result = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id.id}`
      );
      setCoin(result.data);
      setTickersData(result2.data);
    };
    fetchApi();
  }, [location, id.id]);

  if (coin.length === 0) {
    return (
      <div className={styles.LoadingContainer}>
        <div>
          <img src={loading} alt="loading" />
        </div>
      </div>
    );
  } else
    return (
      <div
        className={
          theme === "dark"
            ? `${styles.coinContainer} ${styles.darkContainer}`
            : styles.coinContainer
        }
      >
        <div className={styles.coinContentContainer}>
          <div className={styles.coinContentLeft}>
            <span>Rank #{market_cap_rank}</span>
            <div className={styles.coinImageNameSymbol}>
              <img src={image.small} alt="small" />
              <span>{name}</span>
              <span>({symbol.toUpperCase()})</span>
            </div>
            <div className={styles.priceTitle}>
              <h1>${market_data.current_price.usd}</h1>
              <h2
                style={{
                  color:
                    market_data.price_change_percentage_24h > 0
                      ? "#32CD32"
                      : "red",
                }}
              >
                {market_data.price_change_percentage_24h.toFixed(1)}%
              </h2>
            </div>
            <div className={styles.communityContainer}>
              <AiOutlineTwitter color="#1E90FF" size={40} />
              <span>
                <span>{community_data.twitter_followers} </span>followers on
                twitter
              </span>
            </div>
            <div className={styles.communityContainer}>
              <FaReddit color="#FF4500" size={40} />
              <span>
                <span>{community_data.reddit_subscribers} </span>Subscribers on
                Reddit
              </span>
            </div>
          </div>
          <div className={styles.coinContentRight}>
            <h1>Info</h1>
            <div className={styles.lineSeperator}></div>
            <div className={styles.contentRightItems}>
              <span>Website</span>
              <a rel="noreferrer" target="_blank" href={links.homepage[0]}>
                Click here
              </a>
            </div>
            <div className={styles.contentRightItems}>
              <span>Community</span>
              <div>
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`${twitterURL}/${links.twitter_screen_name}`}
                >
                  <AiOutlineTwitter />

                  <span>Twitter</span>
                </a>
                {links.subreddit_url && (
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href={`${links.subreddit_url}`}
                  >
                    <FaReddit />
                    <span>Reddit</span>
                  </a>
                )}
              </div>
            </div>
            <div className={styles.contentRightItems}>
              <span>Github</span>
              {links.repos_url.github[0] && (
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`${links.repos_url.github[0]}`}
                >
                  <span>Github</span>
                </a>
              )}
            </div>
          </div>
        </div>
        <div className={styles.coinContentContainerMktCapDetails}>
          <div className={styles.coinDetailMktCap}>
            <div className={`${styles.conDetailItems} ${styles.coinMargin}`}>
              <span>Market Cap</span>
              <span className={theme === "dark" && styles.lightFontColor}>
                ${market_data.market_cap.usd.toLocaleString()}
              </span>
            </div>
            <div className={styles.conDetailItems}>
              <span>Total volume</span>
              <span className={theme === "dark" && styles.lightFontColor}>
                ${market_data.total_volume.usd.toLocaleString()}
              </span>
            </div>
            <div className={styles.conDetailItems}>
              <span>Fully Diluted Valuation</span>
              {market_data.fully_diluted_valuation.usd && (
                <span className={theme === "dark" && styles.lightFontColor}>
                  {market_data.fully_diluted_valuation.usd.toLocaleString()}
                </span>
              )}
            </div>
          </div>
          <div className={styles.coinDetailMktCap}>
            <div className={styles.conDetailItems}>
              <span>Circulating Supply</span>
              {market_data.circulating_supply && (
                <span className={theme === "dark" && styles.lightFontColor}>
                  {market_data.circulating_supply.toLocaleString()}
                </span>
              )}
            </div>
            <div className={styles.conDetailItems}>
              <span>Total Supply</span>
              {market_data.total_supply && (
                <span className={theme === "dark" && styles.lightFontColor}>
                  {market_data.total_supply.toLocaleString()}
                </span>
              )}
            </div>
            <div className={styles.conDetailItems}>
              <span>Max Supply</span>
              {market_data.max_supply && (
                <span className={theme === "dark" && styles.lightFontColor}>
                  {market_data.max_supply.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className={styles.chartMarketsTitleContainer}>
          <div
            onAnimationEnd={() => setIsAnimated(false)}
            onClick={changeIsActivated}
            id="overview"
            style={{ borderBottom: isActived.overview && "2px solid #8dc647" }}
            className={
              isAnimated
                ? `${styles.titleItem} ${styles.animatedTitle}`
                : styles.titleItem
            }
          >
            <span onClick={changeIsActivated} id="overview">
              Overview
            </span>
          </div>
          <div
            onAnimationEnd={() => setIsAnimated(false)}
            onClick={changeIsActivated}
            id="markets"
            style={{ borderBottom: isActived.markets && "2px solid #8dc647" }}
            className={
              isAnimated
                ? `${styles.titleItem} ${styles.animatedTitle}`
                : styles.titleItem
            }
          >
            <span onClick={changeIsActivated} id="markets">
              Markets
            </span>
          </div>
        </div>
        <div className={styles.chartContainer}>
          {isActived.overview ? (
            <CoinChart coinId={id} />
          ) : (
            <>
              <Markets data={tickersData} />
              <ResponsiveMarkets data={tickersData} />
            </>
          )}
        </div>
      </div>
    );
};

export default Coin;
