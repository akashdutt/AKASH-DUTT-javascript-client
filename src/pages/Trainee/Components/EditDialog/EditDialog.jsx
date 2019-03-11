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
import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Email';
import Person from '@material-ui/icons/Person';
import * as yup from 'yup';
import FormHelperText from '@material-ui/core/FormHelperText';
import { SnackbarConsumer } from '../../../../contexts';
import callApi from '../../../../libs/utils/api';

const propType = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  data: PropTypes.objectOf(PropTypes.object),
};
const defaultProps = {
  open: false,
  data: {},
  onClose: () => {},
  onSubmit: () => {},
};
const schema = yup.object().shape({
  name: yup.string().required('Name is a required field'),
  email: yup
    .string()
    .email()
    .required(),
});


const styles = theme => ({
  superContainer: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  error: {
    color: 'red',
  },
});
class EditDialog extends Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    const { name, email } = data;
    this.state = {
      name,
      email,
      error: {
        name: '',
        email: '',
      },
      touched: false,
      hasError: false,
    };
  }

  validate = (value) => {
    const {
      name,
      email,
      error,
      hasError,
    } = this.state;
    schema.validate({
      name,
      email,
    }, { abortEarly: false })
      .then(() => {
        this.setState({
          error: { ...error, [value]: '' },
          hasError: false,
          touched: true,
        });
      })
      .catch((err) => {
        err.inner.forEach((errors) => {
          if (errors.path === value) {
            this.setState({
              error: { ...error, [value]: errors.message },
              hasError: true,
              touched: false,
            });
          }
        });
        if (!err.inner.some(errors => errors.path === value) && hasError[value]) {
          this.setState({
            error: { ...error, [value]: '' },
            hasError: true,
            touched: false,
          });
        }
      });
  }

  hasError = () => {
    const { hasError, touched } = this.state;
    let ifError = false;
    if ((hasError === false) && (touched === true)) {
      ifError = true;
    } else {
      ifError = false;
    }
    return ifError;
  }

  forBlur =(value) => {
    this.validate(value);
  }

  handleChange = prop => (event) => {
    this.setState({
      [prop]: event.target.value,
    }, () => this.validate(prop));
  }

handleApiEdit = async (E, openSnackbar) => {
  E.preventDefault();
  const { data } = this.props;
  const { name, email } = this.state;
  const { _id } = data;
  console.log('>', name, email, _id, '<');
  const valueToEdit = { id: _id, name, email };
  const response = await callApi(valueToEdit, '/trainee', 'put');
  if (response.data.status) {
    openSnackbar('Successfully Updated', 'success');
  } else {
    openSnackbar('not updated', 'error');
  }
  console.log(response);
}

render() {
  const {
    name,
    email,
    error,
  } = this.state;
  const {
    classes,
    onSubmit,
    onClose,
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
            <DialogTitle id="alert-dialog-title">Edit Trainee</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Enter Your Trainee Details
              </DialogContentText>
              <form className={classes.superContainer} noValidate autoComplete="off">
                <TextField
                  id="outlined-full-width"
                  label="Name"
                  fullWidth
                  error={Boolean(error.name || '')}
                  onChange={this.handleChange('name')}
                  onBlur={() => this.forBlur('name')}
                  margin="normal"
                  variant="outlined"
                  value={name}
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
                  label="Email Address"
                  fullWidth
                  error={Boolean(error.email || '')}
                  onChange={this.handleChange('email')}
                  onBlur={() => this.forBlur('email')}
                  type="email"
                  name="email"
                  value={email}
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
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="primary" autoFocus>
              Cancel
              </Button>
              { this.hasError() ? (
                <Button onClick={(E) => { this.handleApiEdit(E, openSnackbar); onSubmit(name, email); }} color="primary" autoFocus>
              Submit
                </Button>
              ) : (
                <Button color="primary" autoFocus disabled>
              Submit
                </Button>
              )}
            </DialogActions>
          </Dialog>
        </div>
      )}
    </SnackbarConsumer>
  );
}
}
EditDialog.propTypes = propType;
EditDialog.defaultProps = defaultProps;
export { EditDialog };
export default withStyles(styles)(EditDialog);
