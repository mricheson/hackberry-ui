import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DatePicker from 'react-date-picker'
import Timesheet from './components/Timesheet';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateSelected: null,
      timesheets: null
    };

    this.onDateChange = this.onDateChange.bind(this);
  }

  componentWillMount()
  {
    console.log('mounting');
    this.onDateChange(new Date())
  }

  onDateChange(newDate) {
    console.log(newDate);
    fetch(`https://hackberry-spring.herokuapp.com/time?date=${newDate.toISOString().split('T')[0]}`)
      .then(r => r.json())
      .then(j => {console.log(j);this.setState({ timesheets: j })});
    this.setState({dateSelected : newDate});
  }

  render() {
    return (
      <div>
        <DatePicker
          value={this.state.dateSelected}
          onChange={this.onDateChange} />
        {this.state.timesheets ? <Timesheet value={this.state.timesheets} /> : <div>Loading</div>}
      </div>
    );
  }
}

export default App;
