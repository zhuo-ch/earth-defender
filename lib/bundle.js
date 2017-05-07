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



class GameView {
  constructor({ctx, dimX, dimY, splash}) {
    this.initializeImages();
    this.gameStarted = false;
    this.dimX = dimX;
    this.dimY = dimY;
    this.game = game;
    this.ctx = ctx;
    this.splash = splash;
    this.intervals = [];
    this.handleClick = this.handleClick.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.endGame = this.endGame.bind(this);
    document.addEventListener('mousedown', this.handleClick);
    this.setImages();
  }

  initializeImages() {
    const background = new Image();
    const rocketIcon = new Image();
    const shotgunIcon = new Image();
    const gravityGunIcon = new Image();
    const laserIcon = new Image();
    const tower = new Image();

    this.images = {background, rocketIcon, shotgunIcon, gravityGunIcon, laserIcon, tower};
  }

  setImages() {
    Object.keys(this.images).forEach(key => {
      if (key === 'background') {
        this.images[key].src = `images/background.jpg`
      } else {
        this.images[key].src = `images/${key}.svg`
      }
    });
  }

  handleClick(e) {
    const clickX = e.clientX;
    const clickY = e.clientY;
    if (this.gameStarted) {
      this.game.shoot([clickX, clickY]);
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

  splashStart(hover) {
    document.addEventListener('mousemove', this.handleMove);
    this.splash.draw(this.ctx, hover);
  }

  start() {
    this.game = new __WEBPACK_IMPORTED_MODULE_0__game_modes_game__["a" /* default */]({dimX: this.dimX, dimY: this.dimY, endGame: this.endGame, images: this.images})
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
  const splash = new __WEBPACK_IMPORTED_MODULE_1__splash__["a" /* default */]({ctx, dimX, dimY});
  const gameView = new GameView({ctx, dimX, dimY, splash});
  gameView.splashStart('no hover');
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
    this.image = new Image();
    this.setImage();
    this.nW = [];
    this.sE = [];
  }

  setImage() {
    this.image.src = 'images/splash-background.jpg';
  }

  drawButton(ctx, pos, backColor, textColor ) {
    const x = pos[0];
    const y = pos[1];
    // debugger
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
    ctx.strokeStyle = textColor;
    ctx.fillStyle = backColor;
    ctx.fill();
    ctx.stroke();
    ctx.font = '20pt audiowide';
    ctx.fillStyle = textColor;
    ctx.fillText('Start Game', (this.dimX-40)*2/5, this.dimY*3/5);

    this.nW = pos;
    this.sE = [x + 190, y + 70];
  }

  draw(ctx, hover) {
    this.image.addEventListener('load', () => {
      ctx.drawImage(this.image, 0, 0, this.dimX, this.dimY);
      this.drawButton(ctx, [(this.dimX-170)/2, (this.dimY-80)*3/5], 'blue', 'white');
    });

    if (hover === 'no hover') {
      this.drawButton(ctx, [(this.dimX-170)/2, (this.dimY-80)*3/5], 'blue', 'white');
    } else {
      this.drawButton(ctx, [(this.dimX-170)/2, (this.dimY-80)*3/5], 'darkblue', 'white');
    }
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


const drawProjectile = ({ctx, pos, vel, startPos, color}) => {
  ctx.beginPath();
  ctx.moveTo(startPos[0], startPos[1]);
  ctx.lineTo(pos[0], pos[1]);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();
}
/* harmony export (immutable) */ __webpack_exports__["j"] = drawProjectile;


const isCollidedWith = (obj, otherObj) => {
  const x1 = obj.pos[0];
  const x2 = otherObj.pos[0];
  const y1 = obj.pos[1];
  const y2 = otherObj.pos[1];

  const distance = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));

  return distance < obj.radius;
}
/* harmony export (immutable) */ __webpack_exports__["i"] = isCollidedWith;


const drawBar = (ctx, score, time, shields, dimX) => {
  ctx.fillStyle = 'silver';
  ctx.font = '16pt audiowide';
  ctx.fillText(`Score: ${score}`, 20, 50);
  ctx.fillText(`Time: ${time}`, (dimX-80) / 2, 50);
  ctx.fillText(`Shields: ${shields}`, dimX-150, 50);
}
/* harmony export (immutable) */ __webpack_exports__["e"] = drawBar;


const drawCurrentGun = (ctx, currentGun) => {
  switch (currentGun) {
    case 'Rocket':
      ctx.fillStyle = 'chocolate';
      ctx.fillRect(50, 420, 50, 40);
      break;
    case 'Shotgun':
      ctx.fillStyle = 'chocolate';
      ctx.fillRect(100, 420, 50, 40);
      break;
    case 'GravityGun':
      ctx.fillStyle = 'chocolate';
      ctx.fillRect(150, 420, 50, 40);
      break;
    case 'Laser':
      ctx.fillStyle = 'chocolate';
      ctx.fillRect(200, 420, 50, 40);
    default:
      break;
  }
}
/* harmony export (immutable) */ __webpack_exports__["f"] = drawCurrentGun;


const drawIcons = (ctx, images) => {
  ctx.drawImage(images.rocketIcon, 50, 420, 50, 40);
  ctx.drawImage(images.shotgunIcon, 105, 425, 40, 30);
  ctx.drawImage(images.gravityGunIcon, 150, 420, 50, 40);
  ctx.drawImage(images.laserIcon, 205, 425, 40, 30);
  ctx.drawImage(images.tower, 300, 440, 40, 40);
}
/* harmony export (immutable) */ __webpack_exports__["g"] = drawIcons;


const drawControls = (ctx) => {
  ctx.fillStyle = 'silver';
  ctx.font = '16pt audiowide';
  ctx.fillText('A', 65, 410);
  ctx.fillText('S', 115, 410);
  ctx.fillText('D', 165, 410);
  ctx.fillText('F', 215, 410);
}
/* harmony export (immutable) */ __webpack_exports__["h"] = drawControls;


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



const checkExplosion = (explosion) => {
  return explosion.radius >= explosion.maxRadius;
}
/* harmony export (immutable) */ __webpack_exports__["d"] = checkExplosion;


const getStartPos = (startPos, vel) => {
  startPos = startPos.map((vect, idx) => {
    return vect - (vel[idx] * 10);
  });

  if (startPos[1] > 440) {
    startPos[0] = 320;
    startPos[1] = 440;
  }

  return startPos;
}
/* harmony export (immutable) */ __webpack_exports__["k"] = getStartPos;


const gcd = (x, y) => {
  let gcd = function gcd(x, y){
    return y ? gcd(y, x%y) : x;
  };

  gcd = gcd(x, y);

  return [x/gcd, y/gcd];
}

const speed = (x, y) => {
  x = Math.abs(x);
  y = Math.abs(y);

  let ratioX;
  let ratioY;

  if (x < y) {
    ratioX = x/y;
    ratioY = 1-(ratioX);
  } else {
    ratioY = y/x;
    ratioX = 1-(ratioY);
  }

  return [Math.sqrt(10)*ratioX, Math.sqrt(10)*ratioY];
}


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(11);


class Explosion {
  constructor({pos, color, maxRadius}) {
    this.pos = pos;
    this.radius = 2;
    this.color = color;
    this.maxRadius = maxRadius;
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
    return __WEBPACK_IMPORTED_MODULE_0__util__["i" /* isCollidedWith */](this, otherObj);
  };

  move() {
    this.radius += 1;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_explosion__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__guns_shotgun__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__guns_gravity_gun__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__guns_laser__ = __webpack_require__(15);








class Game {
  constructor({dimX, dimY, endGame, images}) {
  this.score = 0;
  this.time = 0;
  this.shields = 20;
  this.dimX = dimX;
  this.dimY = dimY;
  this.endGame = endGame;
  this.images = images;
  this.maxMissiles = 3;
  this.projectiles = [];
  this.currentGun = 'Rocket';
  this.canShoot = true;
  this.resetLaser = this.resetLaser.bind(this);
  this.deleteLaser = this.deleteLaser.bind(this);
  this.setGun();
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
          this.currentGun = 'Shotgun';
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

  resetLaser() {
    this._deleteLaser = setTimeout(this.deleteLaser, 100);
  }

  deleteLaser() {
    this.projectiles.forEach((projectile, idx) => {
      if (projectile instanceof __WEBPACK_IMPORTED_MODULE_6__guns_laser__["a" /* default */]) {
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

    switch (this.currentGun) {
      case 'Rocket':
        if (this.canShoot) {
          this.projectiles.push(new __WEBPACK_IMPORTED_MODULE_1__guns_rocket__["a" /* default */]({pos, vel, endPos}));
          this.setCooldown(500);
          this.canShoot = false;
        }
        break;
      case 'Shotgun':
        if (this.canShoot) {
          this.projectiles.push(new __WEBPACK_IMPORTED_MODULE_4__guns_shotgun__["a" /* default */]({pos, vel, endPos}));
          this.setCooldown(750);
          this.canShoot= false;
        }
        break;
      case 'GravityGun':
        if (this.canShoot) {
          this.projectiles.push(new __WEBPACK_IMPORTED_MODULE_5__guns_gravity_gun__["a" /* default */]({pos, vel, endPos}));
          this.setCooldown(2000);
          this.canShoot = false;
        }
        break;
      case 'Laser':
        if (this.canShoot) {
          this.projectiles.push(new __WEBPACK_IMPORTED_MODULE_6__guns_laser__["a" /* default */]({pos, game: this, endPos}));
          this.canShoot = false;
        }
        break;
      default:
        break;
    }
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
    this.projectiles.forEach((missile, idx) => {
      if (__WEBPACK_IMPORTED_MODULE_2__util_util__["d" /* checkExplosion */](missile)) {
        this.projectiles.splice(idx, 1);
      } else {
        missile.move()
      }
    });
  }

  checkExplosionHits(explosions, missiles) {
    explosions.forEach(explosion => {
      missiles.forEach(missile => {
        if (explosion.isCollidedWith(missile)) {
          this.score += this.maxMissiles * missiles.length * this.time * this.shields;
          const idx = this.projectiles.indexOf(missile);
          this.projectiles.splice(idx, 1);
        }
      });
    });
  }

  checkMissileHits(missiles) {
    missiles.forEach(missile => {
      if (missile.isCollidedWith()) {
        const pos = missile.pos;
        const color = missile.color;
        const maxRadius = 60;
        this.projectiles[this.projectiles.indexOf(missile)] = new __WEBPACK_IMPORTED_MODULE_3__util_explosion__["a" /* default */]({pos, color, maxRadius});
        this.shields -= 1;
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
    __WEBPACK_IMPORTED_MODULE_2__util_util__["e" /* drawBar */](ctx, this.score, this.time, this.shields, this.dimX);
    __WEBPACK_IMPORTED_MODULE_2__util_util__["f" /* drawCurrentGun */](ctx, this.currentGun);
    __WEBPACK_IMPORTED_MODULE_2__util_util__["g" /* drawIcons */](ctx, this.images);
    __WEBPACK_IMPORTED_MODULE_2__util_util__["h" /* drawControls */](ctx);
  }

  step(ctx) {
    this.checkCollisions();
    this.moveProjectiles();
    this.draw(ctx)

    if (this.shields <= 0) {
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
  constructor({pos, vel, endPos}) {
    this.endPos = [endPos[0], -200];
    this.pos = pos;
    this.vel = vel;
    this.radius = 60;
    this.maxRadius = 70;
    this.color1 = 'midnightblue';
    this.color2 = 'blue';
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

  explode({pos, color}) {
    const explosions = [];

    // for (let i=0; i<6; i++) {
    //   const plusMinus = Math.random() < 0.5 ? -1 : 1;
    //   const newPos = pos.map(vect => vect + (Math.random()*100) * plusMinus);
    //   explosions.push(new Explosion({pos: newPos, color, maxRadius: this.maxRadius}));
    // }

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
  constructor({pos, game, endPos}) {
    this.game = game
    this.startPos = [game.dimX/2, game.dimY-40];
    this.pos = pos;
    this.vel = __WEBPACK_IMPORTED_MODULE_0__util_util__["a" /* getVel */](this.startPos, endPos);
    this.endPos = endPos;
    this.color = 'green';
    this.handleMove = this.handleMove.bind(this);
    document.addEventListener('mousemove', this.handleMove);
  }

  handleMove(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
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
      new Laser({pos, game: this.game, endPos: this.endPos}),
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
    return __WEBPACK_IMPORTED_MODULE_0__util_util__["i" /* isCollidedWith */](this, otherObj);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_explosion__ = __webpack_require__(12);



class Rocket {
  constructor({pos, vel, endPos}) {
    this.endPos = endPos;
    this.pos = pos;
    this.vel = vel;
    this.maxRadius = 80;
    this.color = 'blue';
  }

  draw(ctx) {
    const vel = this.vel;
    const pos = this.pos;
    const color = this.color;
    const startPos = __WEBPACK_IMPORTED_MODULE_0__util_util__["k" /* getStartPos */](pos, vel);
    __WEBPACK_IMPORTED_MODULE_0__util_util__["j" /* drawProjectile */]({ctx, pos, vel, startPos, color});
  }

  move() {
    this.pos = this.pos.map((vect, idx) => vect + this.vel[idx]);
  }

  willExplode() {
    return this.endPos[1] >= this.pos[1];
  }

  explode({pos, color}) {
    const maxRadius = this.maxRadius;
    return [new __WEBPACK_IMPORTED_MODULE_1__util_explosion__["a" /* default */]({pos, color, maxRadius})];
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Rocket);


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_util__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_explosion__ = __webpack_require__(12);



class Shotgun {
  constructor({pos, vel, endPos}) {
    this.endPos = endPos;
    this.pos = pos;
    this.vel = vel;
    this.maxRadius = 30;
    this.color = 'teal';
  }

  draw(ctx) {
    const pos = this.pos;
    const vel = this.vel;
    const color = this.color;
    const startPos = __WEBPACK_IMPORTED_MODULE_0__util_util__["k" /* getStartPos */](pos, vel);
    __WEBPACK_IMPORTED_MODULE_0__util_util__["j" /* drawProjectile */]({ctx, pos, vel, startPos, color});
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
      explosions.push(new __WEBPACK_IMPORTED_MODULE_1__util_explosion__["a" /* default */]({pos: newPos, color, maxRadius: this.maxRadius}));
    }

    return explosions;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Shotgun);


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(11);


class Missile {
  constructor({pos, vel, game}) {
    this.pos = pos;
    this.vel = vel;
    this.color = 'red';
    this.game = game;
  }

  draw(ctx) {
    const vel = this.vel;
    const color = this.color;
    const pos = this.pos;
    const startPos = pos.map((vect, idx) => {
      const newVect = vect - (vel[idx] * 10);
      return newVect < 0 ? 0 : newVect;
    });
    __WEBPACK_IMPORTED_MODULE_0__util__["j" /* drawProjectile */]({ctx, pos, vel, startPos, color});
  }

  move() {
    this.pos = this.pos.map((vect, idx) => vect + this.vel[idx]);
  }

  isCollidedWith() {
    return this.pos[1] >= this.game.dimY;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Missile);


/***/ })
/******/ ]);