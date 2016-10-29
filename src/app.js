import './../styles/app.scss';
import Vue from 'vue';

import Logger from './logger';
import Game from './classes/game';

import Paddle from './classes/paddle';
import Circle from './classes/circle';

const app = 'Endless - Grand Block Smasher';

const ballId = 'ball';
const paddleId = 'paddle';

let runApp = () => {
    Logger.print('info', ['Running', app]);

    let dashboard = new Vue({
        el : '#v-dashboard',
        data : {
            score : 0,
            speed : 0.00
        }
    });

    let updateScore = (totalScore, ballSpeed) => {
        dashboard.score = totalScore;
        dashboard.speed = (ballSpeed * 10).toFixed(2);
    };

    let welcomeScreen = new Vue({
        el : '#v-welcome-screen',
        data : {
            title : 'Welcome',
            confirmButtonText : 'Go!',
            playerName : '',
            speed : 5,
            classObject : {
                'is-active' : true
            }
        },
        methods : {
            start : () => {

                welcomeScreen.classObject['is-active'] = false;

                const game = new Game(welcomeScreen.playerName, ballId, welcomeScreen.speed);
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


                game.onUpdate.push(updateScore);

                game.generateBlocks();
                game.start();
            }
        }
    });

};

window.addEventListener('load', runApp);

window.addEventListener('resize', () => {
    Logger.print('warn', ['Change window size', window.innerWidth, window.innerHeight]);
});



