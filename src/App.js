import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DatePicker from 'react-date-picker'
import Timesheet from './components/Timesheet';
import { SyncLoader } from 'react-spinners';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateSelected: null,
      attendanceReport: null
    };

    this.onDateChange = this.onDateChange.bind(this);
  }

  componentWillMount() {
    this.onDateChange(new Date())
  }

  onDateChange(newDate) {
    console.log(newDate);
    this.setState({ dateSelected: newDate, attendanceReport: null });
    fetch(`https://hackberry-api-dev.herokuapp.com/time?date=${newDate.toISOString().split('T')[0]}`)
      .then(r => r.json())
      .then(j => { console.log(j); this.setState({ attendanceReport: j }) });
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <DatePicker className="m-3"
            value={this.state.dateSelected}
            onChange={this.onDateChange}
            clearIcon={null} />
        </div>
        <div className="row">
          <Timesheet loading={!this.state.attendanceReport} attendanceReport={this.state.attendanceReport} />
        </div>
        <div className="row justify-content-center m-5">
          <SyncLoader
            color={'#123abc'}
            size={10}
            height={10}
            margin={'15px'}
            loading={!this.state.attendanceReport}
          />
        </div>
      </div>
    );
  }
}

export default App;
