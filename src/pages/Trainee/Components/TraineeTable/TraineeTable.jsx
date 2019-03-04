import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});
class TraineeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      classes,
      id,
      data,
      columns,
    } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table} key={id}>
          <TableHead>
            <TableRow>
              {columns.map(Tcell => (
                <TableCell
                  key={Tcell.field}
                  align={Tcell.align}
                >
                  {Tcell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(trainee => (
              <TableRow key={trainee.id}>
                {
                  columns.map(Tcell => (
                    <TableCell key={Tcell.field} align={Tcell.align}>
                      {trainee[Tcell.field]}
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
};
TraineeTable.defaultProps = {
  columns: [],
  data: [],
  id: '',
};
export default withStyles(styles)(TraineeTable);
