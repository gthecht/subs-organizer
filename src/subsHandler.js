import React from 'react';

class SubsHandler extends React.Component {
  constructor(props) {
    super(props);
  }

  updateText = (event) => {
    this.props.changeFunction(event)
  }

  render() {
    return (
      <div className="subs-window">
        <h2 className="title">{ this.props.title + ":" }</h2>
        <textarea
          className="subs-box"
          onChange={this.updateText}
          value={this.props.text}
          placeholder={this.props.placeholder}
          rows="10"
        >
        </textarea>
        <p className="subs-window-description">{this.props.placeholder}</p>
      </div>
    )
  }
}

export default SubsHandler;
