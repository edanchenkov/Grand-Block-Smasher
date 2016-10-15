import Logger from './../logger';

export default class Game {
    constructor(playerName = 'Default') {
        this.playerName = playerName;
        this.gameObjects = [];
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

    addGameObject(go) {

        if (typeof go !== 'object') {
            Logger.print('error', ['Invalid game item']);
            return;
        }

        // TODO: Do lookup first

        this.gameObjects.push(go);

        go.setGame(this);

        return go;
    }

    runUpdateLoop() {

        if (typeof this.updateInterval !== 'undefined') {
            Logger.print('error', ['Loop is already running']);
            return;
        }

        this.updateInterval = setInterval(() => {

            for (var i = 0; i < this.gameObjects.length; i++) {
                let go = this.gameObjects[i];
                // TODO: Check if needs to be updated if visible
                go.update();
            }

        }, 10)

    }

}
