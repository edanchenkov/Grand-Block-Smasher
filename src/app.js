import './../styles/app.scss';

import Logger from './logger';
import Game from './classes/game';

import Paddle from './classes/paddle';
import Circle from './classes/circle';

const app = 'Endless - Grand Block Smasher';

const ballId = 'ball';
const paddleId = 'paddle';

let runApp = () => {
    Logger.print('info', ['Running', app]);
    document.body.classList.add('loaded');

    const game = new Game('', ballId);
    const canvas = game.canvasElement;

    let paddleWidth = canvas.width / 5;
    let paddleHeight = canvas.height / 50;

    game.addGameObject(new Paddle(paddleId, {
        x : (canvas.width - paddleWidth) / 2,
        y : canvas.height * 0.95
    }, {
        width : paddleWidth,
        height : paddleHeight
    }));

    let circleRadius = (canvas.width / canvas.height) * 7.5;

    game.addGameObject(new Circle(ballId, {
            x : canvas.width / 2,
            y : canvas.height / 2
        },
        circleRadius
    ));

    const borderColor = 'grey';

    // game.addGameObject(new Rectangle('topBorder', {
    //     x : 0,
    //     y : 0
    // }, {
    //     width : canvas.width,
    //     height : 2
    // }, { color : borderColor }), true);
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


    game.generateBlocks();
    game.start();
};

window.addEventListener('load', runApp);

window.addEventListener('resize', () => {
    Logger.print('warn', ['Change window size', window.innerWidth, window.innerHeight]);
});



