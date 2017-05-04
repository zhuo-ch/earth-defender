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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__missile_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_js__ = __webpack_require__(3);



class Game {
  constructor({dimX, dimY, numMissiles}) {
  this.dimX = dimX;
  this.dimY = dimY;
  this.numMissiles = numMissiles;
  this.missiles = [];
  this.addMissiles();
  this.setMissileIncrease();
  }

  setMissileIncrease() {
    setInterval(() => {
      this.numMissiles += 1;
    }, 10000);
  }

  addMissiles() {
    // const randMissiles = Math.
    for (let i = 0; i < this.numMissiles; i++) {
      const pos = this.randomPosition();
      const endPos = this.randomEnd();
      const vel = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* getVel */](pos, endPos);
      const game = this;
      const m = new __WEBPACK_IMPORTED_MODULE_0__missile_js__["a" /* default */]({pos, vel, game});
      this.missiles.push(m);
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

  moveMissiles() {
    this.missiles.forEach(missile => missile.move());
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.dimX, this.dimY);
    this.missiles.forEach(missile => missile.draw(ctx));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(0);


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
  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]({dimX, dimY, numMissiles});
  const gameView = new GameView({ctx, game});
  gameView.start();
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const FALLING = 'RED';
const SHOOTING = 'BLUE';

class Missile {
  constructor({pos, vel, game}) {
    this.pos = pos;
    this.vel = vel;
    this.color = 'Blue';
    this.game = game;
  }

  draw(ctx) {
    const startPoint = this.pos.map((vect, idx) => {
      if ((vect - (this.vel[idx]*10)) < 0) {
        return 0;
      } else {
        return vect - (this.vel[idx]*10);
      }
    });
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.moveTo(startPoint[0], startPoint[1]);
    ctx.lineTo(this.pos[0], this.pos[1]);
    ctx.stroke();
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


const gcd = (x, y) => {
  let gcd = function gcd(x, y){
    return y ? gcd(y, x%y) : x;
  };

  gcd = gcd(x, y);

  return [x/gcd, y/gcd];
}
/* unused harmony export gcd */



/***/ })
/******/ ]);