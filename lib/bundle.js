/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_modes_game__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__splash__ = __webpack_require__(6);



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
    this.game = new __WEBPACK_IMPORTED_MODULE_0__game_modes_game__["a" /* default */]({
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
  const splash = new __WEBPACK_IMPORTED_MODULE_1__splash__["a" /* default */]({ctx, dimX, dimY, bounds});
  const gameView = new GameView({ctx, dimX, dimY, splash, bounds});
  gameView.splashStart();
});


/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Splash {
  constructor({dimX, dimY}) {
    this.dimX = dimX;
    this.dimY = dimY;
    this.buttons = [];
    this.image = new Image();
    this.setImage();
    this.createButtons();
  }

  setImage() {
    this.image.src = 'assets/images/splash-background.jpg';
  }

  createButtons() {
    this.buttons.push(new Button([this.dimX / 2 - 190, this.dimY * 4 / 6],'Start'));
    this.buttons.push(new Button([this.dimX / 2 + 20, this.dimY * 4 / 6],'High Scores'));
  }

  drawScores(ctx, highScores) {
    let startX = this.dimX/3;
    let startY = this.dimY/4;
    const scoreList = [1,2,3,4,5,6,7,8,9,10];
    this.drawHeader(ctx, [startX, startY]);

    scoreList.forEach(idx => {
      this.drawScore(ctx, [startX, startY], idx, highScores[idx]);
      startY += 20;
    });
  }

  drawHeader(ctx, pos) {
    ctx.font = '18pt orbitron';
    ctx.fillStyle = 'white';
    ctx.fillText('#', pos[0], pos[1] - 40);
    ctx.fillText('Score', pos[0] + 50, pos[1] - 40);
    ctx.fillText('Time', pos[0] + 200, pos[1] -40);
  }

  drawScore(ctx, pos, idx, score) {
    ctx.font = '14pt orbitron';
    ctx.fillStyle = 'white';
    ctx.fillText(idx, pos[0], pos[1]);
    if (score) {
      ctx.fillText(score.score, pos[0] + 50, pos[1]);
      ctx.fillText(score.time, pos[0] + 200, pos[1]);
    }
  }

  draw(ctx, highScores) {
    this.image.addEventListener('load', () => {
      ctx.drawImage(this.image, 0, 0, this.dimX, this.dimY);
      this.buttons.forEach(button => button.draw(ctx));
    });
    this.buttons.forEach(button => button.draw(ctx));

    if (highScores) {
      this.drawScores(ctx, highScores);
    }
  }
}

class Button {
  constructor(pos, text) {
    this.pos = pos;
    this.text = text;
    this.hover = false;
    this.nW = pos;
    this.sE = [];
  }

