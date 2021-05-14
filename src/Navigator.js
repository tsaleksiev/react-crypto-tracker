import React from "react";
import "./Navigator.css";
import SortButton from "./SortButton";

const Navigator = () => {
  return (
    <div className="sort-container">
      <div className="coin-row">
        <div className="coin">
          <h1>
            name <SortButton sortType="name" />
          </h1>
          <p className="coin-symbol">
            Symbol <SortButton sortType="symbol" />
          </p>
        </div>
        <div className="coin-data">
          <p className="coin-price">
            price <SortButton sortType="price" />
          </p>
          <p className="coin-volume">
            volume <SortButton sortType="volume" />
          </p>
          <p className="coin-percent red">
            change <SortButton sortType="change" />
          </p>
          <p className="coin-marketcap">
            Mkt Cap: <SortButton sortType="mktCap" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navigator;