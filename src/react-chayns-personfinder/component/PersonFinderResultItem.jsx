/* eslint-disable jsx-a11y/alt-text */

import classNames from 'clsx';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import FriendsIndicator from './result-item/FriendsIndicator';
import Relation from './result-item/Relation';
import VerificationIcon from '../../react-chayns-verification_icon/component/VerificationIcon';

const PersonFinderResultItem = ({ onClick, data, orm, isFocused }) => {
    const handleClick = useCallback(() => {
        onClick({
            relation: data,
        });
    }, [onClick, data]);

    const hasRelations =
        orm.relations && Array.isArray(data[orm.relations])
            ? data[orm.relations].length > 0
            : false;

    return (
        <div
            className={classNames('result-item', {
                'result-item--focused': isFocused,
            })}
            tabIndex="-1"
            onClick={handleClick}
        >
            {orm.imageUrl ? (
                <div
                    className="img"
                    style={{ backgroundImage: `url(${data[orm.imageUrl]})` }}
                />
            ) : null}
            <div className="text">
                <div className="title">
                    <div className="name">
                        {orm.verified ? (
                            <VerificationIcon
                                name={data[orm.showName]}
                                verified={data[orm.verified]}
                            />
                        ) : (
                            data[orm.showName]
                        )}
                    </div>
                    {hasRelations && (
                        <div className="identifier">
                            {`(${data[orm.identifier]})`}
                        </div>
                    )}
                </div>
                {hasRelations && <Relation relation={data} />}
                {!hasRelations && (
                    <div className="identifier">
                        {`(${data[orm.subtitle || orm.identifier]})`}
                    </div>
                )}
            </div>
            {data.personId && (
                <FriendsIndicator
                    personId={data.personId}
                    name={data[orm.showName]}
                />
            )}
        </div>
    );
};

PersonFinderResultItem.propTypes = {
    orm: PropTypes.shape({
        identifier: PropTypes.string,
        showName: PropTypes.string,
        imageUrl: PropTypes.string,
        relations: PropTypes.string,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.object.isRequired,
    isFocused: PropTypes.bool.isRequired,
};

PersonFinderResultItem.displayName = 'PersonFinderResultItem';

export default PersonFinderResultItem;
