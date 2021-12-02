import React from "react";
import {useSettings} from "../context/useSettings";
import Button from "../Button";
import axios from "axios"

/*
   CLUEDO START
   ------------
   In dit component moet je een nieuw spel genereren via de api.
   Geef de nieuwe gameKey mee aan de onStart functie (zie props).
*/

const CluedoStart = ({ onStart }) => {
  const { settings } = useSettings();

  const startGame = () => {
    console.log(settings.auth)
    axios.get('https://htf-2021.calibrate.be/api/cluedo/new-game', {auth: settings.auth})
      .then(response => {
          console.log(response.data.key)
          onStart(response.data.key)
      })
      .catch(error => {
        "Er ging iets mis."
      })
  };

  return (
    <div className={"file full"}>
      <h2>Cluedo</h2>
      <Button onClick={startGame} value="Start een nieuw spel" />
    </div>
  );
};

export default CluedoStart;
