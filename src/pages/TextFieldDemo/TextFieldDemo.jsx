import React, { Component } from 'react';
import TextField from '../../components/TextField';
import { PUBLIC_IMAGE_FOLDER } from '../../configs/constants';
import Slider from '../../components/Slider';

const imagesArr = [
  `${PUBLIC_IMAGE_FOLDER}default.png`,
  `${PUBLIC_IMAGE_FOLDER}cloud.jpg`,
  `${PUBLIC_IMAGE_FOLDER}dns-server.png`,
  `${PUBLIC_IMAGE_FOLDER}full-stack-web-development.jpg`,
  `${PUBLIC_IMAGE_FOLDER}js.jpg`,
  `${PUBLIC_IMAGE_FOLDER}load-balancer.png`,
];
class TextFieldDemo extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }


  render() {
    return (
      <div>
        <Slider banners={imagesArr} random />
        <h3>This is a disabled input</h3>
        <TextField disabled value="Disabled Input" />
        <h3>A valid Input</h3>
        <TextField className="value" value="Accessible" borderColor="orange" />
        <h3>An input with errors</h3>
        <TextField className="error" value="101" err="Could not be greater than" />
      </div>
    );
  }
}
export default TextFieldDemo;
