// Variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const restartButton = document.getElementById('restartButton');
const startButton = document.getElementById('startButton');
const levelNotice = document.getElementById('levelNotice');
const gameOverNotice = document.getElementById('gameOverNotice');
const currentLevel = document.getElementById('currentLevel');
const finalLevel = document.getElementById('finalLevel');

const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');
const shootButton = document.getElementById('shootButton');

let player;
let bullets;
let enemies;
let score;
let level;
let enemySpeed;
let gameRunning;

// Key States
let keys = {
    ArrowLeft: false,
    ArrowRight: false,
    S: false
};

// Game Initialization
function initGame() {
    player = { x: 280, y: 350, width: 40, height: 40, color: 'lime' };
    bullets = [];
    enemies = [];
    score = 0;
    level = 1;
    enemySpeed = 3;
    gameRunning = true;
    canvas.style.display = 'block';
    startButton.style.display = 'none';
    restartButton.style.display = 'none';
    levelNotice.style.display = 'none';
    gameOverNotice.style.display = 'none';
    gameLoop();
}

// Controls
// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') keys.ArrowLeft = true;
    if (e.key === 'ArrowRight') keys.ArrowRight = true;
    if (e.key === 's' || e.key === 'S') keys.S = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') keys.ArrowLeft = false;
    if (e.key === 'ArrowRight') keys.ArrowRight = false;
    if (e.key === 's' || e.key === 'S') keys.S = false;
});

// Touch controls
if (leftButton && rightButton && shootButton) {
    leftButton.addEventListener('touchstart', () => keys.ArrowLeft = true);
    leftButton.addEventListener('touchend', () => keys.ArrowLeft = false);
    rightButton.addEventListener('touchstart', () => keys.ArrowRight = true);
    rightButton.addEventListener('touchend', () => keys.ArrowRight = false);
    shootButton.addEventListener('touchstart', () => keys.S = true);
    shootButton.addEventListener('touchend', () => keys.S = false);
}

function shootBullet() {
    bullets.push({ x: player.x + 18, y: player.y, width: 4, height: 10, color: 'red' });
}

// Game Loop
function gameLoop() {
    if (gameRunning) {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }
}

// Update Game State
function update() {
    // Player Movement
    if (keys.ArrowLeft && player.x > 0) player.x -= 5;
    if (keys.ArrowRight && player.x < canvas.width - player.width) player.x += 5;

    // Shoot Bullets
    if (keys.S) shootBullet();

    // Update Bullets
    bullets.forEach((bullet, index) => {
        bullet.y -= 10;
        if (bullet.y < 0) bullets.splice(index, 1);
    });

    // Spawn Enemies
    if (Math.random() < 0.02 + level * 0.005) {
        enemies.push({ x: Math.random() * (canvas.width - 40), y: 0, width: 40, height: 40, color: 'blue' });
    }

    // Update Enemies
    enemies.forEach((enemy, index) => {
        enemy.y += enemySpeed;
        if (enemy.y > canvas.height) enemies.splice(index, 1);
        if (collision(player, enemy)) {
            gameRunning = false;
            restartButton.style.display = 'block';
            showGameOverNotice();
        }
    });

    // Check Bullet-Enemy Collisions
    bullets.forEach((bullet, bIndex) => {
        enemies.forEach((enemy, eIndex) => {
            if (collision(bullet, enemy)) {
                bullets.splice(bIndex, 1);
                enemies.splice(eIndex, 1);
                score += 10;

                if (score >= 50) {
                    level++;
                    score = 0;
                    enemySpeed += 1;
                    showLevelNotice();
                }
            }
        });
    });
}

// Collision Detection
function collision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Draw Game
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    bullets.forEach((bullet) => {
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });

    enemies.forEach((enemy) => {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });

    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
    ctx.fillText(`Level: ${level}`, 500, 30);
}

// Notices
function showLevelNotice() {
    levelNotice.style.position = "relative";
    levelNotice.style.top = "20px"; // Adjust to position below game canvas
    levelNotice.style.display = 'block';
    levelNotice.textContent = `Level ${level}`;
    setTimeout(() => levelNotice.style.display = 'none', 2000);
}

function showGameOverNotice() {
    gameOverNotice.style.position = "relative";
    gameOverNotice.style.top = "20px"; // Adjust to position below game canvas
    gameOverNotice.style.display = 'block';
    finalLevel.textContent = level;
    setTimeout(() => gameOverNotice.style.display = 'none', 3000);
}

//test for monile view
// Start and Restart
startButton.addEventListener('click', initGame);
restartButton.addEventListener('click', initGame);

canvas.addEventListener('touchstart', (event) => {
    // Logic for touch-based movement or actions
    const touchX = event.touches[0].clientX;
    if (touchX < canvas.width / 2) {
        // Move player left
        playerX -= playerSpeed;
    } else {
        // Move player right
        playerX += playerSpeed;
    }
});

canvas.width = window.innerWidth * 0.9; // 90% of the screen width
canvas.height = window.innerHeight * 0.5; // 50% of the screen height

canvas.addEventListener('touchmove', (event) => {
    event.preventDefault();
});


particlesJS("particles-global", {
    "particles": {
        "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#ffffff" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5 },
        "size": { "value": 3, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
        "move": { "enable": true, "speed": 2, "direction": "none" }
    },
    "interactivity": {
        "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" } }
    },
    "retina_detect": true
});
/*
// Particles for About Section

particlesJS("particles-about", {
    "particles": {
        "number": { "value": 50, "density": { "enable": true, "value_area": 600 } },
        "color": { "value": "#ff5733" },
        "shape": { "type": "triangle" },
        "opacity": { "value": 0.7 },
        "size": { "value": 4, "random": true },
        "line_linked": { "enable": false },
        "move": { "enable": true, "speed": 3, "direction": "top" }
    }
});

// Particles for Projects Section
particlesJS("particles-projects", {
    "particles": {
        "number": { "value": 75, "density": { "enable": true, "value_area": 700 } },
        "color": { "value": "#00bfff" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.6 },
        "size": { "value": 2, "random": true },
        "line_linked": { "enable": true, "distance": 100, "color": "#00bfff", "opacity": 0.5 },
        "move": { "enable": true, "speed": 1, "direction": "none" }
    }
});
*/

const background = document.getElementById("interactive-background");

// Create particles
const particleCount = 50;
const particles = [];

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("interactive-element");
    background.appendChild(particle);
    particles.push({ element: particle, x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight });
}

// Track mouse movement
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Move particles
function animateParticles() {
    particles.forEach((particle, index) => {
        // Create a trailing effect
        particle.x += (mouseX - particle.x) * 0.05;
        particle.y += (mouseY - particle.y) * 0.05;

        particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();
