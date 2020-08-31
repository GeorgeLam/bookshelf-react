import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import Subbar from "./components/Subbar";
import BackButton from "./components/BackButton";

const Book = ({ match }) => {
  const {
    params: { bookId },
  } = match;

  let [data, setData] = useState();

  useEffect(() => {
    (async () => {
      let response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${bookId}`
      );
      setData(await response.json());
    })();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const GoBack = ({ history }) => {
    history.goBack();
  };

  return (
    <div className="container">
      <Subbar />
      <div className="row">
        <div className="col col-10 mx-auto">
          <div className="card h-100">
            <div className="row card-body">
              <div className="col-6">
                <BackButton />
                <h4>
                  {data?.volumeInfo?.title}
                </h4>
                <h6 className="card-text">{data?.volumeInfo?.authors}</h6>
                <p className="card-text">{data?.volumeInfo?.description}</p>
                <a
                  href={data?.volumeInfo?.infoLink}
                  target="_blank"
                  className="btn btn-sm btn-primary mr-2"
                >
                  Learn More
                </a>
              </div>
              {
                <img
                  className="col-4 text-center mx-auto"
                  src={
                    data?.volumeInfo?.imageLinks?.smallThumbnail ||
                    data?.volumeInfo?.imageLinks
                  }
                  alt="sans"
                />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
