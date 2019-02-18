import PropTypes from 'prop-types';
import React from 'react';
import styling from './style';

const TextField = (props) => {
  const { err, ...rest } = props;
  const errorStyle = (err) ? { ...styling.error } : {};
  return (
    <>
      <input type="text" {...rest} style={{ ...styling.base, ...errorStyle }} />
      {err && <p style={{ color: 'red' }}>{err}</p>}
    </>
  );
};
TextField.propTypes = {
  err: PropTypes.string,
};
TextField.defaultProps = {
  err: '',
};
export default TextField;
