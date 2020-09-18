import React from "react";
import Search from "./components/Search";
import Subbar from "./components/Subbar";

const Home = () => {
  return (
    <div className="bg">
      <div className="main">
        <div className="containezr">
          <Subbar />
          <Search dark={1} />
        </div>
      </div>
    </div>
  );
};

export default Home;
