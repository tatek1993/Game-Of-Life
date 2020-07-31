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

  function randomize() {
    const randomGrid = CreateGrid(50, 50);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        randomGrid[i][j] = Math.random(1) > .8;

      }
    }
    setArr(randomGrid);
  }

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
          if (current[cell.x % 50][cell.y % 50] == true) {
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

  function copy2DArray(copy, original) {
    original.forEach((col, x) => col.forEach((cell, y) => copy[x][y] = cell));
  }

  function onPlay(event) {
    copy2DArray(array1, arr);
    copy2DArray(array2, arr);

    setIntr(setInterval(() => {
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
    setIntr(null);
  }

  function setArrIfNotPlaying(x) {
    if (intr == null) {
      setArr(x);
    }
  }

  function clearBoard(event) {
    gen.count = 0;
    setGen(gen);
    array1 = CreateGrid(50, 50);
    array2 = CreateGrid(50, 50);
    setArr(array1);
    //console.log(gen);
    onStop();
  }

  return (
    <>
      <Grid arr={arr} setArr={setArrIfNotPlaying} />
      <h1>Generation: {gen.count}</h1>
      <button onClick={onPlay} disabled={intr != null}> Start </button>
      <button onClick={onStop}> Stop </button>
      <button onClick={clearBoard}> Clear </button>
      <button onClick={randomize}> Random </button>
    </>
  );
}

export default App;