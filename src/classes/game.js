import Logger from './../logger';

const ballId = Symbol();
const paddleId = Symbol();

export default class Game {
    constructor(playerName = 'Default', ball, paddle) {
        this.playerName = playerName;
        this[ballId] = ball;
        this[paddleId] = paddle;

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

        this.runUpdateLoop();
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

        if (go.id !== this[ballId]) {
            this.gameObjects[go.id] = go;
        } else {
            this.ballEl = go;
        }

        this.render(go);
        return go;
    }

    runUpdateLoop() {

        if (typeof this.updateInterval !== 'undefined') {
            Logger.print('error', ['Loop is already running']);
            return;
        }

        this.updateInterval = setInterval(() => {

            this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

            for (var key in this.gameObjects) {
                if (this.gameObjects.hasOwnProperty(key)) {
                    this.render(this.gameObjects[key]);
                }
            }

            this.render(this.ballEl);

        }, 10)
    }

}
