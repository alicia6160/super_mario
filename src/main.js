import { Player } from './player.js';
import { Level } from './level.js';
import { Physics } from './physics.js';
import { Camera } from './camera.js';

class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // NES Resolution
        this.canvas.width = 256;
        this.canvas.height = 240;

        this.spritesheet = new Image();
        this.spritesheet.src = './assets/sprites.png';

        this.player = new Player();
        this.level = new Level();
        this.camera = new Camera(this.canvas.width, this.canvas.height, this.level.width * 16, this.level.height * 16);

        this.input = {
            left: false,
            right: false,
            jump: false
        };

        this.init();
    }

    init() {
        window.addEventListener('keydown', (e) => this.handleInput(e, true));
        window.addEventListener('keyup', (e) => this.handleInput(e, false));

        this.spritesheet.onload = () => {
            document.getElementById('loading-screen').style.display = 'none';
            this.loop();
        };
    }

    handleInput(e, isDown) {
        switch(e.key) {
            case 'ArrowLeft':
            case 'a':
                this.input.left = isDown;
                break;
            case 'ArrowRight':
            case 'd':
                this.input.right = isDown;
                break;
            case 'ArrowUp':
            case 'w':
            case ' ':
                this.input.jump = isDown;
                break;
        }
    }

    update() {
        this.player.update(this.input);
        Physics.applyGravity(this.player);
        Physics.applyFriction(this.player);
        Physics.checkCollision(this.player, this.level);
        this.camera.update(this.player.x);

        // Update HUD
        document.getElementById('score').innerText = '000000';
        document.getElementById('coins').innerText = 'x00';
    }

    draw() {
        this.ctx.fillStyle = '#5c94fc'; // Sky Blue
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();
        this.camera.apply(this.ctx);
        
        this.level.draw(this.ctx, this.spritesheet, this.camera.x);
        this.player.draw(this.ctx, this.spritesheet);

        this.ctx.restore();
    }

    loop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.loop());
    }
}

new Game();
