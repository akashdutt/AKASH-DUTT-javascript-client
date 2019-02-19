/* eslint-disable react/jsx-one-expression-per-line */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
};
const defaultProps = {
  error: '',
  options: [],
};

class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const {
      error,
      value,
      onChange,
      options,
      ...rest
    } = this.props;
    return (
      <>
        {
          options.map(option => <div><input type="radio" name="Sports" {...rest} value={option.value} />{option.label}</div>)
        }
      </>
    );
  }
}
RadioGroup.propTypes = propTypes;
RadioGroup.defaultProps = defaultProps;
export default RadioGroup;
