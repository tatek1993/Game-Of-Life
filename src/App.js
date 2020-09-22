import React, { useState } from 'react';
import './App.css';
import Grid from './components/grid';

let array1 = CreateGrid(50, 50);
let array2 = CreateGrid(50, 50);

function CreateGrid(col, row) {
  let arr = Array(col);
  // For each column in arr we are inserting an array of equal size
  // This creates a 2d array which we use to make a grid
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Array(row);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = false;
    }
  }
  return arr;
}


function App() {
  const [arr, setArr] = useState(array1);

  // RANDOM CONFIG
  function randomize() {
    // loop through our 2d array 
    const randomGrid = CreateGrid(50, 50);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        //and randomly assign true bools to cells
        randomGrid[i][j] = Math.random(1) > .8;

      }
    }
    // setArr with that new randomized grid
    setArr(randomGrid);
  }

  function Generation(current, next) {
    // NEIGHBOR LOGIC
    for (let i = 0; i < current.length; i++) {
      for (let j = 0; j < current[i].length; j++) {
        const neighbors = [
          // values for all 8 surrounding squares
          { x: i - 1, y: j + 1 },
          { x: i, y: j + 1 },
          { x: i + 1, y: j + 1 },
          { x: i - 1, y: j },
          { x: i + 1, y: j },
          { x: i - 1, y: j - 1 },
          { x: i, y: j - 1 },
          { x: i + 1, y: j - 1 },
        ];

        let currentCell = current[i][j];
        let liveNeighbors = 0;
        // our next generation
        let futureCell = next[i][j];

        // for each cell in neighbors, if the cell is true, increment liveNeighbors
        neighbors.forEach((cell) => {
          // this is to explicitly handle negative numbers should they arise
          if (cell.x < 0) {
            cell.x += 50;
          }
          if (cell.y < 0) {
            cell.y += 50;
          }
          // by using % 50 we can make the canvas wrap around
          if (current[cell.x % 50][cell.y % 50] === true) {
            liveNeighbors++;

          }
        })

        // If the cell is alive 
        if (currentCell === true) {
          //and has 2 or 3 neighbors
          if (liveNeighbors === 2 || liveNeighbors === 3) {
            // then it remains alive. 
            futureCell = true;
          } else {
            //Else it dies.
            futureCell = false;
          }
          // If the cell is dead  
        } else {
          // and has exactly 3 neighbors, 
          if (liveNeighbors === 3) {
            // then it comes to life. 
            futureCell = true;
          } else {
            // Else if remains dead.
            futureCell = false;
          }
        }
        // we set the next gen's coordinates to the value of future cell
        next[i][j] = futureCell;
      }
    }
  }

  const [gen, setGen] = useState({ count: 0 });

  // interval at which game progresses
  const [intr, setIntr] = useState();

  function copy2DArray(copy, original) {
    // for each column in the original array, and then for each cell within
    // set the coordinates of that copy to the value of cell
    original.forEach((col, x) => col.forEach((cell, y) => copy[x][y] = cell));
  }

  // initializing speed at 300 ms
  const [speed, setSpeed] = useState(300);

  function onStepThruClicked() {
    // copying everything from arr(what the user drew) and putting it in array1 and array2
    copy2DArray(array1, arr);
    copy2DArray(array2, arr);
    stepThru();
  }

  function stepThru() {
    // determining whether gen is even or odd
    // we want to alternate the double buffer
    if (gen.count % 2 === 0) {
      // calculate the next generation (array2) from the current generation(array1)
      Generation(array1, array2);
      // display the next generation
      setArr(array2);

    } else {
      // the inverse
      Generation(array2, array1);
      setArr(array1);
    }
    // increment generation and setGen to the newly modified gen object
    gen.count++;
    setGen(gen);
  }

  function onPlay(event) {
    // copying everything from arr(what the user drew) and putting it in array1 and array2
    copy2DArray(array1, arr);
    copy2DArray(array2, arr);
    // storing the reference to the interval
    // speed is the delay, stepThru increments the generations
    setIntr(setInterval(stepThru, speed));
  }


  function handleChangeSpeed(event) {
    // set the speed to whatever was selected in the dropdown
    setSpeed(event.target.value);
    // if intr is not null, then the game is playing
    if (intr != null) {
      // we must restart the game to get speed to update
      // so we manually stop the game when we change speed
      onStop();
      //onPlay();
    }

  }
  // stops game by stopping the scheduled interval
  function onStop(event) {
    clearInterval(intr);
    setIntr(null);
  }

  // only allow user to draw when game is not playing
  function setArrIfNotPlaying(x) {
    if (intr == null) {
      setArr(x);
    }
  }

  function clearBoard(event) {
    // set generation back to 0
    gen.count = 0;
    setGen(gen);
    // recreate 2d arrays
    array1 = CreateGrid(50, 50);
    array2 = CreateGrid(50, 50);
    // display empty array1
    setArr(array1);
    //console.log(gen);
    // we stop the game
    onStop();
  }

  return (
    <>
      <h1>Conway's Game Of Life</h1>
      <div className="container">
        <div className="game">
          <Grid arr={arr} setArr={setArrIfNotPlaying} />
          <h3 id="gen">Generation: {gen.count}</h3>
        </div>

        <div className="gameplay">
          <div className="intro">
            <h2>Welcome to the Game of Life!</h2>
            <br />
            <h4><u> RULES </u></h4>
            <br /> If a cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.
            <br /> If the cell is dead and has exactly 3 neighbors, then it comes to life. Otherwise it remains dead.
            <br />
            <br /><h4><u> CONTROLS </u></h4>
            <br /> Click cells to set starting values.
            <br /> <u>START:</u> Begin your cells' lifecycle.
            <br /> <u>STOP:</u> Pause your cells.
            <br /> <u>STEP FORWARD:</u> Move through the cells' lifecycle one frame at a time.
            <br /> <u>RANDOM:</u> Start out with a random configuration of cells.
            <br /> <u>SPEED:</u> Select the speed of your cells' lifecycle.
            <br /> <u>CLEAR:</u> Clear the board.

          </div>

          <div className="controls">
            <button onClick={onPlay} disabled={intr != null} id="start"> Start </button>
            <button onClick={onStepThruClicked} disabled={intr != null}> Step Forward </button>
            <button onClick={onStop} id="stop"> Stop </button>
          </div>

          <div className="controls">
            <button onClick={clearBoard}> Clear </button>
            <button onClick={randomize}> Random </button>
            <div id="dropdown">
              <label htmlFor="speed">Speed:</label>
              <select id="speed" value={speed} onChange={handleChangeSpeed}>
                <option value="600" aria-label="turtle">🐢</option>
                <option value="300" aria-label="person">🚶🏽‍♂️</option>
                <option value="50" aria-label="rabbit">🐇</option>
              </select>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default App;