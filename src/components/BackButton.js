import React from "react";
import { withRouter } from "react-router-dom";

export default withRouter(({ history }) => {
  return (
    <div>
      <button
        className="btn btn-sm btn-primary mr-2 mb-3"
        onClick={() => history.goBack()}
      >
        Back
      </button>
    </div>
  );
});
