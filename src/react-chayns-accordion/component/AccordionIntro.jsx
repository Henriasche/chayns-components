import React from 'react';
import PropTypes from 'prop-types';

const AccordionIntro = ({ children }) => (
    <div className="accordion__intro">
        {children}
    </div>
);


AccordionIntro.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AccordionIntro;
