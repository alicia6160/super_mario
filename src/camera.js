export class Camera {
    constructor(canvasWidth, canvasHeight, levelWidth, levelHeight) {
        this.x = 0;
        this.y = 0;
        this.width = canvasWidth;
        this.height = canvasHeight;
        this.levelWidth = levelWidth;
        this.levelHeight = levelHeight;
    }

    update(playerX) {
        // Center player
        let targetX = playerX - this.width / 2;

        // Constraint to level bounds
        if (targetX < 0) targetX = 0;
        if (targetX > this.levelWidth - this.width) targetX = this.levelWidth - this.width;

        // Smooth follow
        this.x += (targetX - this.x) * 0.1;
    }

    apply(ctx) {
        ctx.translate(-Math.floor(this.x), -Math.floor(this.y));
    }
}
