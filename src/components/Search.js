import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Search = (props) => {
  let history = useHistory();
  let [searchInput, setSearchInput] = useState(props.searchQ || "");
  let searchFunc = (type) => {
    if (searchInput) history.push(`/search/${type}/${searchInput}/0`);
  };

  return (
    <div>
      <div className="form form-group">
        <div className="row justify-content-center">
          <div className="col-11 col-lg-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                id="query"
                placeholder="Search for..."
                aria-label="Book search field"
                value={searchInput || ""}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
                //handleSearchInput}
              ></input>
              <div className="input-group-append">
                <button
                  className={
                    props.dark
                      ? "btn btn-outline-light"
                      : "btn btn-outline-secondary"
                  }
                  type="button"
                  id="search-book"
                  onClick={() => {
                    searchFunc("b");
                  }}
                >
                  Book
                </button>
                <button
                  className={
                    props.dark
                      ? "btn btn-outline-light"
                      : "btn btn-outline-secondary"
                  }
                  type="button"
                  id="search-author"
                  onClick={() => {
                    searchFunc("a");
                  }}
                >
                  Author
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
