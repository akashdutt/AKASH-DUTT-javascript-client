import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {
  AddDialog,
  TraineeTable,
  EditDialog,
  RemoveDialog,
} from './Components';
import trainee from './data/trainee';
import callApi from '../../libs/utils/api';

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listValue: '',
      open: false,
      editDialog: false,
      removeDialog: false,
      order: 'desc',
      orderBy: '',
      page: 0,
      data: '',
      limit: 10,
      skip: 0,
      loading: true,
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

  handleChangePage = (event, pages) => {
    this.setState({
      loading: true,
      page: pages,
      limit: 10,
      skip: 10 * pages + 1,
    });
  };

  handleRemoveDialogOpen = (value) => {
    this.setState({ removeDialog: true, data: value });
  }

RemoveDialogSubmit = (data) => {
  console.log('Data Deleted', data);
  this.setState({ removeDialog: false, data });
};

EditDialogSubmit = (...data) => {
  this.setState({ editDialog: false, data });
  console.log(data);
};

  handleRemoveDialogClose = () => {
    this.setState({ removeDialog: false, data: '' });
  }

  handleEditDialogOpen = (value) => {
    this.setState({ editDialog: true, data: value });
  }

  handleEditDialogClose = () => {
    this.setState({ editDialog: false, data: '' });
  }

  render() {
    const {
      open,
      order,
      orderBy,
      page,
      editDialog,
      removeDialog,
      data,
      limit,
      skip,
      listValue,
      loading,
    } = this.state;
    callApi({ limit, skip }, '/trainee', 'get').then((response) => {
      this.setState({
        listValue: response.data.data.records,
        loading: false,
      });
    });
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
        {
          (data) ? (
            <>
              <RemoveDialog
                open={removeDialog}
                data={data}
                onSubmit={this.RemoveDialogSubmit}
                onClose={this.handleRemoveDialogClose}
              />
              <EditDialog
                open={editDialog}
                data={data}
                onSubmit={this.EditDialogSubmit}
                onClose={this.handleEditDialogClose}
              />
            </>
          ) : ''
        }
        <TraineeTable
          id="id"
          data={listValue || trainee}
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
          actions={[
            {
              icon: <EditIcon style={{ fontSize: 20 }} />,
              handler: this.handleEditDialogOpen,
            },
            {
              icon: <DeleteIcon style={{ fontSize: 20 }} />,
              handler: this.handleRemoveDialogOpen,
            },
          ]}
          order={order}
          orderBy={orderBy}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
          count={100}
          page={page}
          dataLength={listValue.length}
          loading={loading}
          rowsPerPage={10}
          onChangePage={this.handleChangePage}
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
