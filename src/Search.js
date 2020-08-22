import React, { Component } from "react";
import FoundItems from "./FoundItems";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      type: "",
      index: 0,
      data: '',
      loaded: false
    };
  }

  // searchFunc() {
  //     this.setState({
  //         type: 'book',
  //         index: 0
  //     })
  //     //searcher(document.querySelector("#query").value, index, type);
  // };

  async componentDidMount() {
    const url = `https://www.googleapis.com/books/v1/volumes?q="1984"&startIndex=0`;
    let response = await fetch(url);
    let data = await response.json();
    this.setState({
        data: data,
        loaded: true
    })
    console.log(this.state.data.items[0]);
    console.log(this.state.loaded)
  }

  render() {
    return (
      <div className="form form-group ">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-5">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                id="query"
                placeholder="Search for..."
                aria-label="Book search field"
              ></input>
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="search-book"
                  onClick={this.searchFunc}
                >
                  Book
                </button>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="search-author"
                >
                  Author
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center" id="item-count"></div>

        <div className="row">
          <div className="row found-items">
            {this.state.loaded ? (
              this.state.data.items.map((book) => (
                <div class="col col-12 col-md-6 py-2">
                  <FoundItems book={book.volumeInfo} />
                </div>
              ))
            ) : (
              <p> Loading </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  //searcher(query, startIndex, type){
  /*console.log(type);
    if (this.state.type == "book"){
        url = `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}`;
    } else if (type == "author"){
        url = `https://www.googleapis.com/books/v1/volumes?q=+inauthor:${query}&startIndex=${startIndex}`;
    }
    response = await fetch(url);
    let data = await response.json();
    console.log(data);

    document.querySelector("#item-count").innerText = `Viewing ${startIndex+1} - ${startIndex+11} of ${data.totalItems} items.`

    foundItems.innerHTML = "";      //Clearing the page of items before each time func is run
    
    bookNumber = -1;

    data.items.forEach(book =>{
        console.log(bookNumber);
        try{
            bookNumber++;

            if(book.volumeInfo.authors.length>1){
                book.volumeInfo.authors = book.volumeInfo.authors.join(" and ");
            }
            if(book.volumeInfo.publishedDate.length>4){
                book.volumeInfo.publishedDate = book.volumeInfo.publishedDate.toString().slice(0, 4)
            }
            if (book.volumeInfo.description.length > 300) {
                book.volumeInfo.description = book.volumeInfo.description.slice(0, 300) + "...";
            }
            

            newBook = document.createElement("DIV")
            newBook.classList.add("col", "col-12", "col-md-6", "py-2")
            newBook.innerHTML = `<div class="card h-100">
                            <div class="row card-body">
                                <div class="col-8">
                                    <h5 class="card-title">${book.volumeInfo.title}</h5>
                                    <p class="card-text">${book.volumeInfo.authors}</p>
                                    <p class="card-text">${book.volumeInfo.description}</p>
                                    <a href="https://books.google.com/books?id=${book.id}" target="_blank" class="btn btn-sm btn-primary">Learn More</a>
                                    <a href="#" class="btn btn-sm btn-primary save-book" id="${bookNumber}"  data-toggle="modal" data-target="#ratingModal" data-toggle="tooltip" data-placement="top"  data-trigger="manual" data-delay='{"show":"500", "hide":"300"}'>Save</a>
                                </div>
                                <img class="col-4" src="${book.volumeInfo.imageLinks.smallThumbnail}" alt="sans" />
                            </div>
                        </div>`
            foundItems.appendChild(newBook);

            if (!startIndex == 0) {$("#previous").show()} else { $("#previous").hide()};
            $("#next").show();

        } catch(e){
            console.log(e)
        }

       
    })

    $(".save-book").click((e) => {
        if (!logInStatus){
            console.log("You're not logged in! Saving is disabled");
            e.stopPropagation();
            e.preventDefault();

            $(function () { //Showing tooltips on 'save' click
                    $(`#${e.target.id}`).tooltip({ "title": "Log in to save books" });
                    $(`#${e.target.id}`).tooltip('show');
                }
            )

        } else{
            currentlySaving = "";
            currentlySaving = data.items[e.target.id].id;
            duplicate = 0;
            e.preventDefault();
            //console.log(data.items[e.target.id].volumeInfo);
            //console.log(JSON.parse(savedBooks));

            newBook = {
                "title": data.items[e.target.id].volumeInfo.title,
                "author": data.items[e.target.id].volumeInfo.authors,
                "date": data.items[e.target.id].volumeInfo.publishedDate,
                "image": data.items[e.target.id].volumeInfo.imageLinks.smallThumbnail,
                "id": data.items[e.target.id].id,
                "learnLink": `https://books.google.com/books?id=${data.items[e.target.id].id}`
            };

            

            savedBooks.forEach(book => {                //Ensuring no duplicates in localstorage
            if(_.isEqual(book, newBook)){
                console.log("Duplicate found");
                duplicate = 1;}
            });

            $(function () {                             //Showing tooltips on 'save' click
                if (duplicate){
                    console.log(duplicate);
                    $(`#${e.target.id}`).tooltip({ "title": "Already saved!" });
                    $(`#${e.target.id}`).tooltip('show');
                } 
            })

            
            $(`#${e.target.id}`).removeClass("btn-primary");
            $(`#${e.target.id}`).addClass("btn-success");
            $(`#${e.target.id}`).text("Saved");

            if (!duplicate){savedBooks.push(newBook)};

            $("#bookRating").val("");
            $("#bookReview").val("");

            $(".saveRating").click(() => {
              
                console.log(currentlySaving)
                rating = ""; review = "";
                console.log($("#bookRating").val())
                console.log($("#bookReview").val())
                rating = $("#bookRating").val();
                review = $("#bookReview").val();
                savedBooks.forEach(book => {
                    //console.log(book.id);
                    if (book.id == currentlySaving){
                        console.log("Found the book!")
                        book["rating"] = rating;
                        book["review"] = review;
                        console.log(savedBooks);
                        writeToDB();
                    }
                })
            })

            localStorage.setItem('books', JSON.stringify(savedBooks));
            console.log(savedBooks);


            writeToDB = () => {
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        db.collection("users").doc(`${user.displayName}`).set({
                            books: JSON.stringify(savedBooks)
                        })
                            .then(function () {
                                console.log("Document successfully written!");
                            })
                            .catch(function (error) {
                                console.error("Error writing document: ", error);
                            });
                    }
                })
            }

            writeToDB();
        }
    });
    )
*/
};

export default Search;