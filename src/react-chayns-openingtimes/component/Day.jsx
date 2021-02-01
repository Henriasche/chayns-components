import classNames from 'clsx';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ChooseButton from '../../react-chayns-button/component/ChooseButton';
import Checkbox from '../../react-chayns-checkbox/component/Checkbox';
import Icon from '../../react-chayns-icon/component/Icon';
import checkDay from '../utils/checkDay';
import TimeSpan from './TimeSpan';

const PLACEHOLDER_STYLE = { width: 23 };
const PREFIX = 'CC_TIMESPAN_';
let currentId = 0;

class Day extends Component {
    constructor(props) {
        super(props);

        this.onDayActivation = this.onDayActivation.bind(this);
        this.timeSpanKey1 = `${PREFIX}${currentId++}`;
        this.timeSpanKey2 = `${PREFIX}${currentId++}`;

        this.state = { isRemoving: false, animations: false };
    }

    onDayActivation(status) {
        const { onDayActivation, weekday } = this.props;

        onDayActivation(weekday.number, status);
    }

    animationendFunction = () => {
        const { weekday, onRemove } = this.props;
        onRemove(weekday.number, 1);
        this.setState({ isRemoving: false });
        if (this.timeSpanRef)
            this.timeSpanRef.removeEventListener(
                'animationend',
                this.animationendFunction
            );
    };

    onChange = (weekDayNumber, index, start, end) => {
        const { onChange } = this.props;

        onChange(weekDayNumber, index, start, end);
    };

    render() {
        const { weekday, times, onAdd, onRemove } = this.props;

        const { isRemoving, animations } = this.state;

        // eslint-disable-next-line no-nested-ternary
        const timeSpans = times.slice();
        const isDisabled = !times.some((t) => !t.disabled);

        const dateValid = checkDay(times);

        return (
            <div
                className={classNames('flex', 'times', {
                    multiple: timeSpans.length > 1,
                    'multiple--animations': animations && timeSpans.length > 1,
                    'times--disabled': isDisabled,
                })}
            >
                <div className="flex__left">
                    <Checkbox
                        label={weekday.name}
                        onChange={this.onDayActivation}
                        checked={!isDisabled}
                    />
                </div>
                <div className="flex__middle flex__middle--wrapper">
                    {timeSpans.map((t, index) => (
                        <div className="flex__middle__wrapper">
                            <TimeSpan
                                key={
                                    index === 0
                                        ? this.timeSpanKey1
                                        : this.timeSpanKey2
                                }
                                startTime={t.start}
                                endTime={t.end}
                                disabled={isDisabled}
                                onChange={(start, end) =>
                                    this.onChange(
                                        weekday.number,
                                        index,
                                        start,
                                        end
                                    )
                                }
                                childrenRef={
                                    index === 1
                                        ? (ref) => {
                                              this.timeSpanRef = ref;
                                          }
                                        : null
                                }
                                isInvalid={!dateValid}
                            />
                            {index === timeSpans.length - 1 ? (
                                <ChooseButton
                                    className="flex__right"
                                    onClick={() => {
                                        this.setState({ animations: true });
                                        if (this.timeSpanRef)
                                            this.timeSpanRef.removeEventListener(
                                                'animationend',
                                                this.animationendFunction
                                            );
                                        if (timeSpans.length < 2) {
                                            onAdd(
                                                weekday.number,
                                                TimeSpan.defaultStart,
                                                TimeSpan.defaultEnd
                                            );
                                        } else {
                                            onRemove(weekday.number, 1);
                                            this.timeSpanRef.addEventListener(
                                                'animationend',
                                                this.animationendFunction
                                            );
                                            this.setState({ isRemoving: true });
                                        }
                                    }}
                                >
                                    <Icon
                                        icon={
                                            timeSpans.length < 2 || isRemoving
                                                ? 'fa fa-plus'
                                                : 'fa fa-times'
                                        }
                                        style={{ fontSize: 'inherit' }}
                                    />
                                </ChooseButton>
                            ) : (
                                <div style={PLACEHOLDER_STYLE} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

Day.propTypes = {
    weekday: PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired,
    }).isRequired,
    times: PropTypes.arrayOf(
        PropTypes.shape({
            start: PropTypes.string.isRequired,
            end: PropTypes.string.isRequired,
        })
    ).isRequired,
    onDayActivation: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

Day.displayName = 'Day';

export default Day;
