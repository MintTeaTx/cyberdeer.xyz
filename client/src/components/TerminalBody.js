import React from 'react';
import {Entry} from './Entry';

export class TerminalBody extends React.Component {

  render() {
    let list = "nothing found";

    if (this.props.data) {
      list = this.props.data.map(e =>
        <Entry
        key={e}
        text = {e}
        />
      );
    }

    return ( <div className = "terminal-body" >
      {list}
      </div>
    );
  }

}
