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
    this.toggleSound = this.toggleSound.bind(this);
    document.addEventListener('mousedown', this.handleClick);
    this.setImages();
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
      this.toggleSound();
    } else if ((clickX > 530) && (clickX < 560) && (clickY > 425) && (clickY < 455)) {
      this.toggleMusic();
    } else if (this.gameStarted) {
      this.game.shoot([clickX, clickY]);
    } else {
      this.handleSplash([clickX, clickY]);
    }
  }

  handleMove(e) {
    const mouseX = e.clientX - this.bounds[0];
    const mouseY = e.clientY - this.bounds[1];
    const x = (mouseX > this.splash.nW[0]) && (mouseX < this.splash.sE[0]);
    const y = (mouseY > this.splash.nW[1]) && (mouseY < this.splash.sE[1]);
    if (x && y && !this.gameStarted) {
      this.splash.draw(this.ctx, 'hover');
    } else if (!this.gameStarted) {
      this.splash.draw(this.ctx, 'no hover');
    }
  }

  handleSplash(pos) {
    const x = (pos[0] > this.splash.nW[0]) && (pos[0] < this.splash.sE[0]);
    const y = (pos[1] > this.splash.nW[1]) && (pos[1] < this.splash.sE[1]);
    if (x && y) {
      this.start();
      document.removeEventListener('mousemove', this.handleMove);
    }
  }

  toggleSound() {
    if (this.game.soundOn) {
      window.allAudio.forEach(aud => aud.muted = true);
      this.game.soundOn = false;
    } else {
      window.allAudio.forEach(aud => aud.muted = false);
      this.game.soundOn = true;
    }
  }

  toggleMusic() {
    if (this.game.musicOn) {
      this.game.music.muted = true;
      this.game.musicOn = false;
    } else {
      this.game.music.muted = false;
      this.game.musicOn = true;
    }
  }

  splashStart(hover) {
    document.addEventListener('mousemove', this.handleMove);
    this.splash.draw(this.ctx, hover);
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

    this.intervals.push(this.startTime = setInterval(() => {
      this.game.time += 1;
    }, 1000));
  }

  endGame() {
    this.intervals.forEach((int) => clearInterval(int));
    this.gameStarted = false;
    this.splashStart(this.ctx, 'no hover')
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
  gameView.splashStart('no hover');
});
