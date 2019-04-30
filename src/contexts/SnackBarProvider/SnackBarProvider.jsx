import React, { createContext, Component } from 'react';
import { IconButton, Snackbar } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import PropTypes from 'prop-types';

export const SnackBarContext = createContext();

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

class SnackBarProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      isOpen: false,
      message: '',
    };
  }

  openSnackbar = (message, status) => {
    this.setState({
      message,
      isOpen: true,
      status,
    });
  };

  closeSnackbar = () => {
    this.setState({
      message: '',
      isOpen: false,
    });
  };

  render() {
    const { isOpen, message, status } = this.state;
    const { children, classes } = this.props;
    const Icon = variantIcon[status];
    return (
      <SnackBarContext.Provider
        value={{
          openSnackbar: this.openSnackbar,
          closeSnackbar: this.closeSnackbar,
          snackbarIsOpen: isOpen,
          message,
          status,
        }}
      >
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={isOpen}
          autoHideDuration={6000}
          onClose={this.closeSnackbar}
        >
          <SnackbarContent
            className={classes[status]}
            aria-describedby="client-snackbar"
            message={(
              <span id="client-snackbar" className={classes.message}>
                <Icon className={(classes.icon, classes.iconVariant)} />
                {message}
              </span>
            )}
            action={[
              <IconButton key="close" color="inherit" onClick={this.closeSnackbar}>
                <Close />
              </IconButton>,
            ]}
          />
        </Snackbar>

        {children}
      </SnackBarContext.Provider>
    );
  }
}
SnackBarProvider.propTypes = {
  children: PropTypes.element.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export const SnackbarConsumer = SnackBarContext.Consumer;
export default withStyles(styles)(SnackBarProvider);
