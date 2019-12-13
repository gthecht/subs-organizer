import React from 'react';
import SubsHandler from './subsHandler';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Organize your subtitles</h1>
      </header>
      <div className="input-window">
          <SubsHandler
            title={"Hebrew subtitles"}
          />
          <SubsHandler
            title={"Good subtitles"}
          />
      </div>
    </div>
  );
}

export default App;
