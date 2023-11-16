document.addEventListener('DOMContentLoaded', () => {
    const snake = document.getElementById('snake');
    const food = document.getElementById('food');
    let snakeArray = [{ x: 0, y: 0 }];
    let direction = 'right';

    function update() {
        // Update snake position
        for (let i = snakeArray.length - 1; i > 0; i--) {
            snakeArray[i] = { ...snakeArray[i - 1] };
        }

        // Update snake head based on direction
        if (direction === 'up') snakeArray[0].y -= 20;
        if (direction === 'down') snakeArray[0].y += 20;
        if (direction === 'left') snakeArray[0].x -= 20;
        if (direction === 'right') snakeArray[0].x += 20;

        // Check for collisions
        if (
            snakeArray[0].x < 0 ||
            snakeArray[0].x >= 300 ||
            snakeArray[0].y < 0 ||
            snakeArray[0].y >= 300
        ) {
            alert('Game Over!');
            resetGame();
            return;
        }

        // Check for food collision
        if (
            snakeArray[0].x === food.offsetLeft &&
            snakeArray[0].y === food.offsetTop
        ) {
            // Increase snake length
            snakeArray.push({ x: snakeArray[0].x, y: snakeArray[0].y });
            // Move food to a new random position
            moveFood();
        }

        // Update snake and food positions on the screen
        render();
    }

    function render() {
        // Render snake
        snake.style.left = snakeArray[0].x + 'px';
        snake.style.top = snakeArray[0].y + 'px';

        // Render food
        food.style.left = foodPosition.x + 'px';
        food.style.top = foodPosition.y + 'px';
    }

    function moveFood() {
        foodPosition.x = getRandomPosition(0, 14) * 20;
        foodPosition.y = getRandomPosition(0, 14) * 20;

        // Ensure food doesn't overlap with the snake
        for (const segment of snakeArray) {
            if (foodPosition.x === segment.x && foodPosition.y === segment.y) {
                moveFood();
                return;
            }
        }
    }

    function getRandomPosition(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min) * 20;
    }

    function resetGame() {
        snakeArray = [{ x: 0, y: 0 }];
        direction = 'right';
        moveFood();
    }

    // Initial setup
    const foodPosition = { x: 100, y: 100 };
    moveFood();

    // Game loop
    setInterval(update, 200);

    // Handle keyboard input
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp' && direction !== 'down') direction = 'up';
        if (event.key === 'ArrowDown' && direction !== 'up') direction = 'down';
        if (event.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
        if (event.key === 'ArrowRight' && direction !== 'left') direction = 'right';
    });
});
