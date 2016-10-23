import Logger from './../logger';

import Rectangle from './rectangle';

export default class Game {
    constructor(playerName = 'Default', ballId = 'ball') {

        this.playerName = playerName;
        this.ballId = ballId;

        this.gameObjects = {};
        this.updateInterval = undefined;

        this.canvasElement = document.createElement('canvas');
        this.ctx = this.canvasElement.getContext('2d');

        let canvasWidth = window.innerWidth * 0.75;
        let canvasHeight = window.innerHeight * 0.75;

        this.canvasElement.style.backgroundColor = 'white';

        this.canvasElement.width = canvasWidth;
        this.canvasElement.height = canvasHeight;

        document.body.appendChild(this.canvasElement);
    }

    render(go) {
        go.update(this);
        go.draw();
    }

    addGameObject(go) {

        if (typeof go !== 'object' || !go.hasOwnProperty('id')) {
            Logger.print('error', ['Invalid game item']);
            return;
        }

        if (this.gameObjects.hasOwnProperty(go.id)) {
            Logger.print('error', ['Object with this id is already added', go.id]);
            return;
        }

        this.gameObjects[go.id] = go;

        return go;
    }

    runUpdateLoop() {

        if (typeof this.updateInterval !== 'undefined') {
            Logger.print('error', ['Loop is already running']);
            return;
        }

        this.updateInterval = setInterval(() => {

            if (Object.keys(this.gameObjects).length === 2) {
                this.generateBlocks();
                return;
            }

            this.clearCanvas();
            for (var key in this.gameObjects) {
                if (this.gameObjects.hasOwnProperty(key)) {
                    this.render(this.gameObjects[key]);
                }
            }
        }, 10)
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

    start() {

        for (let key in this.gameObjects) {
            if (this.gameObjects.hasOwnProperty(key)) {
                let go = this.gameObjects[key];
                this.render(go);
            }
        }

        this.runUpdateLoop();
    }

    pause() {

    }

    gameOver() {
        Logger.print('info', ['Game is over']);
        clearInterval(this.updateInterval);
        // this.clearCanvas();
    }

    generateBlocks(numOfBlocks = 15, size = [30, 30], gap = 20) {

        Logger.print('info', ['Generating block', arguments]);

        let go, position = [gap, size[1]];

        for (var i = 1; i <= numOfBlocks; i++) {

            if (go) {
                position[0] = go.position.x + go.size.width + gap;
            }

            if (position[0] + size[0] > this.canvasElement.width) {
                position[0] = gap;
                position[1] += 100;
            }

            go = this.addGameObject(new Rectangle('block_' + i, {
                x : position[0],
                y : position[1]
            }, {
                width : size[0],
                height : size[1]
            }, {
                destroyable : true
            }));
        }
    }

    remove(go) {
        delete this.gameObjects[go.id];
        go.destroy();
    }

}
