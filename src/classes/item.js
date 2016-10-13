/*
 *   Super class for game items
 * */

import Logger from './../logger';

export default class Item {
    constructor(name = 'Item', position = {
        x : 0,
        y : 0
    }, size = { width : 100, height : 100 }, activate = true) {
        this.name = name;
        this.position = position;
        this.size = size;
        this.activated = false;

        if (activate) {
            this.activate();
        }

    }

    setGame(game) {
        this.game = game;
    }

    activate() {
        Logger.print('debug', [
            'Activating game item:', this.name,
            'size of', this.size,
            'at position', this.position
        ]);

        if (!this.activated) {
            this.activated = true;
        }
    }

    update() {
        let game = this.game;

        game.ctx.clearRect(0, 0, game.canvasElement.width, game.canvasElement.height);
        game.ctx.beginPath();

        if (this.fillStyle) {
            game.ctx.fillStyle = this.fillStyle;
        }

        game.ctx.rect(this.position.x, this.position.y, this.size.width, this.size.height);
        game.ctx.fill();
        game.ctx.stroke();
    }
}
