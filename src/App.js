import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Coin from "./Coin";
import Navigator from "./Navigator";

function App() {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [orderedCoins, setOrderedCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [counter, setCounter] = useState(0);
  const [nameSorted, setNameSorted] = useState(false);
  const [symbolSorted, setSymbolSorted] = useState(false);
  const [currentPriceSorted, setCurrentPriceSorted] = useState(false);
  const [marketCapSorted, setMarketCapSorted] = useState(false);
  const [priceChangeSorted, setPriceChangeSorted] = useState(false);
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
                  console.log("filtered name");
                  nameSorted
                    ? setOrderedCoins(
                        filteredCoins.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1))
                      )
                    : setOrderedCoins(
                        filteredCoins.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
                      );
                  setNameSorted(!nameSorted);

                  console.log(orderedCoins);
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
                  console.log("sorted symbol");

                  symbolSorted
                    ? setOrderedCoins(
                        filteredCoins.sort((a, b) =>
                          a.symbol > b.symbol ? -1 : 1
                        )
                      )
                    : setOrderedCoins(
                        filteredCoins.sort((a, b) =>
                          a.symbol > b.symbol ? 1 : -1
                        )
                      );
                  setSymbolSorted(!symbolSorted);
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
                  console.log("sorted price");

                  currentPriceSorted
                    ? setOrderedCoins(
                        filteredCoins.sort(
                          (a, b) => a.current_price - b.current_price
                        )
                      )
                    : setOrderedCoins(
                        filteredCoins.sort(
                          (a, b) => b.current_price - a.current_price
                        )
                      );
                  setCurrentPriceSorted(!currentPriceSorted);
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
                  console.log("sorted volume");
                  totalVolumeSorted
                    ? setOrderedCoins(
                        filteredCoins.sort(
                          (a, b) => a.total_volume - b.total_volume
                        )
                      )
                    : setOrderedCoins(
                        filteredCoins.sort(
                          (a, b) => b.total_volume - a.total_volume
                        )
                      );
                  setTotalVolumeSorted(!totalVolumeSorted);
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
                  console.log("sorted change");
                  priceChangeSorted
                    ? setOrderedCoins(
                        filteredCoins.sort(
                          (a, b) =>
                            a.price_change_percentage_24h -
                            b.price_change_percentage_24h
                        )
                      )
                    : setOrderedCoins(
                        filteredCoins.sort(
                          (a, b) =>
                            b.price_change_percentage_24h -
                            a.price_change_percentage_24h
                        )
                      );
                  setPriceChangeSorted(!priceChangeSorted);
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
                  console.log("sorted mktcap");
                  marketCapSorted
                    ? setOrderedCoins(
                        filteredCoins.sort(
                          (a, b) => a.market_cap - b.market_cap
                        )
                      )
                    : setOrderedCoins(
                        filteredCoins.sort(
                          (a, b) => b.market_cap - a.market_cap
                        )
                      );
                  setMarketCapSorted(!marketCapSorted);
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
