import React, { useState } from 'react';


import "./Side.css";

function RandomNum(props) {
    const [randnum, setRandnum] = useState(0);
    const [randshow, setRandshow] = useState(false);

    const randomNumberInRange = () => {
        return Math.floor(Math.random()
            * (1000000 - 1)) + 0;
    };

    const handleClick = () => {
        setRandnum(randomNumberInRange());
        setRandshow(true);
    };

    return (
        <div>
            <button class="side-button" onClick={handleClick}>
                Random Number
            </button> 
            <div
                style={{ visibility: randshow ? "visible" : "hidden" }}
                className="side-text"
                id="randnum-text">
                {randnum}
            </div>
        </div>
        
    );
}

export default RandomNum;