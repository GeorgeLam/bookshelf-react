import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";


const SaveModal = (props) => {
let [status, changeStatus] = useState(props.isOpen)

  return (
    <Modal show={this.status}>
      <Modal.Header>Hi</Modal.Header>
      <Modal.Body>asdfasdf</Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => {
            changeStatus(false);
          }}
        >
          Close
        </button>
        <button
          type="button"
          class="btn btn-primary saveRating"
          data-dismiss="modal"
        >
          Save rating
        </button>
        <button type="button" class="btn btn-secondary" onClick={() => {changeStatus(false)}}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default SaveModal