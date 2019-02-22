import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styling from './style';

const propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
const defaultProps = {
  color: 'primary',
  disabled: false,
  style: {},
};
class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const {
      color,
      disabled,
      style,
      value,
      onClick,
      ...rest
    } = this.props;
    return (
      <>
        <button {...rest} type="button" style={{ ...styling.base, ...style }} disabled={disabled}>{value}</button>
      </>
    );
  }
}
Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
export default Button;
