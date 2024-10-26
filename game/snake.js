class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('snakeCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 20;
        this.snake = [{x: 10, y: 10}];
        this.food = this.generateFood();
        this.direction = 'right';
        this.score = 0;
        this.gameInterval = null;
        this.gameSpeed = 100;

        // Bind methods
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.startGame = this.startGame.bind(this);
        
        // Event listeners
        document.addEventListener('keydown', this.handleKeyPress);
        document.getElementById('startSnake').addEventListener('click', this.startGame);
    }

    generateFood() {
        return {
            x: Math.floor(Math.random() * (this.canvas.width / this.gridSize)),
            y: Math.floor(Math.random() * (this.canvas.height / this.gridSize))
        };
    }

    drawSquare(x, y, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this.gridSize, y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
    }

    drawGame() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw snake
        this.snake.forEach((segment, index) => {
            this.drawSquare(segment.x, segment.y, index === 0 ? '#4CAF50' : '#45a049');
        });

        // Draw food
        this.drawSquare(this.food.x, this.food.y, 'red');
    }

    moveSnake() {
        const head = {...this.snake[0]};

        switch(this.direction) {
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'left': head.x--; break;
            case 'right': head.x++; break;
        }

        // Check collision with walls
        if (head.x < 0 || head.x >= this.canvas.width / this.gridSize ||
            head.y < 0 || head.y >= this.canvas.height / this.gridSize) {
            this.gameOver();
            return;
        }

        // Check collision with self
        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.gameOver();
            return;
        }

        this.snake.unshift(head);

        // Check if snake ate food
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            document.getElementById('score').textContent = this.score;
            this.food = this.generateFood();
        } else {
            this.snake.pop();
        }
    }

    handleKeyPress(event) {
        switch(event.key) {
            case 'ArrowUp':
                if (this.direction !== 'down') this.direction = 'up';
                break;
            case 'ArrowDown':
                if (this.direction !== 'up') this.direction = 'down';
                break;
            case 'ArrowLeft':
                if (this.direction !== 'right') this.direction = 'left';
                break;
            case 'ArrowRight':
                if (this.direction !== 'left') this.direction = 'right';
                break;
        }
    }

    gameOver() {
        clearInterval(this.gameInterval);
        alert(`Game Over! Score: ${this.score}`);
        this.reset();
    }

    reset() {
        this.snake = [{x: 10, y: 10}];
        this.direction = 'right';
        this.score = 0;
        document.getElementById('score').textContent = this.score;
        this.food = this.generateFood();
    }

    startGame() {
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
        }
        this.reset();
        this.gameInterval = setInterval(() => {
            this.moveSnake();
            this.drawGame();
        }, this.gameSpeed);
    }
}

// Initialize game when page loads
window.addEventListener('load', () => {
    const snakeGame = new SnakeGame();
});