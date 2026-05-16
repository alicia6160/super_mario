export class Physics {
    static GRAVITY = 0.5;
    static FRICTION = 0.8;
    static TERMINAL_VELOCITY = 10;

    static applyGravity(entity) {
        if (!entity.onGround) {
            entity.vy += this.GRAVITY;
            if (entity.vy > this.TERMINAL_VELOCITY) {
                entity.vy = this.TERMINAL_VELOCITY;
            }
        }
    }

    static applyFriction(entity) {
        if (entity.onGround) {
            entity.vx *= this.FRICTION;
            if (Math.abs(entity.vx) < 0.1) entity.vx = 0;
        }
    }

    static checkCollision(entity, world) {
        entity.onGround = false;

        // X-axis collision
        const newX = entity.x + entity.vx;
        if (!this.isCollidingAt(newX, entity.y, entity.width, entity.height, world)) {
            entity.x = newX;
        } else {
            entity.vx = 0;
        }

        // Y-axis collision
        const newY = entity.y + entity.vy;
        if (!this.isCollidingAt(entity.x, newY, entity.width, entity.height, world)) {
            entity.y = newY;
        } else {
            if (entity.vy > 0) {
                entity.onGround = true;
                entity.y = Math.floor(newY / 16) * 16; // Snap to tile top
            }
            entity.vy = 0;
        }
    }

    static isCollidingAt(x, y, width, height, world) {
        const left = Math.floor(x / 16);
        const right = Math.floor((x + width - 1) / 16);
        const top = Math.floor(y / 16);
        const bottom = Math.floor((y + height - 1) / 16);

        for (let row = top; row <= bottom; row++) {
            for (let col = left; col <= right; col++) {
                if (world.getTile(col, row)?.isSolid) {
                    return true;
                }
            }
        }
        return false;
    }
}
