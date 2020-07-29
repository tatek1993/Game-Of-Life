import React from 'react';
import './App.css';

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

// context.fillRect(100, 100, 100, 100)


function CreateGrid(col, row) {
  let arr = Array(col);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Array(row);
  }
  console.log(arr);
  return arr;
}

function App() {
  CreateGrid(10, 10);

  return (

    <div>Hi</div>
  );
}

export { App, CreateGrid };