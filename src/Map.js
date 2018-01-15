import React, { Component } from 'react';
import * as d3 from "d3";

//TEST EXAMPLE


class Map extends Component {

    state = {
        colors: {}
    }

    arraysEqual = (a, b) => {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length != b.length) return false;

        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }


    componentDidMount() {
        //var map = new Datamap({element: document.getElementById('../node_modules/datamaps/dist/datamaps.world.min.js')});
        let element = document.getElementById('map');
        let width = element.clientHeight * 2.428;
        let Datamap = require('datamaps');
        let Map = new Datamap({
            element: element,
            width: width,
            height: element.clientHeight,
            projection: 'equirectangular',
            done: (datamap) => {
                datamap.svg.selectAll('.datamaps-subunit').on('click', geography => {
                    if (this.props.countries.indexOf(geography.properties.name) > -1) {
                        this.props.onChangeCountries(geography.properties.name)
                    }
                });
            }
        });
        window.Map = Map
    }

    colorLow = '#ff9d9d';
    colorHight = '#ff0000';
    colorDefault = 'rgb(220, 220, 220)';
    colorActive = 'rgb(171, 221, 164)';

    shouldComponentUpdate(nextProps, nextState) {
        let { countries, selectedCountries, mapCountries, data, selectedYear, population, selectedDiseases } = nextProps;
        let { countries: allC, selectedCountries: selC, selectedYear: selectedYear1 } = this.props;

        if (!this.arraysEqual(countries, allC) ||
            !this.arraysEqual(selC, selectedCountries) ||
            selectedYear != selectedYear1 ){

            let Map = window.Map;

            let colors = {};
            let selectedIndeces = {}
            selectedCountries.forEach(c => {
                let allDeads = 0;
                selectedDiseases.forEach(d => {
                    allDeads = allDeads + (data[d][selectedYear][c] ? parseInt(data[d][selectedYear][c]) : 0);
                })
                selectedIndeces[c] = allDeads/population[c][selectedYear]
            })

            var paletteScale = d3.scale.linear()
                .domain([d3.min(d3.values(selectedIndeces)),d3.max(d3.values(selectedIndeces))])
                .range([this.colorLow, this.colorHight]);

            selectedCountries.forEach(c => {
                colors[mapCountries[c]] = paletteScale(selectedIndeces[c])
            })

            countries.forEach(c => {
                if (!colors[mapCountries[c]]) {
                    colors[mapCountries[c]] = this.colorActive;
                }
            })

            Object.keys(mapCountries).forEach(c => {
                if (!colors[mapCountries[c]]) {
                    colors[mapCountries[c]] = this.colorDefault;
                }
            })

            Map.updateChoropleth(colors);
            this.setState({
                ...this.state,
                colors: colors
            })
        }

        return false;
    }

    render() {
        return (
            <div id="map" className="map">
                <div className="titleMap">
                    <span className="title"> Total mortality </span>
                    <span className="lable1"> <span className="color green"></span> - data exist </span>
                    <span className="lable1"> <span className="color gray"></span> - no data </span>
                    <span className="lable1"> <span className="color red"></span> - selected </span>
                </div>
            </div>
        );
    }

}

export default Map;
