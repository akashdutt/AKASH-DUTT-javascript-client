import PropTypes from 'prop-types';
import React, { Component } from 'react';

const propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
};
const defaultProps = {
  error: '',
  options: [],
  onBlur: () => {},
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
      onBlur,
      options,
      ...rest
    } = this.props;
    return (
      <>
        {
          options.map(option => (
            <div>
              <input type="radio" name="Sports" {...rest} onBlur={onBlur} key={option.label} value={option.value} onChange={onChange} />
              {option.label}
            </div>
          ))
        }
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </>
    );
  }
}
RadioGroup.propTypes = propTypes;
RadioGroup.defaultProps = defaultProps;
export default RadioGroup;
