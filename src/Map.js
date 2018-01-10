import React, { Component } from 'react';

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

    colorSelected = 'rgba(255, 0, 0, .2)';
    colorDefault = 'rgb(220, 220, 220)';
    colorActive = 'rgb(171, 221, 164)';

    shouldComponentUpdate(nextProps, nextState) {
        let { countries, selectedCountries, mapCountries } = nextProps;
        let { countries: allC, selectedCountries: selC } = this.props;

        if (!this.arraysEqual(countries, allC) || !this.arraysEqual(selC, selectedCountries)) {
            let Map = window.Map;

            let colors = {};
            selectedCountries.forEach(c => colors[mapCountries[c]] = this.colorSelected)

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

            </div>
        );
    }

}

export default Map;
