const SRT = {
  parse: (srtString) => {
    let subsList = srtString.split("\n\n");
    return subsList.map((sub) => {
      let lines = sub.split("\n");
      let times = lines[1].split(" --> ")
      return {
        number: lines[0],
        startTime: times[0],
        endTime: times[1],
        text: lines.slice(2).join("\n")
      }
    })
  },

  stringify: (srtObj) => {
    let subsList = srtObj.map((sub) => {
      let timeLine = sub.startTime + " --> " + sub.endTime;
      return [sub.number, timeLine, sub.text].join("\n");
    })

    return subsList.join("\n\n");
  }
}

module.exports = SRT;