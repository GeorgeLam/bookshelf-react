import React, { Component, useState, useContext, useEffect } from "react";
import firebase, { firestore } from "firebase";

import Subbar from "./components/Subbar";
import SavedItems from "./components/SavedItems";

import { AccContext } from "./components/AccContext";



let Saved = () => {
  // constructor() {
  //     super()

  //     this.removeItem = this.removeItem.bind(this);
  //     this.updateMeth = this.updateMeth.bind(this);

  //     this.state = {
  //         savedBooks: JSON.parse(localStorage.getItem('fromDB')) || [],
  //         loaded: true,
  //     }
  // }
  const { accStatus, setAccStatus } = useContext(AccContext);


  const [savedBooks, setSavedBooks] = React.useState();
  const [alterBooks, setAlteredBookList] = React.useState();
  const [loaded, setLoaded] = React.useState(false);
  const [updateType, setUpdateType] = React.useState();

  const [rati, setRating] = React.useState();
  const [revi, setReview] = React.useState();
  const [targ, setTargetBook] = React.useState();
  const [changedTheAlter, setChangedTheAlter] = React.useState();
  const [resetter, setResetter] = React.useState(0);

  // getStoredBooks = async () => {
  //     let dbQuery = await firebase
  //       .firestore()
  //       .collection("users")
  //       .doc(user?.displayName)
  //       .get()
  //       .then((doc) => {
  //         if (doc.exists) {
  //           console.log("Document data:", doc.data());
  //           let retrievedBooks = JSON.parse(doc?.data()?.books);
  //           console.log(retrievedBooks);
  //           localStorage.setItem("fromDB", JSON.stringify(retrievedBooks));
  //         }
  //       });
  // }

  //getStoredBooks();


    

    // useEffect((retrieveDB) , [])

    useEffect(() => {
        console.log("retrieval", accStatus);

        let retrieveDB = async () => {
            let dbQuery = await firebase
                .firestore()
                .collection("users")
                .doc("gaogaoliangliang")
                .get()
                .then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    setSavedBooks(JSON.parse(doc?.data()?.books));
                    // setLoaded(true)
                    //console.log(retrievedBooks);
                    //localStorage.setItem("fromDB", JSON.stringify(retrievedBooks));
                    }
                });
        };
        retrieveDB();
    }, [])


  let updateMeth = (targetBook, rev, rating) => {
    console.log("Update meth");
    console.log(targetBook, rev, rating);
    // console.log(accStatus);

    function editChg(book) {
        if (book.id == targetBook) {
            console.log("Found the book: " + targetBook);
            //console.log(book.review);
            book.review = rev;
            book.rating = `You rated this book ${rating}/5.`;
            console.log(book);
        }
    }

    savedBooks.forEach(editChg);
    setChangedTheAlter(true);


    // setTargetBook(targetBook);
    // setReview(rev);
    // setRating(rating);

    // savedBooks.forEach(editChg);
    // setAlteredBookList(savedBooks);
    // setResetter(resetter++);


    // function editChg(book) {
    //   if (book.id == targetBook) {
    //     console.log("Found the book: " + targetBook);
    //     console.log(book.review);
    //     book.review = rev;
    //     book.rating = `You rated this book ${rating}/5.`;
    //     console.log(book);
    //   }
    // }

    // setUpdateType('edit');
    
    // console.log(altera);
    


    // setAlteredBookList(
    //   setSavedBooks(savedBooks.forEach((book) => {
    //     console.log(book);
    //     if (book.id == targetBook) {
    //       console.log("Found the book: " + targetBook);
    //       console.log(book.review);
    //       book.review = rev;
    //       book.rating = `You rated this book ${rating}/5.`;
    //       console.log(book);
    //     }
    //   }))
    // );

    // let alteringBooks = savedBooks.forEach((book) => {
    //     console.log(book);
    //   if (book.id == targetBook) {
    //     console.log("Found the book: " + targetBook);
    //     console.log(book.review);
    //     book.review = rev;
    //     book.rating = `You rated this book ${rating}/5.`;
    //     console.log(book);
    //   }
    // console.log(alteringBooks);
  };

  
    // useEffect(() => {
    //     console.log("Alter books altered!")
    //   console.log(alterBooks);
    // }, [alterBooks]);


  // );

  // setAlteredBookList(
  //     savedBooks.forEach(book => {
  //         if (book.id == targetBook) {
  //             console.log("Found the book: " + targetBook);
  //             console.log(book.review);
  //             book.review = rev;
  //             book.rating = `You rated this book ${rating}/5.`;
  //             console.log(book);
  //         }
  //     })
  // )
  // setUpdateType("edit");

  //setSavedBooks(alterBooks);

  // localStorage.setItem('books', JSON.stringify(alterBooks));

  // this.setState({ savedBooks: alterBooks },
  //     () => {
  //         localStorage.setItem('books', JSON.stringify(this.state.savedBooks))
  //     }
  // )

  let removeItem = (e) => {
    e.preventDefault();
    console.log("removing item", e.target.id);
    // setAlteredBookList(savedBooks);
    setSavedBooks(savedBooks.filter((book) => book.id != e.target.id));
    setChangedTheAlter(true);
    // setUpdateType("remove");
    // alterBooks = alterBooks.filter(book => book.id != e.target.id)

    //setSavedBooks(alterBooks);

    // this.setState({savedBooks: alterBooks},
    //     () => {
    //         localStorage.setItem('books', JSON.stringify(this.state.savedBooks))
    //     }
    // )
  };

 
//   useEffect(() => {
//     console.log("Setting altered books")
//     function editChg(book) {
//         if (book.id == targ) {
//             console.log("Found the book: " + targ);
//             console.log(book.review);
//             book.review = revi;
//             book.rating = `You rated this book ${rati}/5.`;
//             console.log(book);
//         }
//     }

//     if (alterBooks){
//         alterBooks.forEach(editChg);
//         console.log("Alter's FE just ran")
//         setSavedBooks(alterBooks)
//         setChangedTheAlter(true)
//     }

//     console.log(alterBooks);
//     if (updateType == "remove") {
//       setSavedBooks(alterBooks);
//       setUpdateType();
//     }
//     if (updateType == "edit") {
//       console.log("you're wanting to edit");
//       console.log(alterBooks);
//       setUpdateType();
//     }
//   }, [alterBooks]);

    useEffect(() => {
        console.log("final loop hit")
        console.log(savedBooks);
    // localStorage.setItem('books2', JSON.stringify(savedBooks));
    if(changedTheAlter) {
        console.log("HEYYYYYYYYYYYYYYYYYY");
        console.log(savedBooks);
        firebase
          .firestore()
          .collection("users")
          .doc(`gaogaoliangliang`)
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
      {/* <div className="row justify-content-center mb-3" id="item-count">
                    {this.state.loaded ? (
                        <span>
                            Viewing {this.state.startIndex + 1} - {this.state.startIndex + 11}{" "}
                of {this.state.totalItems} items.
                        </span>
                    ) : (
                            this.state.searchStatus
                        )}
                </div> */}

      <div className="">
        <div className="row found-items">
          {/* <p>{this.state.savedBooks.length}</p> */}

          {savedBooks ? (
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
                />
              </div>
            ))
          ) : (
            <div className="col text-center">
              <h5>You haven't saved any books yet!</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Saved;
