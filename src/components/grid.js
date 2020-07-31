import React, { useState, useEffect, useRef } from 'react';

// var isAlive = false;


// canvas.height = window.innerHeight;
// ctx.fillRect(100, 100, 100, 100)
function Grid({ arr, setArr }) {

    // creating a reference we can use to attach to the canvas element in the jsx below
    const canvasRef = useRef();

    // DRAWING THE GRID ON THE CANVAS
    // this useEffect will be called every time the data in arr changes
    useEffect(() => {
        const canvasObj = canvasRef.current;
        const ctx = canvasObj.getContext('2d');
        ctx.strokeStyle = 'grey';
        ctx.lineWidth = .5;

        // For each column in arr we are inserting an array of equal size
        for (let i = 0; i < arr.length; i++) {

            // We are using this nested for loop to draw a square for each item in our 2d array
            // This is to draw our grid
            for (let j = 0; j < arr[i].length; j++) {

                // we offset the stroke by .5 to ensure that our stroke only takes up the amount of pixels we want without blurring 
                // x and y coordinates (pixels) are equal to i and j * 10 (array indexes)
                if (arr[i][j]) console.log(1);
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
    }, [arr])


    // TOGGLE CELL
    const handleClick = (event) => {
        let bounds = canvasRef.current.getBoundingClientRect();
        // we subtract the top and left bounds to prevent the mouse from being offset when the canvas is not in the upper left corner of the page
        let canvY = (event.clientY - bounds.top);
        let canvX = (event.clientX - bounds.left);

        // determining which cell to affect by rounding down and
        // dividing the mouse coordinates, client x and y(pixel) by 10(px width/height for a cell)
        let y = Math.floor(canvY / 10); // Mouse coordinates relative to the canvas
        let x = Math.floor(canvX / 10);


        // we are mapping through our array of columns
        // this is to create a new version of arr instead of modifying the original
        const newArr = arr.map((col, i) => {
            // if the index = the x coordinate of the cell we clicked on 
            if (i === x) {
                // then we modify the column by toggling the bool
                return col.map((cell, j) => j === y ? !cell : cell)
            } else {
                // otherwise return the original array
                return col;
            }
        });
        setArr(newArr);

    }

    return (
        <canvas
            id="canvas"
            ref={canvasRef}
            width={500}
            height={500}
            onClick={handleClick} />

    )
}
export default Grid;