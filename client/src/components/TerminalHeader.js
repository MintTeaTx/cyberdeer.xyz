import React from 'react';


export class TerminalHeader extends React.Component {

  state = {
    last: "",
    title: "welcome to toxic's home on the net"
  }

  render() {
    return (
      <div className="terminal-head">
        <div>{this.state.title}</div>
      </div>
    );
  }

}
