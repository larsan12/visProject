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
        dataSelected: "",
        selectedDiseases: [],
        years: [],
        countries: []
    }

    //before all actions
    componentWillMount() {
        //Download data
        let diseases = {};
        this.diseases.forEach(d => diseases[d] = this.dowloadResurs(d));
        //delete empty jsons
        Object.keys(diseases).forEach((key) => (diseases[key] == null || diseases[key] == undefined) && delete diseases[key]);

        //SELECT DEFAULT DATA
        //countries
        let a = diseases[Object.keys(diseases)[0]];
        let b = a[Object.keys(diseases[Object.keys(diseases)[0]])[0]];
        let countries = Object.keys(b);

        //set selected desease
        this.setState({
            ...this.state,
            selectedDiseases: [Object.keys(diseases)[0]],
            selectedYear: Object.keys(diseases[Object.keys(diseases)[0]])[0],
            dataSelected: diseases[Object.keys(diseases)[0]],
            years: Object.keys(diseases[Object.keys(diseases)[0]]),
            countries: countries,
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

    intersec = (arr1, arr2) => {
        let newArr = [];
        arr1.forEach(a => {
            if (arr2.indexOf(a) > -1) {
                newArr.push(a)
            }
        })
        return newArr;
    }
    intersecAll = (arr) => {
        if (arr.length) {
            let newArr = arr[0];
            if (arr.length > 1) {
                for (let i = 1; i < arr.length; i++) {
                    newArr = this.intersec(newArr.slice(), arr[i]);
                }
            }
            return newArr;
        }
        return [];
    }

    onChangeDisease = (value) => {
        if (!value) return;
        const { data, selectedDiseases, selectedYear, selectedCountries } = this.state;
        let newSelectedDiseases = selectedDiseases.slice();

        if (selectedDiseases.indexOf(value) > -1) {
            if (newSelectedDiseases.length > 1) {
                newSelectedDiseases.remove(value);
            }
        } else {
            newSelectedDiseases.push(value);
        }

        let arrYears = [];
        let arrCountryes = [];

        newSelectedDiseases.forEach(d => {
            arrYears.push(Object.keys(data[d]));
            arrCountryes.push(Object.keys(data[d][Object.keys(data[d])[0]]))
        })

        let newYears = this.intersecAll(arrYears);
        let newCountries = this.intersecAll(arrCountryes);

        let newSelectedYear = selectedYear;

        if (newYears.indexOf(selectedYear) === -1) {
            newSelectedYear = newYears[0];
        }

        let newSelectedCountries = this.intersec(newCountries, selectedCountries.slice());

        this.setState({
            ...this.state,
            selectedDiseases: newSelectedDiseases,
            selectedYear: newSelectedYear,
            selectedCountries: newSelectedCountries,
            years: newYears,
            countries: newCountries
        })
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
        const { data, selectedDiseases, selectedYear, selectedCountries, years, countries } = this.state;
        let diseases = Object.keys(data);

        return (
            <div className="main">
                <div className="row">
                    <List
                        diseases={diseases}
                        onChangeDisease={this.onChangeDisease}
                        onChangeYear={this.onChangeYear}
                        onChangeCountries={this.onChangeCountries}
                        selectedDiseases={selectedDiseases}
                        data={data}
                        countries={countries}
                        years={years}
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
