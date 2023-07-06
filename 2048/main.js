// Gameboard
var canvas = document.getElementById("canvas");

// Function to update canvas size
function updateCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Start game mode
function start() {
  var button = document.querySelector("button");

  button.style.display = "none";
  document.getElementById("gameboard").style.display = "flex";

  // Call the function initially
  updateCanvasSize();
  init();
}

// Initialize grid
function init() {
  // Get the canvas context
  var ctx = canvas.getContext("2d");

  // Calculate grid properties
  var gridSize = Math.min(canvas.width, canvas.height) * 0.8; // Adjust the size of the grid
  var cellSize = gridSize / 4;
  var spacing = cellSize * 0.1; // Adjust the spacing percentage
  var gridOffsetX = (canvas.width - gridSize) / 2;
  var gridOffsetY = (canvas.height - gridSize) / 2;

  // Calculate the total size including spacing
  var totalSize = (cellSize + spacing) * 4 - spacing;

  // Set the border properties for the grid
  var gridBorderWidth = 5; // Adjust the width of the grid border
  ctx.lineWidth = gridBorderWidth;
  ctx.strokeStyle = "black";

  // Draw the rectangle around the grid
  var rectangleX = gridOffsetX - gridBorderWidth / 2 - spacing / 2;
  var rectangleY = gridOffsetY - gridBorderWidth / 2 - spacing / 2;
  var rectangleWidth = totalSize + gridBorderWidth + spacing;
  var rectangleHeight = totalSize + gridBorderWidth + spacing;
  ctx.strokeRect(rectangleX, rectangleY, rectangleWidth, rectangleHeight);

  // Draw the grid cells with rounded borders and spacing
  for (var row = 0; row < 4; row++) {
    for (var col = 0; col < 4; col++) {
      var cellX = gridOffsetX + col * (cellSize + spacing);
      var cellY = gridOffsetY + row * (cellSize + spacing);
      drawRoundedRect(ctx, cellX, cellY, cellSize, cellSize, 10); // Adjust the corner radius
    }
  }

  // Call the function to add elements to specific cells
  addElementsToCells(ctx, 1, 1, 2, "red", true); // Remove border from cell (1, 1)
  addElementsToCells(ctx, 2, 2, 4, "blue", false); // Preserve border for cell (2, 2)

  // Add event listener for keydown event
  window.addEventListener("keydown", handleKeyDown);
}

// Draw a rounded rectangle without border
function drawRoundedRect(ctx, x, y, width, height, cornerRadius) {
  ctx.beginPath();
  ctx.moveTo(x + cornerRadius, y);
  ctx.arcTo(x + width, y, x + width, y + height, cornerRadius);
  ctx.arcTo(x + width, y + height, x, y + height, cornerRadius);
  ctx.arcTo(x, y + height, x, y, cornerRadius);
  ctx.arcTo(x, y, x + width, y, cornerRadius);
  ctx.closePath();
  ctx.stroke();
}

// Handle keydown event
function handleKeyDown(event) {
  if (event.key === "ArrowLeft") {
    moveCellsLeft();
  }
}

// Function to move cells to the left
function moveCellsLeft() {
  for (var row = 0; row < 4; row++) {
    for (var col = 1; col < 4; col++) {
      var currentCell = getCellValue(col, row);
      if (currentCell !== null) {
        var targetCol = col;
        while (targetCol > 0) {
          var leftCell = getCellValue(targetCol - 1, row);
          if (leftCell === null) {
            // Move current cell content to the left cell
            setCellValue(targetCol - 1, row, currentCell);
            clearCell(targetCol, row);
            targetCol--;
          } else if (leftCell === currentCell) {
            // Merge cells
            mergeCells(targetCol - 1, row, targetCol, row);
            clearCell(col, row);
            break;
          } else {
            // Stop moving if the left cell is not empty or different value
            break;
          }
        }
      }
    }
  }
}

// Function to get the value of a cell at specific column and row
function getCellValue(col, row) {
  // Implement your own logic to retrieve the value of a cell
  // based on its column and row position
  // Replace with your own code
  return null;
}

// Function to set the value of a cell at specific column and row
function setCellValue(col, row, value) {
  // Implement your own logic to set the value of a cell
  // based on its column and row position
  // Replace with your own code
}

// Function to clear the content of a cell at specific column and row
function clearCell(col, row) {
  // Implement your own logic to clear the content of a cell
  // based on its column and row position
  // Replace with your own code
}

// Function to merge two cells at specific column and row positions
function mergeCells(targetCol, targetRow, sourceCol, sourceRow) {
  // Implement your own logic to merge two cells
  // based on their column and row positions
  // Replace with your own code
}

function addElementsToCells(ctx, col, row, number, cellColor, removeBorder) {
  // Calculate grid properties
  var gridSize = Math.min(canvas.width, canvas.height) * 0.8; // Adjust the size of the grid
  var cellSize = gridSize / 4;
  var spacing = cellSize * 0.1; // Adjust the spacing percentage
  var gridOffsetX = (canvas.width - gridSize) / 2;
  var gridOffsetY = (canvas.height - gridSize) / 2;

  // Calculate the position and dimensions of the cell
  var cellX = gridOffsetX + col * (cellSize + spacing);
  var cellY = gridOffsetY + row * (cellSize + spacing);
  var numberX = cellX + cellSize / 2;
  var numberY = cellY + cellSize / 2;
  var numberSize = cellSize * 0.8; // Adjust the size of the number

  // Remove cell border if specified
  if (removeBorder) {
    ctx.clearRect(cellX, cellY, cellSize, cellSize);
  }

  ctx.fillStyle = cellColor;
  ctx.fillRect(cellX, cellY, cellSize, cellSize);

  ctx.fillStyle = "black";
  ctx.font = numberSize + "px Arial"; // Set font size as a percentage of cellSize
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(number.toString(), numberX, numberY);
}