  draw(ctx) {
    const x = this.pos[0];
    const y = this.pos[1];
    const backColor = this.hover ? 'darkblue' : 'blue';

    ctx.beginPath();
    ctx.moveTo(x, y + 10);
    ctx.lineTo(x + 180, y + 10);
    ctx.quadraticCurveTo(x + 190, y + 10, x + 190, y + 20);
    ctx.lineTo(x + 190, y + 60);
    ctx.quadraticCurveTo(x + 190, y + 70, x + 180, y + 70);
    ctx.lineTo(x, y + 70);
    ctx.quadraticCurveTo(x -10, y + 70, x - 10, y + 60);
    ctx.lineTo(x - 10, y + 20);
    ctx.quadraticCurveTo(x - 10, y + 10, x, y + 10);
    ctx.strokeStyle = 'white';
    ctx.fillStyle = backColor;
    ctx.fill();
    ctx.stroke();
    ctx.font = '20pt orbitron';
    ctx.fillStyle = 'white';
    ctx.fillText(this.text, this.pos[0], this.pos[1]+ 50);

    this.nW = [this.pos[0] - 10, this.pos[1] + 10];
    this.sE = [x + 190, y + 70];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Splash);


/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const getVel = (startCoords, endCoords) => {
  let slope = startCoords.map((vect, idx) => endCoords[idx] - vect);

  while ((Math.abs(Math.ceil(slope[0])) > 5) || (Math.abs(Math.ceil(slope[1])) > 5)) {
    slope = slope.map(vect => vect/2);
  }

  return slope;
}
/* harmony export (immutable) */ __webpack_exports__["a"] = getVel;


const randomEnd = (dimX, dimY) => {
  const randX = Math.floor(Math.random() * dimX);
  const randY = dimY;
  return [randX, randY];
}
/* harmony export (immutable) */ __webpack_exports__["c"] = randomEnd;


const randomPosition = (dimX) => {
  const randX = Math.floor(Math.random() * dimX);
  const randY = 0;
  return [randX, randY];
}
/* harmony export (immutable) */ __webpack_exports__["b"] = randomPosition;


const getMissileStart = (pos, vel) => {
  return pos.map((vect, idx) => {
    const newVect = vect - (vel[idx] * 10);
    return newVect < 0 ? 0 : newVect;
  });
}
/* harmony export (immutable) */ __webpack_exports__["d"] = getMissileStart;


const getStartPos = (startPos, vel, endPos) => {
  startPos = startPos.map((vect, idx) => {
    return vect - (vel[idx] * 10);
  });

  if (endPos[1] <= 440) {
    if (startPos[1] > 440) {
      startPos[0] = 320;
      startPos[1] = 440;
    }
  }

  return startPos;
}
/* harmony export (immutable) */ __webpack_exports__["f"] = getStartPos;


const isCollidedWith = (obj, otherObj) => {
  const x1 = obj.pos[0];
  const x2 = otherObj.pos[0];
  const y1 = obj.pos[1];
  const y2 = otherObj.pos[1];

  const distance = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));

  return distance < obj.radius;
}
/* harmony export (immutable) */ __webpack_exports__["e"] = isCollidedWith;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(11);


class Explosion {
  constructor({pos, color, maxRadius}) {
    this.pos = pos;
    this.color = color;
    this.maxRadius = maxRadius;
    this.radius = 2;
    this.expand = 1;
  }

  draw(ctx) {
    ctx.beginPath();
    const x = this.pos[0];
    const y = this.pos[1];

    const grd = ctx.createRadialGradient(
      x,
      y,
      Math.floor(this.radius/7),
      x,
      y,
      this.radius
    );

    grd.addColorStop(0, 'white');
    grd.addColorStop(1, this.color);

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI
    );

    ctx.fillStyle = grd;
    ctx.fill();
  }

  isCollidedWith(otherObj) {
    return __WEBPACK_IMPORTED_MODULE_0__util__["e" /* isCollidedWith */](this, otherObj);
  };

  checkExplosion() {
    return this.radius <= 1;
  }

  move() {
    if (this.radius >= this.maxRadius) {
      this.expand = -0.75;
    }

    this.radius += this.expand;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Explosion);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_missile__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__guns_rocket__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_util__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_draw_util__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_explosion__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__guns_cluster_gun__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__guns_gravity_gun__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__guns_laser__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__nav__ = __webpack_require__(22);










class Game {
  constructor({dimX, dimY, endGame, images, bounds}) {
  this.nav = new __WEBPACK_IMPORTED_MODULE_8__nav__["a" /* default */](images);
  this.dimX = dimX;
  this.dimY = dimY;
  this.endGame = endGame;
  this.images = images;
  this.bounds = bounds;
  this.maxMissiles = 3;
  this.projectiles = [];
  this.canShoot = true;
  this.resetLaser = this.resetLaser.bind(this);
  this.deleteLaser = this.deleteLaser.bind(this);
  }


  resetLaser() {
    document.getElementsByClassName('game-display')[0].removeAttribute('className', 'laser');
    this._deleteLaser = setTimeout(this.deleteLaser, 100);
    if (this.laserAudio) {
      this.laserAudio.pause();
    }
  }

