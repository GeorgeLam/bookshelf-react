import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Subbar = (props) => {
  return (
    <div className="container">
      <div className="" id="top">
        <div className="row justify-content-center">
          <div className="display-4 my-2">
            {props.title ? (
              <span>{props.title}</span>
            ) : (
              <span className="mainTitle">Book Searcher</span>
            )}
          </div>
        </div>
        <div className="row justify-content-center mb-4 mainLinks">
          <div className="mr-2">
            <Link to="/">Find Books</Link>
          </div>
          <Link to="/saved">Saved Books</Link>
        </div>
      </div>
    </div>
  );
};

export default Subbar;
