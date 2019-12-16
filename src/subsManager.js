import React from 'react';
import SubsHandler from './subsHandler';
import PickLine from './pickLine';
import SRT from './srt';

const Time = {
  str2Num: (timeStr) => {
    let timeList = timeStr.split(":");
    timeList = [Number(timeList[0]), Number(timeList[1]), Number(timeList[2].replace(",", "."))];
    return 60**2 * timeList[0] + 60 * Number(timeList[1]) + timeList[2];
  },

  num2Str: (timeNum) => {
    let timeList = [Math.floor(timeNum / 60**2).toString()];
    let remainder = timeNum % 60**2;
    timeList.push(Math.floor(remainder / 60).toString());
    timeList.push((Math.round(1000 * (remainder % 60)) / 1000).toString());
    let timeStr = timeList.join(":").replace(".", ",");
    return timeStr;
  }
}

class SubsManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messedUp: "",
      decoded: "",
      goodLooking: "",
      lines: [0, 0, 0, 0],
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

  goodLookingUpdate = (event) => {
    this.setState({ goodLooking: event.target.value });
  }
  
  line1Update= (boxType, event) => {
    return this.linesUpdate.call(null, 0, boxType, event);
  }
  
  line2Update= (boxType, event) => {
    return this.linesUpdate.call(null, 1, boxType, event);
  }
  
  linesUpdate = (lineNum, boxType, event) => {
    let newLines = this.state.lines.slice();
    if (boxType === "unsync") {
      newLines[2 * lineNum + 0] = Number(event.target.value);
      this.setState({ lines: newLines })
    } else if (boxType === "sync") {
      newLines[2 * lineNum + 1] = Number(event.target.value);
      this.setState({ lines: newLines })
    }

    if (!newLines.includes(0)) {
      this.outputUpdate(newLines);
    }
  }
  
  outputUpdate = async (lines) => {
    try {
      let decodedObj = await SRT.parse(this.state.decoded);
      let goodObj = await SRT.parse(this.state.goodLooking);
      let timeTransform =await this.getTimeTransform(lines, decodedObj, goodObj);
      let syncedDecodedObj = await this.syncSubs(decodedObj, timeTransform);
      let output = await SRT.stringify(syncedDecodedObj);
      this.setState({ output: output });
    } catch {
      this.setState({ output: "ERROR: something's not right with your input" });
    }
  }

  getTimeTransform = (lines, decodedObj, goodObj) => {
    let badTime = [Time.str2Num(decodedObj[lines[0] - 1].startTime), Time.str2Num(decodedObj[lines[2] - 1].startTime)];
    let goodTime = [Time.str2Num(goodObj[lines[1] - 1].startTime), Time.str2Num(goodObj[lines[3] - 1].startTime)];
    let slope = (goodTime[1] - goodTime[0]) / (badTime[1] - badTime[0])
    let intersect = goodTime[1] - slope * badTime[1];
    return (time) => {
      return slope * time + intersect;
    }
  }
  
  syncSubs = (decodedObj, timeTransform) => {
    let syncedSubs = decodedObj.slice();
    syncedSubs.map((sub) => {
      sub.startTime = Time.num2Str(timeTransform(Time.str2Num(sub.startTime)));
      sub.endTime = Time.num2Str(timeTransform(Time.str2Num(sub.endTime)));
      return sub;
    })
    return syncedSubs;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="title">SubZero: Sort out your Subtitles</h1>
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
            changeFunction={this.goodLookingUpdate}
          />
        </div>
        <div className="line-pick-window">
          <div className="pick-one-line">
            <p className="line-pick-description">
              Write the numbers of two rows of subtitles that should be at the same time, one from the unsynced subs, and the other from the synced subs
            </p>
            <PickLine
              name={"beginning line"}
              unSyncedNumber={this.state.lines[0][0]}
              syncedNumber={this.state.lines[0][1]}
              changeFunction={this.line1Update}
              />
            <PickLine
              name={"finnishing line"}
              unSyncedNumber={this.state.lines[1][0]}
              syncedNumber={this.state.lines[1][1]}
              changeFunction={this.line2Update}
            />
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
