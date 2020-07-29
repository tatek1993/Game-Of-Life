import React from 'react';
import './App.css';

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;
canvas.style.width = "500px";
canvas.style.height = "500px";
// canvas.height = window.innerHeight;
// ctx.fillRect(100, 100, 100, 100)


function CreateGrid(col, row) {
  let arr = Array(col);
  ctx.strokeStyle = 'grey';
  ctx.lineWidth = .5;

  for (let i = 0; i < arr.length; i++) {
    arr[i] = Array(row);

    for (let j = 0; j < arr[i].length; j++) {

      let y = (j * 10) + .5;
      let x = (i * 10) + .5;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 10, y);
      ctx.lineTo(x + 10, y + 10);
      ctx.lineTo(x, y + 10);
      ctx.closePath();
      ctx.stroke();
    }
  }

  return arr;
}

function App() {
  CreateGrid(50, 50);

  return (
    <div>Hi</div>
  );
}

export { App, CreateGrid };