  deleteLaser() {
    this.projectiles.forEach((projectile, idx) => {
      if (projectile instanceof __WEBPACK_IMPORTED_MODULE_7__guns_laser__["a" /* default */]) {
        this.projectiles.splice(idx, 1);
        this.canShoot = true;
      }
    });
    clearTimeout(this._deleteLaser);
  }

  setCooldown(time) {
    this.cooldownTimer = setTimeout(() => {
      this.canShoot = true;
    }, time);
  }

  shoot(endPos) {
    const pos = [this.dimX/2, this.dimY-40];
    const vel = __WEBPACK_IMPORTED_MODULE_2__util_util__["a" /* getVel */](pos, endPos);
    const audio = this.audio;
    const soundOn = this.nav.soundOn;

    switch (this.nav.currentGun) {
      case 'Rocket':
        if (this.canShoot && endPos[1] < 440) {
          this.projectiles.push(new __WEBPACK_IMPORTED_MODULE_1__guns_rocket__["a" /* default */]({pos, vel, endPos, soundOn}));
          this.setCooldown(500);
          this.canShoot = false;
        }
        break;
      case 'ClusterGun':
        if (this.canShoot && endPos[1] < 440) {
          this.projectiles.push(new __WEBPACK_IMPORTED_MODULE_5__guns_cluster_gun__["a" /* default */]({pos, vel, endPos, soundOn}));
          this.setCooldown(750);
          this.canShoot= false;
        }
        break;
      case 'GravityGun':
        if (this.canShoot) {
          this.projectiles.push(new __WEBPACK_IMPORTED_MODULE_6__guns_gravity_gun__["a" /* default */]({pos, vel, endPos, soundOn}));
          this.setCooldown(2000);
          this.canShoot = false;
        }
        break;
      case 'Laser':
        if (this.canShoot) {
          this.projectiles.push(new __WEBPACK_IMPORTED_MODULE_7__guns_laser__["a" /* default */]({pos, game: this, endPos, bounds: this.bounds, soundOn }));
          this.canShoot = false;
          this.startLaser();
        }
        break;
      default:
        break;
    }
  }

  startLaser() {
    this.laserAudio = new Audio('./assets/audio/laser.wav');
    this.laserAudio.volume = 0.2;
    this.laserAudio.loop = true;
    window.allAudio.push(this.laserAudio);
    this.nav.soundOn ? this.laserAudio.play() : "";
  }

  addMissiles() {
    const missilesCount = Math.floor(Math.random() * (this.maxMissiles/2));
    for (let i = 0; i < missilesCount; i++) {
      const pos = __WEBPACK_IMPORTED_MODULE_2__util_util__["b" /* randomPosition */](this.dimX);
      const endPos = __WEBPACK_IMPORTED_MODULE_2__util_util__["c" /* randomEnd */](this.dimX, this.dimY);
      const vel = __WEBPACK_IMPORTED_MODULE_2__util_util__["a" /* getVel */](pos, endPos);
      const game = this;
      const m = new __WEBPACK_IMPORTED_MODULE_0__util_missile__["a" /* default */]({pos, vel, game});
      this.projectiles.push(m);
    }
  };

  moveProjectiles() {
    this.projectiles.forEach((projectile, idx) => {
      if (projectile.radius && projectile.checkExplosion()) {
        this.projectiles.splice(idx, 1);
      } else {
        projectile.move();
      }
    });
  }

  checkExplosionHits(explosions, missiles) {
    explosions.forEach(explosion => {
      missiles.forEach(missile => {
        if (explosion.isCollidedWith(missile)) {
          const hit = new Audio('./assets/audio/missileCollide.wav');
          window.allAudio.push(hit);
          hit.volume = 0.15;
          this.nav.soundOn ? hit.play() : "";
          this.nav.score += this.maxMissiles * missiles.length * this.nav.time * this.nav.shields;
          const idx = this.projectiles.indexOf(missile);
          this.projectiles.splice(idx, 1);
        }
      });
    });
  }

