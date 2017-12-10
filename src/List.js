import React, { Component } from 'react';
import Select from './forms/Select'

//TEST EXAMPLE


class List extends Component {

    componentWillMount() {

    }

    render() {
        const { values, selected, onChange } = this.props;
        return (
            <div className="list">
                <Select
                    values={values}
                    onChange={onChange}
                    selected={selected}
                />
            </div>
        );
    }

}

export default List;
