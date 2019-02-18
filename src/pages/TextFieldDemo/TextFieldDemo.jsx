import React from 'react';
import TextField from '../../components';

const TextFieldDemo = () => (
  <>
    <div>
      <h3>This is a disabled input</h3>
      <TextField disabled value="Disabled Input" />
      <h3>A valid Input</h3>
      <TextField className="value" value="Accessible" borderColor="orange" />
      <h3>An input with errors</h3>
      <TextField className="error" value="101" err="Could not be greater than" />
    </div>
  </>
);
export default TextFieldDemo;
