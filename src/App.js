import React, { Component } from 'react';
import Map from "./Map";
import List from "./List";
import Graph from "./Graph";


//TEST EXAMPLE


class App extends Component {

    componentWillMount() {

    }

    render() {
        return (
            <div className="main">
                <div className="row">
                    <List />
                </div>
                <div className="row">
                    <Map />
                    <Graph />
                </div>
            </div>
        );
    }

}

export default App;
