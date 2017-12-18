import React, { Component } from 'react';
import Select from './forms/Select'

//TEST EXAMPLE


class List extends Component {

    componentWillMount() {

    }

    render() {
        const { diseases, selectedDisease, onChangeDisease, onChangeYear, data,
            onChangeCountries, selectedCountries, selectedYear } = this.props;
        let years = Object.keys(data);
        let countryes = Object.keys(data[selectedYear]);
        return (
            <div className="list">
                <div className="list-diseases">
                    Select disease:
                    <Select
                        values={diseases}
                        onChange={onChangeDisease}
                        selected={selectedDisease}
                        className="selectDisease"
                    />
                </div>
                <div className="list-countryes">
                    Select countryes:
                    <Select
                        values={countryes}
                        onChange={onChangeCountries}
                        selected={selectedCountries}
                        className="selectCountryes"
                    />
                </div>
                <div className="list-years">
                    Select disease:
                    <Select
                        values={years}
                        onChange={onChangeYear}
                        selected={selectedYear}
                        className="selectYears"
                    />
                </div>
            </div>
        );
    }

}

export default List;
