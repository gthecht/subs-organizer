import React from 'react';

class PickLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      unSyncedNumber: ""
      syncedNumber: ""
    }
  }

  updateUnsyncedNumber = (event) => {
    this.setState({ unSyncedNumber: event.target.value });
  }

  updateSyncedNumber = (event) => {
    this.setState({ syncedNumber: event.target.value });
  }

  render() {
    return (
      <div className="line-window">
        <h2 className="line-name">{ this.state.name + ":" }</h2>
        <textarea
          className="line-number"
          onChange={this.updateUnsyncedNumber}
          value={this.state.unSyncedNumber}
          placeholder={this.state.name}
          rows="1"
        >
        </textarea>
        <textarea
          className="line-number"
          onChange={this.updateSyncedNumber}
          value={this.state.syncedNumber}
          placeholder={this.state.name}
          rows="1"
        >
        </textarea>
        <p className="description">
          Write the numbers of two rows of subtitles that should be at the same time, one from the unsynced subs, and the other from the synced subs
        </p>
      </div>
    )
  }
}

export default PickLine;
