import React from 'react';

const FoundItems = ({...props}) => {



  // if(props.book[0]){
  //   console.log(props.book[0])
  // }
  if(props){
    console.log(props.book)
  }

   if (props.book.authors && props.book.authors.length > 1) {
     props.book.authors = props.book.authors.join(" and ");
   }
   if (props.book.publishedDate.length > 4) {
     props.book.publishedDate = props.book.publishedDate
       .toString()
       .slice(0, 4);
   }
   if (props.book.description.length > 300) {
     props.book.description =
       props.book.description.slice(0, 300) + "...";
   }
  // console.log(props)

    return (
        <div className="card h-100">
            <div className="row card-body">
              <div className="col-8">
                <h5 className="card-title">{props.book.title}</h5>
                <p className="card-text">{props.book.authors}</p>
                <p className="card-text">{props.book.description}</p>
                <a
                  href={props.book.infoLink}
                  target="_blank"
                  className="btn btn-sm btn-primary"
                >
                  Learn More
                </a>
                <a
                  href="#"
                  className="btn btn-sm btn-primary save-book"
                  id="${bookNumber}"
                  data-toggle="modal"
                  data-target="#ratingModal"
                  data-toggle="tooltip"
                  data-placement="top"
                  data-trigger="manual"
                  data-delay='{"show":"500", "hide":"300"}'
                >
                  Save
                </a>
              </div>
              {<img
                className="col-4"
                src={props.book.imageLinks.smallThumbnail}
                alt="sans"
              />}
            </div>
          </div>
  
    );
};

export default FoundItems;