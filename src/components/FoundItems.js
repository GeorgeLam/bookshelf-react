import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { AccContext } from "./AccContext";
import Modal from "react-bootstrap/Modal";
import { MemoAccModal } from "./AccModal";
import SaveModal from "./SaveModal";

const FoundItems = (props) => {
  const { accStatus, setAccStatus } = useContext(AccContext);
  // console.log(props?.book)
  const [isOpen, setIsOpen] = React.useState(false);
  const [accModalIsOpen, setAccModalIsOpen] = React.useState(false);
  const [savingNum, setSavingNum] = React.useState("");
  const [rating, handleRating] = React.useState("");
  const [review, handleReview] = React.useState("");

  const showSaveModal = (e) => {
    e.preventDefault();
    console.log(accStatus);
    if (!accStatus) {
      setAccModalIsOpen(true);
      //alert("You're not logged in!")
      return;
    }
    //console.log(e.target.id);
    setSavingNum(e.target.id);
    setIsOpen(true);
    //console.log(isOpen)
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const saveFunc = () => {
    console.log("Saving", savingNum);
    console.log();
  };

  return (
    <div className="card h-100">
      <div className="row card-body">
        <div className="col-8">
          <Link
            style={{ fontSize: 24 }}
            className="card-title"
            to={"/book/" + props?.id}
          >
            {props?.book?.title}
          </Link>
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
            onClick={showSaveModal}
          >
            Save
          </a>
          {/* <SaveModal status={isOpen} /> */}
        </div>
        {
          <img
            className="col-4"
            src={
              props?.book?.imageLinks?.smallThumbnail || props?.book?.imageLinks
            }
            alt="sans"
          />
        }
      </div>

      <SaveModal
        bookTitle={props?.book?.title}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleReview={handleReview}
        handleRating={handleRating}
        review={review}
        rating={rating}
        savingNum={savingNum}
        saveMeth={() => {
          props.saveMeth(savingNum, review, rating);
        }}
      />

      <MemoAccModal
        isOpen={accModalIsOpen}
        setIsOpen={setAccModalIsOpen}
        // closeModal={() => {
        //   setAccModalIsOpen(false);
        // }}
        // signIn={handleSignIn}
        // signUp={handleSignUp}
        // signOut={handleSignOut}
      />
    </div>
  );
};

export default FoundItems;
