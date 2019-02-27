import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


const styles = {
  root: {
    textAlign: 'center',
    margin: 150,
  },
};

class NoMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <div className={classes.root}>
          <Typography component="h1" variant="h2" color="inherit" fontWeight="fontWeightLight" m={1} gutterBottom>
        Not Found
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
        Seems like the page you are looking for after does not exist
          </Typography>
        </div>
      </>
    );
  }
}
NoMatch.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};
export { NoMatch };
export default withStyles(styles)(NoMatch);
