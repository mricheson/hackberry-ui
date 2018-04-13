import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const TSHEETS_TOKEN = 'S.4__5bef0f3becb66d52b38539bea60456fa8a76b06a';
const url = 'https://rest.tsheets.com/api/v1/timesheets?start_date=2018-04-13&end_date=2018-04-13&supplemental_data=yes';
const obj = { json: true, headers: { 'Authorization': `Bearer S.4__5bef0f3becb66d52b38539bea60456fa8a76b06a` } };
fetch(url, obj)
  //.then(result => result.json())
  //.then(r => console.log(r));


class App extends Component {
  constructor(props) {
    super(props);


  }

  render() {


    return (
      <div>
      </div>
    );
  }
}

export default App;
