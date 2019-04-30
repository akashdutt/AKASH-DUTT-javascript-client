import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Email from '@material-ui/icons/Email';
import Person from '@material-ui/icons/Person';
import * as yup from 'yup';
import FormHelperText from '@material-ui/core/FormHelperText';
import { CircularProgress, Grid } from '@material-ui/core';
import { SnackbarConsumer } from '../../../../contexts';
import callApi from '../../../../libs/utils/api';

const propType = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
const defaultProps = {
  open: false,
  onClose: () => {},
  onSubmit: () => {},
};
const schema = yup.object().shape({
  name: yup.string().required('Name is a required field'),
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Password must have at least 8 characters , at least one uppercase letter, one lowercase letter and one number'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is a required field'),
});


const styles = theme => ({
  superContainer: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  error: {
    color: 'red',
  },
  spinner: {
    color: 'black',
  },
});
class AddDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showPassword: false,
      showConfirmPassword: false,
      credential: {
        password: '',
        confirmPassword: '',
        name: '',
        email: '',
      },
      error: {
        name: '',
        sport: '',
        password: '',
        confirmPassword: '',
      },
      touched: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
      hasError: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
    };
  }

  validate = (value) => {
    const {
      credential,
      error,
      hasError,
    } = this.state;
    const
      {
        name,
        email,
        password,
        confirmPassword,
      } = credential;
    schema.validate({
      name,
      email,
      password,
      confirmPassword,
    }, { abortEarly: false })
      .then(() => {
        this.setState({
          error: { ...error, [value]: '' },
          hasError: { ...hasError, [value]: false },
        });
      })
      .catch((err) => {
        err.inner.forEach((errors) => {
          if (errors.path === value) {
            this.setState({
              error: { ...error, [value]: errors.message },
              hasError: { ...hasError, [value]: true },
            });
          }
        });
        if (!err.inner.some(errors => errors.path === value) && hasError[value]) {
          this.setState({
            error: { ...error, [value]: '' },
            hasError: { ...hasError, [value]: false },
          });
        }
      });
  }

  hasError = () => {
    const { hasError, touched } = this.state;
    let ifError = false;
    Object.keys(hasError).forEach((element) => {
      if ((hasError[element] === false) && (touched[element] === true)) {
        ifError = true;
      } else {
        ifError = false;
      }
    });
    return ifError;
  }

  forBlur =(value) => {
    this.validate(value);
  }

  handleChange = prop => (event) => {
    const { touched, credential } = this.state;
    this.setState({
      credential: { ...credential, [prop]: event.target.value },
      touched: { ...touched, [prop]: true },
    }, () => this.validate(prop));
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleClickShowConfirmPassword = () => {
    this.setState(state => ({ showConfirmPassword: !state.showConfirmPassword }));
  };

  handleCallApi = async (E, openSnackbar, onSubmit) => {
    E.preventDefault();
    const { credential } = this.state;
    const { confirmPassword, ...rest } = credential;
    this.setState({ loading: true }, () => {});
    const response = await callApi(rest, '/trainee', 'post');
    if (response.data.status) {
      this.setState({
        loading: false,
      });
      openSnackbar('trainee Added', 'success');
    } else {
      openSnackbar('Cannot Add Trainee', 'error');
      this.setState({ loading: false });
    }
    console.log('inside handleCallApi', response);
    const {
      name,
      email,
      password,
    } = credential;
    onSubmit(name, email, password);
  };

renderDialogContent = () => {
  const {
    classes,
  } = this.props;
  const {
    showPassword,
    showConfirmPassword,
    error,
    credential,
  } = this.state;
  const {
    name,
    email,
    password,
    confirmPassword,
  } = credential;
  return (
    <>
      <DialogContentText id="alert-dialog-description">
                Enter Your Trainee Details
      </DialogContentText>
      <form className={classes.superContainer} noValidate autoComplete="off">
        <TextField
          id="outlined-full-width"
          label="Name"
          fullWidth
          value={name}
          error={Boolean(error.name || '')}
          onChange={this.handleChange('name')}
          onBlur={() => this.forBlur('name')}
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
        />
        <FormHelperText className={classes.error}>{error.name}</FormHelperText>
        <TextField
          id="outlined-email-input"
          label="Email"
          fullWidth
          error={Boolean(error.email || '')}
          onChange={this.handleChange('email')}
          onBlur={() => this.forBlur('email')}
          value={email}
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />
        <FormHelperText className={classes.error}>{error.email}</FormHelperText>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <TextField
              id="outlined-password-input"
              label="Password"
              fullWidth
              error={Boolean(error.password || '')}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={this.handleChange('password')}
              onBlur={() => this.forBlur('password')}
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormHelperText className={classes.error}>{error.password}</FormHelperText>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-password-input"
              label="Confirm Password"
              fullWidth
              error={Boolean(error.confirmPassword || '')}
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={this.handleChange('confirmPassword')}
              onBlur={() => this.forBlur('confirmPassword')}
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowConfirmPassword}
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormHelperText
              className={classes.error}
            >
              {error.confirmPassword}
            </FormHelperText>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

renderButtonActions = (openSnackbar) => {
  const {
    loading,
  } = this.state;
  const {
    classes,
    onSubmit,
    onClose,
  } = this.props;
  return (
    <>
      <Button onClick={onClose} color="primary" autoFocus>
              Cancel
      </Button>
      { this.hasError() ? (
        <Button disabled={loading} onClick={(E) => { this.handleCallApi(E, openSnackbar, onSubmit); }} color="primary" autoFocus>
          {!loading
            ? <b>Submit</b>
            : <CircularProgress size={20} className={classes.spinner} />}
        </Button>
      ) : (
        <Button onClick={onSubmit} color="primary" autoFocus disabled>
                  Submit
        </Button>
      )}
    </>
  );
};

render() {
  const {
    open,
  } = this.props;
  return (
    <SnackbarConsumer>
      {({ openSnackbar }) => (
        <div>
          <Dialog
            fullWidth
            maxWidth="md"
            open={open}
            onClose={this.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Add Trainee</DialogTitle>
            <DialogContent>
              {this.renderDialogContent()}
            </DialogContent>
            <DialogActions>
              {this.renderButtonActions(openSnackbar)}
            </DialogActions>
          </Dialog>
        </div>
      )}
    </SnackbarConsumer>
  );
}
}
AddDialog.propTypes = propType;
AddDialog.defaultProps = defaultProps;
export { AddDialog };
export default withStyles(styles)(AddDialog);
