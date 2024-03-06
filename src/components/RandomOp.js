import React, { useState } from 'react';


import "./Side.css";

function RandomOp(props) {
    const [randop, setRandop] = useState(0);
    const [randshow, setRandshow] = useState(false);
    
    var operations = ["+", "-", "/", "X", "^"]

    const randomOperation = (operations) => {
        return operations[Math.floor(Math.random() * operations.length)];
    };

    const handleClick = () => {
        setRandop(randomOperation(operations));
        setRandshow(true);
    };

    return (
        <div>
            <button class="side-button" onClick={handleClick}>
                Random Operation
            </button> 
            <div
                style={{ visibility: randshow ? "visible" : "hidden" }}
                className="side-text"
                id="randnum-text">
                {randop}
            </div>
        </div>
        
    );
}

export default RandomOp;