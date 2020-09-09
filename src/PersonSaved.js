import React, { Component, useState, useContext, useEffect } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";

import firebase, { firestore } from "firebase";

import Subbar from "./components/Subbar";
import SavedItems from "./components/SavedItems";

import { AccContext } from "./components/AccContext";

const PersonSaved = ({ match }) => {
  const {
    params: { personId },
  } = match;
  const [savedBooks, setSavedBooks] = React.useState();
  const [loaded, setLoaded] = React.useState();
  const [loadMessage, setLoadMessage] = React.useState("Loading books...");
  const [updateType, setUpdateType] = React.useState();
  const [changedTheAlter, setChangedTheAlter] = React.useState();
  const [currentAcc, setCurrentAcc] = React.useState();

  useEffect(() => {
    if (personId) {
      console.log(personId);

      let retrieveDB = async () => {
        let dbQuery = await firebase
          .firestore()
          .collection("users")
          .doc(personId)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log(doc?.data().private);
              if (doc?.data().privacy) {
                setLoadMessage("User's books are private");
                return;
              }
              console.log("Document data:", doc.data());
              console.log(JSON.parse(doc?.data().books).length);
              if (JSON.parse(doc?.data().books).length < 1) {
                setLoadMessage(`You haven't saved any books!`);
              } else {
                setLoadMessage();
              }
              setSavedBooks(JSON.parse(doc?.data()?.books));
              setLoaded(true);
              //console.log(retrievedBooks);
              //localStorage.setItem("fromDB", JSON.stringify(retrievedBooks));
            } else {
              setLoadMessage(`User '${personId}' doesn't exist!`);
            }
          });
      };
      retrieveDB();
    }
  }, [currentAcc]);

  let updateMeth = (targetBook, rev, rating) => {
    console.log("Update meth");
    console.log(targetBook, rev, rating);
    // console.log(accStatus);

    function editChg(book) {
      if (book.id == targetBook) {
        console.log("Found the book: " + targetBook);
        //console.log(book.review);
        book.review = rev;
        book.rating = rating;
        console.log(book);
      }
    }

    savedBooks.forEach(editChg);
    setChangedTheAlter(true);
  };

  let removeItem = (e) => {
    e.preventDefault();
    console.log("removing item", e.target.id);
    // setAlteredBookList(savedBooks);
    setSavedBooks(savedBooks.filter((book) => book.id != e.target.id));
    setChangedTheAlter(true);
  };

  useEffect(() => {
    console.log("final loop hit");
    console.log(savedBooks);
    // localStorage.setItem('books2', JSON.stringify(savedBooks));
    if (changedTheAlter) {
      console.log(savedBooks);
      firebase
        .firestore()
        .collection("users")
        .doc(currentAcc.accStatus)
        .set({
          books: JSON.stringify(savedBooks),
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    }
    //setAlteredBookList();
    setChangedTheAlter();
  }, [changedTheAlter]);

  return (
    <div className="container">
      <Subbar title="Saved Books" />

      <div>
        <div className="row found-items">
          <AccContext.Consumer>
            {(value) => {
              setCurrentAcc(value);
            }}
          </AccContext.Consumer>
          {/* <p>{this.state.savedBooks.length}</p> */}

          {!loadMessage ? (
            savedBooks?.map((book, index) => (
              <div
                className="col col-12 col-md-6 py-2"
                id={book.id}
                key={book.id}
              >
                <SavedItems
                  book={book}
                  val={index}
                  updateMeth={updateMeth}
                  removeMeth={removeItem}
                  parentPage="PersonSaved"
                />
              </div>
            ))
          ) : (
            <div className="col text-center">
              <h5>{loadMessage}</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonSaved;
