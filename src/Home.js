import React, { Component } from 'react';
import Search from "./components/Search";
import Subbar from './components/Subbar'

class Home extends Component {
    render() {
        return (
            <div className="container">
                <Subbar/>
                <Search/>
            </div>
        );
    }
}

export default Home;