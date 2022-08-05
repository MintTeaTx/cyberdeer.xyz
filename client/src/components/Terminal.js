import React from 'react';
import './terminal.scss';
import {TerminalHeader} from "./TerminalHeader";
import {TerminalBody} from "./TerminalBody";

const SERVER = "http://localhost:8081";


export class Terminal extends React.Component {

  state = {
    entries:[
      {
        text:"hi!!!"
      }
    ]
      }

  componentDidMount()
  {
    fetch('/index')
      .then(response => response.json())
      .then(data => {
        this.setState({data:data});
      });
  }
  render() {
    console.log(this.state.data);
    return (
      <div className="terminal">
        <TerminalHeader />
        <TerminalBody data={this.state.data}/>
      </div>
    );
  }

}
