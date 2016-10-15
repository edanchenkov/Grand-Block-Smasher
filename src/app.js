import './../styles/app.scss';

import Logger from './logger';
import Game from './classes/game';

import Paddle from './classes/paddle';
import Circle from './classes/circle';

let app = 'Grand Block Smasher';

let runApp = () => {
    Logger.print('info', ['Running', app]);
    document.body.classList.add('loaded');

    const game = new Game();
    const canvas = game.canvasElement;

    let paddleWidth = canvas.width / 5;
    let paddleHeight = canvas.height / 100;

    game.addGameObject(new Paddle('paddle', {
        x : (canvas.width - paddleWidth) / 2,
        y : canvas.height * 0.95
    }, {
        width : paddleWidth,
        height : paddleHeight
    }));

    let circleRadius = (canvas.width / canvas.height) * 4;

    game.addGameObject(new Circle('ball', {
            x : canvas.width / 2,
            y : canvas.height / 2
        },
        circleRadius
    ));

};

window.addEventListener('load', runApp);

window.addEventListener('resize', () => {
    Logger.print('warn', ['Change window size', window.innerWidth, window.innerHeight]);
});



