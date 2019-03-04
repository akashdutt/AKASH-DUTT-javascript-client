import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  copyRight: {
    textAlign: 'center',
    margin: 30,
  },
};

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <Typography variant="caption" gutterBottom className={classes.copyRight}>
        &copy; Successive Technologies
      </Typography>
    );
  }
}
Footer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};
export default withStyles(styles)(Footer);
