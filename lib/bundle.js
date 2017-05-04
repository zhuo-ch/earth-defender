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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__explosion__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(3);





class Game {
  constructor({dimX, dimY, maxMissiles}) {
  this.dimX = dimX;
  this.dimY = dimY;
  this.maxMissiles = maxMissiles;
  this.projectiles = [];
  this.image = new Image();
  this.setImage();
  }

  addRocket(endPos) {
    const pos = [this.dimX/2, this.dimY];
    const vel = __WEBPACK_IMPORTED_MODULE_3__util__["a" /* getVel */](pos, endPos);
    const game = this.game;
    this.projectiles.push(new __WEBPACK_IMPORTED_MODULE_1__rocket__["a" /* default */]({pos, vel, endPos, game}));
  }

  addMissiles(maxMissiles) {
    const missilesCount = Math.floor(Math.random() * (maxMissiles/2));
    for (let i = 0; i < missilesCount; i++) {
      const pos = this.randomPosition();
      const endPos = this.randomEnd();
      const vel = __WEBPACK_IMPORTED_MODULE_3__util__["a" /* getVel */](pos, endPos);
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
    return explosion.radius >= 40;
  }

  checkCollisions() {
    const explosions = this.projectiles.filter(mis => mis.radius);
    const missiles = this.projectiles.filter(mis => !mis.radius);

    explosions.forEach(explosion => {
      missiles.forEach(missile => {
        if (explosion.isCollidedWith(missile)) {
          const idx = this.projectiles.indexOf(missile);
          this.projectiles.splice(idx, 1);
        }
      });
    });

    missiles.forEach(missile => {

    })
  }

  setImage() {
    this.image.src = 'background.jpg';
  }

  draw(ctx) {
    ctx.drawImage(this.image,0,0,this.dimX, this.dimY);

    this.projectiles.forEach((projectile, idx) => {
      if (projectile.endPos && (projectile.endPos[1] === projectile.pos[1])) {
        const pos = projectile.pos;
        const game = this
        this.projectiles[idx] = new __WEBPACK_IMPORTED_MODULE_2__explosion__["a" /* default */]({pos, game});
        this.projectiles[idx].draw(ctx);
      } else {
        projectile.draw(ctx)
      }
    });
  }

  step() {
    this.moveProjectiles();
    this.checkCollisions();
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
  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]({dimX, dimY, maxMissiles});
  const splash = new __WEBPACK_IMPORTED_MODULE_1__splash__["a" /* default */]({ctx, dimX, dimY});
  const gameView = new GameView({ctx, game, splash});
  gameView.splashStart();
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
    __WEBPACK_IMPORTED_MODULE_0__util__["b" /* drawProjectile */]({ctx, pos, vel, color});
  }

  move() {
    this.pos = this.pos.map((vect, idx) => vect + this.vel[idx]);
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

  return slope
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
  ctx.stroke();
}
/* harmony export (immutable) */ __webpack_exports__["b"] = drawProjectile;


const gcd = (x, y) => {
  let gcd = function gcd(x, y){
    return y ? gcd(y, x%y) : x;
  };

  gcd = gcd(x, y);

  return [x/gcd, y/gcd];
}
/* unused harmony export gcd */



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(3);


class Rocket {
  constructor({pos, vel, endPos, game}) {
    this.endPos = endPos;
    this.pos = pos;
    this.vel = vel;
    this.game = game;
    this.color = 'blue';
  }

  draw(ctx) {
    const pos = this.pos;
    const vel = this.vel;
    const color = this.color;
    __WEBPACK_IMPORTED_MODULE_0__util__["b" /* drawProjectile */]({ctx, pos, vel, color});
  }

  move() {
    this.pos = this.pos.map((vect, idx) => vect + this.vel[idx]);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Rocket);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Explosion {
  constructor({pos, game}) {
    this.pos = pos;
    this.game = game;
    this.radius = 2;
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
    grd.addColorStop(1, 'blue');
 
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

  isCollidedWith(otherObject) {
    const x1 = this.pos[0];
    const x2 = otherObject.pos[0];
    const y1 = this.pos[1];
    const y2 = otherObject.pos[1];

    const distance = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));

    return distance < this.radius;
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
  }

  setImage() {
    this.image.src = 'splash-background.jpg';
  }

  drawButton(ctx, pos) {
    const x = pos[0];
    const y = pos[1];

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
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.stroke();
    ctx.font = '20pt sans-serif';
    ctx.fillStyle = 'white';
    ctx.fillText('Start Game', this.dimX*2/5, this.dimY*3/5);
  }

  draw(ctx) {
    this.image.addEventListener('load', () => {
      ctx.drawImage(this.image, 0, 0, this.dimX, this.dimY);
      this.drawButton(ctx, [(this.dimX-170)/2, (this.dimY-80)*3/5]);
    });

  }


}

/* harmony default export */ __webpack_exports__["a"] = (Splash);


/***/ })
/******/ ]);