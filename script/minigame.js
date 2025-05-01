
// Mini-jogo Data Breaker
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start-game');
const pauseButton = document.getElementById('pause-game');
const scoreElement = document.getElementById('score');

// Configurações do jogo
const game = {
    running: false,
    paused: false,
    score: 0,
    lives: 3,
    level: 1,
    brickRowCount: 4,
    brickColumnCount: 6,
    brickWidth: 50,
    brickHeight: 20,
    brickPadding: 10,
    brickOffsetTop: 50,
    brickOffsetLeft: 30,
    ballRadius: 8,
    paddleHeight: 10,
    paddleWidth: 80,
    dx: 3,
    dy: -3,
    colors: ['#38bdf8', '#0ea5e9', '#0284c7', '#0369a1']
};

let ball = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    dx: game.dx,
    dy: game.dy
};

let paddle = {
    x: (canvas.width - game.paddleWidth) / 2,
    y: canvas.height - game.paddleHeight - 10,
    width: game.paddleWidth,
    height: game.paddleHeight,
    dx: 8
};

// Criar blocos
let bricks = [];

function createBricks() {
    bricks = [];
    for (let c = 0; c < game.brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < game.brickRowCount; r++) {
            bricks[c][r] = {
                x: 0,
                y: 0,
                status: 1,
                color: game.colors[r % game.colors.length],
                points: (game.brickRowCount - r) * 10
            };
        }
    }
}

// Eventos de teclado
let rightPressed = false;
let leftPressed = false;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

// Desenhar elementos
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, game.ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = game.colors[0];
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = game.colors[2];
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (let c = 0; c < game.brickColumnCount; c++) {
        for (let r = 0; r < game.brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = c * (game.brickWidth + game.brickPadding) + game.brickOffsetLeft;
                const brickY = r * (game.brickHeight + game.brickPadding) + game.brickOffsetTop;

                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;

                ctx.beginPath();
                ctx.rect(brickX, brickY, game.brickWidth, game.brickHeight);
                ctx.fillStyle = bricks[c][r].color;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Detectar colisões
function collisionDetection() {
    for (let c = 0; c < game.brickColumnCount; c++) {
        for (let r = 0; r < game.brickRowCount; r++) {
            const b = bricks[c][r];

            if (b.status === 1) {
                if (
                    ball.x > b.x &&
                    ball.x < b.x + game.brickWidth &&
                    ball.y > b.y &&
                    ball.y < b.y + game.brickHeight
                ) {
                    ball.dy = -ball.dy;
                    b.status = 0;
                    game.score += b.points;
                    scoreElement.textContent = game.score;

                    // Verificar vitória
                    checkWin();
                }
            }
        }
    }
}

function checkWin() {
    let bricksRemaining = 0;

    for (let c = 0; c < game.brickColumnCount; c++) {
        for (let r = 0; r < game.brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                bricksRemaining++;
            }
        }
    }

    if (bricksRemaining === 0) {
        game.level++;
        game.running = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '20px Arial';
        ctx.fillStyle = 'var(--accent)';
        ctx.textAlign = 'center';
        ctx.fillText(`Parabéns! Você completou o nível ${game.level - 1}!`, canvas.width / 2, canvas.height / 2);
        ctx.fillText(`Pontuação: ${game.score}`, canvas.width / 2, canvas.height / 2 + 30);

        startButton.style.display = 'inline-block';
        pauseButton.style.display = 'none';

        // Aumentar dificuldade para o próximo nível
        game.brickRowCount = Math.min(game.brickRowCount + 1, 6);
        ball.dx = game.dx * (1 + game.level * 0.1);
        ball.dy = game.dy * (1 + game.level * 0.1);
    }
}

// Loop principal do jogo
function draw() {
    if (!game.running || game.paused) {
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    // Colisão com paredes
    if (ball.x + ball.dx > canvas.width - game.ballRadius || ball.x + ball.dx < game.ballRadius) {
        ball.dx = -ball.dx;
    }

    // Colisão com teto
    if (ball.y + ball.dy < game.ballRadius) {
        ball.dy = -ball.dy;
    }
    // Colisão com paddle ou game over
    else if (ball.y + ball.dy > canvas.height - game.ballRadius - paddle.height) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            // Alterar ângulo baseado em onde a bola atingiu o paddle
            const hitPoint = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
            ball.dx = hitPoint * 5; // Altera o ângulo baseado na posição do hit
            ball.dy = -ball.dy;
        } else if (ball.y + ball.dy > canvas.height - game.ballRadius) {
            // Game over
            game.running = false;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = '20px Arial';
            ctx.fillStyle = 'var(--accent)';
            ctx.textAlign = 'center';
            ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
            ctx.fillText(`Pontuação final: ${game.score}`, canvas.width / 2, canvas.height / 2 + 30);

            startButton.style.display = 'inline-block';
            pauseButton.style.display = 'none';

            // Resetar para o primeiro nível
            game.level = 1;
            game.score = 0;
            scoreElement.textContent = 0;
            return;
        }
    }

    // Mover paddle
    if (rightPressed && paddle.x < canvas.width - paddle.width) {
        paddle.x += paddle.dx;
    } else if (leftPressed && paddle.x > 0) {
        paddle.x -= paddle.dx;
    }

    // Mover bola
    ball.x += ball.dx;
    ball.y += ball.dy;

    requestAnimationFrame(draw);
}

// Iniciar jogo
startButton.addEventListener('click', () => {
    game.running = true;
    ball = {
        x: canvas.width / 2,
        y: canvas.height - 30,
        dx: game.dx * (1 + (game.level - 1) * 0.1),
        dy: game.dy * (1 + (game.level - 1) * 0.1)
    };
    paddle = {
        x: (canvas.width - game.paddleWidth) / 2,
        y: canvas.height - game.paddleHeight - 10,
        width: game.paddleWidth,
        height: game.paddleHeight,
        dx: 8
    };
    createBricks();
    startButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
    draw();
});

// Pausar/Continuar jogo
pauseButton.addEventListener('click', () => {
    game.paused = !game.paused;
    if (game.paused) {
        pauseButton.innerHTML = '<i class="fas fa-play"></i> Continuar';
    } else {
        pauseButton.innerHTML = '<i class="fas fa-pause"></i> Pausar';
        draw();
    }
});

// Inicializar o jogo
createBricks();
ctx.font = '16px Arial';
ctx.fillStyle = 'var(--accent)';
ctx.textAlign = 'center';
ctx.fillText('Clique em "Iniciar Jogo" para começar!', canvas.width / 2, canvas.height / 2);