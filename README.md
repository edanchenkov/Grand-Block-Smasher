# Endless Grand Block Smasher

Block crusher game. Player needs to crash all the block with a ball, that bounces off a paddle. The paddle can be controlled by the player using keyboard's arrows. `←` `→`. For each smashed block, player is getting points. Blocks will be generated endlessly until user loses the ball.

### Project status

version : `0.9.9` </br>
status : `suspended`

### Compile js and scss => Run

```bash
$ npm install -g webpack
$ npm install
$ webpack
```

Then, open `index.html` in your favourite browser.

### Game features

 - Gain points for each block smash.
 - Ball increases speed with each gained score.
 - More speed - more points.
 - Once you destroy all blocks, new blocks will be generated automatically.
 - Sound on block destroy (base64 file)
 - Restart game on lost
 - Dashboard with score and ball's speed
 - Specify player name and ball speed on welcome screen
 
### Technical features

 - Written in ES2015 (Babel + webpack).
 - Pure HTML5 Canvas implementation, no 3rd party libraries or frameworks for handling physics or drawing.
 - Vue.js 2.0 + Bulma.
 
