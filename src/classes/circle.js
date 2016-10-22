import Item from './item';

export default class Circle extends Item {
    constructor(id, position, radius, options = {}) {
        super(id);

        this.position = position;
        this.radius = radius;

        this.destroyable = options.destroyable;
        this.fillStyle = options.color || 'green';

        this.angle = 45;
        this.radians = this.angle * Math.PI / 180;

        this.deltaY = 4;
        this.deltaX = 4;

    }

    update(game) {

        super.update(game);

        if ((this.position.y - this.radius) > this.game.canvasElement.height) {
            this.game.gameOver();
        } else {

            if (this.position.x > this.game.canvasElement.width || this.position.x < 0) {
                this.angle = 180 - this.angle;
            } else if (this.position.y < 0) {
                this.angle = 360 - this.angle;
            } else {
                for (let key in this.game.gameObjects) {
                    if (this.game.gameObjects.hasOwnProperty(key)) {
                        let go = this.game.gameObjects[key];

                        if (go.id === this.game.ballId) {
                            continue;
                        }

                        let distX = Math.abs(this.position.x - go.position.x - go.size.width / 2);
                        let distY = Math.abs(this.position.y - go.position.y - go.size.height / 2);

                        if ((distX > (go.size.width / 2 + this.radius)) ||
                            (distY > (go.size.height / 2 + this.radius))) {
                            continue;
                        }

                        if ((distX <= (go.size.width / 2)) ||
                            (distY <= (go.size.height / 2))) {
                            this.angle = 360 - this.angle;
                            this.handleCollision(go);
                        } else {
                            let dx = distX - go.size.width / 2;
                            let dy = distY - go.size.height / 2;

                            if (dx * dx + dy * dy <= (this.radius * this.radius)) {
                                this.angle = 180 - this.angle;
                                this.handleCollision(go);
                            }
                        }
                    }
                }
            }

            this.radians = this.angle * Math.PI / 180;

            this.deltaY = Math.sin(this.radians) * 4;
            this.deltaX = Math.cos(this.radians) * 4;


            this.position.y += this.deltaY;
            this.position.x += this.deltaX;
        }
    }

    handleCollision(go) {

        if (go && go.destroyable) {
            go.destroy();
        }


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
