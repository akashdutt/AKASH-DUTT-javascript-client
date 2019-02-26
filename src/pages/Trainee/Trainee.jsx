import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { AddDialog } from './Components';
import { Navbar } from '../components';

class Trainee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }


  handleClickOpen = (...value) => {
    this.setState({ open: false });
    console.log(...value);
  };

  handleClickButton = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false }, () => {
    });
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        <Navbar />
        <Button style={{ margin: 10 }} variant="outlined" color="primary" onClick={this.handleClickButton}>
          ADD TRAINEE
        </Button>
        <AddDialog
          open={open}
          onClose={this.handleClose}
          onSubmit={this.handleClickOpen}
        />
      </div>
    );
  }
}
export default Trainee;
