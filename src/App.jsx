import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import theme from './theme';
import {
  Login, Trainee, NoMatch, TextFieldDemo, ChildrenDemo, InputDemo,
} from './pages';
import { PrivateRoute, AuthRoute } from './routes';

const App = () => (

  <MuiThemeProvider theme={theme}>
    <Typography>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/trainee" />
          </Route>
          <PrivateRoute exact path="/trainee" component={Trainee} />
          <PrivateRoute exact path="/textfield-demo" component={TextFieldDemo} />
          <PrivateRoute exact path="/input-demo" component={InputDemo} />
          <PrivateRoute exact path="/children-demo" component={ChildrenDemo} />
          <AuthRoute path="/login" component={Login} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </Typography>
  </MuiThemeProvider>
);
export default App;
