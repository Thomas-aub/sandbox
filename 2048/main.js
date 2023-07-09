// Gameboard
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Grid
var grid = [];
var cellSize;

// Start game mode
function start() {
  var button = document.querySelector("button");

  button.style.display = "none";
  document.getElementById("gameboard").style.display = "flex";

  updateCanvasSize();
  init();
  game();
}

// Function to update canvas size
function updateCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}


function init() {
  createGrid(4, 4);
  showGrid();
}

// grid register the element on each tile
function createGrid(column, line){
  for (let i = 0; i < column; ++i){
    grid[i] = [];
    for (let j = 0; j < line; ++j){
      grid[i][j] = 0 
    }
  }
}

function showGrid() {
  cellSize = Math.min(canvas.width, canvas.height) / grid.length;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Loop through the grid and draw each cell
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {

      // Calculate the position of the cell on the canvas
      var x = j * cellSize;
      var y = i * cellSize;
      
      // Draw the cells
      ctx.fillStyle = "red";
      ctx.fillRect( (x+ 3*j), (y+3*i), cellSize, cellSize);      
    }
  }
}

function addCell(x, y, value) {
  grid[x][y] = value ;
  drawCell(x, y, value) ;
}

function drawCell(x, y, value){

  ctx.fillStyle = "green";

  // +3 is to deals with borders
  ctx.fillRect( (x*(3+cellSize)), (y*(3+cellSize)), cellSize, cellSize);

  // Set the color and font for the tile
  ctx.fillStyle = "#000";
  ctx.font = "bold " + (cellSize / 2) + "px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // coords * cellSize (+3 to deal borders) + cellSize /2 (to center)
  ctx.fillText(value, (x*(3+cellSize)+ cellSize/2), (y*(3+cellSize)+ cellSize/2));
}


function removeCell(x,y){
  grid[x][y] = 0;
  eraseCell(x,y);
}

function eraseCell(x,y){
  ctx.fillStyle = "red";
  // +3 is to deals with borders
  ctx.fillRect( (x*(3+cellSize)), (y*(3+cellSize)), cellSize, cellSize);
}


function game() {
  let x = getRandomInt(0, 4);
  let y = getRandomInt(0, 4);
  addCell(x, y, 2);

  x = getRandomInt(0, 4);
  y = getRandomInt(0, 4);
  addCell(x, y, 2);
  
  window.addEventListener("keydown", handleKeyDown);

}

// The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}


// Handle keydown event
function handleKeyDown(event) {
  if (event.key === "ArrowLeft") {
    moveCellsLeft();
  } else if (event.key === "ArrowRight"){
    moveCellsRight();
  } else if (event.key === "ArrowUp"){
    moveCellsUp();
  } else if (event.key === "ArrowDown"){
    moveCellsDown();
  }
}

function moveCellsLeft() {

  for (let i = 1; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {

      var tmpX = i;
      var tmpY = j;
      while (tmpX > 0 && grid[tmpX][tmpY]){
        if (grid[tmpX][tmpY] == grid[tmpX-1][tmpY] ) {
          console.log("fusion !");
          break;

        } else {
          addCell(tmpX-1, tmpY, grid[tmpX][tmpY]);
          removeCell(tmpX,tmpY);
          tmpX = tmpX-1;
        }
        
        
      }

      
    }
  }
}

function moveCellsRight() {

  for (let i = grid.length-2 ; i >= 0; i-- ){
    for ( let j = grid.length-1; j >= 0; j-- ) {

      var tmpX = i;
      var tmpY = j;
      while (tmpX < 3 && grid[tmpX][tmpY] !== 0){

        if (grid[tmpX+1][tmpY] == grid[tmpX][tmpY] ) {
          console.log("fusion !");
          break;

        } else {
          addCell(tmpX+1, tmpY, grid[tmpX][tmpY]);
          removeCell(tmpX,tmpY);
          tmpX = tmpX+1;
        }
        
        
      }

      
    }
  }
}

function moveCellsUp() {

  for (let i = 0; i < grid.length; i++) {
    for (let j = 1; j < grid[i].length; j++) {

      var tmpX = i;
      var tmpY = j;
      while (tmpY > 0 && grid[tmpX][tmpY] !== 0 ){

        if (grid[tmpX][tmpY] == grid[tmpX][tmpY-1] ) {
          console.log("fusion !");
          break;

        } else {
          addCell(tmpX, tmpY-1, grid[tmpX][tmpY]);
          removeCell(tmpX,tmpY);
          tmpY = tmpY-1;
        }
        
      }
      
      
    }
  }
}

function moveCellsDown() {

  for (let i = grid.length-1 ; i >= 0; i-- ){
    for ( let j = grid.length-1; j >= 0; j-- ) {
  
      var tmpX = i;
      var tmpY = j;
      while (tmpY < 3 && grid[tmpX][tmpY] !== 0){

        if (grid[tmpX][tmpY] == grid[tmpX][tmpY+1] ) {
          console.log("fusion !");
          break;
        } else {
          addCell(tmpX, tmpY+1, grid[tmpX][tmpY]);
          removeCell(tmpX,tmpY);
          tmpY = tmpY+1;
        }
        
      } 
    }
  }
}



