import React, { Component } from 'react';

//TEST EXAMPLE


class Map extends Component {

    componentDidMount() {
        //var map = new Datamap({element: document.getElementById('../node_modules/datamaps/dist/datamaps.world.min.js')});
        let element = document.getElementById('map');
        let width = element.clientHeight * 2.428;
        let Datamap = require('datamaps');
        let draw = new Datamap({element: element, width: width, height: element.clientHeight, projection: 'equirectangular'});
    }

    render() {
        return (
            <div id="map" className="map">

            </div>
        );
    }

}

export default Map;
