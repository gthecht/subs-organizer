import React from 'react';
import './subsHandler.css'
class SubsHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      title: props.title
    }
  }

  updateText = (event) => {
    this.setState({ text: event.target.value });
  }

  render() {
    return (
      <div className="subs-window">
        <h2 className="file-path">{ this.state.title + ":" }</h2>
        <textarea
          className="subs-box"
          onChange={this.updateText}
          value={this.state.text}
          placeholder="copy your subtitles to here"
          rows="10"
        >
        </textarea>
      </div>
    )
  }
}

export default SubsHandler;
