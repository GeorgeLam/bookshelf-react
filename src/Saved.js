import React, { Component, useState, useContext, useEffect, useRef } from "react";
import firebase, { firestore } from "firebase";
import {Form} from "react-bootstrap";

import Subbar from "./components/Subbar";
import SavedItems from "./components/SavedItems";

import { AccContext } from "./components/AccContext";

let Saved = () => {
  const { accStatus, setAccStatus } = useContext(AccContext);
  const linkRef = useRef();
  const privacySwitch = useRef();
  const [savedBooks, setSavedBooks] = React.useState();
  const [loaded, setLoaded] = React.useState();
  const [loadMessage, setLoadMessage] = React.useState("Loading books...");
  const [updateType, setUpdateType] = React.useState();  
  const [readyToUpdateDB, setReadyToUpdateDB] = React.useState();
  const [currentAcc, setCurrentAcc] = React.useState();
  const [privacy, setPrivacy] = React.useState();
  
    useEffect(() => {                       //useEffect based on the currentAcc variable
        console.log("Checking acc status")
        if(!currentAcc?.accStatus){
            setLoadMessage("Please log in to see your saved books")
            console.log("Unlogged")
            // setSavedBooks()
        }
        if(currentAcc?.accStatus){    
            console.log(`Logged in as ${currentAcc.accStatus}`);
            setLoadMessage()

            let retrieveDB = async () => {
                let dbQuery = await firebase
                    .firestore()
                    .collection("users")
                    .doc(currentAcc.accStatus)
                    .get()
                    .then((doc) => {
                    if (doc.exists) {
                        console.log("Document data:", doc.data());
                        console.log(JSON.parse(doc?.data().books).length);
                        if (JSON.parse(doc?.data().books).length < 1){
                            setLoadMessage(`You haven't saved any books!`);
                        }
                        if (doc?.data().privacy){
                          setPrivacy(true)
                        }
                        else{
                            setLoadMessage()
                        }
                        setSavedBooks(JSON.parse(doc?.data()?.books));
                        setLoaded(true);
                        //console.log(retrievedBooks);
                        //localStorage.setItem("fromDB", JSON.stringify(retrievedBooks));
                        }
                    });
            };
            retrieveDB();
            }
    }, [currentAcc])

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
        setReadyToUpdateDB(true);
    };

    let removeItem = (e) => {
        e.preventDefault();
        console.log("removing item", e.target.id);
        // setAlteredBookList(savedBooks);
        setSavedBooks(savedBooks.filter((book) => book.id != e.target.id));
        setReadyToUpdateDB(true);
    };

    let privacyUpdate = (e) => {
      console.log(privacySwitch.current.checked)

      firebase
        .firestore()
        .collection("users")
        .doc(accStatus)
        .update({
          privacy: privacySwitch.current.checked,
        })
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    }

    let copyToClipboard = () => {
      linkRef.current.select();
      linkRef.current.setSelectionRange(0, 100);
      document.execCommand("copy");
    }

    useEffect(() => {
        console.log(savedBooks);
        if (readyToUpdateDB) {
        console.log("Updating the DB!");
        firebase
            .firestore()
            .collection("users")
            .doc(currentAcc.accStatus)
            .update({
            books: JSON.stringify(savedBooks),
            })
            .catch(function (error) {
            console.error("Error adding document: ", error);
            });
        }
        setReadyToUpdateDB();
    }, [readyToUpdateDB]);

    

  return (
    <div className="container">
      <Subbar title="Saved Books" />
 
      <div>
        {currentAcc?.accStatus && (
          <div className="col col-8 text-center mx-auto mb-2">
            <div className="input-group mb-3">
              <input
                ref={linkRef}
                type="text"
                className="form-control"
                value={document.URL + "/" + currentAcc?.accStatus}
              ></input>
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={copyToClipboard}
                >
                  Copy
                </button>
              </div>
            </div>
            <p>
              <input type="checkbox" className="mx-2" label="Make my books private" ref={privacySwitch} onClick={privacyUpdate} defaultChecked={privacy}></input>Make my books private
            </p>
            <span className="mt-2">You have saved {savedBooks?.length} items.</span>
          </div>
        )}
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
                  id={book.id}
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

export default Saved;
