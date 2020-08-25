import React, { Component } from 'react';
constructor(props) {
    super(props);
    
    this.state = {

    }
}



class ItemFetch extends Component {
    render() {
        return (
          <div>
            <div className="row justify-content-center mb-3" id="item-count">
              {this.state.totalItems ? (
                <span>
                  Viewing {this.state.startIndex + 1} -{" "}
                  {this.state.startIndex + 11} of {this.state.totalItems} items.
                </span>
              ) : (
                <span>Fetching data...</span>
              )}
            </div>

            <div className="row">
              <div className="row found-items">
                {this.state.loaded ? (
                  this.state.data.items.map((book) => (
                    <div
                      className="col col-12 col-md-6 py-2"
                      key={this.state.booksShown++}
                    >
                      {/* <FoundItems book={book.volumeInfo} /> */}
                    </div>
                  ))
                ) : (
                  <div className="col">
                    <p></p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
}

export default ItemFetch;