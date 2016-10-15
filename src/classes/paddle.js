import Item from './item';

let events = ['keyup', 'keydown'];

export default class Paddle extends Item {
    constructor(...args) {
        super(args);

        console.info(args)

        this.position = args[1];
        this.size = args[2];

        this.fillStyle = '#FF0000';

        events.map((e) => {
            document.addEventListener(e, e => this.handleUserInput(e));
        });

    }

    handleUserInput(e) {
        let key = e.keyCode;

        if (key === 37) {
            //    Go left
            this.position.x -= 10.5;

        } else if (key === 39) {
            // Go right
            this.position.x += 10.5;
        }
    }

    update() {

        super.update();

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
