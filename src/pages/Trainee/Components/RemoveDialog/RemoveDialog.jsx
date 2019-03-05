import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
    return (
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
            <Button variant="contained" onClick={() => onSubmit(data)} color="primary">
              DELETE
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default RemoveDialog;
