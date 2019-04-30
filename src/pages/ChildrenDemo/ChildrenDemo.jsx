import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import Math from '../../components';

class ChildrenDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Math first={5} second={7} operator="+">
          {(first, second, operator, result) => (
            <div>
              <Typography>
                {first}
                {operator}
                {second}
                {'='}
                {result}
              </Typography>
            </div>
          )}
        </Math>
        <Math first={8} second={7} operator="-">
          {(first, second, operator, result) => (
            <div>
              <Typography>
                {first}
                {operator}
                {second}
                {'='}
                {result}
              </Typography>
            </div>
          )}
        </Math>
        <Math first={45} second={9} operator="/">
          {(first, second, operator, result) => (
            <div>
              <Typography>
                {first}
                {operator}
                {second}
                {'='}
                {result}
              </Typography>
            </div>
          )}
        </Math>
        <Math first={45} second={0} operator="/">
          {(first, second, operator, result) => (
            <div>
              <Typography>
                {first}
                {operator}
                {second}
                {'='}
                {result}
              </Typography>
            </div>
          )}
        </Math>
        <Math first={5} second={6} operator="*">
          {(first, second, operator, result) => (
            <div>
              <Typography>
                {first}
                {operator}
                {second}
                {'='}
                {result}
              </Typography>
            </div>
          )}
        </Math>
        <Math first={4} second={8} operator="^">
          {(first, second, operator, result) => (
            <div>
              <Typography>
                {first}
                {operator}
                {second}
                {'='}
                {result}
              </Typography>
            </div>
          )}
        </Math>
      </>
    );
  }
}
export default ChildrenDemo;
