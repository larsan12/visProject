import React, { Component } from 'react';
import Map from "./Map";
import List from "./List";
import Graph from "./Graph";
let Datamap = require('datamaps');



Array.prototype.remove = function(value) {
    var idx = this.indexOf(value);
    if (idx != -1) {
        // Второй параметр - число элементов, которые необходимо удалить
        return this.splice(idx, 1);
    }
    return false;
}


class App extends Component {

    //diseases from folder ./prepared_data

    diseases = [
        "TB",
        "Suspected meningitis",
        "Malaria",
        "Road traffic",
        "HIV",
        "Cholera",
        "Air pollution"
    ];

    state = {
        selectedCountries: [],
        selectedYear: "",
        data: {},
        dataSelected: "",
        selectedDiseases: [],
        years: [],
        countries: [],
        population: {},
        mapCountries: {}
    }

    //before all actions
    componentWillMount() {
        //Download data
        let diseases = {};
        this.diseases.forEach(d => diseases[d] = this.dowloadResource(d));
        let population = this.dowloadResource("population");
        //delete empty jsons
        Object.keys(diseases).forEach((key) => (diseases[key] == null || diseases[key] == undefined) && delete diseases[key]);

        //SELECT DEFAULT DATA
        //countries
        let a = diseases[Object.keys(diseases)[0]];
        let b = a[Object.keys(diseases[Object.keys(diseases)[0]])[0]];
        let countries = Object.keys(b);

        let mapCountries = {}
        var c = Datamap.prototype.worldTopo.objects.world.geometries;
        c.forEach(i => {
            if (i.id != -99) {
                mapCountries[i.properties.name] = i.id
            }
        })

        //set selected desease
        this.setState({
            ...this.state,
            selectedDiseases: [Object.keys(diseases)[0]],
            selectedYear: Object.keys(diseases[Object.keys(diseases)[0]])[0],
            dataSelected: diseases[Object.keys(diseases)[0]],
            years: Object.keys(diseases[Object.keys(diseases)[0]]),
            countries: countries,
            data: diseases,
            population: population,
            mapCountries: mapCountries
        }, () => {
            this.onChangeDisease(Object.keys(diseases)[0])
        });

    }

    //dowload json data
    dowloadResource = (file, format) => {
        let data;
        try {
            data = require("../prepared_data/" + file + (format ? format : ".json"));
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
        const { data, selectedDiseases, selectedYear, selectedCountries, mapCountries } = this.state;

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

        //filter countries according to map data
        newCountries = newCountries.filter(c => Object.keys(mapCountries).indexOf(c) > -1 ? true : false)

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
        const { data, population, selectedDiseases, selectedYear, selectedCountries, mapCountries, years, countries } = this.state;
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
                    <Map
                        countries={countries}
                        selectedCountries={Object.assign([],selectedCountries)}
                        data={data}
                        selectedDiseases={selectedDiseases}
                        selectedYear={selectedYear}
                        mapCountries={mapCountries}
                        onChangeCountries={this.onChangeCountries}
                        population={population}
                    />
                    <Graph
                        selectedDiseases={selectedDiseases}
                        data={data}
                        selectedYear={selectedYear}
                        selectedCountries={selectedCountries}
                    />
                </div>
            </div>
        );
    }

}

export default App;
