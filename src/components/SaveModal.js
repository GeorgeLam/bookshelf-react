import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";


const SaveModal = ({savingNum, handleRating, handleReview, review, rating, setIsOpen, isOpen, saveMeth, bookTitle}) => {
let [status, changeStatus] = useState(isOpen)

  return (
    <Modal show={isOpen}>
      <Modal.Header>
        <span>
          Saving <strong>{bookTitle}</strong>
        </span>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label htmlFor="book-review">Review: </label>
          <textarea
            name="book-review"
            className="form-control"
            id="bookReview"
            aria-describedby="book-review"
            value={review}
            onChange={(e) => handleReview(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating: </label>
          <select
            name="rating"
            id="bookRating"
            value={rating}
            onChange={(e) =>
              handleRating(`You rated this book ${e.target.value}/5.`)
            }
          >
            <option value="1">1/5</option>
            <option value="2">2/5</option>
            <option value="3">3/5</option>
            <option value="4">4/5</option>
            <option value="5">5/5</option>
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-primary saveRating"
          onClick={() => {
            console.log(savingNum, review, rating)
            saveMeth(savingNum, review, rating);
            setIsOpen(false);
          }}
        >
          Save rating
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default SaveModal