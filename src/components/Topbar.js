import React from 'react';
import AccModal from "./AccModal";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const Topbar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const showModal = (e) => {
    e.preventDefault();
    //console.log(e.target.id);
    //setSavingNum(e.target.id);
    setIsOpen(true);
    //console.log(isOpen)
    console.log(props)
  };

    return (
      <div className="row bg-light account d-flex flex-row justify-content-center">
        <div className="acc-buttons">
          {/* <!-- Button trigger modal --> */}
          <a
            href="#"
            id="my-acc"
            data-toggle="modal"
            data-target="#accountModal"
            onClick={showModal}
          >
            My Account
          </a>
          <span id="acc-status"></span>
        </div>

        <AccModal isOpen={isOpen} closeModal={() => {setIsOpen(false)}}/>
          
      </div>
    );
};



export default Topbar;