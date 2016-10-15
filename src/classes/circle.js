import Item from './item';

export default class Circle extends Item {
    constructor(...args) {
        super(args);

        this.position = args[1];
        this.radius = args[2];
    }

    update() {
        super.update();

        let game = this.game;

        game.ctx.beginPath();
        game.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);

        game.ctx.stroke();
    }
}