  checkMissileHits(missiles) {
    missiles.forEach(missile => {
      if (missile.isCollidedWith()) {
        const idx = this.projectiles.indexOf(missile);
        this.projectiles.splice(idx, 1);
        this.projectiles.push(missile.explode());
        this.nav.shields -= 1;
      }
    });
  }

  checkCollisions() {
    const explosions = this.projectiles.filter(mis => mis.radius);
    const missiles = this.projectiles.filter(mis => !mis.radius && mis.color === 'red');
    this.checkExplosionHits(explosions, missiles);
    this.checkMissileHits(missiles);
  }

  willExplode() {
    this.projectiles.forEach((projectile, idx) => {
       if (projectile.endPos && projectile.willExplode()) {
        const pos = projectile.pos;
        const color = projectile.color;
        this.projectiles.splice(idx, 1);
        projectile.explode({pos, color}).forEach(exp => this.projectiles.push(exp));
      }
    });
  }

  draw(ctx) {
    this.willExplode();
    ctx.drawImage(this.images.background,0,0,this.dimX, this.dimY);
    this.projectiles.forEach(projectile => projectile.draw(ctx, game));
    this.nav.draw(ctx, this.dimX);
  }

  step(ctx) {
    this.checkCollisions();
    this.moveProjectiles();
    this.draw(ctx)

    if (this.nav.gameOver()) {
      this.endGame();
    }
  };
}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_util__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_explosion__ = __webpack_require__(12);



class GravityGun {
  constructor({pos, vel, endPos, soundOn}) {
    this.endPos = [endPos[0], -200];
    this.pos = pos;
    this.vel = vel;
    this.soundOn = soundOn;
    this.radius = 60;
    this.maxRadius = 70;
    this.color1 = 'midnightblue';
    this.color2 = 'black';
    this.playAudio();
  }

  playAudio() {
    this.gravity = new Audio('./assets/audio/gravity.wav');
    window.allAudio.push(this.gravity);
    this.gravity.loop = true;
    this.gravity.volume = 0.1;
    this.soundOn ? this.gravity.play() : "";
  }

  draw(ctx) {
    ctx.beginPath();
    const x = this.pos[0];
    const y = this.pos[1];
    const color1 = Math.random() < 0.5 ? this.color1 : this.color2;
    const color2 = Math.random() < 0.5 ? this.color1 : this.color2;


    const grd = ctx.createRadialGradient(
      x,
      y,
      Math.floor(this.radius/7),
      x,
      y,
      this.radius
    );

    grd.addColorStop(0, color1);
    grd.addColorStop(1, color2);

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI
    );

