const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};

let score = 0;
let d;
let firstGame = true;

// A* pathfinding
function findPath(start, end, grid) {
    let openSet = [start];
    let closedSet = [];
    let path = [];

    function heuristic(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    while (openSet.length > 0) {
        let lowestIndex = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[lowestIndex].f) {
                lowestIndex = i;
            }
        }

        let current = openSet[lowestIndex];

        if (current.x === end.x && current.y === end.y) {
            let temp = current;
            path.push(temp);
            while (temp.previous) {
                path.push(temp.previous);
                temp = temp.previous;
            }
            return path.reverse();
        }

        openSet.splice(lowestIndex, 1);
        closedSet.push(current);

        let neighbors = [];
        let x = current.x;
        let y = current.y;

        if (x > 0) neighbors.push(grid[x - 1][y]);
        if (x < grid.length - 1) neighbors.push(grid[x + 1][y]);
        if (y > 0) neighbors.push(grid[x][y - 1]);
        if (y < grid[0].length - 1) neighbors.push(grid[x][y + 1]);

        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];

            if (!closedSet.includes(neighbor) && !neighbor.isWall) {
                let tempG = current.g + 1;

                if (openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                    }
                } else {
                    neighbor.g = tempG;
                    openSet.push(neighbor);
                }

                neighbor.h = heuristic(neighbor, end);
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.previous = current;
            }
        }
    }

    return []; // No path found
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // AI logic using A*
    let grid = [];
    for (let i = 0; i < canvas.width / box; i++) {
        grid[i] = [];
        for (let j = 0; j < canvas.height / box; j++) {
            grid[i][j] = { x: i, y: j, isWall: false, g: 0, h: 0, f: 0, previous: undefined };
        }
    }

    for (let i = 0; i < snake.length; i++) {
        grid[snake[i].x / box][snake[i].y / box].isWall = true;
    }

    let startNode = grid[snakeX / box][snakeY / box];
    let endNode = grid[food.x / box][food.y / box];

    let path = findPath(startNode, endNode, grid);

    if (path.length > 1) {
        let nextMove = path[1];
        if (nextMove.x * box > snakeX) d = "RIGHT";
        else if (nextMove.x * box < snakeX) d = "LEFT";
        else if (nextMove.y * box > snakeY) d = "DOWN";
        else if (nextMove.y * box < snakeY) d = "UP";
    } else {
        // Survival mode: if no path, just move to a valid adjacent cell
        const directions = ["UP", "DOWN", "LEFT", "RIGHT"];
        let validMoves = [];
        for (const dir of directions) {
            let testX = snakeX;
            let testY = snakeY;
            if (dir === "LEFT") testX -= box;
            if (dir === "UP") testY -= box;
            if (dir === "RIGHT") testX += box;
            if (dir === "DOWN") testY += box;

            let newHead = { x: testX, y: testY };
            if (testX >= 0 && testY >= 0 && testX < canvas.width && testY < canvas.height && !collision(newHead, snake)) {
                validMoves.push(dir);
            }
        }
        if (validMoves.length > 0) {
            d = validMoves[Math.floor(Math.random() * validMoves.length)];
        } else {
            // No valid moves, snake will die
        }
    }

    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box
        };
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        if (firstGame && score < 3) {
            snake = [];
            snake[0] = { x: 9 * box, y: 10 * box };
            score = 0;
            d = null;
        } else {
            firstGame = false;
            clearInterval(game);
            game = setInterval(draw, 100);
            snake = [];
            snake[0] = { x: 9 * box, y: 10 * box };
            score = 0;
            d = null;
        }
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}


// Set canvas size
const content = document.querySelector('.content');
canvas.width = content.clientWidth - 10;
canvas.height = content.clientHeight - 10;

let game = setInterval(draw, 100);