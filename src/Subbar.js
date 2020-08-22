import React from 'react';

const Subbar = () => {
    return (
        <div className="container" id="top">
            <div className="row justify-content-center">
                <div className="display-4 my-2">Book Searcher</div>
            </div>
            <div className="row justify-content-center mb-4">
                <a href="./saved.html" id="saved-books">Saved Books</a>
            </div>
        </div>
    );
};

export default Subbar;