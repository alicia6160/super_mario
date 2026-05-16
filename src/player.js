export class Player {
    constructor() {
        this.x = 50;
        this.y = 100;
        this.width = 16;
        this.height = 16;
        this.vx = 0;
        this.vy = 0;
        this.speed = 0.5;
        this.maxSpeed = 3;
        this.jumpForce = -8;
        this.onGround = false;
        this.direction = 1; // 1 for right, -1 for left
        this.state = 'idle'; // idle, run, jump, skid
        this.frame = 0;
        this.frameTimer = 0;
    }

    update(input) {
        // Horizontal movement
        if (input.left) {
            this.vx -= this.speed;
            this.direction = -1;
        } else if (input.right) {
            this.vx += this.speed;
            this.direction = 1;
        }

        // Limit speed
        if (this.vx > this.maxSpeed) this.vx = this.maxSpeed;
        if (this.vx < -this.maxSpeed) this.vx = -this.maxSpeed;

        // Jump
        if (input.jump && this.onGround) {
            this.vy = this.jumpForce;
            this.onGround = false;
        }

        // Update state and animation
        this.updateAnimation();
    }

    updateAnimation() {
        if (!this.onGround) {
            this.state = 'jump';
        } else if (Math.abs(this.vx) > 0.1) {
            this.state = 'run';
            this.frameTimer++;
            if (this.frameTimer > 5) {
                this.frame = (this.frame + 1) % 3;
                this.frameTimer = 0;
            }
        } else {
            this.state = 'idle';
            this.frame = 0;
        }
    }

    draw(ctx, spritesheet) {
        let sx = 0;
        let sy = 320; // Mario row starts at 320
        let sSize = 128; // Each sprite is 128x128

        // Based on analysis: Mario starts at X=128
        if (this.state === 'idle') sx = 128;
        if (this.state === 'run') sx = 128 + (this.frame + 1) * 128;
        if (this.state === 'jump') sx = 128 + 4 * 128;

        ctx.save();
        if (this.direction === -1) {
            ctx.translate(this.x + this.width, this.y);
            ctx.scale(-1, 1);
            ctx.drawImage(spritesheet, sx, sy, sSize, sSize, 0, 0, 16, 16);
        } else {
            ctx.drawImage(spritesheet, sx, sy, sSize, sSize, this.x, this.y, 16, 16);
        }
        ctx.restore();
    }
}
