import React from 'react';
import './App.css';

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

// ctx.fillRect(100, 100, 100, 100)


function CreateGrid(col, row) {
  let arr = Array(col);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;

  for (let i = 0; i < arr.length; i++) {
    arr[i] = Array(row);

    let x = i * 10;
    let y = 0;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 9, y);
    ctx.lineTo(x + 9, y + 9);
    ctx.lineTo(x, y + 9);
    ctx.closePath();
    ctx.stroke();

    // for () {

    // }
  }

  // for (let j = 0; j <= arr.length; j++) {

  //   let y = j * 10;

  //   ctx.beginPath();
  //   ctx.moveTo(y, y);
  //   ctx.lineTo(y + 9, y);
  //   ctx.lineTo(y + 9, y + 9);
  //   ctx.lineTo(y, y + 9);
  //   ctx.closePath();
  //   ctx.stroke();
  // }



  // for (let c = 0; c <= 500; c = c + 50) {
  //   ctx.moveTo(c, 0);
  //   ctx.lineTo(c, 500);
  //   ctx.stroke();
  // }
  // for (let j = 0; j <= 500; j = j + 25) {
  //   ctx.moveTo(0, j);
  //   ctx.lineTo(500, j);
  //   ctx.stroke();
  // }

  return arr;
}

function App() {
  CreateGrid(10, 10);

  return (
    <div>Hi</div>
  );
}

export { App, CreateGrid };