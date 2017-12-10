import React, { Component } from 'react';
import Map from "./Map";
import List from "./List";
import Graph from "./Graph";

class App extends Component {

    //from folder ./prepared_data

    diseases = [
        "TB mortality by country",
        "Suspected meningitis mortality by country"
    ];

    //before all actions
    componentWillMount() {
        //Download data
        let state = {
            diseases: {}
        };

        this.diseases.forEach(d => state.diseases[d] = this.dowloadResurs(d));
        //delete empty jsons
        Object.keys(state.diseases).forEach((key) => (state.diseases[key] == null || state.diseases[key] == undefined) && delete state.diseases[key]);

        //set selected desease
        state.selectedDisease = Object.keys(state.diseases)[0];

        this.setState(state);
    }

    //dowload json data
    dowloadResurs = (file) => {
        let data;
        try {
            data = require("../prepared_data/" + file + ".json");
        } catch(err) {
            return undefined;
        }

        return data;
    }

    onChangeYear = () => {

    }

    render() {
        const { diseases, selectedDisease } = this.state;
        let values = Object.keys(diseases);

        return (
            <div className="main">
                <div className="row">
                    <List
                        values={values}
                        onChange={this.onChangeYear}
                        selected={selectedDisease}
                    />
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
