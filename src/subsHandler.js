import React from 'react';

class SubsHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      text: props.text,
      placeholder: props.placeholder
    }
  }

  updateText = (event) => {
    this.setState({ text: event.target.value });
  }

  render() {
    return (
      <div className="subs-window">
        <h2 className="title">{ this.state.title + ":" }</h2>
        <textarea
          className="subs-box"
          onChange={this.updateText}
          value={this.state.text}
          placeholder={this.state.placeholder}
          rows="10"
        >
        </textarea>
        <p className="subs-window-description">{this.state.placeholder}</p>
      </div>
    )
  }
}

export default SubsHandler;
