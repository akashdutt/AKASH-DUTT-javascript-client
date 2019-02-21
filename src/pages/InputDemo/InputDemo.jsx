import React, { Component } from 'react';
import TextField from '../../components/TextField';
import SelectField from '../../components/SelectField';
import RadioGroup from '../../components/RadioGroup';

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
class InputDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  }

  handleSportChange = (event) => {
    this.setState({
      sport: event.target.value,
    });
  }

  render() {
    const { name, sport } = this.state;
    console.log(name);
    console.log(sport);
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
          <TextField value={name} onChange={this.handleNameChange} />
          <h3>Select the game you play ?</h3>
          <SelectField options={dropdownArr} onChange={this.handleSportChange} />
          { sport
            ? (
              <div>
                <h4>What you do?</h4>
                <RadioGroup options={radio} />
              </div>
            )
            : '' }
        </div>
      </>
    );
  }
}
export default InputDemo;
