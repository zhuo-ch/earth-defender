import Game from './game_modes/game';
import Splash from './splash';

window.allAudio = [];

class GameView {
  constructor({ctx, dimX, dimY, splash, bounds}) {
    this.initializeImages();
    this.gameStarted = false;
    this.dimX = dimX;
    this.dimY = dimY;
    this.game = game;
    this.ctx = ctx;
    this.splash = splash;
    this.bounds = bounds;
    this.intervals = [];
    this.handleClick = this.handleClick.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.endGame = this.endGame.bind(this);
    document.addEventListener('mousedown', this.handleClick);
    this.setImages();
    this.setHighScores();
  }


  initializeImages() {
    const background = new Image();
    const rocketIcon = new Image();
    const clusterGunIcon = new Image();
    const gravityGunIcon = new Image();
    const laserIcon = new Image();
    const tower = new Image();
    const soundOn = new Image();
    const soundOff = new Image();
    const musicOn = new Image();
    const musicOff = new Image();

    this.images = {
      background, rocketIcon, clusterGunIcon, gravityGunIcon, laserIcon,
      tower, soundOn, soundOff, musicOn, musicOff
    };
  }

  setImages() {
    Object.keys(this.images).forEach(key => {
      if (key === 'background') {
        this.images[key].src = `assets/images/background.jpg`
      } else {
        this.images[key].src = `assets/images/${key}.svg`
      }
    });
  }

  handleClick(e) {
    const clickX = e.clientX - this.bounds[0];
    const clickY = e.clientY - this.bounds[1];

    if ((clickX > 570) && (clickX < 600) && (clickY > 425) && (clickY < 455)) {
      this.game.nav.toggleSound();
    } else if ((clickX > 530) && (clickX < 560) && (clickY > 425) && (clickY < 455)) {
      this.game.nav.toggleMusic();
    } else if (this.gameStarted) {
      this.game.shoot([clickX, clickY]);
    } else {
      this.handleSplash([clickX, clickY]);
    }
  }

  handleMove(e) {
    const mouseX = e.clientX - this.bounds[0];
    const mouseY = e.clientY - this.bounds[1];

    this.splash.buttons.forEach(button => {
      const x = (mouseX > button.nW[0]) && (mouseX < button.sE[0]);
      const y = (mouseY > button.nW[1]) && (mouseY < button.sE[1]);

      if (x && y && !this.gameStarted) {
        button.hover = true;
      } else if (!this.gameStarted) {
        button.hover = false;
      }
    });

    this.splash.draw(this.ctx);
  }

  handleSplash(pos) {
    this.splash.buttons.forEach(button => {
      if (button.hover && button.text === 'Start') {
        this.start();
        document.removeEventListener('mousemove', this.handleMove);
      } else if (button.hover && button.text === 'High Scores') {
        this.splash.draw(this.ctx, this.highScores);
      }
    });
  }

  splashStart(highScores) {
    document.addEventListener('mousemove', this.handleMove);
    this.splash.draw(this.ctx, highScores);
  }

  start() {
    this.game = new Game({
      dimX: this.dimX, dimY: this.dimY, endGame: this.endGame,
      images: this.images, bounds: this.bounds
    });
    document.addEventListener('mouseup', this.game.resetLaser);
    this.gameStarted = true;

    this.intervals.push(this.startDraw = setInterval(() => {
      this.game.step(this.ctx);
    }, 20));

    this.intervals.push(this.startAdd = setInterval(() => {
      this.game.addMissiles();
    }, 500));

    this.intervals.push(this.startMax = setInterval(() => {
      this.game.maxMissiles += 1;
    }, 30000));
  }

  endGame() {
    this.calHighScores();
    this.setHighScores();
    this.intervals.forEach((int) => clearInterval(int));
    window.allAudio.forEach(aud => aud.muted = true);
    this.game.music.muted = true;
    this.gameStarted = false;
    this.splashStart(this.highScores);
  }

  calHighScores() {
    const score = this.game.score;
    const time = this.game.time;
    let prevHighScores = Object.keys(this.highScores).map(key => this.highScores[key]);
    prevHighScores.push({score, time});
    prevHighScores = prevHighScores.sort((a, b) => b.score - a.score);
    let newScores = {};
    prevHighScores.forEach((score, idx) => newScores[idx+1] = score);
    this.highScores = newScores;
  }

  setHighScores() {
    if (this.highScores) {
      localStorage.setItem('highScores', JSON.stringify(this.highScores));
    } else if (localStorage.getItem('highScores')) {
      this.highScores = JSON.parse(localStorage.getItem('highScores'));
    } else {
      this.highScores = {};
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game');
  const dimX = canvas.width;
  const dimY = canvas.height;
  const ctx = canvas.getContext('2d');
  const bounds = [canvas.getBoundingClientRect().left, canvas.getBoundingClientRect().top];
  const splash = new Splash({ctx, dimX, dimY, bounds});
  const gameView = new GameView({ctx, dimX, dimY, splash, bounds});
  gameView.splashStart();
});
