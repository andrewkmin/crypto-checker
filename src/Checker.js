import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

import History from './historyTab.js';
import CheckerTab from './checkerTab.js';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 0,
    marginBottom: 0,
    fontWeight: 400,
    textAlign: "center"
  }
};

export default class Checker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a'
    };
  }

  handleChange = (value) => {
    this.setState({value: value});
  };

  render() {
    return (
      <div style={{
        height: 400,
        width: 400
      }}>
        <Tabs value={this.state.value} onChange={this.handleChange}>
          <Tab label="Check price" value="a">
            <CheckerTab />
          </Tab>

          <Tab label="My History" value="b">
            <History/>
          </Tab>

        </Tabs>

      </div>
    );
  }
}
