export class Level {
    constructor() {
        this.width = 100;
        this.height = 15;
        this.tiles = [];
        this.generateLevel();
    }

    generateLevel() {
        for (let y = 0; y < this.height; y++) {
            this.tiles[y] = [];
            for (let x = 0; x < this.width; x++) {
                let type = null;
                if (y >= 13) {
                    type = 'ground';
                } else if (y === 9 && x % 10 === 0 && x > 20) {
                    type = 'brick';
                } else if (y === 9 && x % 10 === 5 && x > 20) {
                    type = 'question';
                }
                
                this.tiles[y][x] = type;
            }
        }
    }

    getTile(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) return null;
        const type = this.tiles[y][x];
        if (!type) return null;

        return {
            type,
            isSolid: true
        };
    }

    draw(ctx, spritesheet, cameraX) {
        const startX = Math.floor(cameraX / 16);
        const endX = startX + Math.ceil(ctx.canvas.width / 16) + 1;

        for (let y = 0; y < this.height; y++) {
            for (let x = startX; x < endX; x++) {
                if (x < 0 || x >= this.width) continue;
                const type = this.tiles[y][x];
                if (!type) continue;

                let sx = 0, sy = 448; // Row 2 for tiles starts at 448
                let sSize = 128;
                if (type === 'ground') sx = 128;
                if (type === 'brick') sx = 256;
                if (type === 'question') sx = 384;

                ctx.drawImage(spritesheet, sx, sy, sSize, sSize, x * 16, y * 16, 16, 16);
            }
        }
    }
}