    ctx.fillStyle = grd;
    ctx.fill();
  }

  move() {
    this.pos = this.pos.map((vect, idx) => vect + (this.vel[idx]/2));
  }

  isCollidedWith(otherObject) {
    const x1 = this.pos[0];
    const x2 = otherObject.pos[0];
    const y1 = this.pos[1];
    const y2 = otherObject.pos[1];

    const distance = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));

    return distance < this.radius;
  }

  willExplode() {
    return this.endPos[1] >= this.pos[1];
  }

  checkExplosion() {
    const destroy = (
      (this.pos[0] <= -60) ||
      (this.pos[1] <= -60) ||
      (this.pos[0] >= 690) ||
      (this.pos[1] >= 540)
    )
    if (destroy) {
      this.gravity.pause();
    }
  }

  explode({pos, color}) {
    const explosions = [];
    return explosions;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (GravityGun);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_util__ = __webpack_require__(11);


class Laser {
  constructor({pos, game, endPos, bounds}) {
    this.game = game
    this.startPos = [game.dimX/2, game.dimY-40];
    this.pos = pos;
    this.vel = __WEBPACK_IMPORTED_MODULE_0__util_util__["a" /* getVel */](this.startPos, endPos);
    this.endPos = endPos;
    this.bounds = bounds;
    this.color = 'green';
    this.handleMove = this.handleMove.bind(this);
    document.addEventListener('mousemove', this.handleMove);
  }

  handleMove(e) {
    const mouseX = e.clientX - this.bounds[0];
    const mouseY = e.clientY - this.bounds[1];
    this.endPos = [mouseX, mouseY];
  }

  draw(ctx) {
    const wide = Math.random() < 0.6 ? 0 : 4;
    ctx.beginPath();
    ctx.moveTo(this.startPos[0], this.startPos[1]);
    ctx.lineTo(this.pos[0], this.pos[1]);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = wide;
    ctx.stroke();
  }

  move() {
    this.vel = __WEBPACK_IMPORTED_MODULE_0__util_util__["a" /* getVel */](this.pos, this.endPos);
    this.pos = this.pos.map((vect, idx) => vect + this.vel[idx]);
  }

  willExplode() {
    return true;
  }

  explode() {
    document.removeEventListener('mousemove', this.handleMove);
    const pos = this.pos;
    const color = this.color;
    return [
      new Laser({pos, game: this.game, endPos: this.endPos, bounds: this.bounds}),
      new LaserExplosion({pos, color})
    ];
  }
}

class LaserExplosion {
  constructor({pos, color}) {
    this.pos = pos;
    this.color = color;
    this.radius = 8;
    this.maxRadius = this.radius;
  }

  move() {
  }

  isCollidedWith(otherObj) {
    return __WEBPACK_IMPORTED_MODULE_0__util_util__["e" /* isCollidedWith */](this, otherObj);
  }

  checkExplosion() {
    return true;
  }

  draw(ctx) {
    if (Math.random() < 0.3) {
      return ;
    }
    ctx.beginPath();
    const x = this.pos[0];
    const y = this.pos[1];

    const grd = ctx.createRadialGradient(
      x,
      y,
      Math.floor(this.radius/7),
      x,
      y,
      this.radius
    );

    grd.addColorStop(0, 'white');
    grd.addColorStop(1, this.color);

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI
    );

    ctx.fillStyle = grd;
    ctx.fill();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Laser);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_util__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_draw_util__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_explosion__ = __webpack_require__(12);




class Rocket {
  constructor({pos, vel, endPos, soundOn}) {
    this.endPos = endPos;
    this.pos = pos;
    this.vel = vel;
    this.soundOn = soundOn;
    this.maxRadius = 80;
    this.color = 'blue';
    this.playAudio();
  }

  playAudio() {
    const rocket = new Audio('./assets/audio/rocket.wav');
    window.allAudio.push(rocket);
    rocket.volume = 0.1;
    this.soundOn ? rocket.play() : "";
  }

  draw(ctx) {
    const vel = this.vel;
    const pos = this.pos;
    const color = this.color;
    const startPos = __WEBPACK_IMPORTED_MODULE_0__util_util__["f" /* getStartPos */](pos, vel, this.endPos);
    __WEBPACK_IMPORTED_MODULE_1__util_draw_util__["a" /* drawProjectile */]({ctx, pos, vel, startPos, color});
  }

  move() {
    this.pos = this.pos.map((vect, idx) => vect + this.vel[idx]);
  }

  willExplode() {
    return this.endPos[1] >= this.pos[1];
  }

  explode({pos, color}) {
    const maxRadius = this.maxRadius;
    const explosion = new Audio('./assets/audio/explosion.wav');
    window.allAudio.push(explosion);
    explosion.volume = 0.05;
    this.soundOn ? explosion.play() : "";
    return [new __WEBPACK_IMPORTED_MODULE_2__util_explosion__["a" /* default */]({pos, color, maxRadius})];
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Rocket);


/***/ }),
/* 17 */,
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__draw_util__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__explosion__ = __webpack_require__(12);




class Missile {
  constructor({pos, vel, game}) {
    this.pos = pos;
    this.vel = vel;
    this.game = game;
    this.maxRadius = 60;
    this.color = 'red';
  }

