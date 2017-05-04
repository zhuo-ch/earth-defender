import Missile from './missile';
import Rocket from './rocket';
import Explosion from './explosion';
import * as Util from './util';

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

  addRocket(endPos) {
    const pos = [this.dimX/2, this.dimY];
    const vel = Util.getVel(pos, endPos);
    const game = this.game;
    this.missiles.push(new Rocket({pos, vel, endPos, game}));
  }

  addMissiles() {
    const missilesCount = Math.ceil(Math.random() * (this.numMissiles/3));
    for (let i = 0; i < missilesCount; i++) {
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
    this.missiles.forEach((missile, idx) => {
      if (this.checkExplosion(missile)) {
        this.missiles.splice(idx, 1);
      } else {
        missile.move()
      }
    });
  }

  checkExplosion(explosion) {
    return explosion.radius >= 40;
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.dimX, this.dimY);
    this.missiles.forEach((projectile, idx) => {
      if (projectile.endPos && (projectile.endPos[1] === projectile.pos[1])) {
        const pos = projectile.pos;
        const game = this
        this.missiles[idx] = new Explosion({pos, game});
        this.missiles[idx].draw(ctx);
      } else {
        projectile.draw(ctx)
      }
    });
  }
}

export default Game;
