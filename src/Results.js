import React, {
  Component,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import firebase, { firestore } from "firebase";
import { useHistory } from "react-router-dom";

import Search from "./components/Search";
import Subbar from "./components/Subbar";
import FoundItems from "./components/FoundItems";
import Pagebuttons from "./components/Pagebuttons";
import { AccContext } from "./components/AccContext";

let booksShown = 0;

const Results = ({ match }) => {
  let history = useHistory();

  const {
    params: { searchQ, queryType, queryPage },
  } = match;
  console.log(queryType, searchQ, queryPage);
  useEffect(() => {
    console.log(queryType);
  }, [queryType]);

  const { accStatus, setAccStatus } = useContext(AccContext);
  console.log(accStatus);
  const [currentAcc, setCurrentAcc] = React.useState();
  const searchComponent = React.useRef(null);

  let [type, setType] = useState("");
  let [index, setIndex] = useState(0);
  let [data, setData] = useState("");
  let [loaded, setLoaded] = useState(false);
  let [searchQuery, setSearchQuery] = useState(searchQ);
  let [searchInput, setSearchInput] = useState(searchQ);
  let [searchStatus, setSearchStatus] = useState("");
  let [url, setUrl] = useState("");

  let [totalItems, setTotalItems] = useState(0);
  let [readyToTidy, setReadyToTidy] = useState();
  let [tidied, setTidied] = useState("");
  let [newSave, setNewSave] = useState("");
  let [savedBooks, setSavedBooks] = useState();
  let [updatingDBList, setUpdatingDBList] = useState();
  let [syncToDB, setSyncToDB] = useState();

  useEffect(() => {
    if (queryType == "b") {
      setUrl(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQ}&startIndex=${queryPage}`
      );
    } else if (queryType == "a") {
      setUrl(
        `https://www.googleapis.com/books/v1/volumes?q=+inauthor:${searchQ}&startIndex=${queryPage}`
      );
    }
  }, [queryType, index, searchQ, queryPage]);

  useEffect(() => {
    if (url) searcher();
  }, [url]);

  let searcher = async () => {
    console.log("Search func");
    setSearchStatus("Fetching data...", queryPage);
    setLoaded();
    console.log(searchInput);

    if (searchInput) {
      if (queryType == "b") {
        console.log("type is book", searchQ, queryPage);
      } else if (queryType == "a") {
        console.log("author");
      }

      console.log(url);
      let response = await fetch(url);
      console.log(data);
      setData(await response.json());
      setLoaded(true);

      console.log(data.items);
      console.log(loaded);
      setReadyToTidy(true);
    }
  };

  useEffect(() => {
    console.log("ue");
    if (data.items) {
      setTotalItems(data.totalItems);
      setSearchStatus();
      console.log(data);
      if (!data.items) {
        console.log("No");
        setSearchStatus("No items were found!");
        return;
      }
      setTidied(
        data.items.map((book) => {
          if (book?.volumeInfo?.authors?.length > 1) {
            console.log(book.volumeInfo.authors);
            book.volumeInfo.authors = book.volumeInfo.authors.join(" and ");
          }
          if (book?.volumeInfo?.publishedDate?.length > 4) {
            book.volumeInfo.publishedDate = book.volumeInfo.publishedDate
              .toString()
              .slice(0, 4);
          }
          if (book?.volumeInfo?.description?.length > 300) {
            book.volumeInfo.description =
              book.volumeInfo.description.slice(0, 300) + "...";
          }
        })
      );
    }
  }, [data]);

  let navPrev = () => {
    if (queryPage != 0) {
      // setStartIndex(startIndex - 10);
      // setLoaded();
      history.push(
        `/search/${queryType}/${searchQ}/${parseInt(queryPage) - 10}`
      );
      // searcher();
    }
  };

  let navForward = () => {
    console.log("Forward");
    history.push(`/search/${queryType}/${searchQ}/${parseInt(queryPage) + 10}`);

    // setStartIndex(startIndex + 10);
    // setLoaded();
    // searcher();
  };

  //Retrieving DB books on load and storing in an array

  useEffect(() => {
    if (accStatus) {
      console.log(`Retrieving books from: ${accStatus}`);

      let retrieveDB = async () => {
        let dbQuery = await firebase
          .firestore()
          .collection("users")
          .doc(accStatus)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log("Document data:", doc.data());
              setSavedBooks(JSON.parse(doc?.data()?.books));
            }
          });
      };
      retrieveDB();
    }
  }, [accStatus]);

  useEffect(() => {
    savedBooks && console.log(savedBooks);
  }, [savedBooks]);

  let saveMethod = (pageBookNum, savedReview, savedRating) => {
    console.log("Accessing save method");

    // Duplication check: if duplicate found, saving is prevented
    if (
      savedBooks.filter((book) => book.id == data.items[pageBookNum].id)
        .length > 0
    ) {
      return alert("You've already saved this book!");
    }

    setSavedBooks([
      ...savedBooks,
      {
        title: data.items[pageBookNum].volumeInfo.title,
        authors: data.items[pageBookNum].volumeInfo.authors,
        date: data.items[pageBookNum].volumeInfo.publishedDate,
        image: data.items[pageBookNum].volumeInfo.imageLinks.smallThumbnail,
        id: data.items[pageBookNum].id,
        learnLink: `https://books.google.com/books?id=${data.items[pageBookNum].id}`,
        rating: savedRating,
        review: savedReview,
      },
    ]);
    setSyncToDB(true);
  };

  useEffect(() => {
    if (syncToDB) {
      console.log("Syncing to DB...");
      firebase
        .firestore()
        .collection("users")
        .doc(accStatus)
        .update({
          books: JSON.stringify(savedBooks),
        })
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
      setSyncToDB();
    }
  }, [syncToDB]);

  return (
    <div
      //  className="searchComponent"
      className="container"
      ref={searchComponent}
    >
      {" "}
      <Subbar />
      <div className="mt-1">
        <Search searchQ={searchQ} />
      </div>
      <div className="row justify-content-center mb-3" id="item-count">
        {loaded && data.items ? (
          <span>
            Viewing {parseInt(queryPage) + 1} - {parseInt(queryPage) + 11} of{" "}
            {totalItems} items.
          </span>
        ) : (
          searchStatus
        )}
      </div>
      <div className="row">
        <div className="row found-items">
          {loaded ? (
            data?.items?.map((book, index) => (
              <div
                className="col col-12 col-md-6 py-2"
                id={book.id}
                key={book.id}
              >
                <FoundItems
                  book={book.volumeInfo}
                  val={index}
                  saveMeth={saveMethod}
                  id={book.id}
                />
              </div>
            ))
          ) : (
            <div className="col">
              <p></p>
            </div>
          )}
        </div>
      </div>
      <div className="row justify-content-center my-3" id="pageButtons">
        {!searchStatus && queryPage != 0 && (
          <button
            className="btn btn-outline-secondary mx-1"
            type="button"
            id="previous"
            href="#top"
            onClick={navPrev}
          >
            Previous
          </button>
        )}

        {!searchStatus && loaded && (
          <button
            className="btn btn-outline-secondary mx-1"
            type="button"
            id="next"
            href="#top"
            onClick={navForward}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Results;
