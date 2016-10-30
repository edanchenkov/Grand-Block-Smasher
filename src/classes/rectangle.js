import Item from './item';
import config from '../config'


export default class Rectangle extends Item {
    constructor(id, posistion, size, options = {}) {
        super(id);

        this.position = posistion;
        this.size = size;

        this.destroyable = options.destroyable;
        this.fillStyle = options.color || '#FF0000';

        // How much point this object brings
        this.score = 5;

        this.sound = new Audio(config.base64files.sounds.beep)

    }

    destroy() {
        super.destroy();

        if (config.sound) {
            this.sound.play();
        }
    }



    draw() {
        super.draw();

        let game = this.game;

        game.ctx.beginPath();
        game.ctx.rect(this.position.x, this.position.y, this.size.width, this.size.height);

        if (this.fillStyle) {
            game.ctx.fillStyle = this.fillStyle;
            game.ctx.fill();
        }

        game.ctx.closePath();
    }

}
