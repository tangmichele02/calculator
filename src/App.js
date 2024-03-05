import React, { useState } from "react";

import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import History from "./components/History";
import ClearHistory from "./components/ClearHistory";

import "./index.css";

const btnValues = [
  ["C", "%", "^", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "+-", "="],
];

const toLocaleString = (num) =>
String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {

  let [calc, setCalc] = useState({
    sign: "", 
    num: 0,
    res: 0,
  });

  let [hist, setHist] = useState([]);

  let [equation, setEquation] = useState("");

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc, 
        num: 
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value), 
          res: !calc.sign? 0 : calc.res,
      });
    }
  };

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc, 
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num, 
    });

  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML; 

    setCalc({
      ...calc, 
      sign: value, 
      res: !calc.res && calc.num ? calc.num : calc.res, 
      num: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) => {
        let output = 0;
        if (sign === "+" ) {
          output = a + b;
        } else if (sign === "-") {
          output = a - b;
        } else if (sign === "X") {
          output = a * b;
        } else if (sign === "/") {
          output = a / b;
        }
        const eq =  a + " " + sign + " " + b + " " + "=" + " " + output;
        setHist(hist => [eq, ...hist]);
        setEquation(eq);
        
        return output;
      }

      setCalc({
        ...calc, 
        res: 
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : calc.num === NaN
            ? "Can't use NaN"
            : toLocaleString(
              math(
                Number(removeSpaces(calc.res)),
                Number(removeSpaces(calc.num)), 
                calc.sign
              ),
            ),
        sign: "",
        num: 0,
      });  
    }
  };


  const invertClickHandler = () => {
    setCalc({
      ...calc, 
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0, 
      sign: "",
    });
  };

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;
  
    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  const clearhistoryClickHandler = () => {
    setHist([]);
  };
  
  // const addToHistory = (new_exp, result) => {
  //   this.setState({
  //       history: [...this.state.history, {exp: new_exp, result: result}]
  //   })
  // }

  // const clickHandler = (btn) => {

  // }
  return (
    <div>
    <h1>Calculator</h1>
    <div class="app">
      <div class="child1">
        <Wrapper>
          <Screen value={calc.num ? calc.num : calc.res} />
          <ButtonBox>
            {
              btnValues.flat().map((btn, i) => {
                return (
                  <Button
                    key={i}
                    className={
                      btn === "="
                      ? "equals" 
                      : btn === 0 || btn === 1 || btn === 2 || btn === 3 || btn === 4 || btn === 5 || btn === 6 || btn === 7 || btn === 8 || btn === 9 
                      ? "numbers"
                      : ""}
                    value={btn}
                    onClick={
                      btn === "C"
                        ? resetClickHandler
                        : btn === "+-"
                        ? invertClickHandler
                        : btn === "%"
                        ? percentClickHandler
                        : btn === "="
                        ? equalsClickHandler
                        : btn === "/" || btn === "X" || btn === "-" || btn === "+" || btn === "^" || btn === "log"
                        ? signClickHandler
                        : btn === "."
                        ? commaClickHandler
                        : numClickHandler
                    }
                  />
                );
              })
            }
          </ButtonBox>
        </Wrapper>
      </div>
      <div class="child2">
        <ClearHistory onClick={clearhistoryClickHandler}/>
        <History history={hist}/>
      </div>
    </div>
    </div>
  );
};

export default App;