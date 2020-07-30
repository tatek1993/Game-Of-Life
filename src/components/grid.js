import React, { useState, useEffect, useRef } from 'react';

// var isAlive = false;


// canvas.height = window.innerHeight;
// ctx.fillRect(100, 100, 100, 100)
function Grid() {
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
        // console.table(arr);
        return arr;
    }


    function Draw(arr) {
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


    const canvasRef = useRef();

    useEffect(() => {
        const canvasObj = canvasRef.current;
        const ctx = canvasObj.getContext('2d');
        Draw(arr);
    }, [])




    const handleClick = (event) => {
        console.log(event)
        // determining which cell to affect by rounding down and
        // dividing the client x and y(pixel) coordinates by 10(px width/height for a cell)
        let x = Math.floor(event.clientX / 10);
        let y = Math.floor(event.clientY / 10);

        // toggle whether a cell is alive(true) or dead(false)
        arr[x][y] = !arr[x][y];
        Draw(arr);
        event.stopPropagation();
        //^This will keep it from bubbling up to the body


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