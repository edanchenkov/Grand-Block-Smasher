/*
 *   Super class for game items
 * */

import Logger from './../logger';

export default class Item {
    constructor(id) {
        Logger.print('info', ['Create new game object', this]);
        this.id = id;
    }

    update(game) {
        this.game = this.game || game;
    }

    destroy() {
        Logger.print('info', ['Destroy game object', this]);
        delete this.game.gameObjects[this.id];
    }

    draw() {
        if (typeof this.game === 'undefined') {
            Logger.print('debug', ['Game must be defined to update', this]);
            return false;
        }

        return true;
    }
}
