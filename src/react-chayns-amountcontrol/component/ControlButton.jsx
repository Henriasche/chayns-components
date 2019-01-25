/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../react-chayns-icon/component/Icon';

export default class ControlButton extends PureComponent {
    static propTypes = {
        icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
        onClick: PropTypes.func.isRequired,
        className: PropTypes.string.isRequired,
        stopPropagation: PropTypes.bool.isRequired,
        disabled: PropTypes.bool,
        color: PropTypes.string,
    };

    static defaultProps = {
        disabled: false,
        color: null,
    };

    render() {
        const {
            icon,
            onClick,
            className,
            disabled,
            color,
            stopPropagation
        } = this.props;

        return (
            <div
                onClick={(e) => {
                    if(!disabled) onClick(e);
                    if(stopPropagation) e.stopPropagation();
                }}
                className={classNames(className, { disabled })}
                style={color ? { color } : null}
            >
                <Icon icon={icon}/>
            </div>
        );
    }
}
