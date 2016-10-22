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

    const game = new Game('', ballId);
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

    const borderColor = 'grey';

    game.addGameObject(new Rectangle('topBorder', {
        x : 0,
        y : 0
    }, {
        width : canvas.width,
        height : 2
    }, { color : borderColor }), true);
    //
    // game.addGameObject(new Rectangle('leftBorder', {
    //     x : 0,
    //     y : 0
    // }, {
    //     width : 2,
    //     height : canvas.height
    // }, { color : borderColor }));
    //
    // game.addGameObject(new Rectangle('rightBorder', {
    //     x : canvas.width - 2,
    //     y : 0
    // }, {
    //     width : 2,
    //     height : canvas.height
    // }, { color : borderColor }));
    //
    // game.addGameObject(new Rectangle('bottomBorder', {
    //     x : 0,
    //     y : canvas.height - 2
    // }, {
    //     width : canvas.width,
    //     height : 2
    // }, { color : borderColor }));


    let size = [canvas.width / 6, canvas.height / 12];

    for (let i = 0; i < 4; i++) {
        game.addGameObject(new Rectangle('block_' + i, {
            x : size[0] * i + 50,
            y : size[1]
        }, {
            width : size[0] - 20,
            height : size[1] - 20
        }, {
            destroyable : true
        }))
    }
};

window.addEventListener('load', runApp);

window.addEventListener('resize', () => {
    Logger.print('warn', ['Change window size', window.innerWidth, window.innerHeight]);
});



