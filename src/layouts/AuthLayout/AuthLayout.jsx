import React from 'react';
import PropTypes from 'prop-types';
import { Footer } from '../components';


const AuthLayout = ({ children, ...rest }) => (
  <>
    <div {...rest} className="main">{children}</div>
    <Footer />
  </>
);
export default AuthLayout;
AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
