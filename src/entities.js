export class Entity {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.vx = 0;
        this.vy = 0;
        this.onGround = false;
    }
}

export class Enemy extends Entity {
    constructor(x, y) {
        super(x, y, 16, 16);
        this.direction = -1;
        this.speed = 0.5;
    }

    update(world) {
        // Simple patrol logic could go here
    }

    draw(ctx, spritesheet) {
        // Drawing logic for enemy
    }
}
