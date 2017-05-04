import Game from './game';

class GameView {
  constructor({game, ctx}) {
    this.game = game;
    this.ctx = ctx;
  }

  start() {
    this.increment();
    setInterval(() => {
      this.game.draw(this.ctx);
      this.game.moveMissiles();
    }, 20);
  }

  increment() {
    setInterval(() => {
      this.game.addMissiles();
    }, 2000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game');
  const dimX = canvas.width;
  const dimY = canvas.height;
  let numMissiles = 3;
  const ctx = canvas.getContext('2d');
  const game = new Game({dimX, dimY, numMissiles});
  const gameView = new GameView({ctx, game});
  gameView.start();
});
