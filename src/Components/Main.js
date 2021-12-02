import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import Checklist from "./Checklist";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Intro from "./Intro";
import Cluedo from "./Cluedo/Cluedo";
import Clues from "./Clues/Clues";
import { useSettings } from "./context/useSettings";
import axios from 'axios'

export const CluesContext = React.createContext();

export const Main = () => {
  const { settings, setSettings } = useSettings();
  const [clues, setClues] = useState();

  useEffect(() => {
    setSettings({
      baseURL: process.env.REACT_APP_BASE_URL,
      url: {
        new: process.env.REACT_APP_URL_NEW,
        clues: process.env.REACT_APP_URL_CLUES,
        suggest: process.env.REACT_APP_URL_SUGGEST,
        accuse: process.env.REACT_APP_URL_ACCUSE,
      },
      auth: {
        username: process.env.REACT_APP_USERNAME,
        password: process.env.REACT_APP_PASSWORD,
      },
      clueTypes: {
        suspect: process.env.REACT_APP_SUSPECT,
        weapon: process.env.REACT_APP_WEAPON,
        room: process.env.REACT_APP_ROOM,
      },
    });
  }, [setSettings]);

  useEffect(() => {
    if (settings) {
        axios.get(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_URL_CLUES , {auth: settings.auth})  
        .then(response => { 
          //console.log(response.data)
          setClues(response.data)
             
        })  
        .catch((error) => console.log(error)  
        )}
  }, [settings]);

  return (
    <Router>
      <div className="App">
        <h1>Hack The Future</h1>
        <div className={"panel-1"}>
          <Menu />
          <Checklist />
        </div>
        <div className={"panel-2"}>
          <CluesContext.Provider value={clues}>
            <Switch>
              <Route path={["/", "/intro"]} exact render={() => <Intro />} />
              <Route path="/cluedo" render={() => <Cluedo />} />
              <Route path="/clues" render={(clues) => <Clues />} />
            </Switch>
          </CluesContext.Provider>
        </div>
      </div>
    </Router>
  );
};