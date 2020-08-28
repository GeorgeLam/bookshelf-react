import React, {Component, useContext} from 'react';
import firebase, { firestore } from "firebase";

import Subbar from './components/Subbar'
import SavedItems from './components/SavedItems'

class Saved extends Component {
    constructor() {
        super()

        this.removeItem = this.removeItem.bind(this);
        this.updateMeth = this.updateMeth.bind(this);

        this.state = {
            savedBooks: JSON.parse(localStorage.getItem('fromDB')) || [],
            loaded: true,
        }
    }

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

    

    updateMeth(targetBook, rev, rating) {
        console.log("Update meth");
        console.log(targetBook, rev, rating);
        let alterBooks = this.state.savedBooks;
        alterBooks.forEach(book => {
            if (book.id == targetBook) {
                console.log("Found the book: " + targetBook);
                console.log(book.review);
                book.review = rev;
                book.rating = `You rated this book ${rating}/5.`;
                console.log(book);
            }
        })
        this.setState({ savedBooks: alterBooks },
            () => {
                localStorage.setItem('books', JSON.stringify(this.state.savedBooks))
            }
        )

    }

    removeItem(e) {
        e.preventDefault();
        let alterBooks = this.state.savedBooks;
        alterBooks = alterBooks.filter(book => book.id != e.target.id)
        this.setState({savedBooks: alterBooks},
            () => {
                localStorage.setItem('books', JSON.stringify(this.state.savedBooks))
            }
        )
    }

    render() {
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

                {this.state.savedBooks.length > 1 ? (
                  this.state.savedBooks.map((book, index) => (
                    <div
                      className="col col-12 col-md-6 py-2"
                      id={book.id}
                      key={book.id}
                    >

                      <SavedItems
                        book={book}
                        val={index}
                        updateMeth={this.updateMeth}
                        removeMeth={this.removeItem}
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
    }
};

export default Saved;