  draw(ctx) {
    const vel = this.vel;
    const color = this.color;
    const pos = this.pos;
    const startPos = __WEBPACK_IMPORTED_MODULE_0__util__["d" /* getMissileStart */](pos, vel);
    __WEBPACK_IMPORTED_MODULE_1__draw_util__["a" /* drawProjectile */]({ctx, pos, vel, startPos, color});
  }

  move() {
    this.pos = this.pos.map((vect, idx) => vect + this.vel[idx]);
  }

  explode() {
    this.setAudio();
    return new __WEBPACK_IMPORTED_MODULE_2__explosion__["a" /* default */]({pos: this.pos, color: this.color, maxRadius: this.maxRadius});
  }

  isCollidedWith() {
    return this.pos[1] >= this.game.dimY;
  }

  setAudio(){
    const explosion = new Audio('./assets/audio/missileExplosion.wav');
    window.allAudio.push(explosion);
    explosion.volume = 1;
    this.game.soundOn ? explosion.play() : "";
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Missile);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_util__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_draw_util__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_explosion__ = __webpack_require__(12);




class ClusterGun {
  constructor({pos, vel, endPos, soundOn}) {
    this.endPos = endPos;
    this.pos = pos;
    this.vel = vel;
    this.soundOn = soundOn;
    this.maxRadius = 40;
    this.color = 'teal';
    this.playAudio();
  }

  playAudio() {
    const cluster = new Audio('./assets/audio/cluster.wav');
    window.allAudio.push(cluster);
    cluster.volume = 0.1;
    this.soundOn ? cluster.play() : "";
  }

  draw(ctx) {
    const pos = this.pos;
    const vel = this.vel;
    const color = this.color;
    const startPos = __WEBPACK_IMPORTED_MODULE_0__util_util__["f" /* getStartPos */](pos, vel, this.endPos);
    __WEBPACK_IMPORTED_MODULE_1__util_draw_util__["a" /* drawProjectile */]({ctx, pos, vel, startPos, color});
  }

  move() {
    this.pos = this.pos.map((vect, idx) => vect + (this.vel[idx]*3/4));
  }

  willExplode() {
    return this.endPos[1] >= this.pos[1];
  }

  explode({pos, color}) {
    const explosions = [];

    for (let i=0; i<6; i++) {
      const plusMinus = Math.random() < 0.5 ? -1 : 1;
      const newPos = pos.map(vect => vect + (Math.random()*100) * plusMinus);
      explosions.push(new __WEBPACK_IMPORTED_MODULE_2__util_explosion__["a" /* default */]({pos: newPos, color, maxRadius: this.maxRadius}));
    }

    const clusterExplosion = new Audio('./assets/audio/clusterExplosion.wav');
    window.allAudio.push(clusterExplosion);
    clusterExplosion.volume = 0.5;
    this.soundOn ? clusterExplosion.play() : "";

    return explosions;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ClusterGun);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const drawProjectile = ({ctx, pos, startPos, color}) => {
  ctx.beginPath();
  ctx.moveTo(startPos[0], startPos[1]);
  ctx.lineTo(pos[0], pos[1]);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();
}
/* harmony export (immutable) */ __webpack_exports__["a"] = drawProjectile;


const drawBar = (ctx, score, time, shields, dimX) => {
  ctx.fillStyle = 'silver';
  ctx.font = '16pt audiowide';
  ctx.fillText(`Score: ${score}`, 20, 50);
  ctx.fillText(`Time: ${time}`, (dimX-80) / 2, 50);
  ctx.fillText(`Shields: ${shields}`, dimX-150, 50);
}
/* harmony export (immutable) */ __webpack_exports__["b"] = drawBar;


const drawCurrentGun = (ctx, currentGun) => {
  ctx.fillStyle = 'chocolate';

  switch (currentGun) {
    case 'Rocket':
      ctx.fillRect(50, 420, 50, 40);
      break;
    case 'ClusterGun':
      ctx.fillRect(100, 420, 50, 40);
      break;
    case 'GravityGun':
      ctx.fillRect(150, 420, 50, 40);
      break;
    case 'Laser':
      ctx.fillRect(200, 420, 50, 40);
    default:
      break;
  }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = drawCurrentGun;


const drawIcons = (ctx, images) => {
  ctx.drawImage(images.rocketIcon, 50, 420, 50, 40);
  ctx.drawImage(images.clusterGunIcon, 105, 425, 40, 30);
  ctx.drawImage(images.gravityGunIcon, 150, 420, 50, 40);
  ctx.drawImage(images.laserIcon, 205, 425, 40, 30);
  ctx.drawImage(images.tower, 300, 440, 40, 40);
}
/* harmony export (immutable) */ __webpack_exports__["d"] = drawIcons;


const drawControls = (ctx) => {
  ctx.fillStyle = 'silver';
  ctx.font = '16pt audiowide';
  ctx.fillText('A', 65, 410);
  ctx.fillText('S', 115, 410);
  ctx.fillText('D', 165, 410);
  ctx.fillText('F', 215, 410);
}
/* harmony export (immutable) */ __webpack_exports__["e"] = drawControls;


const drawSound = (ctx, images, soundOn, musicOn) => {
  const sound = soundOn ? images['soundOn'] : images['soundOff'];
  const music = musicOn ? images['musicOn'] : images['musicOff'];
  ctx.drawImage(sound, 570, 425, 30, 30);
  ctx.drawImage(music, 530, 425, 30, 30);
}
/* harmony export (immutable) */ __webpack_exports__["f"] = drawSound;



/***/ }),
/* 21 */,
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_draw_util__ = __webpack_require__(20);


class Nav {
  constructor(images) {
    this.images = images;
    this.score = 0;
    this.time = 0;
    this.shields = 20;
    this.currentGun = 'Rocket';
    this.soundOn = true;
    this.music = new Audio('./assets/audio/OVERTURN.wav')
    this.musicOn = true;
    this.playMusic();
    this.startTimer();
    this.setGun();
  }

