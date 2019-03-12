import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { SnackbarConsumer } from '../../../../contexts';

class RemoveDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      open, onClose, onSubmit, data,
    } = this.props;
    const traineeDate = '2019-02-14T18:15:11.778Z';
    return (
      <SnackbarConsumer>
        {({ openSnackbar }) => (
          <div>
            <Dialog
              open={open}
              onClose={onClose}
              fullWidth
              maxWidth="md"
              aria-labelledby="Remove-dialog-title"
              aria-describedby="Remove-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Remove Trainee</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
              Do You Really Want To Remove The Trainee?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose} color="primary">
              CANCEL
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    onSubmit(data);
                    if (data.createdAt >= traineeDate) {
                      openSnackbar('Successfully Deleted', 'success');
                    } else {
                      openSnackbar('Cannot Delete', 'error');
                    }
                  }}
                  color="primary"
                >
              DELETE
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </SnackbarConsumer>
    );
  }
}
RemoveDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  data: PropTypes.objectOf(PropTypes.object),
};
RemoveDialog.defaultProps = {
  onClose: () => {},
  onSubmit: () => {},
  data: '',
};
export default RemoveDialog;
