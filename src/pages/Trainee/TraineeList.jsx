import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { AddDialog } from './Components';
import trainee from './data/trainee';

class TraineeList extends Component {
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
    const listItem = trainee.map(element => (
      <li>
        <Link component={RouterLink} to={`/trainee/${element.id}`}>{element.name}</Link>
      </li>
    ));
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickButton}>
          ADD TRAINEELIST
        </Button>
        <AddDialog
          open={open}
          onClose={this.handleClose}
          onSubmit={this.handleClickOpen}
        />
        <ul>
          {listItem}
        </ul>
      </div>
    );
  }
}
export default TraineeList;