  playMusic() {
    this.music.volume = 0.05;
    this.music.loop = true;
    this.music.play();
  }

  setGun() {
    document.addEventListener('keydown', (e) => {
      this.canShoot = true;
      if (this.cooldownTimer) {
        clearTimeout(this.cooldownTimer);
      }

      switch (e.key) {
        case 'a':
          this.currentGun = 'Rocket';
          break;
        case 's':
          this.currentGun = 'ClusterGun';
          break;
        case 'd':
          this.currentGun = 'GravityGun';
          break;
        case 'f':
          this.currentGun = 'Laser';
          break;
        default:
          break;
      }
    });
  }

  addScore(score) {
    this.score += score;
  }

  subtractShield() {
    this.shields -= 1;
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.time += 1;
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  toggleSound() {
    if (this.soundOn) {
      window.allAudio.forEach(aud => aud.muted = true);
      this.soundOn = false;
    } else {
      window.allAudio.forEach(aud => aud.muted = false);
      this.soundOn = true;
    }
  }

  toggleMusic() {
    if (this.musicOn) {
      this.music.muted = true;
      this.musicOn = false;
    } else {
      this.music.muted = false;
      this.musicOn = true;
    }
  }

  draw(ctx, dimX) {
    __WEBPACK_IMPORTED_MODULE_0__util_draw_util__["b" /* drawBar */](ctx, this.score, this.time, this.shields, dimX);
    __WEBPACK_IMPORTED_MODULE_0__util_draw_util__["c" /* drawCurrentGun */](ctx, this.currentGun);
    __WEBPACK_IMPORTED_MODULE_0__util_draw_util__["d" /* drawIcons */](ctx, this.images);
    __WEBPACK_IMPORTED_MODULE_0__util_draw_util__["e" /* drawControls */](ctx);
    __WEBPACK_IMPORTED_MODULE_0__util_draw_util__["f" /* drawSound */](ctx, this.images, this.soundOn, this.musicOn);
  }

  gameOver() {
    if (this.shields <= 0) {
      this.stopTimer;
    }

    return this.shields <= 0;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Nav);


/***/ })
/******/ ]);