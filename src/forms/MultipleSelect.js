import React, { Component } from 'react';


//TEST EXAMPLE


class Select extends React.Component {

    handleChange() {
        let { onChange } = this.props;
        return function (event) {
            onChange(event.target.value);
        }
    }

    render() {
        let { values, selected } = this.props;
        return (
            <label className="list-diseases">
                Select disease:
                <select onChange={this.handleChange()} multiple="multiple">
                    {values && values.length && values.map(v =>
                        <option selected={selected == v}>{v}</option>)}
                </select>
            </label>
        );
    }
}


export default Select;
