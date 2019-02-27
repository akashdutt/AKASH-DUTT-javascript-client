import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../components';

const PrivateLayout = ({ children, ...rest }) => (
  <>
    <Navbar />
    <div {...rest} className="main">{children}</div>
  </>
);
export default PrivateLayout;
PrivateLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
