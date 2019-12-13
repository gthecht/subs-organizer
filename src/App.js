import React from 'react';
import SubsHandler from './subsHandler';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Sort out your Subtitles</h1>
      </header>
      <div className="input-window">
          <SubsHandler
            title={"Messed up subtitles"}
            text={""}
            placeholder={"Copy your messed up subtitles to here."}
            />
            <SubsHandler
            title={"Decoded subtitles"}
            text={""}
            placeholder={"Here will be the good-looking subtitles, but the have not yet been synchronized."}
            />
          <SubsHandler
            title={"Good-looking subtitles"}
            text={""}
            placeholder={"Copy your good subtitles to here meaning the synced subs,"}
          />
      </div>
    </div>
  );
}

export default App;
