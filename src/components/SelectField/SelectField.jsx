import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styling from './style';

const propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  defaultText: PropTypes.string,
};
const defaultProps = {
  error: '',
  options: [],
  defaultText: 'Select',
};

class SelectField extends Component {
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
      defaultText,
      ...rest
    } = this.props;
    return (
      <select {...rest} style={{ ...styling.base }} onChange={onChange}>
        <option>
          {defaultText}
        </option>
        {
          options.map(opt => (
            <option key={opt.label} value={opt.value}>
              {opt.label}
            </option>
          ))
        }
      </select>
    );
  }
}
SelectField.propTypes = propTypes;
SelectField.defaultProps = defaultProps;
export default SelectField;
