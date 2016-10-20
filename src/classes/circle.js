import Item from './item';

export default class Circle extends Item {
    constructor(id, position, radius) {
        super(id);

        this.position = position;
        this.radius = radius;

        this.fillStyle = 'green';

        this.deltaY = 4;
        this.deltaX = 0;
    }

    update(game) {

        super.update(game);

        for (let key in this.game.gameObjects) {
            if (this.game.gameObjects.hasOwnProperty(key)) {
                let go = this.game.gameObjects[key];

                let distX = Math.abs(this.position.x - go.position.x - go.size.width / 2);
                let distY = Math.abs(this.position.y - go.position.y - go.size.height / 2);

                if ((distX > (go.size.width / 2 + this.radius)) ||
                    (distY > (go.size.height / 2 + this.radius))) {
                    continue;
                }

                if ((distX <= (go.size.width / 2)) ||
                    (distY <= (go.size.height / 2))) {
                    this.handleCollision(go);
                } else {
                    let dx = distX - go.size.width / 2;
                    let dy = distY - go.size.height / 2;

                    if (dx * dx + dy * dy <= (this.radius * this.radius)) {
                        this.handleCollision(go);
                    }
                }
            }
        }

        this.position.y += this.deltaY;
        this.position.x += this.deltaX;

    }

    handleCollision(go) {

        if (go.destroyable) {
            go.destroy();
        }

        this.deltaY = -this.deltaY;
    }

    draw() {
        super.draw();

        let game = this.game;

        game.ctx.beginPath();
        game.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);

        if (this.fillStyle) {
            game.ctx.fillStyle = this.fillStyle;
            game.ctx.fill();
        }

        game.ctx.closePath();
    }
}
