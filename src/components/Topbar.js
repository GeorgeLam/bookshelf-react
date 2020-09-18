import React, { useContext, useState } from "react";
import firebase, { firestore } from "firebase";
import Firebase from "./Firebase";
import { MemoAccModal } from "./AccModal";
import Modal from "react-bootstrap/Modal";
import { AccContext } from "./AccContext";

const Topbar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { accStatus, setAccStatus } = useContext(AccContext);

  const showModal = (e) => {
    e.preventDefault();
    //console.log(e.target.id);
    //setSavingNum(e.target.id);
    setIsOpen(true);
    //console.log(isOpen)
    console.log(props);
  };

  let handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log("Signed Out"); // Sign-out successful.
        setAccStatus();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  window.onload = function () {
    //authCheck();
  };

  return (
    <div className="container-fluid bg-light account d-flex flex-row justify-content-center buttonsContainer">
      <div className="acc-buttons">
        {/* <span>{this.context}</span> */}
        {/* <!-- Button trigger modal --> */}
        {!accStatus && (
          <a
            href="#"
            id="my-acc"
            data-toggle="modal"
            data-target="#accountModal"
            onClick={showModal}
            className="mx-1"
          >
            My Account
          </a>
        )}

        <span id="acc-status" className="mx-1">
          {accStatus ? (
            <React.Fragment>
              Logged in as {accStatus}
              <a
                href="#"
                id="my-acc"
                data-toggle="modal"
                data-target="#accountModal"
                onClick={handleSignOut}
                className="mx-1"
              >
                (sign out)
              </a>
            </React.Fragment>
          ) : (
            "Not logged in"
          )}
        </span>
      </div>

      <MemoAccModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={() => {
          setIsOpen(false);
        }}
        // signIn={handleSignIn}
        // signUp={handleSignUp}
        // signOut={handleSignOut}
      />
    </div>
  );
};

export default Topbar;
