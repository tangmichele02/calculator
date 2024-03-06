import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "./Side.css";

function MathFact(props) {
  const [fact, setFact] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios.get('http://numbersapi.com/random/trivia')
      .then(response => {
        setFact(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
        <button class="side-button" onClick={() => setShow(!show)}>
            Number Fact
        </button>
        <div
        style={{ visibility: show ? "visible" : "hidden" }}
        className="side-text">
            {fact}
        </div>
    </div>
    
  );
}

export default MathFact;