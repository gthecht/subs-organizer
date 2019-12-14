import React from 'react';

class PickLine extends React.Component {
  updateUnsyncedNumber = (event) => {
    this.props.changeFunction("unsync", event)
  }

  updateSyncedNumber = (event) => {
    this.props.changeFunction("sync", event)
  }

  render() {
    return (
      <div className="line-window">
        <h2 className="line-name">{ this.props.name + ":" }</h2>
        <div className="line-pick-box">
          <textarea
            className="line-input"
            onChange={this.updateUnsyncedNumber}
            value={this.props.unSyncedNumber}
            placeholder="unsynced line number"
            rows="1"
          >
          </textarea>
          <textarea
            className="line-input"
            onChange={this.updateSyncedNumber}
            value={this.props.syncedNumber}
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
