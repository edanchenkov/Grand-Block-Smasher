/*
 *   Super class for game items
 * */

import Logger from './../logger';

export default class Item {
    constructor(...args) {

        this.id = args[0];

    }

    setGame(game) {
        this.game = game;
    }

    update() {

        if (typeof this.game === 'undefined') {
            Logger.print('debug', ['Game must be defined to update', this]);
            return false;
        }

    }
}
