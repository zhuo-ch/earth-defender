import Game from './game';
import Splash from './splash';

class GameView {
  constructor({game, ctx, splash}) {
    this.game = game;
    this.ctx = ctx;
    this.splash = splash;
    this.maxMissiles = 3;
  }

  handleClick(e) {
    const playerX = e.clientX;
    const playerY = e.clientY;
    this.game.addRocket([playerX, playerY]);
  }

  splashStart() {
    this.splash.draw(this.ctx);
  }

  start() {
    setInterval(() => {
      this.game.draw(this.ctx);
      this.game.step();
    }, 20);

    setInterval(() => {
      this.game.addMissiles(this.maxMissiles);
    }, 500);

    setInterval(() => {
      this.maxMissiles += 1;
    }, 20000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game');
  const dimX = canvas.width;
  const dimY = canvas.height;
  let maxMissiles = 3;
  const ctx = canvas.getContext('2d');
  const game = new Game({dimX, dimY, maxMissiles});
  const splash = new Splash({ctx, dimX, dimY});
  const gameView = new GameView({ctx, game, splash});
  gameView.splashStart();
  canvas.addEventListener('click', (e) => gameView.handleClick(e));
});
