import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import SaveModal from "./SaveModal"

const FoundItems = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [savingNum, setSavingNum] = React.useState("");
  const [rating, handleRating] = React.useState(1);
  const [review, handleReview] = React.useState("");

  const showModal = (e) => {
    e.preventDefault();
    //console.log(e.target.id);
    setSavingNum(e.target.id);
    setIsOpen(true);
    //console.log(isOpen)
  };

  const hideModal = () => {
    setIsOpen(false);
  };
  
  const saveFunc = () => {
    console.log("Saving", savingNum)
    console.log()
  }

  return (
    <div className="card h-100">
      <div className="row card-body">
        <div className="col-8">
          <h5 className="card-title">{props?.book?.title}</h5>
          <p className="card-text">{props?.book?.authors}</p>
          <p className="card-text">{props?.book?.description}</p>
          <a
            href={props?.book?.infoLink}
            target="_blank"
            className="btn btn-sm btn-primary mr-2"
          >
            Learn More
          </a>
          <a
            href="#"
            className="btn btn-sm btn-primary save-book"
            id={props?.val}
            // data-toggle="modal tooltip"
            // data-target="#ratingModal"
            // data-placement="top"
            // data-trigger="manual"
            // data-delay='{"show":"500", "hide":"300"}'
            onClick={showModal}
          >
            Save
          </a>
          {/* <SaveModal status={isOpen} /> */}
        </div>
        {
          <img
            className="col-4"
            src={props?.book?.imageLinks?.smallThumbnail || props?.book?.imageLinks}
            alt="sans"
          />
        }
      </div>

      <Modal show={isOpen}>
      <Modal.Header>
        <span>Saving <strong>{props?.book?.title}</strong></span>
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
              onChange={e => handleReview(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="rating">Rating: </label>
            <select name="rating" id="bookRating" value={rating} onChange={e => handleRating(e.target.value)}>
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
              props.saveMeth(savingNum, review, rating);
              setIsOpen(false)
            }
          }
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
    </div>
  );
};

export default FoundItems;