import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";


const Subbar = (props) => {
    return (
        <div className="container">
            <div className="" id="top">
                <div className="row justify-content-center">
    <div className="display-4 my-2">{props.title ? <span>{props.title}</span> : <span>Book Searcher</span>}</div>
                </div>
                <div className="row justify-content-center mb-4">
                    <a href="/" id="saved-books" className="mx-2">
                        Find Books
                    </a>
                    <a href="/saved" id="saved-books" className="mx-2">
                        Saved Books
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Subbar;