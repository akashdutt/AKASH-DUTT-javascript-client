import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PrivateLayout } from '../layouts';

const PrivateRoute = ({ component: Component, ...rest }) => {
  if (localStorage.getItem('token')) {
    return (
      <Route
        {...rest}
        render={matchProps => (
          <PrivateLayout>
            <Component {...matchProps} />
          </PrivateLayout>
        )}
      />
    );
  }
  return <Redirect to="/login" />;
};
PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
};
export default PrivateRoute;
