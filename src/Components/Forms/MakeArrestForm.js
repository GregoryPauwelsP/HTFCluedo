import React from "react";
import { useSettings } from "../context/useSettings";
import { Container, Col, Form, FormGroup, Label, Input } from 'reactstrap'
import Button from "../Button";
import axios from "axios";

/*
   HET ARRESTATIE FORMULIER
   ------------------------
   Maak hier een formulier om een arrestatie te verrichten.
*/

export const MakeArrestForm = ({ gameKey, onArrest }) => {
    const { settings } = useSettings();
    console.log(onArrest)
    const arrestPerson = () => {
      let room = document.getElementById("room").value
      let weapon = document.getElementById("weapon").value
      let suspect = document.getElementById("suspect").value
      let suggestionJSON = { "room" : room,
                             "weapon" : weapon,
                             "suspect" : suspect}
      console.log(suggestionJSON)
      axios.post(settings.baseURL+settings.url.accuse+"?key="+gameKey, suggestionJSON,{auth : settings.auth})
        .then(response => {
          console.log(response.data.message)
          document.getElementById("titleFeedback").innerHTML = response.data.message;
        })
    }

  return (
  <div>
    <h2>Maak een beschuldiging</h2>
    <FormGroup row>  
      <Col>
        <Label for='room'>Room</Label>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Input type='text' id="room"className='form-control' name='room'
          placeholder='Enter Room' />
      </Col>
      <Col>
        <Label for='weapon'>Weapon</Label>  &nbsp;&nbsp;
        <Input type='text' id="weapon" className='form-control' name='weapon' 
          placeholder='Enter Weapon' />  
      </Col>
      <Col>
        <Label for='suspect'>Suspect</Label>  &nbsp;&nbsp;
        <Input type='text' id="suspect" className='form-control' name='suspect' 
          placeholder='Enter The Suspect' />  
      </Col>
      <Button value="Make Suggestion" onClick={() => arrestPerson()}></Button>
    </FormGroup>  
    <FormGroup row>  
    </FormGroup>
    <h3 id="titleFeedback"></h3>
  </div>
      

  );
};
