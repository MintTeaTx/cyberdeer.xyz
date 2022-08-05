import React from 'react';
export class Entry extends React.Component {

  render() {
    console.log(this.props.text);
    return (
      <div>{this.props.text}</div>
    );
  }

}
