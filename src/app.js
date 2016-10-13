import './../styles/app.scss';

import Logger from './logger';
import Game from './classes/game';

import Paddle from './classes/paddle';

let app = 'Grand Block Smasher';

let runApp = () => {
    Logger.print('info', ['Running', app]);
    document.body.classList.add('loaded');

    const game = new Game();
    const canvas = game.canvasElement;

    let paddleWidth = canvas.width / 5;
    let paddleHeight = canvas.height / 100;

    game.addGameObject(new Paddle({
        x : (canvas.width - paddleWidth) / 2,
        y : canvas.height * 0.95
    }, {
        width : paddleWidth,
        height : paddleHeight
    }))

};

window.addEventListener('load', runApp);

window.addEventListener('resize', () => {
    Logger.print('warn', ['Change window size', window.innerWidth, window.innerHeight]);
});



