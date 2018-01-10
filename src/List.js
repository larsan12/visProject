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
                    <span className="list-title"> Select disease </span>
                    <Select
                        values={diseases}
                        onChange={onChangeDisease}
                        selected={selectedDiseases}
                        className="selectDisease"
                    />
                </div>
                <div className="list-countryes">
                    <span className="list-title"> Select countryes </span>
                    <Select
                        values={countries}
                        onChange={onChangeCountries}
                        selected={selectedCountries}
                        className="selectCountryes"
                    />
                </div>
                <div className="list-years">
                    <span className="list-title"> Select year </span>
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
