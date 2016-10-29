import Logger from './../logger';

import Rectangle from './rectangle';

export default class Game {
    constructor(playerName = 'Default', ballId = 'ball', speed = 3) {

        this.playerName = playerName;
        this.ballId = ballId;
        this.speed = speed;

        this.onUpdate = [];

        this.totalScore = 0;

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
        go.setGame(this);

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
        }, 10);

        this.updateScore();
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

    generateBlocks(numOfRows = 3, size = [30, 30], gap = 20) {

        Logger.print('info', ['Generating block', arguments]);

        let numOfBlocksPerRow = Math.floor(this.canvasElement.width / (size[0] + gap));
        let go, position = [gap, size[1]];

        for (var i = 1; i <= numOfRows * numOfBlocksPerRow; i++) {

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
        this.totalScore += go.score;

        this.updateScore();

        delete this.gameObjects[go.id];
        go.destroy();
    }

    updateScore() {
        for (let x in this.onUpdate) {
            this.onUpdate[x].call(this, this.totalScore, this.gameObjects[this.ballId].speed);
        }
    }

}
