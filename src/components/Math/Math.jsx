import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propType = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.string.isRequired,
  children: PropTypes.func,
};
const defaultProps = {
  children: () => {},
};

class Math extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  compute = (first, second, operator) => {
    let result = 'Invalid Operation';
    if (operator === '+') {
      result = first + second;
    } else if (operator === '-') {
      result = first - second;
    } else if (operator === '/') {
      if (second === 0) {
        result = 'infinity';
      }
      result = first / second;
    } else if (operator === '*') {
      result = first * second;
    }
    return result;
  }

  render() {
    const {
      first,
      second,
      operator,
      children,
    } = this.props;
    const result = this.compute(first, second, operator);
    return (
      <div>
        {children(first, second, operator, result)}
      </div>
    );
  }
}
Math.propTypes = propType;
Math.defaultProps = defaultProps;
export default Math;
