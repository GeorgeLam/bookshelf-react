import React, { Component } from "react";
import FoundItems from "./FoundItems";
import Pagebuttons from "./Pagebuttons";

let booksShown = 0;

class Search extends Component {
  constructor() {
    super();

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.searchBookFunc = this.searchBookFunc.bind(this);
    this.searchAuthorFunc = this.searchAuthorFunc.bind(this);
    this.navPrev = this.navPrev.bind(this);
    this.navForward = this.navForward.bind(this);
    // this.saveMeth = this.saveMeth.bind(this);
    this.saveMethod = this.saveMethod.bind(this);

    this.state = {
      type: "",
      index: 0,
      data: "",
      loaded: false,
      searchQuery: "",
      searchStatus: "",
      url: "",
      startIndex: 0,
      foundItems: 0,
      tidied: "",
      newSave: "",
      savedBooks: JSON.parse(localStorage.getItem('books')) || [],
    };
  }

  searchBookFunc() {
    console.log(this.state.searchInput);
    this.setState(
      (prevState) => ({
        searchQuery: prevState.searchInput,
        type: "book",
        index: 0,
      }),
      () => this.searcher()
    );
    this.searcher();
  }

  searchAuthorFunc() {
    console.log(this.state.searchInput);
    this.setState(
      (prevState) => ({
        searchQuery: prevState.searchInput,
        type: "author",
        index: 0,
      }),
      () => this.searcher()
    );
  }

  handleSearchInput(e) {
    e.preventDefault();
    this.setState({
      searchInput: e.target.value,
    });
  }

  async searcher() {
    this.setState({
      searchStatus: "Fetching data...",
      loaded: false,
    });

    if (this.state.searchQuery) {
      if (this.state.type == "book") {
        this.state.url = `https://www.googleapis.com/books/v1/volumes?q=${this.state.searchQuery}&startIndex=${this.state.startIndex}`;
      } else if (this.state.type == "author") {
        this.state.url = `https://www.googleapis.com/books/v1/volumes?q=+inauthor:${this.state.searchQuery}&startIndex=${this.state.startIndex}`;
      }

      let response = await fetch(this.state.url);
      let data = await response.json();
      this.setState({
        data: data,
        loaded: true,
        totalItems: data.totalItems,
      });
      console.log(this.state.data.items);
      console.log(this.state.loaded);
      this.tidySearchResults();
    }
  }

  tidySearchResults() {
    this.setState({
      tidied: this.state.data.items.map((book) => {
        //console.log(book);
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
      }),
    });
  }

  navPrev() {
    if (this.state.startIndex != 0) {
      this.setState(
        (prevState) => ({
          startIndex: prevState.startIndex - 10,
          loaded: false,
        }),
        () => this.searcher()
      );
    }
  }
  navForward() {
    this.setState(
      (prevState) => ({
        startIndex: prevState.startIndex + 10,
        loaded: false,
      }),
      () => this.searcher()
    );
  }

  saveMethod(pageBookNum, savedReview, savedRating) {
    this.setState(
      (prevState) => {
        savedBooks: prevState.savedBooks.push({
          title: this.state.data.items[pageBookNum].volumeInfo.title,
          authors: this.state.data.items[pageBookNum].volumeInfo.authors,
          date: this.state.data.items[pageBookNum].volumeInfo.publishedDate,
          image: this.state.data.items[pageBookNum].volumeInfo.imageLinks
            .smallThumbnail,
          id: this.state.data.items[pageBookNum].id,
          learnLink: `https://books.google.com/books?id=${this.state.data.items[pageBookNum].id}`,
          rating: savedRating,
          review: savedReview,
        });
      }, () => {
        localStorage.setItem("books", JSON.stringify(this.state.savedBooks));
      }
    );
    this.isOpen = false;
  }

  render() {
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
                  value={this.state.searchInput || ""}
                  onChange={this.handleSearchInput}
                ></input>
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="search-book"
                    onClick={this.searchBookFunc}
                  >
                    Book {this?.state?.savedBooks?.length}
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="search-author"
                    onClick={this.searchAuthorFunc}
                  >
                    Author
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mb-3" id="item-count">
          {this.state.loaded ? (
            <span>
              Viewing {this.state.startIndex + 1} - {this.state.startIndex + 11}{" "}
              of {this.state.totalItems} items.
            </span>
          ) : (
            this.state.searchStatus
          )}
        </div>

        <div className="row">
          <div className="row found-items">
            {this.state.loaded ? (
              this.state.data.items.map((book, index) => (
                <div
                  className="col col-12 col-md-6 py-2"
                  id={book.id}
                  key={book.id}
                >
                  <FoundItems
                    book={book.volumeInfo}
                    val={index}
                    saveMeth={this.saveMethod}
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

        {this.state.loaded && (
          <div className="row justify-content-center my-3" id="pageButtons">
            <button
              className="btn btn-outline-secondary mx-1"
              type="button"
              id="previous"
              href="#top"
              onClick={this.navPrev}
            >
              Previous
            </button>
            <button
              className="btn btn-outline-secondary mx-1"
              type="button"
              id="next"
              href="#top"
              onClick={this.navForward}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  }
};

export default Search;