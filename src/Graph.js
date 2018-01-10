import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from "d3";
import { Chart } from 'react-d3-core';
import { BarGroupChart, PieChart } from 'react-d3-basic';



class Graph extends Component {

    state = {
        dataParsed: [],
        chartSeries: [],
        size: { size: { w: 0, h: 0 } }
    }

    fitToParentSize() {
        const elem = ReactDOM.findDOMNode(this);
        const w = elem.parentNode.offsetWidth;
        const h = elem.parentNode.offsetHeight;
        const currentSize = this.state.size;
        if (w !== currentSize.w || h !== currentSize.h) {
            this.setState({
                size: { w, h },
            });
        }
    }

    componentDidMount() {
      window.addEventListener('resize', () => this.fitToParentSize);
      this.fitToParentSize();
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
    margins = {top: 50, right: 50, bottom: 20, left: 50};
    outerRadius = this.radius - 10;
    innerRadius = 0;

    render() {
        const { dataParsed, chartSeries, pieData, size } = this.state;

        let width = Math.ceil(size.w * 0.45);
        let height = width;//Math.ceil(size.w * 0.90);
        let margins = {
            top: Math.ceil()
        }
        return (
            <div className="graph">
                <BarGroupChart
                    data= {dataParsed}
                    chartSeries = {chartSeries}
                    x= {this.x}
                    xScale= {"ordinal"}
                    yTickFormat= {this.yTickFormat}
                    width={width}
                    height={height}
                />
                <PieChart
                    title= {this.titlePie}
                    data= {pieData}
                    chartSeries= {chartSeries}
                    categoricalColors= {d3.scale.category10()}
                    showLegend= {true}
                    value = {this.value}
                    name = {this.name}
                    pieSort = {d3.descending}
                    width={width}
                    height={height}
                    outerRadius= {this.outerRadius}
                    innerRadius= {this.innerRadius}
                    margins= {this.margins}
                />
            </div>
        );
    }
}


export default Graph;
