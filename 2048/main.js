// Gameboard
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var column = 4;
var line = 4;

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
  createGrid(column, line);
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
      ctx.fillRect( (x+ 7*j), (y+7*i), cellSize, cellSize);      
    }
  }
}

function addCell(x, y, value) {
  grid[x][y] = value ;
  drawCell(x, y, value) ;
}

function drawCell(x, y, value){

  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;

  ctx.shadowColor = "orange";

  ctx.fillStyle = "green";

  // +7 is to deals with borders
  ctx.fillRect( (x*(7+cellSize)), (y*(7+cellSize)), cellSize, cellSize );
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // Set the color and font for the tile
  ctx.fillStyle = "#000";
  ctx.font = "bold " + (cellSize / 2) + "px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // coords * cellSize (+7 to deal borders) + cellSize /2 (to center)
  ctx.fillText(value, (x*(7+cellSize)+ cellSize/2), (y*(7+cellSize)+ cellSize/2));
}


function removeCell(x,y){
  grid[x][y] = 0;
  eraseCell(x,y);
}

function eraseCell(x,y){
  ctx.fillStyle = "red";
  // +7 is to deals with borders
  ctx.fillRect( (x*(7+cellSize)), (y*(7+cellSize)), cellSize, cellSize);
}


function game() {
  let x = getRandomInt(0, 4);
  let y = getRandomInt(0, 4);
  addCell(x, y, 2);
  
  play();

}

// The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}

function play () {

  window.addEventListener("keydown", handleKeyDown);

}


// Handle keydown event
function handleKeyDown(event) {
  if (event.key === "ArrowLeft") {
    moveCellsLeft();
    addRandomCell();
  } else if (event.key === "ArrowRight"){
    moveCellsRight();
    addRandomCell();
  } else if (event.key === "ArrowUp"){
    moveCellsUp();
    addRandomCell();
  } else if (event.key === "ArrowDown"){
    moveCellsDown();
    addRandomCell();
  }
}

function addRandomCell(){
  const nonZeroCoordinates = [];

  for (let i = 0; i < column; ++i) {
    for (let j = 0; j < line; ++j) {
      if (grid[i][j] == 0) {
        nonZeroCoordinates.push({ x: i, y: j });
      }
    }
  }

  let {x,y} = nonZeroCoordinates[getRandomInt(0, nonZeroCoordinates.length)];

  console.log(x + " " + y);
  addCell(x,y,Math.random() < 0.8 ? 2 : 4);
  
}




function moveCellsLeft() {

  for (let i = 1; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {

      var tmpX = i;
      var tmpY = j;
      while (tmpX > 0 && grid[tmpX][tmpY]){
        if (grid[tmpX][tmpY] == grid[tmpX-1][tmpY] ) {
          fusion(tmpX, tmpY, tmpX-1, tmpY);
          break;

        }  else if (grid[tmpX-1][tmpY] !== 0) {
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
      while (tmpX < 7 && grid[tmpX][tmpY] !== 0){

        if (grid[tmpX+1][tmpY] == grid[tmpX][tmpY] ) {
          fusion(tmpX, tmpY, tmpX+1, tmpY);
          break;

        } else if (grid[tmpX+1][tmpY] !== 0) {
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
          fusion(tmpX, tmpY, tmpX, tmpY-1)
          break;

        } else if (grid[tmpX][tmpY-1] !== 0) {
          break;
        }else {
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
      while (tmpY < 7 && grid[tmpX][tmpY] !== 0){

        if (grid[tmpX][tmpY] == grid[tmpX][tmpY+1] ) {
          fusion(tmpX, tmpY, tmpX, tmpY+1)
          break;
        }else if (grid[tmpX][tmpY+1] !== 0) {
          break;
        }else {
          addCell(tmpX, tmpY+1, grid[tmpX][tmpY]);
          removeCell(tmpX,tmpY);
          tmpY = tmpY+1;
        }
        
      } 
    }
  }
}



function fusion (xStart, yStart, xEnd, yEnd) {
  removeCell(xEnd,yEnd);
  addCell(xEnd, yEnd, grid[xStart][yStart]*2);
  removeCell(xStart,yStart);
}