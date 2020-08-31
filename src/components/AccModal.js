import React, { useState, useContext } from "react";
import firebase, { firestore } from "firebase";

import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { AccContext } from "./AccContext";


const AccModal = (props) => {
  console.log("Modal acc opened");
  const [isOpen, setIsOpen] = React.useState(props.isOpen);
  // const [username, setUsername] = React.useState();
  // const [signInEmail, setSignInEmail] = React.useState();

  const [logInStatus, setLogInStatus] = React.useState(
    firebase.auth().currentUser
  );
  const [currentUser, setCurrentUser] = React.useState(
    firebase.auth().currentUser?.email
  );

  const { accStatus, setAccStatus } = useContext(AccContext);

  const handleSignUp = (e) => {
    e.preventDefault();

    var email = document.getElementById("sign-up-email").value;
    var username = document.getElementById("sign-up-username").value;
    var password = document.getElementById("sign-up-pw").value;
    var confPassword = document.getElementById("sign-up-pw-conf").value;
    if (email.length < 4) {
      alert("Please enter an email address.");
      return;
    }
    if (password.length < 4) {
      alert(
        "Please enter a password with a length of at least four characters."
      );
      return;
    }
    if (password != confPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (username.length < 4) {
      alert(
        "Please enter a username with a length of at least four characters."
      );
      return;
    }
    // Create user with email and pass.
    // [START createwithemail]

    //Sign-up meets requirements -> account creation:
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        return firebase.auth().currentUser.updateProfile({
          displayName: username,
        });
      })
      .then(() => {
        const newUser = firebase.auth().currentUser;
        // setCurrentUser(firebase.auth().currentUser);
        console.log(firebase.auth().currentUser);
        props.setIsOpen(false);

        firebase
          .firestore()
          .collection("users")
          .doc(`${newUser.displayName}`)
          .set({
            username: newUser.displayName,
            email: newUser.email,
            books: []
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == "auth/weak-password") {
          alert("The password is too weak.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
    // [END createwithemail]
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("Handling sign-in...");
    var email = document.getElementById("sign-in-email").value;
    var password = document.getElementById("sign-in-pw").value;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
    props.setIsOpen(false);
  };

  let handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log("Signed Out"); // Sign-out successful.
      })
      .catch(function (error) {
        console.log(error);
        // An error happened.
      });
  };

  firebase.auth().onAuthStateChanged(async function (user) {
    console.log("Auth state changed")

    if (user) {
      console.log("Successful log-in!");
      console.log(currentUser);
      setAccStatus(user?.displayName);    
    }

    else {
      console.log("Not logged in");
      setAccStatus(null);
      localStorage.setItem("fromDB", null);

      console.log(currentUser);
      console.log("Not logged in");
    }
  }
  )


  return (
    <div>
      <Modal show={props.isOpen}>
        <Tabs defaultActiveKey="signin" id="tabs">
          <Tab eventKey="signin" title="Sign In">
            <Modal.Body>
              <div className="tab-content" id="myTabContent">
                <div
                  className="my-1"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="sign-in-form"
                >
                  <form>
                    <div className="form-group">
                      <label htmlFor="InputEmail">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="sign-in-email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                      ></input>
                    </div>
                    <div className="form-group">
                      <label htmlFor="InputPassword">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="sign-in-pw"
                        placeholder="Password"
                      ></input>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      id="sign-in-btn"
                      onClick={handleSignIn}
                    >
                      Sign in
                    </button>
                  </form>
                </div>
              </div>
            </Modal.Body>
          </Tab>
          <Tab eventKey="signup" title="Sign Up">
            <Modal.Body>
              <div className="my-1">
                <form>
                  <div className="form-group">
                    <label htmlFor="InputSignUpEmail">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="sign-up-email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                    ></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      className="form-control"
                      id="sign-up-username"
                      aria-describedby="username"
                      placeholder="Enter username"
                    ></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="InputSignUpPassword">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="sign-up-pw"
                      placeholder="Password"
                    ></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="InputSignUpPasswordConfirmation">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="sign-up-pw-conf"
                      placeholder="Confirm Password"
                    ></input>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    id="account-action-btn"
                    onClick={handleSignUp}
                  >
                    Sign up
                  </button>
                </form>
              </div>
            </Modal.Body>
          </Tab>
        </Tabs>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={() => {
              console.log("Closing");
              props.setIsOpen(false)}
            }
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export const MemoAccModal = React.memo(AccModal);
