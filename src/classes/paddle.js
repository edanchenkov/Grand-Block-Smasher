import Rectangle from './rectangle';

let events = ['keyup', 'keydown'];

export default class Paddle extends Rectangle {
    constructor(id, posistion, size, options = {}) {
        super(id);

        this.position = posistion;
        this.size = size;

        this.speed = 10;

        this.destroyable = options.destroyable;
        this.fillStyle = options.color || 'blue';

        this.handleKeyboardInput = false;

    }

    update(game) {
        super.update(game);

        if (!this.handleKeyboardInput) {
            this.registerKeyboardEvents();
            this.handleKeyboardInput = true;
        }
    }

    registerKeyboardEvents() {
        let step = 3 * this.speed;

        events.map((e) => {
            document.addEventListener(e, (e) => {
                let key = e && e.keyCode;

                if (key === 37) {
                    //    Go left
                    if (this.position.x - this.size.width < 0) {
                        this.position.x = 0;
                    } else {
                        this.position.x -= step;
                    }
                }

                if (key === 39) {
                    // Go right
                    if ((this.position.x + this.size.width + step >= this.game.canvasElement.width)) {
                        this.position.x = this.game.canvasElement.width - this.size.width;
                    } else {
                        this.position.x += step;
                    }
                }
            });
        });
    }

}
