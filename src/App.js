import React, { useState } from 'react';
import './App.css';
import Grid from './components/grid';


function App() {

  // For each cell in the current generation's grid:
  // - Examine state of all eight neighbors 
  // - Apply rules of life to determine if this cell will change states
  // - When main loop completes:
  // ----Swap current and next grids
  // ----Repeat until simulation stopped

  const [arr, setArr] = useState(CreateGrid(50, 50));

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

  function Generation() {
    // neighbor logic
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
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

        let currentCell = arr[i][j];
        let liveNeighbors = 0;
        let futureCell = false;

        // for each cell in neighbors, if the cell is true, increment liveNeighbors
        neighbors.forEach((cell) => {
          if (arr[cell.x % 50][cell.y % 50] == true) {
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
      }
    }

    // wrap grid
    // determine generation
  }

  return (
    <Grid arr={arr} setArr={setArr} />
  );
}

export default App;