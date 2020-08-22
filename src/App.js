import React from 'react';
import logo from './logo.svg';
import './App.css';
import Topbar from './Topbar'
import Subbar from './Subbar'
import Search from './Search'
import FoundItems from './FoundItems'
import Pagebuttons from './Pagebuttons'

function App() {
  return (
    <div id="top">

      <Topbar/>

      <Subbar/>

      <Search/>

      {/* <FoundItems/> */}

      <Pagebuttons/>

    {/* <!-- end of container --> */}



    {/* <!-- book rating modal --> */}

    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel"
        aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
           
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="book-review">Review</label>
                        <textarea name="book-review" className="form-control" id="bookReview" aria-describedby="book-review" value=""></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Rating: </label>
                        <select name="rating" id="bookRating">
                            <option value="1">1/5</option>
                            <option value="2">2/5</option>
                            <option value="3">3/5</option>
                            <option value="4">4/5</option>
                            <option value="5">5/5</option>
                        </select>
                    </div>
                    
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary saveRating"  data-dismiss="modal">Save rating</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>


    {/* <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS --> */}
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
        crossOrigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
        integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
        crossOrigin="anonymous"></script>
    <script src="./lodash-min.js"></script>
    {/* <!-- <script src="env.js"></script> --> */}

    {/* <!-- The core Firebase JS SDK is always required and must be listed first --> */}
    <script src="https://www.gstatic.com/firebasejs/7.17.1/firebase-app.js"></script>
    
    {/* <!-- TODO: Add SDKs for Firebase products that you want to use */}
    <script src="https://www.gstatic.com/firebasejs/7.17.1/firebase-analytics.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.17.1/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.17.1/firebase-firestore.js"></script>
    
    

    <script src="./app.js"></script>
    
  </div>

    



  );
}

export default App;
