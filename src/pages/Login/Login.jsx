import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Email';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import * as yup from 'yup';

const schema = yup.object().shape({
  emailAddress: yup
    .string()
    .email()
    .required(),
  password: yup.string()
    .required('No password provided.'),
});


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  error: {
    color: 'red',
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      showPassword: false,
      password: '',
      error: {
        emailAddress: '',
        password: '',
      },
      touched: {
        emailAddress: false,
        password: false,
      },
      hasError: {
        emailAddress: false,
        password: false,
      },
    };
  }

  validate = (value) => {
    const {
      emailAddress,
      password,
      error,
      hasError,
    } = this.state;
    schema.validate({
      emailAddress,
      password,
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
    const { touched } = this.state;
    this.setState({
      [prop]: event.target.value,
      touched: { ...touched, [prop]: true },
    }, () => this.validate(prop));
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const {
      showPassword,
      emailAddress,
      password,
      error,
    } = this.state;
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form}>
            <TextField
              id="outlined-email-input"
              label="Email"
              fullWidth
              error={Boolean(error.emailAddress || '')}
              onChange={this.handleChange('emailAddress')}
              onBlur={() => this.forBlur('emailAddress')}
              value={emailAddress}
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
            <FormHelperText className={classes.error}>{error.emailAddress}</FormHelperText>
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
            {this.hasError() ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
              Sign in
              </Button>
            )
              : (
                <Button
                  disabled
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
            Sign in
                </Button>
              )
            }
          </form>
        </Paper>
      </main>
    );
  }
}
Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};
export { Login };
export default withStyles(styles)(Login);
