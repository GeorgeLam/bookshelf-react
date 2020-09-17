import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import Subbar from "./components/Subbar";
import BackButton from "./components/BackButton";

const Book = ({ match }) => {
  const {
    params: { bookId },
  } = match;

  let [book, setBook] = useState("");
  // let [tidied, setTidied] = useState("");

  let [data, setData] = useState();

  useEffect(() => {
    (async () => {
      let response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${bookId}`
      );
      setData(await response.json());
    })();
  }, []);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  useEffect(() => {
    console.log("ue");
    if (data) {
      // setTotalItems(data.totalItems);
      // setSearchStatus();
      console.log(data);
      // let tidier = [...data];
      // if (!data.items) {
      //   console.log("No");
      //   // setSearchStatus("No items were found!");
      //   return;
      // }
      let tidiedBook = {};
      if (data?.volumeInfo?.authors?.length > 1) {
        console.log(data.volumeInfo.authors);
        tidiedBook.authors = data.volumeInfo.authors.join(" and ");
      }
      if (data?.volumeInfo?.publishedDate?.length > 4) {
        tidiedBook.publishedDate = data.volumeInfo.publishedDate
          .toString()
          .slice(0, 4);
      }
      if (data?.volumeInfo?.description?.length > 300) {
        tidiedBook.description =
          data.volumeInfo.description.slice(0, 300) + "...";
      }

      setBook(tidiedBook);
    }
  }, [data]);

  // useEffect(console.log(book), [book]);

  const GoBack = ({ history }) => {
    history.goBack();
  };

  return (
    <div className="container">
      <Subbar />
      <div className="row">
        <div className="col col-10 mx-auto">
          <div className="card h-100">
            <div className="col-2 my-3">
              <BackButton />
            </div>
            <div className="row card-body d-flex flex-row">
              {
                <img
                  className="col-12 col-md-4 text-center mx-auto mb-3 order-1 order-md-3"
                  src={
                    data?.volumeInfo?.imageLinks?.smallThumbnail ||
                    data?.volumeInfo?.imageLinks
                  }
                  alt="sans"
                />
              }

              <div className="col-12 col-md-6 order-3 order-md-1">
                <h4>{data?.volumeInfo?.title}</h4>
                <h6 className="card-text">
                  {data?.volumeInfo?.authors.length > 1
                    ? data?.volumeInfo?.authors.join(" and ")
                    : data?.volumeInfo?.authors}
                </h6>
                <p
                  className="card-text"
                  dangerouslySetInnerHTML={{
                    __html: data?.volumeInfo?.description.slice(0, 500) + "...",
                  }}
                ></p>
                <a
                  href={data?.volumeInfo?.infoLink}
                  target="_blank"
                  className="btn btn-sm btn-primary mr-2"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
