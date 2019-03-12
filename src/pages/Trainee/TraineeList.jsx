import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import PropTypes from 'prop-types';
import { AddDialog, TraineeTable } from './Components';
import trainee from './data/trainee';

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      order: 'desc',
      orderBy: '',
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

  getDateFormatted = date => (moment(date).format('LLLL'));

handleSelect = (check) => {
  const { history } = this.props;
  history.push(`trainee/${check}`);
};

  handleSort = (event, property) => {
    const orderByChange = property;
    let orderChange = 'asc';
    const { order, orderBy } = this.state;
    if (orderBy === property && order === 'asc') {
      orderChange = 'desc';
    }

    this.setState({ order: orderChange, orderBy: orderByChange });
  };

  render() {
    const { open, order, orderBy } = this.state;
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
        <TraineeTable
          id="id"
          data={trainee}
          columns={[{
            field: 'name',
            label: 'Name',
            align: 'center',
          }, {
            field: 'email',
            label: 'Email Address',
            format: value => value && value.toUpperCase(),
          },
          {
            field: 'createdAt',
            label: 'Date',
            align: 'right',
            format: this.getDateFormatted,
          }]}
          order={order}
          orderBy={orderBy}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
        />
      </div>
    );
  }
}
TraineeList.propTypes = {
  history: PropTypes.objectOf(PropTypes.object),
};
TraineeList.defaultProps = {
  history: {},
};
export default TraineeList;
