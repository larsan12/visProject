import React, { Component } from 'react';
import * as d3 from "d3";
import { Chart } from 'react-d3-core';
import { BarGroupChart, PieChart } from 'react-d3-basic';



class Graph extends Component {

    state = {
        dataParsed: [],
        chartSeries: []
    }

    componentWillReceiveProps(nextProps) {
        this.parseData(nextProps)
    }

    parseData = (nextProps) => {
        const { data, selectedDiseases, selectedYear, selectedCountries } = nextProps;
        let dataParsed = [];
        let aggregator = {};
        selectedDiseases.forEach(d => {
            aggregator[d] = {
                name: d,
                count: 0
            }
        })

        selectedCountries.forEach(c => {
            let obj = {
                country: c
            };
            selectedDiseases.forEach(d => {
                obj[d] = data[d][selectedYear][c] ? data[d][selectedYear][c] : 0;
                let count = 0;
                try {
                    count = parseInt(obj[d]);
                } catch(err) {}
                aggregator[d].count = aggregator[d].count + count;
            });
            dataParsed.push(obj)
        })

        let chartSeries = [];
        selectedDiseases.forEach(d => {
            chartSeries.push({
                field: d,
                name: d
            })
        });

        let pie = [];
        selectedDiseases.forEach(d => {
            pie.push(aggregator[d]);
        })

        this.setState({
            ...this.state,
            chartSeries: chartSeries,
            dataParsed: dataParsed,
            pieData: pie
        })
    }


    x = function(d) {
      return d.country;
    };
    xScale = 'ordinal';
    yTickFormat = d3.format(".2s");
    value = function(d) {
      return +d.count;
    };
    name = function(d) {
      return d.name;
    };
    titlePie = "Aggregation";
    width = 960;
    height = 500;
    radius = Math.min(this.width, this.height - 120) / 2;
    margins = {top: 50, right: 50, bottom: 20, left: 50};
    outerRadius = this.radius - 10;
    innerRadius = 0;

    render() {
        const { dataParsed, chartSeries, pieData } = this.state;
        debugger;
        return (
            <div className="graph">
                <div className="left">
                    <PieChart
                        title= {this.titlePie}
                        data= {pieData}
                        chartSeries= {chartSeries}
                        categoricalColors= {d3.scale.category10()}
                        showLegend= {true}
                        value = {this.value}
                        name = {this.name}
                        pieSort = {d3.descending}
                        width={this.width}
                        height={this.height}
                        outerRadius= {this.outerRadius}
                        innerRadius= {this.innerRadius}
                        radius= {this.radius}
                        margins= {this.margins}
                      />
                </div>
                <div className="right">
                    <BarGroupChart
                        data= {dataParsed}
                        chartSeries = {chartSeries}
                        x= {this.x}
                        xScale= {"ordinal"}
                        yTickFormat= {this.yTickFormat}
                    />
                </div>
            </div>
        );
    }
}


export default Graph;
