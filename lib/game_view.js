import Game from './game';
import Splash from './splash';

class GameView {
  constructor({ctx, dimX, dimY, splash}) {
    this.gameStarted = false;
    this.dimX = dimX;
    this.dimY = dimY;
    this.game = game;
    this.ctx = ctx;
    this.splash = splash;
    this.intervals = [];
  }

  handleClick(e) {
    const clickX = e.clientX;
    const clickY = e.clientY;
    if (this.gameStarted) {
      this.game.addRocket([clickX, clickY]);
    } else {
      this.handleSplash([clickX, clickY]);
    }
  }

  handleMove(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const x = (mouseX > this.splash.nW[0]) && (mouseX < this.splash.sE[0]);
    const y = (mouseY > this.splash.nW[1]) && (mouseY < this.splash.sE[1]);
    if (x && y && !this.gameStarted) {
      this.splash.draw(this.ctx, 'hover');
    } else if (!this.gameStarted) {
      this.splash.draw(this.ctx, 'no hover');
    } else if (this.game.hits <= 0) {
      this.endGame();
    }
  }

  handleSplash(pos) {
    const x = (pos[0] > this.splash.nW[0]) && (pos[0] < this.splash.sE[0]);
    const y = (pos[1] > this.splash.nW[1]) && (pos[1] < this.splash.sE[1]);
    if (x && y) {
      this.start();
    }
  }

  splashStart(hover) {
    this.splash.draw(this.ctx, hover);
  }

  start() {
    this.game = new Game({dimX: this.dimX, dimY: this.dimY})
    this.gameStarted = true;

    this.intervals.push(this.startDraw = setInterval(() => {
      this.game.draw(this.ctx);
      this.game.step();
    }, 20));

    this.intervals.push(this.startAdd = setInterval(() => {
      this.game.addMissiles();
    }, 500));

    this.intervals.push(this.startMax = setInterval(() => {
      this.game.maxMissiles += 1;
    }, 30000));

    this.intervals.push(this.startTime = setInterval(() => {
      this.game.time += 1;
    }, 1000));
  }

  endGame() {
    this.intervals.forEach((int) => clearInterval(int));
    // clearInterval(this.startDraw);
    // clearInterval(this.startAdd);
    // clearInterval(this.startMax);

    this.gameStarted = false;
    this.splashStart(this.ctx, 'no hover')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game');
  const dimX = canvas.width;
  const dimY = canvas.height;
  const ctx = canvas.getContext('2d');
  const splash = new Splash({ctx, dimX, dimY});
  const gameView = new GameView({ctx, dimX, dimY, splash});
  gameView.splashStart('no hover');
  canvas.addEventListener('mousemove', (e) => gameView.handleMove(e));
  canvas.addEventListener('click', (e) => gameView.handleClick(e));
});
