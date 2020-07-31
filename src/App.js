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

  // For each cell in the current generation's grid:
  // - Examine state of all eight neighbors 
  // - Apply rules of life to determine if this cell will change states
  // - When main loop completes:
  // ----Swap current and next grids
  // ----Repeat until simulation stopped

  const [arr, setArr] = useState(array1);





  function Generation(current, next) {
    // NEIGHBOR LOGIC
    for (let i = 0; i < current.length; i++) {
      for (let j = 0; j < current[i].length; j++) {
        const neighbors = [
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
        let futureCell = next[i][j];

        // for each cell in neighbors, if the cell is true, increment liveNeighbors
        neighbors.forEach((cell) => {
          if (cell.x < 0) {
            cell.x += 50;
          }
          if (cell.y < 0) {
            cell.y += 50;
          }
          if (current[cell.x % 49][cell.y % 49] == true) {
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
        next[i][j] = futureCell;
      }
    }


  }

  const [gen, setGen] = useState({ count: 0 });


  const [intr, setIntr] = useState();

  function onPlay(event) {
    array1 = arr;
    setIntr(setInterval(() => {
      console.log("gen", gen);
      if (gen.count % 2 === 0) {
        Generation(array1, array2);
        setArr(array2);
      } else {
        Generation(array2, array1);
        setArr(array1);
      }
      gen.count++;
      setGen(gen);

    }, 100));
  }

  function onStop(event) {
    clearInterval(intr);
  }

  return (
    <>
      <Grid arr={arr} setArr={setArr} />
      <button onClick={onPlay}> Start </button>
      <button onClick={onStop}> Stop </button>
    </>
  );
}

export default App;