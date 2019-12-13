import React from 'react';
import SubsHandler from './subsHandler';
import PickLine from './pickLine';

class SubsManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messedUp: "",
      decoded: "",
      goodLooking: "",
      lines: [[0,0], [0,0]],
      output: ""
    }
  }

  messedUpdate = (event) => {
    this.setState({ messedUp: event.target.value });
    this.decodedUpdate(event.target.value);
  }
  
  decodedUpdate = (event) => {    
    if(typeof(event) === "string") {
      this.setState({ decoded:  this.decodeGibberish(event) });
    } else {
      this.setState({ decoded: event.target.value });
    }
  }
  
  decodeGibberish = (gibberish) => {
    let lettersDict = [
      ["à", "א"],
      ["á", "ב"],
      ["â", "ג"],
      ["ã", "ד"],
      ["ä", "ה"],
      ["å", "ו"],
      ["æ", "ז"],
      ["ç", "ח"],
      ["è", "ט"],
      ["é", "י"],
      ["ë", "כ"],
      ["ê", "ך"],
      ["ì", "ל"],
      ["î", "מ"],
      ["í", "ם"],
      ["ð", "נ"],
      ["ï", "ן"],
      ["ñ", "ס"],
      ["ò", "ע"],
      ["ô", "פ"],
      ["ó", "ף"],
      ["ö", "צ"],
      ["õ", "ץ"],
      ["÷", "ק"],
      ["ø", "ר"],
      ["ù", "ש"],
      ["ú", "ת"]
    ];

    let decoded = gibberish.slice();
    for (let index in lettersDict) {
      decoded = decoded.split(lettersDict[index][0]).join(lettersDict[index][1]);
    }
    return decoded;
  }
  
  linesUpdate = (event) => {
  }
  
  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="title">Sort out your Subtitles</h1>
        </header>
        <div className="input-window">
          <SubsHandler
            title={"Messed up subtitles"}
            text={this.state.messedUp}
            placeholder={"Copy your messed up subtitles to here."}
            changeFunction={this.messedUpdate}
            />
            <SubsHandler
            title={"Decoded subtitles"}
            text={this.state.decoded}
            placeholder={"Here will be the good-looking subtitles, but the have not yet been synchronized."}
            changeFunction={this.decodedUpdate}
            />
          <SubsHandler
            title={"Good-looking subtitles"}
            text={this.state.goodLooking}
            placeholder={"Copy your good subtitles to here meaning the synced subs,"}
            changeFunction={() => {}}
          />
        </div>
        <div className="line-pick-window">
          <div className="pick-one-line">
            <p className="line-pick-description">
              Write the numbers of two rows of subtitles that should be at the same time, one from the unsynced subs, and the other from the synced subs
            </p>
            <PickLine name={"beginning line"} />
            <PickLine name={"finishing line"} />
          </div>
        </div>
        <div className="output-window">
          <h1 className="output-title">Synced output</h1>
          <textarea
            className="output-text-box"
            value={this.state.output}
            placeholder="final output"
            rows="10"
          >
          </textarea>
        </div>
      </div>
    );
  }
}

export default SubsManager;
