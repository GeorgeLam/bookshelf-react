import React from 'react';

const Pagebuttons = () => {
    return (
      <div className="row justify-content-center my-3" id="pageButtons">
        <button
          className="btn btn-outline-secondary mx-1"
          type="button"
          id="previous"
          href="#top"
        >
          Previous
        </button>
        <button
          className="btn btn-outline-secondary mx-1"
          type="button"
          id="next"
          href="#top"
        >
          Next
        </button>
      </div>
    );
};

export default Pagebuttons;