import React, {Component} from 'react';
import Subbar from './components/Subbar'
import FoundItems from './components/FoundItems'

class Saved extends Component {
    constructor() {
        super()

        this.state = {
            savedBooks: JSON.parse(localStorage.getItem('books')) || [],
            loaded: true,
        }
    }

    render() {
        return (
            <div className="container">
                <Subbar/>
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
                        {this.state.loaded ? (
                            this.state.savedBooks.map((book, index) => (
                                <div
                                    className="col col-12 col-md-6 py-2"
                                    id={book.id}
                                    key={book.id}
                                >
                                    <FoundItems
                                        book={book}
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
            </div>
        );
    }
};

export default Saved;