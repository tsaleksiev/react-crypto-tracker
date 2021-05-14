import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Coin from "./Coin";
import Navigator from "./Navigator";
import * as sort from "sort.js";

function App() {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [orderedCoins, setOrderedCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [counter, setCounter] = useState(0);
  const [namesSorted, setNamesSorted] = useState(false);
  const [symbolsSorted, setSymbolsSorted] = useState(false);
  const [currentPricesSorted, setCurrentPricesSorted] = useState(false);
  const [marketCapsSorted, setMarketCapsSorted] = useState(false);
  const [priceChangesSorted, setPriceChangesSorted] = useState(false);
  const [totalVolumeSorted, setTotalVolumeSorted] = useState(false);

  console.log(filteredCoins);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    console.log("filtered");
    setFilteredCoins(
      coins.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [coins, search]);

  useEffect(() => {
    setFilteredCoins(orderedCoins);
  }, [orderedCoins]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const sortNames = () => {
    namesSorted
      ? setOrderedCoins(
          filteredCoins.sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1
          )
        )
      : setOrderedCoins(
          filteredCoins.sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          )
        );
    setNamesSorted(!namesSorted);
  };

  const sortSymbols = () => {
    symbolsSorted
      ? setOrderedCoins(
          filteredCoins.sort((a, b) => (a.symbol > b.symbol ? -1 : 1))
        )
      : setOrderedCoins(
          filteredCoins.sort((a, b) => (a.symbol > b.symbol ? 1 : -1))
        );
    setSymbolsSorted(!symbolsSorted);
  };

  const sortPrices = () => {
    currentPricesSorted
      ? setOrderedCoins(
          filteredCoins.sort((a, b) => a.current_price - b.current_price)
        )
      : setOrderedCoins(
          filteredCoins.sort((a, b) => b.current_price - a.current_price)
        );
    setCurrentPricesSorted(!currentPricesSorted);
  };

  const sortVolume = () => {
    totalVolumeSorted
      ? setOrderedCoins(
          filteredCoins.sort((a, b) => a.total_volume - b.total_volume)
        )
      : setOrderedCoins(
          filteredCoins.sort((a, b) => b.total_volume - a.total_volume)
        );
    setTotalVolumeSorted(!totalVolumeSorted);
  };

  const sortMktCap = () => {
    marketCapsSorted
      ? setOrderedCoins(
          filteredCoins.sort((a, b) => a.market_cap - b.market_cap)
        )
      : setOrderedCoins(
          filteredCoins.sort((a, b) => b.market_cap - a.market_cap)
        );
    setMarketCapsSorted(!marketCapsSorted);
  };

  const sortPriceChanges = () => {
    priceChangesSorted
      ? setOrderedCoins(
          filteredCoins.sort(
            (a, b) =>
              a.price_change_percentage_24h - b.price_change_percentage_24h
          )
        )
      : setOrderedCoins(
          filteredCoins.sort(
            (a, b) =>
              b.price_change_percentage_24h - a.price_change_percentage_24h
          )
        );
    setPriceChangesSorted(!priceChangesSorted);
  };

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Crypto search</h1>
        <form>
          <input
            type="text"
            placeholder="Search currencies"
            className="coin-input"
            onChange={handleChange}
          />
        </form>
      </div>
      <button onClick={() => setCounter(counter + 1)}>button {counter}</button>
      <div className="sort-container">
        <div className="coin-row">
          <div className="coin">
            <h1>
              name
              <button
                onClick={() => {
                  sortNames();
                }}
                className="btn-sort"
              >
                sort
              </button>
            </h1>
            <p className="coin-symbol">
              Symbol
              <button
                onClick={() => {
                  sortSymbols();
                }}
                className="btn-sort"
              >
                sort
              </button>
            </p>
          </div>
          <div className="coin-data">
            <p className="coin-price">
              price
              <button
                onClick={() => {
                  sortPrices();
                }}
                className="btn-sort"
              >
                sort
              </button>
            </p>
            <p className="coin-volume">
              volume
              <button
                onClick={() => {
                  sortVolume();
                }}
                className="btn-sort"
              >
                sort
              </button>
            </p>
            <p className="coin-percent red">
              change
              <button
                onClick={() => {
                  sortPriceChanges();
                }}
                className="btn-sort"
              >
                sort
              </button>
            </p>
            <p className="coin-marketcap">
              Mkt Cap:
              <button
                onClick={() => {
                  sortMktCap();
                }}
                className="btn-sort"
              >
                sort
              </button>
            </p>
          </div>
        </div>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
          />
        );
      })}
    </div>
  );
}

export default App;
