import React from 'react';

class PickLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      unSyncedNumber: "",
      syncedNumber: "",
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
        <div className="line-pick-box">
          <textarea
            className="line-input"
            onChange={this.updateUnsyncedNumber}
            value={this.state.unSyncedNumber}
            placeholder="unsynced line number"
            rows="1"
          >
          </textarea>
          <textarea
            className="line-input"
            onChange={this.updateSyncedNumber}
            value={this.state.syncedNumber}
            placeholder="synced line number"
            rows="1"
          >
          </textarea>
        </div>
      </div>
    )
  }
}

export default PickLine;
