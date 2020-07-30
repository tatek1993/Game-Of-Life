import React from 'react';
import './App.css';
import { CreateGrid, Draw } from './components/grid';





// function MakeCell() {
//   for (each element in arr[i][j]) {
//     arr[i][j] = isAlive;
//   }
// }

var arr = CreateGrid(50, 50);

function App() {
  // We are creating our 50 x 50 cell grid
  CreateGrid(50, 50);
  Draw(arr);

  return (
    <div>Hi</div>
  );
}

export { App, CreateGrid };