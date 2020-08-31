import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Saved from './Saved';
import PersonSaved from './PersonSaved';
import Book from './Book';

import userProvider from "./components/userProvider";
import Topbar from './components/Topbar'
import Subbar from './components/Subbar'
import Search from "./components/Search";
import FoundItems from "./components/FoundItems";
import Pagebuttons from './components/Pagebuttons'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AccContext } from "./components/AccContext";
import { BooksContext } from "./components/BooksContext";

function App() {
  const [accStatus, setAccStatus] = useState();
  const [storedBooks, setStoredBooks] = useState();

  return (
    <Router>
      <div id="top">
        <AccContext.Provider value={{ accStatus, setAccStatus }}>
          <BooksContext.Provider value={{ storedBooks, setStoredBooks }}>
            <Topbar />

            <Route path="/" exact component={Home} />
            <Route path="/saved" exact component={Saved} />
            <Route path="/saved/:personId" component={PersonSaved} />
          </BooksContext.Provider>
        </AccContext.Provider>
        
        <Route path="/book/:bookId" component={Book} />

        {/* <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS --> */}
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <script
          src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
          integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
          integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
          crossOrigin="anonymous"
        ></script>
        <script src="./lodash-min.js"></script>
        {/* <!-- <script src="env.js"></script> --> */}

        {/* <!-- The core Firebase JS SDK is always required and must be listed first --> */}
        {/* <script src="https://www.gstatic.com/firebasejs/7.17.1/firebase-app.js"></script> */}

        {/* <!-- TODO: Add SDKs for Firebase products that you want to use
         https://firebase.google.com/docs/web/setup#available-libraries --> */}
        {/* <script src="https://www.gstatic.com/firebasejs/7.17.1/firebase-analytics.js"></script>
        <script src="https://www.gstatic.com/firebasejs/7.17.1/firebase-auth.js"></script>
        <script src="https://www.gstatic.com/firebasejs/7.17.1/firebase-firestore.js"></script> */}

        {/* <script src="./firebase.js"></script> */}

        {/* <!-- The core Firebase JS SDK is always required and must be listed first --> */}
        {/* <script src="https://www.gstatic.com/firebasejs/7.17.1/firebase-app.js"></script> */}

        {/* <!-- TODO: Add SDKs for Firebase products that you want to use */}
        {/* <script src="https://www.gstatic.com/firebasejs/7.17.1/firebase-analytics.js"></script>
        <script src="https://www.gstatic.com/firebasejs/7.17.1/firebase-auth.js"></script>
        <script src="https://www.gstatic.com/firebasejs/7.17.1/firebase-firestore.js"></script> */}

        <script src="./app.js"></script>
      </div>
    </Router>
  );
}

export default App;