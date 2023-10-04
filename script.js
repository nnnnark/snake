var blockSize = 25;
var rows = 20;
var cols = 15;
var board;
var context;

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var body = [];

var foodX;
var foodY;
var score = 0;

var gameOver = false;

window.onload = function () {
    board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext('2d');
    food();
    document.addEventListener('keyup', direction);
    setInterval(update, 125);
}

function update() {
    if(gameOver){
        return;
    }
    context.fillStyle = "white";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "black";
    context.fillRect(foodX, foodY, blockSize, blockSize)

    if(snakeX == foodX && snakeY == foodY){
        body.push([foodX, foodY]);
        score += 10;
        food();
    }

    for (let i = body.length - 1; i > 0; i--) {
        body[i] = body[i-1];
    }

    if(body.length){
        body[0] = [snakeX, snakeY];
    }

    context.fillStyle = "blue";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < body.length; i++) {
        context.fillRect(body[i][0],body[i][1], blockSize, blockSize);
    }
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert('Game over. Your score: ' + score);
    }

    for (let i = 0; i < body.length; i++) {
        if (snakeX == body[i][0] && snakeY == body[i][1]) {
            gameOver = true;
            alert('Game over. Your score: /n' + score);
        }
    }

}

function direction(e) {
    if(e.code == 'ArrowUp' && velocityY !== 1){
        velocityX = 0;
        velocityY = -1;
    }else if(e.code == 'ArrowDown' && velocityY !== -1){
        velocityX = 0;
        velocityY = 1;
    }else if(e.code == 'ArrowLeft' && velocityX !== 1){
        velocityX = -1;
        velocityY = 0;
    }else if(e.code == 'ArrowRight' && velocityX !== -1){
        velocityX = 1;
        velocityY = 0;
    }
}

function food() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}
