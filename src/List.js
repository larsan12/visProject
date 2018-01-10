import React, { Component } from 'react';
import Select from './forms/Select'

//TEST EXAMPLE


class List extends Component {

    componentWillMount() {

    }

    render() {
        const { diseases, selectedDiseases, onChangeDisease, onChangeYear, data,
            onChangeCountries, selectedCountries, selectedYear, years, countries } = this.props;

        return (
            <div className="list">
                <div className="list-diseases">
                    Select disease:
                    <Select
                        values={diseases}
                        onChange={onChangeDisease}
                        selected={selectedDiseases}
                        className="selectDisease"
                    />
                </div>
                <div className="list-countryes">
                    Select countryes:
                    <Select
                        values={countries}
                        onChange={onChangeCountries}
                        selected={selectedCountries}
                        className="selectCountryes"
                    />
                </div>
                <div className="list-years">
                    Select year:
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
