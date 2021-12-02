import React from "react";
import { useSettings } from "../context/useSettings";
import { Container, Col, Form, FormGroup, Label, Input } from 'reactstrap'
import Button from "../Button";
import axios from "axios";
/*
   SUGGESTIE FORMULIER
   -------------------
   Maak hier een formulier om een suggestie te verrichten.
*/

export const MakeSuggestionForm = ({ gameKey, selectedRoom }) => {
  const { settings } = useSettings();
  var score = 0;
  var feedback = "";
  
  const makeSuggestion = () => {
    let weapon = parseInt(document.getElementById("weapon").value)
    let suspect = parseInt(document.getElementById("suspect").value)
    let suggestionJSON = { "room" : selectedRoom,
                           "weapon" : weapon,
                           "suspect" : suspect}
    console.log(suggestionJSON)
    axios.post(settings.baseURL+settings.url.suggest+"?key="+gameKey, suggestionJSON,{auth : settings.auth})
      .then(response => {
        console.log(response.data.num_correct)
        console.log(response.data.incorrect)

        score = response.data.num_correct;

        if(score == 0){
          feedback = "You're on the wrong path.";
          console.log(feedback);
          console.log(score);
        }
        else if(score > 0 && score <= 2){
          feedback = "almost there...";
          console.log(feedback);
          console.log(score);
        }
        else{
          feedback = "Mission Completed";
          console.log(feedback);
          console.log(score);
        }
        document.getElementById("titleFeedback").innerHTML = feedback;
      })
      .catch(error =>{
        console.log(error)
      })
  };

  return (
    <div>
      <h2>Maak een suggestie</h2>
      <FormGroup row>  
        <Col>
          <Label for='room'>Room</Label>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Input type='text' className='form-control' name='room' value={selectedRoom}
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
        <Button value="Make Suggestion" onClick={() => makeSuggestion()}></Button>
      </FormGroup>  
      <FormGroup row>  
      </FormGroup>
      <h3 id="titleFeedback">{feedback}</h3> 
    </div>
  );
};
