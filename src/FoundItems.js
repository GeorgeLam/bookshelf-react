import React from 'react';

const FoundItems = (props) => {

  // if(props){
  //   console.log(props.book)
  // }

  

  return (
      <div className="card h-100">
          <div className="row card-body">
            <div className="col-8">
              <h5 className="card-title">{props?.book?.title}</h5>
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
                data-toggle="modal tooltip"
                data-target="#ratingModal"
                data-placement="top"
                data-trigger="manual"
                data-delay='{"show":"500", "hide":"300"}'
                onClick={props.saveMeth}
              >
                Save
              </a>
            </div>
            {<img
              className="col-4"
              src={props?.book?.imageLinks?.smallThumbnail}
              alt="sans"
            />}
          </div>
        </div>
  );
};

export default FoundItems;