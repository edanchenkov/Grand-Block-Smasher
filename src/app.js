import './../styles/app.scss';

import Logger from './logger';
import Game from './classes/game';

import Rectangle from './classes/rectangle';
import Paddle from './classes/paddle';
import Circle from './classes/circle';

const app = 'Grand Block Smasher';

const ballId = 'ball';
const paddleId = 'paddle';

let runApp = () => {
    Logger.print('info', ['Running', app]);
    document.body.classList.add('loaded');

    const game = new Game('', ballId, paddleId);
    const canvas = game.canvasElement;

    let paddleWidth = canvas.width / 5;
    let paddleHeight = canvas.height / 100;

    game.addGameObject(new Paddle(paddleId, {
        x : (canvas.width - paddleWidth) / 2,
        y : canvas.height * 0.95
    }, {
        width : paddleWidth,
        height : paddleHeight
    }));

    let circleRadius = (canvas.width / canvas.height) * 15;

    game.addGameObject(new Circle(ballId, {
            x : canvas.width / 2,
            y : canvas.height / 2
        },
        circleRadius
    ));

    game.addGameObject(new Rectangle('topBorder', {
        x : 0,
        y : 0
    }, {
        width : canvas.width,
        height : 2
    }));

    let position = [50, 40];

    for (let i = 0; i < 8; i++) {
        game.addGameObject(new Rectangle('block_' + i, {
            x : position[0] * (1 + i),
            y : position[1]
        }, {
            width : position[0] - 10,
            height : position[1] - 10
        }, true))
    }
};

window.addEventListener('load', runApp);

window.addEventListener('resize', () => {
    Logger.print('warn', ['Change window size', window.innerWidth, window.innerHeight]);
});



