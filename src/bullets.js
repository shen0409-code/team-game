import { ctx, canvas } from './main.js';

export class BulletManager {
    constructor() {
        this.bullets = [];
    }

    // 發射 3 方向散射子彈
    shoot(x, y) {
        const angles = [-0.2, 0, 0.2];
        angles.forEach(angle => {
            this.bullets.push({
                x: x,
                y: y,
                vx: Math.sin(angle) * 10,
                vy: -Math.cos(angle) * 10,
                radius: 4,
                color: '#ffcc00'
            });
        });
    }

    update() {
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            const b = this.bullets[i];
            b.x += b.vx;
            b.y += b.vy;

            // 超出螢幕邊界自動清除
            if (b.y < -10 || b.x < -10 || b.x > canvas.width + 10) {
                this.bullets.splice(i, 1);
            }
        }
    }

    draw() {
        this.bullets.forEach(b => {
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
            ctx.fillStyle = b.color;
            ctx.fill();
            ctx.closePath();
        });
    }
}