import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

import './Checker.css';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 0,
    marginBottom: 0,
    fontWeight: 400,
    textAlign: "center"
  }
};

export default class CheckerTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
      text: "",
      priceValue: "Make a search!",
      sentiment: "",
      catalyst: "",
      response: {}
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleChange = (value) => {
    this.setState({value: value});
  };

  handleClick = () => {
    console.log(this.state.text);
    axios.get(`https://api.coinmarketcap.com/v1/ticker/${this.state.text}/`)
      .then(response => this.setState({
        response: response,
        priceValue: `${response["data"][0]["symbol"]}:
          $${response["data"][0]["price_usd"]}
          (${response["data"][0]["percent_change_24h"]}%)`
        })
      );
  }

  handleSave = () => {
  if (this.state.text && this.state.priceValue && this.state.response
    && this.state.sentiment && this.state.catalyst) {
    var jsonBody = JSON.stringify({
      currency: this.state.response["data"][0]["symbol"],
      price: this.state.response["data"][0]["price_usd"],
      sentiment: this.state.sentiment,
      catalyst: this.state.catalyst
    });

    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: jsonBody,
      cors: true, // allow cross-origin HTTP request
      credentials: 'same-origin' // This is similar to XHR’s withCredentials flag
    };

    fetch('http://localhost:3000/checks/', options)
    .then(response => {
      console.log("response", response);
    })
    .catch(error => {
      console.log("error", error);
    })
  } else {
    alert("Missing some forms b");
  }
}

  handleTextChange = (event : object, newValue : string) => {
    this.setState({text: newValue});
  }

  handleSentiment = (event : object, newValue : string) => {
    this.setState({sentiment: newValue});
  }

  handleCatalyst = (event : object, newValue : string) => {
    this.setState({catalyst: newValue});
  }

  render() {
    return (
      <div style={{
        paddingLeft: 20,
        paddingRight: 20
      }}>
        <div>
          <h2 style={styles.headline}>{this.state.priceValue}</h2>
          <TextField onChange={this.handleTextChange} value={this.state.text} id="text-field-default" hintText="E.g. 'Bitcoin' or 'Ethereum'" floatingLabelText="Enter a cryptocurrency"/>
          <TextField onChange={this.handleSentiment} value={this.state.sentiment} id="text-field-default" hintText="E.g. 'It's boppin' or 'Nah b'" floatingLabelText="Enter sentiment"/>
          <TextField onChange={this.handleCatalyst} value={this.state.catalyst} id="text-field-default" hintText="E.g. 'Telegram lit' or 'Reddit fud'" floatingLabelText="Describe catalyst"/>
        </div>

        <div style={{paddingTop: 20}}>
          <RaisedButton
            onClick={this.handleClick}
            label="Search"
            primary={true}
            style={{marginRight: 10}}
          />
          <RaisedButton
            onClick={this.handleSave}
            label="Save"
            primary={true}
            style={{marginRight: 10}}/>
        </div>

      </div>
    )
  }
}
