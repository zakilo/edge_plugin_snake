function startGame() {
    // Get the canvas element and its context
    var canvas = document.getElementById("snake");
    var ctx = canvas.getContext("2d");

    // Create the snake
    var snake = [];
    var x = 150;
    var y = 150;
    var size = 5;

    // Set the initial position and size of the snake
    snake.push({x: x, y: y, size: size});

    // Draw the snake on the canvas
    drawSnake(ctx);

    // Move the snake
    moveSnake();

    // Check if the snake collided with a wall or food
    checkCollisions(ctx);
}

function drawSnake(ctx) {
    // Draw the snake on the canvas
    for (var i = 0; i < snake.length; i++) {
        var cell = snake[i];
        var x = cell.x;
        var y = cell.y;
        var size = cell.size;

        ctx.fillStyle = "gray";
        ctx.fillRect(x, y, size, size);

        if (i == 0) {
            ctx.fillStyle = "red";
        } else {
            ctx.fillStyle = "green";
        }
        ctx.fillRect(x, y, size, size);
    }
}

function moveSnake() {
    var moveDistance = 10;

    // Get the head of the snake
    var head = snake[0];

    // If the snake reached the end of the canvas
    if (head.x == 400 && head.y == 400) {
        // Remove the first snake from the array
        snake.splice(0, 1);

        // Increase the score
        alert("Score: " + snake.length + " points");

        // Create a new snake with a random length and position
        var snake = [];
        var x = Math.floor(Math.random() * 400);
        var y = Math.floor(Math.random() * 400);
        var size = Math.floor(Math.random() * 10) + 5;
        snake.push({x: x, y: y, size: size});

        // Redraw the snake
        drawSnake(ctx);

        // Check if the snake collided with a wall or food
        checkCollisions(ctx);
    } else {
        // Set the head of the snake to the next cell
        head.x += moveDistance;
        head.y += moveDistance;

        // Check if the snake collided with a wall or food
        checkCollisions(ctx);
    }
}

function checkCollisions(ctx) {
    var walls = [];

    // Loop through the array of cells
    for (var i = 0; i < snake.length; i++) {
        var cell = snake[i];

        // If the snake collided with a wall
        if (cell.x < 0 || cell.x >= 400 || cell.y < 0 || cell.y >= 400) {
            // Remove the snake from the array
            snake.splice(i, 1);

            // Decrease the score
            alert("Score: " + snake.length + " points");

            // Reset the snake position
            cell.x = cell.y = 0;
            cell.size = 5;

            // Check if the snake collided with a wall or food
            checkCollisions(ctx);
        }

        // Add the cell to the array of walls
        walls.push({x: cell.x, y: cell.y});
    }

    // Check if there is any wall
    if (walls.length > 0) {
        // Select the random wall
        var randomWall = walls[Math.floor(Math.random() * walls.length)];

        // Move the snake away from the wall
        snake.forEach(function(cell) {
            if (cell.x == randomWall.x && cell.y == randomWall.y) {
                cell.x = Math.floor(Math.random() * 400);
                cell.y = Math.floor(Math.random() * 400);
                cell.size = Math.floor(Math.random() * 10) + 5;
            }
        });
    }
}

// Function to start the game
document.getElementById("start-game-button").addEventListener("click", function() {
    // Reset the snake
    snake = [];

    // Clear the canvas
    ctx.clearRect(0, 0, 400, 400);

    // Draw the snake on the canvas
    drawSnake(ctx);

    // Start the game loop
    setInterval(moveSnake, 50);
});