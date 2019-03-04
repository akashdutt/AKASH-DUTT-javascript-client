import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  logOut: {
    flex: 0.15,
  },
  grow: {
    flexGrow: 1,
  },
};
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
            Trainee Portal
            </Typography>
            <Button color="inherit">Trainee</Button>
            <Button color="inherit">TEXTFIELD DEMO</Button>
            <Button color="inherit">INPUT DEMO</Button>
            <Button color="inherit">CHILDREN DEMO</Button>
            <Button color="inherit" className={classes.logOut}>LOGOUT</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
Navbar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};
export { Navbar };
export default withStyles(styles)(Navbar);
