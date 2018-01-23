import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';

import axios from 'axios';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 0,
    marginBottom: 0,
    fontWeight: 400,
    textAlign: "center"
  }
};

class Example extends React.Component {
  render() {
    return (
      <Form>
        <legend>Title</legend>
        <Input placeholder="Input 1" />
        <Input placeholder="Input 2" />
        <Textarea placeholder="Textarea" />
        <Button variant="raised">Submit</Button>
      </Form>
    );
  }
}

export default class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pastChecks: []
    }
  }

  componentWillMount() {
    console.log('will mount', Date.now());
  }

  componentDidMount() {
    console.log('did mount', Date.now());
    axios.get(`http://localhost:3000/checks/`)
      // .then(response => response.json())
      .then(resJson => {
        console.log('resjson', resJson.data);
        this.setState({
          pastChecks: resJson.data
        })
      })
  }

  render() {
    return (
      <div style={{
        paddingLeft: 20,
        paddingRight: 20
      }}>
      <Example />
        <h2 style={styles.headline}>History</h2>
        <div>
        {this.state.pastChecks.map((check, i) => {
          return (
            <div key={i}>
              {check.price}
            </div>
          )
        })}
        </div>
      </div>

    )
  }
}
