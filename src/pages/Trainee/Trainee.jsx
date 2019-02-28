import React, { Component } from 'react';
import {
  BrowserRouter as Route, Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import TraineeList from './TraineeList';
import TraineeDetail from './TraineeDetail';

class Trainee extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { match } = this.props;
    console.log(match);
    return (
      <Switch>
        <Route exact path={`${match.path}`} component={TraineeList} />
        <Route exact path={`${match.path}/:id`} component={TraineeDetail} />
      </Switch>
    );
  }
}
Trainee.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};
export default Trainee;
