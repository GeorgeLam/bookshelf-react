import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";


const Subbar = () => {
    return (
        <div className="container">
            <div className="" id="top">
                <div className="row justify-content-center">
                    <div className="display-4 my-2">Book Searcher</div>
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