import React, { Component, useState, useEffect, useContext } from "react";
import FoundItems from "./FoundItems";
import Pagebuttons from "./Pagebuttons";
import {AccContext} from "./AccContext";

let booksShown = 0;



const Search = () => {
    const { accStatus, setAccStatus } = useContext(AccContext);

    // this.handleSearchInput = this.handleSearchInput.bind(this);
    // this.searchBookFunc = this.searchBookFunc.bind(this);
    // this.searchAuthorFunc = this.searchAuthorFunc.bind(this);
    // this.navPrev = this.navPrev.bind(this);
    // this.navForward = this.navForward.bind(this);
    // // this.saveMeth = this.saveMeth.bind(this);
    // this.saveMethod = this.saveMethod.bind(this);


    let [type, setType] = useState("");
    let [index, setIndex] = useState(0);
    let [data, setData] = useState("");
    let [loaded, setLoaded] = useState(false);
    let [searchQuery, setSearchQuery] = useState("");
    let [searchInput, setSearchInput] = useState("");
    let [searchStatus, setSearchStatus] = useState("");
    let [url, setUrl] = useState("");
    let [startIndex, setStartIndex] = useState(0);
    let [foundItems, setFoundItems] = useState(0);
    let [totalItems, setTotalItems] = useState(0);
    let [readyToTidy, setReadyToTidy] = useState();
    let [tidied, setTidied] = useState("");
    let [newSave, setNewSave] = useState("");
    let [savedBooks, setSavedBooks] = useState(JSON.parse(localStorage.getItem('books')) || []);
   

  //   this.state = {
  //     type: "",
  //     index: 0,
  //     data: "",
  //     loaded: false,
  //     searchQuery: "",
  //     searchStatus: "",
  //     url: "",
  //     startIndex: 0,
  //     foundItems: 0,
  //     tidied: "",
  //     newSave: "",
  //     savedBooks: JSON.parse(localStorage.getItem('books')) || [],
  //   };
  // }

  let searchBookFunc = () => {
    console.log(searchInput);
    setSearchQuery(searchInput);
    setType("book");
    setIndex(0)
    setStartIndex(0);

    //searcher();

    // this.setState(
    //   (prevState) => ({
    //     searchQuery: prevState.searchInput,
    //     type: "book",
    //     index: 0,
    //   }),
    //   () => this.searcher()
    // );
    // this.searcher();
  }

    useEffect(() => {
      if(type == "book"){
        setUrl(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}&startIndex=${startIndex}`)
        }
      else if (type == "author") {
        setUrl(`https://www.googleapis.com/books/v1/volumes?q=+inauthor:${searchQuery}&startIndex=${startIndex}`)
        }
      }, [type, index, searchQuery]
    )




    useEffect(() => {
      console.log(url);
      // setUrl(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}&startIndex=${startIndex}`);
      // searcher();
      if(url) searcher();

    }, [url]);


  let searchAuthorFunc = () => {
    // console.log(this.state.searchInput);
    console.log(searchInput)
    setSearchQuery(searchInput);
    setType("author");
    setIndex(0);
    setStartIndex(0);

    //searcher();


    // this.setState(
    //   (prevState) => ({
    //     searchQuery: prevState.searchInput,
    //     type: "author",
    //     index: 0,
    //   }),
    //   () => this.searcher()
    // );
  }

  let handleSearchInput = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);

    // this.setState({
    //   searchInput: e.target.value,
    // });
  }

  let searcher = async () => {
    console.log("Search func")
    setSearchStatus("Fetching data...");
    setLoaded(false)
    console.log(searchInput);

    // this.setState({
    //   searchStatus: "Fetching data...",
    //   loaded: false,
    // }
  

    if (searchInput) {
      if (type == "book") {
        console.log("type is book", searchQuery, startIndex)
        // setUrl(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&startIndex=${startIndex}`);
      } else if (type == "author") {
        console.log("author")
        // setUrl(`https://www.googleapis.com/books/v1/volumes?q=+inauthor:${searchQuery}&startIndex=${startIndex}`);
      }

      console.log(url)

      let response = await fetch(url);
      //let data = await response.json();
      console.log(data);
      setData(await response.json());
      setLoaded(true);

      // this.setState({
      //   data: data,
      //   loaded: true,
      //   totalItems: data.totalItems,
      // });
      console.log(data.items);
      console.log(loaded);
      setReadyToTidy(true);
      // let catsup = data.items.map((book) => {
      //   console.log(book);
      //   if (book?.volumeInfo?.authors?.length > 1) {
      //     console.log(book.volumeInfo.authors);
      //     book.volumeInfo.authors = book.volumeInfo.authors.join(" and ");
      //   }
      //   if (book?.volumeInfo?.publishedDate?.length > 4) {
      //     book.volumeInfo.publishedDate = book.volumeInfo.publishedDate
      //       .toString()
      //       .slice(0, 4);
      //   }
      //   if (book?.volumeInfo?.description?.length > 300) {
      //     book.volumeInfo.description =
      //       book.volumeInfo.description.slice(0, 300) + "...";
      //   }
      // })
      
      // console.log(catsup);
      }
    }

    // useEffect(() => {
    //   data && setReadyToTidy(true)
    // }, [data])

  // let tidySearchResults = () => {
  //   setTidied(data.items.map((book) => {
  //       console.log(book);
  //       if (book?.volumeInfo?.authors?.length > 1) {
  //         console.log(book.volumeInfo.authors);
  //         book.volumeInfo.authors = book.volumeInfo.authors.join(" and ");
  //       }
  //       if (book?.volumeInfo?.publishedDate?.length > 4) {
  //         book.volumeInfo.publishedDate = book.volumeInfo.publishedDate
  //           .toString()
  //           .slice(0, 4);
  //       }
  //       if (book?.volumeInfo?.description?.length > 300) {
  //         book.volumeInfo.description =
  //           book.volumeInfo.description.slice(0, 300) + "...";
  //       }
  //     })
  //   )
  // }

  useEffect(() => {
    if (data) {
      setTotalItems(data.totalItems)

      setTidied(data.items.map((book) => {
        console.log(book);
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
      }))
    }
  }, [data])


  //   this.setState({
  //     tidied: this.state.data.items.map((book) => {
  //       //console.log(book);
  //       if (book?.volumeInfo?.authors?.length > 1) {
  //         console.log(book.volumeInfo.authors);
  //         book.volumeInfo.authors = book.volumeInfo.authors.join(" and ");
  //       }
  //       if (book?.volumeInfo?.publishedDate?.length > 4) {
  //         book.volumeInfo.publishedDate = book.volumeInfo.publishedDate
  //           .toString()
  //           .slice(0, 4);
  //       }
  //       if (book?.volumeInfo?.description?.length > 300) {
  //         book.volumeInfo.description =
  //           book.volumeInfo.description.slice(0, 300) + "...";
  //       }
  //     }),
  //   });
  // }

  let navPrev = () => {
    if (startIndex != 0) {
      setStartIndex(startIndex - 10);
      setLoaded(false)
      searcher();
      // this.setState(
      //   (prevState) => ({
      //     startIndex: prevState.startIndex - 10,
      //     loaded: false,
      //   }),
      //   () => this.searcher()
      // );
    }
  }

  let navForward = () => {
    console.log("Forward");
    setStartIndex(startIndex + 10);
    setLoaded(false);
    searcher();

    // this.setState(
    //   (prevState) => ({
    //     startIndex: prevState.startIndex + 10,
    //     loaded: false,
    //   }),
    //   () => this.searcher()
    // );
  }

  let saveMethod = (pageBookNum, savedReview, savedRating) => {
    if(accStatus) console.log("yup you're logged in")
    setSavedBooks(
      savedBooks.push(
        {
          title: data.items[pageBookNum].volumeInfo.title,
          authors: data.items[pageBookNum].volumeInfo.authors,
          date: data.items[pageBookNum].volumeInfo.publishedDate,
          image: data.items[pageBookNum].volumeInfo.imageLinks
            .smallThumbnail,
          id: data.items[pageBookNum].id,
          learnLink: `https://books.google.com/books?id=${data.items[pageBookNum].id}`,
          rating: savedRating,
          review: savedReview,
        }
      )
    )

    localStorage.setItem("books", JSON.stringify(savedBooks));
    // setIsOpen(false);

    // this.setState(
    //   (prevState) => {
    //     savedBooks: prevState.savedBooks.push({
    //       title: this.state.data.items[pageBookNum].volumeInfo.title,
    //       authors: this.state.data.items[pageBookNum].volumeInfo.authors,
    //       date: this.state.data.items[pageBookNum].volumeInfo.publishedDate,
    //       image: this.state.data.items[pageBookNum].volumeInfo.imageLinks
    //         .smallThumbnail,
    //       id: this.state.data.items[pageBookNum].id,
    //       learnLink: `https://books.google.com/books?id=${this.state.data.items[pageBookNum].id}`,
    //       rating: savedRating,
    //       review: savedReview,
    //     });
    //   }, () => {
    //     localStorage.setItem("books", JSON.stringify(this.state.savedBooks));
    //   }
    // );
    // this.isOpen = false;
  }

    return (
      <div>
        <div className="form form-group">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-5">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="query"
                  placeholder="Search for..."
                  aria-label="Book search field"
                  value={searchInput || ""}
                  onChange={handleSearchInput}
                ></input>
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="search-book"
                    onClick={searchBookFunc}
                  >
                    Book {savedBooks?.length}
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="search-author"
                    onClick={searchAuthorFunc}
                  >
                    Author
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mb-3" id="item-count">
          {loaded ? (
            <span>
              Viewing {startIndex + 1} - {startIndex + 11}{" "}
              of {totalItems} items.
            </span>
          ) : (
            searchStatus
          )}
        </div>

        <div className="row">
          <div className="row found-items">
            {loaded ? (
              data.items.map((book, index) => (
                <div
                  className="col col-12 col-md-6 py-2"
                  id={book.id}
                  key={book.id}
                >
                  <FoundItems
                    book={book.volumeInfo}
                    val={index}
                    saveMeth={saveMethod}
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
          {(loaded && startIndex != 0) && (
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

          {loaded && (
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

export default Search;