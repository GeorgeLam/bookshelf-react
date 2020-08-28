import React, {useContext, useState} from 'react';
import firebase, { firestore } from 'firebase';
import Firebase from './Firebase';
import {MemoAccModal} from "./AccModal";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import {AccContext} from "./AccContext";

const Topbar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  // const [logInStatus, setLogInStatus] = React.useState(
  //   firebase.auth().currentUser
  // );
  // const [currentUser, setCurrentUser] = React.useState(
  //   firebase.auth().currentUser?.email
  // );

  const {accStatus, setAccStatus} = useContext(AccContext);
  // console.log(useContext(AccContext));

  const showModal = (e) => {
    e.preventDefault();
    //console.log(e.target.id);
    //setSavingNum(e.target.id);
    setIsOpen(true);
    //console.log(isOpen)
    console.log(props)
  };

// function handleSignUp(e) {
//   e.preventDefault();

//   var email = document.getElementById("sign-up-email").value;
//   var username = document.getElementById("sign-up-username").value;
//   var password = document.getElementById("sign-up-pw").value;
//   var confPassword = document.getElementById("sign-up-pw-conf").value;
//   if (email.length < 4) {
//     alert("Please enter an email address.");
//     return;
//   }
//   if (password.length < 4) {
//     alert("Please enter a password with a length of at least four characters.");
//     return;
//   }
//   if (password != confPassword) {
//     alert("Passwords do not match!");
//     return;
//   }
//   if (username.length < 4) {
//     alert("Please enter a username with a length of at least four characters.");
//     return;
//   }
//   // Create user with email and pass.
//   // [START createwithemail]

//   //Sign-up meets requirements -> account creation:
//   firebase
//     .auth()
//     .createUserWithEmailAndPassword(email, password)
//     .then((res) => {
//       return firebase.auth().currentUser.updateProfile({
//         displayName: username,
//       });
//     })
//     .then(() => {
//       const newUser = firebase.auth().currentUser;
//       // setCurrentUser(firebase.auth().currentUser);
//       console.log(firebase.auth().currentUser);
//       setIsOpen(false);

//       firebase.firestore().collection("users")
//         .doc(`${newUser.displayName}`)
//         .set({
//           username: newUser.displayName,
//           email: newUser.email,
//         })
//         .catch(function (error) {
//           console.error("Error adding document: ", error);
//         });
//     })
//     .catch(function (error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // [START_EXCLUDE]
//       if (errorCode == "auth/weak-password") {
//         alert("The password is too weak.");
//       } else {
//         alert(errorMessage);
//       }
//       console.log(error);
//       // [END_EXCLUDE]
//     });
//   // [END createwithemail]
// }


//   function handleSignIn(e) {
//     e.preventDefault();
//     console.log("handling sign-in...")
//     var email = document.getElementById('sign-in-email').value;
//     var password = document.getElementById('sign-in-pw').value;
//     firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // [START_EXCLUDE]
//       if (errorCode === 'auth/wrong-password') {
//         alert('Wrong password.');
//       } else {
//         alert(errorMessage);
//       }
//       console.log(error);
//       //document.getElementById('quickstart-sign-in').disabled = false;
//       // [END_EXCLUDE]
//     });
//     //console.log("logged in!")
//     //authCheck();
//     setIsOpen(false);
//   }


let handleSignOut = () => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log("Signed Out"); // Sign-out successful.
      // $("#my-acc").text("Log In");
      // $("#my-acc").attr("data-target", "#accountModal");
      //setCurrentUser("No current user");
      //console.log(currentUser);
      //authCheck();
      // localStorage.setItem(`books`, "[]");
      // console.log("rewriting LS bc hLO func");
      // window.location.href = "./index.html";
    })
    .catch(function (error) {
      console.log(error);
      // An error happened.
    });
}



//   firebase.auth().onAuthStateChanged(function (user) {
//     console.log(user?.email);
//     //setCurrentUser(user?.email);

//     if (user) {
//       console.log("Successful log-in!")
//       console.log(firebase.auth().currentUser);
//       // setCurrentUser(user?.email);
//       console.log(currentUser);
//       setAccStatus(user?.email)

//       // // User is signed in.
//       //setLogInStatus(true);
//       //console.log("Log in status: " + logInStatus)
//       // let uName = await user.displayName;
//       // ...
//     } else {

//       // $("#acc-status").text(`You're not logged in`);
//       //console.log("Not logged in");
//       // setCurrentUser(null)
//       setAccStatus(null)
//       console.log(currentUser);

//       //setLogInStatus(false);
//       //console.log("Log in status: " + logInStatus);
//       console.log("Not logged in")
//       //setAccStatus("Logged out");


//       // User is signed out.
//       // ...
//     }
//   });

window.onload = function () {
  //authCheck();
};


    return (
      <div className="row bg-light account d-flex flex-row justify-content-center">
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