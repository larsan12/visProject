import React, { Component } from 'react';


//TEST EXAMPLE


class Select extends React.Component {

    handleChange(v) {
        let { onChange } = this.props;
        return function (event) {
            onChange(v);
        }
    }

    render() {
        let { values, selected, className } = this.props;
        let arr = values.map(v => v);
        return (
            <div className={className ? className : "select"} onClick={this.handleChange()}>
                {values && values.length && values.map(v =>
                    <div onClick={this.handleChange(v)} className={(selected.length ? selected.indexOf(v) > -1 : selected == v) ? "selectedOption": "defaultOption"}>{v}</div>)}
            </div>
        );
    }
}


export default Select;
