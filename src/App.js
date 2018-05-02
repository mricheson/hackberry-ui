import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DatePicker from 'react-date-picker'
import Timesheet from './components/Timesheet';
import { SyncLoader } from 'react-spinners';
import html2pdf from 'html2pdf.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateSelected: null,
      attendanceReport: null
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.printDocument = this.printDocument.bind(this);
  }

  printDocument() {
    const input = document.getElementById('divToPrint');
    html2pdf(input, {
      margin: [.25, .75, .75, .75],
      filename: `attendance-${this.state.dateSelected.toISOString().split('T')[0]}_${new Date().toISOString()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { dpi: 192, letterRendering: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    });
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
      <div>
        <div id="divToPrint" >
          <div className="container">
            <div className="d-flex justify-content-between align-self-center">
              <div />
              <DatePicker className="m-3"
                value={this.state.dateSelected}
                onChange={this.onDateChange}
                clearIcon={null} />

              <button type="button" className="btn btn-link" data-html2canvas-ignore onClick={this.printDocument} aria-label="Download as PDF">
                <i className="fas fa-download"></i>
              </button>

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
        </div>
      </div >
    );
  }
}

export default App;
