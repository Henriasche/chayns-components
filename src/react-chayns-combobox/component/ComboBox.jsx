/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class ComboBox extends PureComponent {
    static propTypes = {
        onSelect: PropTypes.func,
        disabled: PropTypes.bool,
        label: PropTypes.string,
        list: PropTypes.array.isRequired,
        listKey: PropTypes.string.isRequired,
        listValue: PropTypes.string.isRequired,
        className: PropTypes.string,
        defaultValue: PropTypes.string,
        stopPropagation: PropTypes.bool,
    };

    static defaultProps = {
        label: null,
        className: null,
        onSelect: null,
        disabled: false,
        stopPropagation: false,
        defaultValue: null,
    };

    constructor() {
        super();

        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(e) {
        const { onSelect, list, listKey } = this.props;
        const selection = e.target.value;
        if (onSelect && list && list.length > 0 && listKey && selection) {
            onSelect(list.find(item => String(item[listKey]) === selection));
        }
    }

    render() {
        const {
            className, label, list, disabled, listValue, listKey, stopPropagation, defaultValue,
        } = this.props;
        return (
            <div className={classNames('select', className, { 'select--disabled': disabled })}>
                <select
                    disabled={disabled}
                    onChange={this.onSelect}
                    defaultValue={label ? 'ComboBoxLabel' : defaultValue}
                    onClick={stopPropagation ? event => event.stopPropagation() : null}
                >
                    {
                        label
                            ? <option value="ComboBoxLabel" disabled>{label}</option>
                            : null
                    }
                    {list.map(item => (
                        <option key={item[listKey]} value={item[listKey]}>
                            {item[listValue]}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}
