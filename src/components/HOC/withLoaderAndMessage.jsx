import React from 'react';
import { CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';

export default function withLoaderAndMessage(Component) {
  return class WithLoaderAndMessage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      WithLoaderAndMessage.propTypes = {
        loading: PropTypes.bool.isRequired,
        dataLength: PropTypes.number.isRequired,
      };
      const { loading, dataLength } = this.props;
      if (loading === false && dataLength) {
        return (
          <div>
            <Component {...this.props} />
          </div>
        );
      } if (loading === true) {
        return (
          <CircularProgress />
        );
      }
      return (<b>OOPS!, No More Trainees</b>);
    }
  };
}
