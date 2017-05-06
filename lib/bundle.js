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
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__missile__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rocket__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__explosion__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shotgun__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__gravity_gun__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__laser__ = __webpack_require__(10);








class Game {
  constructor({dimX, dimY, endGame}) {
  this.score = 0;
  this.time = 0;
  this.shields = 20;
  this.dimX = dimX;
  this.dimY = dimY;
  this.endGame = endGame;
  this.maxMissiles = 3;
  this.projectiles = [];
  this.background = new Image();
  this.rocketIcon = new Image();
  this.shotgunIcon = new Image();
  this.gravityGunIcon = new Image();
  this.laserIcon = new Image();
  this.currentGun = 'Rocket';
  this.canShoot = true;
  this.setImages();
  this.setGun();
  }

  setGun() {
    document.addEventListener('keydown', (e) => {
      this.canShoot = true;
      this.resetLaser();
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
    this.projectiles.forEach((projectile, idx) => {
      if (projectile instanceof __WEBPACK_IMPORTED_MODULE_6__laser__["a" /* default */]) {
        this.projectiles.splice(idx, 1);
      }
    })
  }

  setCooldown(time) {
    this.cooldownTimer = setTimeout(() => {
      this.canShoot = true;
    }, time);
  }

  addRocket(endPos) {
    const pos = [this.dimX/2, this.dimY];
    const vel = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* getVel */](pos, endPos);

    switch (this.currentGun) {
      case 'Rocket':
        if (this.canShoot) {
          this.projectiles.push(new __WEBPACK_IMPORTED_MODULE_1__rocket__["a" /* default */]({pos, vel, endPos}));
          this.setCooldown(500);
          this.canShoot = false;
        }
        break;
      case 'Shotgun':
        if (this.canShoot) {
          this.projectiles.push(new __WEBPACK_IMPORTED_MODULE_4__shotgun__["a" /* default */]({pos, vel, endPos}));
          this.setCooldown(750);
          this.canShoot= false;
        }
        break;
      case 'GravityGun':
        if (this.canShoot) {
          this.projectiles.push(new __WEBPACK_IMPORTED_MODULE_5__gravity_gun__["a" /* default */]({pos, vel, endPos}));
          this.setCooldown(2000);
          this.canShoot = false;
        }
        break;
      case 'Laser':
        if (this.canShoot) {
          this.projectiles.push(new __WEBPACK_IMPORTED_MODULE_6__laser__["a" /* default */]({pos, game: this, endPos}));
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
      const pos = this.randomPosition();
      const endPos = this.randomEnd();
      const vel = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* getVel */](pos, endPos);
      const game = this;
      const m = new __WEBPACK_IMPORTED_MODULE_0__missile__["a" /* default */]({pos, vel, game});
      this.projectiles.push(m);
    }
  };

  randomEnd() {
    const randX = Math.floor(Math.random() * this.dimX);
    const randY = this.dimY;
    return [randX, randY];
  }

  randomPosition() {
    const randX = Math.floor(Math.random() * this.dimX);
    const randY = 0;
    return [randX, randY];
  }

  moveProjectiles() {
    this.projectiles.forEach((missile, idx) => {
      if (this.checkExplosion(missile)) {
        this.projectiles.splice(idx, 1);
      } else {
        missile.move()
      }
    });
  }

  checkExplosion(explosion) {
    return explosion.radius >= explosion.maxRadius;
  }

  checkCollisions() {
    const explosions = this.projectiles.filter(mis => mis.radius);
    const missiles = this.projectiles.filter(mis => !mis.radius && mis.color === 'red');

    explosions.forEach(explosion => {
      missiles.forEach(missile => {
        if (explosion.isCollidedWith(missile)) {
          this.score += this.maxMissiles * missiles.length * this.time * this.shields;
          const idx = this.projectiles.indexOf(missile);
          this.projectiles.splice(idx, 1);
        }
      });
    });

    missiles.forEach(missile => {
      if (missile.isCollidedWith()) {
        const pos = missile.pos;
        const color = missile.color;
        const maxRadius = 60;
        this.projectiles[this.projectiles.indexOf(missile)] = new __WEBPACK_IMPORTED_MODULE_3__explosion__["a" /* default */]({pos, color, maxRadius});
        this.shields -= 1;
      }
    });
  }

  setImages() {
    this.background.src = 'images/background.jpg';
    this.shotgunIcon.src = 'images/shotgun-icon.svg';
    this.rocketIcon.src = 'images/rocket-icon.svg';
    this.gravityGunIcon.src = 'images/gravity-gun-icon.svg';
    this.laserIcon.src = 'images/laser-icon.svg';
  }

  drawBar(ctx) {
    ctx.fillStyle = 'silver';
    ctx.font = '16pt audiowide';
    ctx.fillText(`Score: ${this.score}`, 20, 50);
    ctx.fillText(`Time: ${this.time}`, (this.dimX-80) / 2, 50);
    ctx.fillText(`Shields: ${this.shields}`, this.dimX-150, 50);
  }

  drawIcons(ctx) {
    switch (this.currentGun) {
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

    ctx.drawImage(this.rocketIcon, 50, 420, 50, 40);
    ctx.drawImage(this.shotgunIcon, 105, 425, 40, 30);
    ctx.drawImage(this.gravityGunIcon, 150, 420, 50, 40);
    ctx.drawImage(this.laserIcon, 205, 425, 40, 30);
    ctx.fillStyle = 'silver';
    ctx.font = '16pt audiowide';
    ctx.fillText('A', 65, 410);
    ctx.fillText('S', 115, 410);
    ctx.fillText('D', 165, 410);
    ctx.fillText('F', 215, 410);
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
    ctx.drawImage(this.background,0,0,this.dimX, this.dimY);
    this.projectiles.forEach(projectile => projectile.draw(ctx, game));
    this.drawBar(ctx);
    this.drawIcons(ctx);
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
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__splash__ = __webpack_require__(6);



class GameView {
  constructor({ctx, dimX, dimY, splash}) {
    this.gameStarted = false;
    this.dimX = dimX;
    this.dimY = dimY;
    this.game = game;
    this.ctx = ctx;
    this.splash = splash;
    this.intervals = [];
    this.handleMove = this.handleMove.bind(this);
    this.endGame = this.endGame.bind(this);
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
    this.game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]({dimX: this.dimX, dimY: this.dimY, endGame: this.endGame})
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
  canvas.addEventListener('click', (e) => gameView.handleClick(e));
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(3);


class Missile {
  constructor({pos, vel, game}) {
    this.pos = pos;
    this.vel = vel;
    this.color = 'red';
    this.game = game;
  }

  draw(ctx) {
    const pos = this.pos;
    const vel = this.vel;
    const color = this.color;
    __WEBPACK_IMPORTED_MODULE_0__util__["c" /* drawProjectile */]({ctx, pos, vel, color});
  }

  move() {
    this.pos = this.pos.map((vect, idx) => vect + this.vel[idx]);
  }

  isCollidedWith() {
    return this.pos[1] >= this.game.dimY;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Missile);


/***/ }),
/* 3 */
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


const drawProjectile = ({ctx, pos, vel, color}) => {
  const startPoint = pos.map((vect, idx) => {
    if ((vect - (vel[idx]*10)) < 0) {
      return 0;
    } else {
      return vect - (vel[idx]*10);
    }
  });

  ctx.beginPath();
  ctx.moveTo(startPoint[0], startPoint[1]);
  ctx.lineTo(pos[0], pos[1]);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();
}
/* harmony export (immutable) */ __webpack_exports__["c"] = drawProjectile;


const isCollidedWith = (obj, otherObj) => {
  const x1 = obj.pos[0];
  const x2 = otherObj.pos[0];
  const y1 = obj.pos[1];
  const y2 = otherObj.pos[1];

  const distance = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));

  return distance < obj.radius;
}
/* harmony export (immutable) */ __webpack_exports__["b"] = isCollidedWith;


const gcd = (x, y) => {
  let gcd = function gcd(x, y){
    return y ? gcd(y, x%y) : x;
  };

  gcd = gcd(x, y);

  return [x/gcd, y/gcd];
}

const speed = (x, y) => {
// debugger
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__explosion__ = __webpack_require__(5);



class Rocket {
  constructor({pos, vel, endPos}) {
    this.endPos = endPos;
    this.pos = pos;
    this.vel = vel;
    this.maxRadius = 80;
    this.color = 'blue';
  }

  draw(ctx) {
    const pos = this.pos;
    const vel = this.vel;
    const color = this.color;
    __WEBPACK_IMPORTED_MODULE_0__util__["c" /* drawProjectile */]({ctx, pos, vel, color});
  }

  move() {
    this.pos = this.pos.map((vect, idx) => vect + this.vel[idx]);
  }

  willExplode() {
    return this.endPos[1] >= this.pos[1];
  }

  explode({pos, color}) {
    const maxRadius = this.maxRadius;
    return [new __WEBPACK_IMPORTED_MODULE_1__explosion__["a" /* default */]({pos, color, maxRadius})];
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Rocket);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(3);


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
    return __WEBPACK_IMPORTED_MODULE_0__util__["b" /* isCollidedWith */](this, otherObj);
  };

  move() {
    this.radius += 1;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Explosion);


/***/ }),
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__explosion__ = __webpack_require__(5);



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
    __WEBPACK_IMPORTED_MODULE_0__util__["c" /* drawProjectile */]({ctx, pos, vel, color});
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
      explosions.push(new __WEBPACK_IMPORTED_MODULE_1__explosion__["a" /* default */]({pos: newPos, color, maxRadius: this.maxRadius}));
    }

    return explosions;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Shotgun);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__explosion__ = __webpack_require__(5);



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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(3);


class Laser {
  constructor({pos, game, endPos}) {
    this.game = game
    this.startPos = [game.dimX/2, game.dimY];
    this.pos = pos;
    this.vel = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* getVel */](this.startPos, endPos);
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
    this.vel = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* getVel */](this.pos, this.endPos);
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
    this.radius = 15;
    this.maxRadius = this.radius;
  }

  move() {
  }

  isCollidedWith(otherObj) {
    return __WEBPACK_IMPORTED_MODULE_0__util__["b" /* isCollidedWith */](this, otherObj);
  }

  draw(ctx) {
    if (Math.random() < 0.5) {
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


/***/ })
/******/ ]);