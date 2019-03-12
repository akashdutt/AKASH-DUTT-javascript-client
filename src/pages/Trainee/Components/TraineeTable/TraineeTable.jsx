import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    cursor: 'pointer',
  },
});
class TraineeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createSortHandler = property => (event) => {
    const { onSort } = this.props;
    onSort(event, property);
  };

  render() {
    const {
      classes,
      id,
      data,
      columns,
      order,
      orderBy,
      onSelect,
    } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table} key={id} onRowSelection={onSelect}>
          <TableHead>
            <TableRow>
              {columns.map(Tcell => (
                <TableCell
                  key={Tcell.field}
                  align={Tcell.align}
                  sortDirection={orderBy === Tcell.field ? order : false}
                >
                  <Tooltip
                    title="Sort"
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={orderBy === Tcell.field}
                      direction={order}
                      onClick={this.createSortHandler(Tcell.field)}
                    >
                      {Tcell.label}
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              ), this)}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(trainee => (
              <TableRow
                key={trainee.id}
                className={classes.row}
                onClick={() => onSelect(trainee.id)}
                hover
              >
                {
                  columns.map(Tcell => (
                    <TableCell key={Tcell.field} align={Tcell.align}>
                      {Tcell.format ? Tcell.format(trainee[Tcell.field]) : trainee[Tcell.field]}
                    </TableCell>
                  ))
                }
              </TableRow>

            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
TraineeTable.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  columns: PropTypes.objectOf(PropTypes.object),
  data: PropTypes.objectOf(PropTypes.object),
  id: PropTypes.string,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  onSelect: PropTypes.func,
  onSort: PropTypes.func,
};
TraineeTable.defaultProps = {
  columns: [],
  data: [],
  id: '',
  order: '',
  orderBy: '',
  onSelect: () => {},
  onSort: () => {},
};
export default withStyles(styles)(TraineeTable);
