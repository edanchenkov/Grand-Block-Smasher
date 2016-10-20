import Rectangle from './rectangle';

let events = ['keyup', 'keydown'];

export default class Paddle extends Rectangle {
    constructor(id, posistion, size) {
        super(id);

        this.position = posistion;
        this.size = size;
        this.destroyable = false;
        this.fillStyle = 'blue';

        events.map((e) => {
            document.addEventListener(e, (e) => {
                let key = e && e.keyCode;

                if (key === 37) {
                    //    Go left
                    this.position.x -= 10.5;
                } else if (key === 39) {
                    // Go right
                    this.position.x += 10.5;
                }
            });
        });

    }

    update(game) {
        super.update(game);
    }

}
