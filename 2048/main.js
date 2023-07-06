// Gameboard
var canvas = document.getElementById("canvas");

// window.addEventListener("resize", updateCanvasSize);

// Function to update canvas size
function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Start game mode
function start() {
    var button = document.querySelector("button");

    button.style.display = "none";
    canvas.style.display = "flex";


    // Call the function initially
    updateCanvasSize();
    init();
}


 // Initialize grid
 function init(){
    
     // Get the canvas context
     var ctx = canvas.getContext("2d");

     // Calculate grid properties
     var gridSize = Math.min(canvas.width, canvas.height) * 0.8; // Adjust the size of the grid
     var cellSize = gridSize / 4;
     var gridOffsetX = (canvas.width - gridSize) / 2;
     var gridOffsetY = (canvas.height - gridSize) / 2;
 
     // Draw the grid
     ctx.fillStyle = "#f2f2f2";
     ctx.fillRect(gridOffsetX, gridOffsetY, gridSize, gridSize);
 
     // Draw grid cells with borders
     ctx.fillStyle = "white";
     ctx.strokeStyle = "black";
     for (var row = 0; row < 4; row++) {
         for (var col = 0; col < 4; col++) {
             var cellX = gridOffsetX + col * cellSize;
             var cellY = gridOffsetY + row * cellSize;
             ctx.fillRect(cellX, cellY, cellSize, cellSize);
             ctx.strokeRect(cellX, cellY, cellSize, cellSize);
         }
     }

    // Call the function to add elements to specific cells
    addElementsToCells(ctx, gridOffsetX, gridOffsetY, cellSize, 3, 2);
}

function addElementsToCells(ctx, gridOffsetX, gridOffsetY, cellSize, x, y) {
    // Add elements to specific cells
    var cellX = gridOffsetX + x * cellSize;
    var cellY = gridOffsetY + y * cellSize;

    ctx.fillStyle = "blue";
    ctx.fillRect(cellX, cellY, cellSize, cellSize);
}