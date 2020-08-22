import React from 'react';

const Topbar = () => {
    return (
      <div className="row bg-light account d-flex flex-row justify-content-center">
        <div className="acc-buttons">
          {/* <!-- Button trigger modal --> */}
          <a
            href="#"
            id="my-acc"
            data-toggle="modal"
            data-target="#accountModal"
          >
            My Account
          </a>
          <span id="acc-status"></span>
        </div>

        {/* <!-- account sign-in/sign-up modal --> */}
        <div
          className="modal fade"
          id="accountModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="accountModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item w-50">
                  <a
                    className="nav-link active text-center"
                    id="sign-in"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    Sign in
                  </a>
                </li>
                <li className="nav-item w-50">
                  <a
                    className="nav-link text-center"
                    id="sign-up"
                    data-toggle="tab"
                    href="#profile"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Sign up
                  </a>
                </li>
              </ul>

              <div className="modal-body">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
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
                      >
                        Sign in
                      </button>
                    </form>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="sign-up-form"
                  >
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
                      >
                        Sign up
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};



export default Topbar;