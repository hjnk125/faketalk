import React, { createContext, useEffect, useMemo, useState } from 'react';
import './App.scss';
import Chat from './Chat';
import Setting from './Setting';
import defaultPic from './defaultPic.jpg';

function App() {
  const [name, setName] = useState("");
  const [pic, setPic] = useState(defaultPic);

  useEffect(() => {
    console.log("App name:", name);
    // console.log("App pic:", pic);
  })

  return (
    <div className="App">
      <Chat name={name} pic={pic} />
      <Setting setName={setName} setPic={setPic} />
    </div>
  );
}

export default App;
