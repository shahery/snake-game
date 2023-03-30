const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cellSize = 10;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const numCols = canvasWidth / cellSize;
const numRows = canvasHeight / cellSize;
const startButton = document.getElementById('start-button');

let snake = [{x: 5, y: 5}, {x: 4, y: 5}, {x: 3, y: 5}];
let direction = "right";
let food = {x: Math.floor(Math.random() * numCols), y: Math.floor(Math.random() * numRows)};
let score = 0;

function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Draw snake
  ctx.fillStyle = "green";
  snake.forEach((cell) => {
    ctx.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
  });

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);

  // Update score
  document.getElementById("score").innerHTML = "Score: " + score;
}

function move() {
  // Move snake in current direction
  let head = {x: snake[0].x, y: snake[0].y};
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }

  // Check if snake hits wall or itself
  if (head.x < 0 || head.x >= numCols || head.y < 0 || head.y >= numRows) {
    // Game over
    clearInterval(interval);
    alert("Game over!");
  } else if (snake.some((cell) => cell.x === head.x && cell.y === head.y)) {
    // Game over
    clearInterval(interval);
    alert("Game over!");
  } else {
    // Move snake
    snake.unshift(head);

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
      // Increase score
      score++;

      // Generate new food
      food = {x: Math.floor(Math.random() * numCols), y: Math.floor(Math.random() * numRows)};
    } else {
      // Remove tail
      snake.pop();
    }
  }
}

function changeDirection(event) {
  // Change direction based on arrow key pressed
  switch (event.keyCode) {
    case 38:
      direction = "up";
      break;
    case 40:
      direction = "down";
      break;
    case 37:
      direction = "left";
      break;
    case 39:
      direction = "right";
      break;
  }
}

// Start game
let interval = setInterval(() => {
  move();
  draw();
}, 100);

function startGame() {
    gameOver = false;
    score = 0;
    // rest of the game setup code
}
  
  

// Listen for arrow key presses
document.addEventListener("keydown", changeDirection);

// for showing the score
scoreValueElement.textContent = score;

// start game button
startButton.addEventListener('click', startGame);
