export const canvas = document.getElementById('gameCanvas');
export const ctx = canvas.getContext('2d');

import { BulletManager } from './bullets.js';
import { ScreenShake, playLaserSound } from './juice.js';

const bulletManager = new BulletManager();
const screenShake = new ScreenShake();

export const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 30,
    speed: 6,
    color: '#00f0f0'
};

export const keys = {};
window.addEventListener('keydown', (e) => keys[e.code] = true);
window.addEventListener('keyup', (e) => keys[e.code] = false);

let canShoot = true;
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && canShoot) {
        bulletManager.shoot(player.x + player.width / 2, player.y);
        screenShake.trigger(6, 8);
        playLaserSound();
        canShoot = false;
    }
});
window.addEventListener('keyup', (e) => {
    if (e.code === 'Space') canShoot = true;
});

function updatePlayer() {
    if ((keys['ArrowLeft'] || keys['KeyA']) && player.x > 0) {
        player.x -= player.speed;
    }
    if ((keys['ArrowRight'] || keys['KeyD']) && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function gameLoop() {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    screenShake.apply();

    updatePlayer();
    bulletManager.update();

    drawPlayer();
    bulletManager.draw();

    ctx.restore();
    requestAnimationFrame(gameLoop);
}

gameLoop();