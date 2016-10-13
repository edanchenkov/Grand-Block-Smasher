import Logger from './../logger';

import Item from './item';

let events = ['keyup', 'keydown'];

export default class Paddle extends Item {
    constructor(size, position) {
        super('Paddle', size, position);

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
        super.update()
    }
}
