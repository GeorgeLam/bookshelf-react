import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { AccContext } from "./AccContext";
import Modal from "react-bootstrap/Modal";
import SaveModal from "./SaveModal"

const SavedItems = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [savingNum, setSavingNum] = React.useState("");
  const [rating, handleRatingUpdate] = React.useState(1);
  const [review, handleReviewUpdate] = React.useState("");
  const [ratingConvert, handleRatingConv] = React.useState("");
  console.log(props.parentPage)

  const {accStatus, setAccStatus} = useContext(AccContext);

  const showModal = (e) => {
    e.preventDefault();
    //console.log(e.target.id);
    setSavingNum(e.target.id);
    setIsOpen(true);
    //console.log(isOpen)
    console.log(props)
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="card h-100">
      <div className="row card-body">
        <div className="col-8">
          {/* <h5 className="card-title">{props?.book?.title}</h5> */}
          <Link style={{ fontSize: 24 }} className="card-title" to={"/book/" + props?.id}>{props?.book?.title}</Link>
          <p className="card-text">{props?.book?.authors}</p>
          <p className="card-text">{props?.book?.description}</p>
          <p className="rating" id="rating${counter}">
              {props?.book?.rating ? `This book has been rated ${props.book?.rating}/5.` : `This book hasn't been rated.`}
          </p>
          <p className="review" id="review${counter}">
            <strong>Review:</strong>
            <br />{" "}
            {props?.book?.review
              ? props?.book?.review
              : "This book hasn't been reviewed."}
          </p>
          {!props?.parentPage && (
            <React.Fragment>
              <a
                href="#"
                className="btn btn-sm btn-primary edit-book"
                id={props?.book?.id}
                data-toggle="modal"
                data-target="#ratingModal"
                onClick={showModal}
              >
                Edit
              </a>
              <a
                href="#"
                className="btn btn-sm btn-primary unsave-book ml-1"
                id={props?.book?.id}
                onClick={props.removeMeth}
              >
                Remove
              </a>
            </React.Fragment>
          )}
          {/* <SaveModal status={isOpen} /> */}
        </div>
        {<img className="col-4" src={props?.book?.image} alt="sans" />}
      </div>

      <Modal show={isOpen}>
        <Modal.Header>
          <span>
            Editing <strong>{props?.book?.title}</strong>
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
              onChange={(e) => handleReviewUpdate(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="rating">Rating: </label>
            <select
              name="rating"
              id="bookRating"
              value={rating}
              onChange={(e) => handleRatingUpdate(e.target.value)}
            >
              <option value=""></option>
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
              props.updateMeth(savingNum, review, rating);
              setIsOpen(false);
            }}
          >
            Save changes
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

export default SavedItems;