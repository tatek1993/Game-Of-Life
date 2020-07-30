import React, { useState } from 'react';

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;
canvas.style.width = "500px";
canvas.style.height = "500px";
// var isAlive = false;


// canvas.height = window.innerHeight;
// ctx.fillRect(100, 100, 100, 100)


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
    // console.table(arr);
    return arr;
}

let arr = CreateGrid(50, 50);

function Draw(arr) {

    ctx.strokeStyle = 'grey';
    ctx.lineWidth = .5;

    // For each column in arr we are inserting an array of equal size
    for (let i = 0; i < arr.length; i++) {

        // We are using this nested for loop to draw a square for each item in our 2d array
        // This is to draw our grid
        for (let j = 0; j < arr[i].length; j++) {

            // we offset the stroke by .5 to ensure that our stroke only takes up the amount of pixels we want without blurring 
            // x and y coordinates (pixels) are equal to i and j * 10 (array indexes)
            ctx.fillStyle = arr[i][j] ? 'pink' : 'black';
            let y = (j * 10) + .5;
            let x = (i * 10) + .5;

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + 10, y);
            ctx.lineTo(x + 10, y + 10);
            ctx.lineTo(x, y + 10);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();


        }
    }
    return arr;
}


canvas.addEventListener("click", (event) => {
    console.log(event)
    let x = Math.floor(event.clientX / 10);
    let y = Math.floor(event.clientY / 10);
    arr[x][y] = true;
    Draw(arr);
    event.stopPropagation();
    //^This will keep it from bubbling up to the body
})

export { CreateGrid, Draw };