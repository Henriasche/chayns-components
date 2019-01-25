import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Icon extends PureComponent {
    static propTypes = {
        icon: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.shape({
                iconName: PropTypes.string.isRequired,
                prefix: PropTypes.string.isRequired,
            }).isRequired,
        ]).isRequired,
        className: PropTypes.string,
        style: PropTypes.object(),
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
        stopPropagation: PropTypes.bool,
    };

    static defaultProps = {
        className: '',
        style: undefined,
        onClick: undefined,
        disabled: false,
        stopPropagation: false,
    };

    constructor(props) {
        super(props);
        const { icon } = props;
        if (!chayns.utils.isString(icon) && icon && icon.prefix && icon.iconName) {
            library.add(icon);
        }
        this.onClick = this.onClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { icon } = this.props;
        if (icon !== nextProps.icon && !chayns.utils.isString(nextProps.icon) && nextProps.icon && nextProps.icon.prefix && nextProps.icon.iconName) {
            library.add(nextProps.icon);
        }
    }

    onClick(e) {
        const { onClick, disabled, stopPropagation } = this.props;
        if(onClick && !disabled) onClick(e);
        if(stopPropagation) e.stopPropagation();
    }

    render() {
        const {
            icon, className, onClick, disabled, ...other
        } = this.props;

        const classes = classNames('react-chayns-icon', className, {
            [icon]: chayns.utils.isString(icon),
            'react-chayns-icon--clickable': onClick,
            'react-chayns-icon--disabled': disabled
        });

        if (chayns.utils.isString(icon)) {
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            return <i className={classes} onClick={this.onClick} {...other}/>;
        }
        if (!icon) {
            return null;
        }
        if (typeof onClick === 'function') {
            return (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <span className={classes} onClick={this.onClick}>
                    <FontAwesomeIcon icon={[icon.prefix, icon.iconName]} {...other}/>
                </span>
            );
        }
        return <FontAwesomeIcon icon={[icon.prefix, icon.iconName]} className={classes} {...other}/>;
    }
}
