import Missile from './missile.js';
import * as Util from './util.js';

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
      const vel = Util.getVel(pos, endPos);
      const game = this;
      const m = new Missile({pos, vel, game});
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

export default Game;
