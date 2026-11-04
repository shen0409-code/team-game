// 遊戲主畫布設定
export const canvas = document.getElementById('gameCanvas');
export const ctx = canvas.getContext('2d');

// 玩家白模狀態
export const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 30,
    speed: 6,
    color: #00f0f0
};

// 按鍵監聽
export const keys = {};
window.addEventListener('keydown', (e) => keys[e.code] = true);
window.addEventListener('keyup', (e) => keys[e.code] = false);

// 移動邏輯
function updatePlayer() {
    if ((keys['ArrowLeft'] || keys['KeyA']) && player.x > 0) {
        player.x -= player.speed;
    }
    if ((keys['ArrowRight'] || keys['KeyD']) && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
}

// 繪製玩家
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// 遊戲主循環
function gameLoop() {
    // 清空畫布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 更新與繪製玩家
    updatePlayer();
    drawPlayer();

    requestAnimationFrame(gameLoop);
}

// 啟動遊戲
gameLoop();