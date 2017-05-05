import Missile from './missile';
import Rocket from './rocket';
import * as Util from './util';
import RocketExplosion from './rocket_explosion';

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
  this.image = new Image();
  this.setImage();
  }

  addRocket(endPos) {
    const pos = [this.dimX/2, this.dimY];
    const vel = Util.getVel(pos, endPos);
    this.projectiles.push(new Rocket({pos, vel, endPos}));
  }

  addMissiles() {
    const missilesCount = Math.floor(Math.random() * (this.maxMissiles/2));
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
        this.projectiles[this.projectiles.indexOf(missile)] = new RocketExplosion({pos, color});
        this.shields -= 1;
      }
    });
  }

  setImage() {
    this.image.src = 'background.jpg';
  }

  drawBar(ctx) {
    ctx.fillStyle = 'silver';
    ctx.font = '16pt audiowide';
    ctx.fillText(`Score: ${this.score}`, 20, 50);
    ctx.fillText(`Time: ${this.time}`, (this.dimX-80) / 2, 50);
    ctx.fillText(`Shields: ${this.shields}`, this.dimX-150, 50);
  }

  draw(ctx) {
    if (this.shields <= 0) {
      this.endGame();
    }

    ctx.drawImage(this.image,0,0,this.dimX, this.dimY);

    this.projectiles.forEach((projectile, idx) => {
      if (projectile.endPos && (projectile.endPos[1] === projectile.pos[1])) {
        const pos = projectile.pos;
        const color = projectile.color;
        this.projectiles[idx] = this.projectiles[idx].explode({pos, color});
        this.projectiles[idx].draw(ctx);
      } else {
        projectile.draw(ctx)
      }
    });

    this.drawBar(ctx);
  }

  step() {
    this.moveProjectiles();
    this.checkCollisions();
  };
}

export default Game;
