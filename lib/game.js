import Missile from './missile';
import Rocket from './rocket';
import Explosion from './explosion';
import * as Util from './util';

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
    const vel = Util.getVel(pos, endPos);
    const game = this.game;
    this.projectiles.push(new Rocket({pos, vel, endPos, game}));
  }

  addMissiles(maxMissiles) {
    const missilesCount = Math.floor(Math.random() * (maxMissiles/2));
    for (let i = 0; i < missilesCount; i++) {
      const pos = this.randomPosition();
      const endPos = this.randomEnd();
      const vel = Util.getVel(pos, endPos);
      const game = this;
      const m = new Missile({pos, vel, game});
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
        this.projectiles[idx] = new Explosion({pos, game});
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

export default Game;
