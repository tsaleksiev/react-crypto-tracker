import React from "react";
import "./SortButton.css";

const SortButton = (props) => {
  const sortCurrentSelection = (sortCriteria) => {
    switch (sortCriteria) {
      case "name":
        console.log("sorted name");
        break;
      case "symbol":
        console.log("sorted symbol");
        break;
      case "price":
        console.log("sorted price");
        break;
      case "volume":
        console.log("sorted volume");
        break;
      case "change":
        console.log("sorted change");
        break;
      case "mktCap":
        console.log("sorted mktcap");
        break;
      default:
        break;
    }
  };

  return (
    <button
      onClick={() => sortCurrentSelection(props.sortType)}
      className="btn-sort"
    >
      sort
    </button>
  );
};

export default SortButton;
