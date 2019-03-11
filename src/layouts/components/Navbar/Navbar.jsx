import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const styles = {
  logOut: {
    flex: 0.15,
  },
  grow: {
    flexGrow: 1,
  },
  forButton: {
    color: 'white',
    textDecoration: 'none',
  },
  forNav: {
    marginBottom: '25px',
  },
};
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handlerLogout = () => {
    localStorage.removeItem('loginToken');
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.forNav}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
            Trainee Portal
            </Typography>
            <Button color="inherit"><Link to="/trainee" className={classes.forButton}>TRAINEE</Link></Button>
            <Button color="inherit"><Link to="/textfield-demo" className={classes.forButton}>TEXTFIELD DEMO</Link></Button>
            <Button color="inherit"><Link to="/input-demo" className={classes.forButton}> INPUT DEMO</Link></Button>
            <Button color="inherit"><Link to="/children-demo" className={classes.forButton}>CHILDREN DEMO</Link></Button>
            <Button color="inherit" onClick={this.handlerLogout} className={classes.logOut}><Link to="/login" className={classes.forButton}>LOGOUT</Link></Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
Navbar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};
export default withStyles(styles)(Navbar);
