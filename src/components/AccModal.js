import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { AccContext } from "./AccContext";

const AccModal = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

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
                      onClick={props.signIn}
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
                    onClick={props.signUp}
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
            onClick={props.closeModal}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AccModal;
