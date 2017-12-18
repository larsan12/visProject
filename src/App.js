import React, { Component } from 'react';
import Map from "./Map";
import List from "./List";
import Graph from "./Graph";


Array.prototype.remove = function(value) {
    var idx = this.indexOf(value);
    if (idx != -1) {
        // Второй параметр - число элементов, которые необходимо удалить
        return this.splice(idx, 1);
    }
    return false;
}


class App extends Component {

    //from folder ./prepared_data

    diseases = [
        "TB mortality by country",
        "Suspected meningitis mortality by country",
        "Malaria mortality by country"
    ];

    state = {
        selectedCountries: [],
        selectedYear: "",
        data: {},
        selectedDisease: ""
    }

    //before all actions
    componentWillMount() {
        //Download data
        let diseases = {};
        this.diseases.forEach(d => diseases[d] = this.dowloadResurs(d));
        //delete empty jsons
        Object.keys(diseases).forEach((key) => (diseases[key] == null || diseases[key] == undefined) && delete diseases[key]);

        //set selected desease
        this.setState({
            ...this.state,
            selectedDisease: Object.keys(diseases)[0],
            selectedYear: Object.keys(diseases[Object.keys(diseases)[0]])[0],
            data: diseases
        });
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

    onChangeYear = (value) => {
        if (!value) return;
        this.setState({
            ...this.state,
            selectedYear: value
        })
    }

    onChangeDisease = (value) => {
        if (!value) return;
    }

    onChangeCountries = (value) => {
        if (!value) return;
        let { selectedCountries } = this.state;

        if (selectedCountries.indexOf(value) > -1) {
            selectedCountries.remove(value);
        } else {
            selectedCountries.push(value);
        }

        this.setState({
            ...this.state,
            selectedCountries: selectedCountries
        })
    }

    render() {
        const { data, selectedDisease, selectedYear, selectedCountries } = this.state;
        let diseases = Object.keys(data);

        return (
            <div className="main">
                <div className="row">
                    <List
                        diseases={diseases}
                        onChangeDisease={this.onChangeDisease}
                        onChangeYear={this.onChangeYear}
                        onChangeCountries={this.onChangeCountries}
                        selectedDisease={selectedDisease}
                        data={data[selectedDisease]}
                        selectedYear={selectedYear}
                        selectedCountries={selectedCountries}
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
