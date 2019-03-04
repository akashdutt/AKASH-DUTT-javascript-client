import React, { Component } from 'react';
import * as yup from 'yup';
import {
  Button,
  RadioGroup,
  SelectField,
  TextField,
} from '../../components';

const dropdownArr = [
  { label: 'Cricket', value: 'cricket' },
  { label: 'Football', value: 'football' },
];
const cricketArr = [
  { label: 'Wicket Keeper', value: 'wicketKeeper' },
  { label: 'Batsman', value: 'batsman' },
  { label: 'Bowler', value: 'bowler' },
  { label: 'All Rounder', value: 'allRounder' },
];
const footballArr = [
  { label: 'Defender', value: 'Defender' },
  { label: 'Striker', value: 'Striker' },
];
const schema = yup.object().shape({
  name: yup.string().min(3).required('Name is a required field'),
  sport: yup.string().required('Sport is a required field'),
  radio: yup.string().required('What do you do is a required field'),
});

class InputDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      radio: '',
      error: {
        name: '',
        sport: '',
        radio: '',
      },
      touched: {
        name: false,
        sport: false,
        radio: false,
      },
      hasError: {
        name: false,
        sport: false,
        radio: false,
      },
    };
  }

  handleNameChange = field => (event) => {
    const { touched } = this.state;
    if (field === 'sport') {
      this.setState({
        radio: '',
        [field]: event.target.value,
        touched: { ...touched, radio: false, [field]: true },
      });
    } else {
      this.setState({
        [field]: event.target.value,
        touched: { ...touched, [field]: true },
      }, () => this.validate(field));
    }
  }

  validate = (value) => {
    const {
      name,
      sport,
      radio,
      error,
      hasError,
    } = this.state;
    schema.validate({
      name,
      sport,
      radio,
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
    let check = 0;
    let touchCheck = 0;
    Object.keys(hasError).forEach((element) => {
      if (hasError[element] === false) {
        check += 1;
      }
    });
    Object.keys(touched).forEach((element) => {
      if (touched[element] === true) {
        touchCheck += 1;
      }
    });
    if (check === 3 && touchCheck === 3) {
      return true;
    }
    return false;
  }

  forBlur =(value) => {
    this.validate(value);
  }

  render() {
    const {
      name,
      sport, error,
    } = this.state;
    let radio;
    if (sport === 'cricket') {
      radio = cricketArr;
    } else if (sport === 'football') {
      radio = footballArr;
    }
    return (
      <>
        <div>
          <h3> Name </h3>
          <TextField
            value={name}
            onChange={this.handleNameChange('name')}
            onBlur={() => this.forBlur('name')}
            err={error.name || ''}
          />
          <h3>Select the game you play ?</h3>
          <SelectField
            options={dropdownArr}
            onChange={this.handleNameChange('sport')}
            onBlur={() => this.forBlur('sport')}
            error={error.sport || ''}
          />
          { sport
            ? (
              <>
                {
                  <div>
                    <h4>What you do?</h4>
                    <RadioGroup
                      options={radio}
                      onChange={this.handleNameChange('radio')}
                      onBlur={() => this.forBlur('radio')}
                      error={error.radio || ''}
                    />
                  </div>
                }
              </>
            )
            : '' }
          <div style={{ textAlign: 'right' }}>
            <Button value="Cancel" />
            { this.hasError() ? <Button value="Submit" style={{ backgroundColor: '#20b520', color: 'white' }} /> : <Button value="Submit" disabled />
            }
          </div>
        </div>
      </>
    );
  }
}
export default InputDemo;
